# Aggregation SQL Functions Documentation

## Overview
This document contains SQL functions and triggers needed for the Expert Consensus and Benchmark Score Aggregation system. These functions support the leaderboard functionality by efficiently calculating RMSE scores and maintaining aggregated data.

## Required SQL Functions

### 1. Get User Expertise at Time
Determines a user's expertise level at a specific point in time based on their expertise history.

```sql
CREATE OR REPLACE FUNCTION get_user_expertise_at_time(
  user_uuid UUID,
  at_time TIMESTAMP DEFAULT NOW()
) RETURNS expertise_category AS $$
SELECT expertise_level
FROM user_expertise_history
WHERE user_id = user_uuid
  AND effective_from <= at_time
  AND (effective_to IS NULL OR effective_to > at_time)
ORDER BY effective_from DESC
LIMIT 1;
$$ LANGUAGE SQL;
```

**Usage:**
- Called when aggregating expert ratings to ensure only ratings from users who were experts at the time are included
- Example: `WHERE get_user_expertise_at_time(user_id, rating_created_at) = 'expert'`

### 2. Generate Hyperparameter Hash
Creates a consistent SHA-256 hash of hyperparameter configurations for efficient grouping and comparison.

```sql
CREATE OR REPLACE FUNCTION generate_hyperparameter_hash(params JSONB)
RETURNS VARCHAR(64) AS $$
SELECT encode(digest(params::text::bytea, 'sha256'), 'hex')
$$ LANGUAGE SQL IMMUTABLE;
```

**Usage:**
- Generates hash for `hyperparameter_config` JSON to enable fast GROUP BY operations
- Marked as IMMUTABLE for query optimization
- Example: `generate_hyperparameter_hash('{"temperature": 0.7, "max_tokens": 2000}'::jsonb)`

### 3. Refresh Expert Consensus
Populates the expert_consensus table with aggregated expert ratings for each question.

```sql
CREATE OR REPLACE FUNCTION refresh_expert_consensus()
RETURNS void AS $$
DECLARE
  min_expert_ratings INTEGER;
BEGIN
  -- Get minimum expert ratings threshold from config
  SELECT (value::text)::INTEGER INTO min_expert_ratings
  FROM system_config
  WHERE key = 'expert_rating_minimum'
  LIMIT 1;

  -- Default to 10 if not configured
  IF min_expert_ratings IS NULL THEN
    min_expert_ratings := 10;
  END IF;

  -- Clear and rebuild expert consensus
  TRUNCATE TABLE expert_consensus;

  INSERT INTO expert_consensus (
    question_id,
    expert_mean,
    expert_std,
    expert_count,
    individual_ratings,
    first_rating,
    last_rating,
    last_refreshed
  )
  SELECT
    br.question_id,
    AVG(br.rating)::FLOAT as expert_mean,
    STDDEV(br.rating)::FLOAT as expert_std,
    COUNT(*)::INTEGER as expert_count,
    jsonb_agg(
      jsonb_build_object(
        'rating', br.rating,
        'user_id', br.user_id,
        'created_at', br.created_at
      ) ORDER BY br.created_at
    ) as individual_ratings,
    MIN(br.created_at) as first_rating,
    MAX(br.created_at) as last_rating,
    NOW() as last_refreshed
  FROM benchmark_ratings br
  JOIN users u ON br.user_id = u.id
  WHERE get_user_expertise_at_time(u.id, br.created_at) = 'expert'
  GROUP BY br.question_id
  HAVING COUNT(*) >= min_expert_ratings;

END;
$$ LANGUAGE plpgsql;
```

**Features:**
- Reads minimum threshold from system_config table
- Only includes ratings from users who were experts at rating time
- Stores individual ratings as JSON for audit trail
- Tracks first/last rating dates and refresh timestamp

### 4. Refresh Benchmark Score Aggregates
Calculates aggregated performance metrics for model/scale/hyperparameter combinations.

```sql
CREATE OR REPLACE FUNCTION refresh_benchmark_score_aggregates()
RETURNS void AS $$
DECLARE
  min_model_runs INTEGER;
BEGIN
  -- Get minimum model runs threshold from config
  SELECT (value::text)::INTEGER INTO min_model_runs
  FROM system_config
  WHERE key = 'model_run_minimum'
  LIMIT 1;

  -- Default to 10 if not configured
  IF min_model_runs IS NULL THEN
    min_model_runs := 10;
  END IF;

  -- Clear and rebuild aggregates
  TRUNCATE TABLE benchmark_score_aggregates;

  INSERT INTO benchmark_score_aggregates (
    model_version_id,
    scale_id,
    hyperparameter_hash,
    hyperparameter_config,
    system_prompt_id,
    message_prompt_id,
    run_count,
    model_mean,
    model_std,
    model_min,
    model_max,
    model_median,
    expert_consensus_mean,
    rmse_vs_experts,
    first_run,
    last_run,
    experiment_count,
    last_refreshed
  )
  SELECT
    br.model_version_id,
    bq.scale_id,
    br.hyperparameter_hash,
    br.hyperparameter_config,
    br.system_prompt_id,
    br.message_prompt_id,
    COUNT(*)::INTEGER as run_count,
    AVG(br.score)::FLOAT as model_mean,
    STDDEV(br.score)::FLOAT as model_std,
    MIN(br.score)::FLOAT as model_min,
    MAX(br.score)::FLOAT as model_max,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY br.score)::FLOAT as model_median,
    AVG(ec.expert_mean)::FLOAT as expert_consensus_mean,
    SQRT(AVG(POWER(br.score - ec.expert_mean, 2)))::FLOAT as rmse_vs_experts,
    MIN(br.created_at) as first_run,
    MAX(br.created_at) as last_run,
    COUNT(DISTINCT br.experiment_id)::INTEGER as experiment_count,
    NOW() as last_refreshed
  FROM benchmark_results br
  JOIN benchmark_experiments be ON br.experiment_id = be.id
  JOIN benchmark_questions bq ON br.question_id = bq.id
  LEFT JOIN expert_consensus ec ON bq.id = ec.question_id
  WHERE be.is_public = true
    AND br.is_approved = true
    AND br.model_version_id IS NOT NULL
  GROUP BY
    br.model_version_id,
    bq.scale_id,
    br.hyperparameter_hash,
    br.hyperparameter_config,
    br.system_prompt_id,
    br.message_prompt_id
  HAVING COUNT(*) >= min_model_runs;

END;
$$ LANGUAGE plpgsql;
```

**Features:**
- Configurable minimum run threshold
- Calculates RMSE vs expert consensus
- Includes statistical measures (mean, std, min, max, median)
- Only includes approved experiments marked as public
- Groups by model, scale, hyperparameters, and prompts

### 5. Refresh All Aggregations
Convenience function to refresh all aggregation tables in the correct order.

```sql
CREATE OR REPLACE FUNCTION refresh_all_aggregations()
RETURNS void AS $$
BEGIN
  PERFORM refresh_expert_consensus();
  PERFORM refresh_benchmark_score_aggregates();
END;
$$ LANGUAGE plpgsql;
```

**Usage:** Call periodically (e.g., via cron job or after batch experiment completions)

### 6. Auto-generate Hyperparameter Hash Trigger
Automatically generates hash when benchmark results are inserted or updated.

```sql
CREATE OR REPLACE FUNCTION update_hyperparameter_hash()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.hyperparameter_config IS NOT NULL THEN
    NEW.hyperparameter_hash := generate_hyperparameter_hash(NEW.hyperparameter_config);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER benchmark_results_hash_trigger
BEFORE INSERT OR UPDATE OF hyperparameter_config ON benchmark_results
FOR EACH ROW
EXECUTE FUNCTION update_hyperparameter_hash();
```

**Features:**
- Ensures hash is always in sync with config
- Triggers on both INSERT and UPDATE
- Only recalculates when hyperparameter_config changes

## Configuration Keys
The following system_config keys control aggregation behavior:

| Key | Default | Description |
|-----|---------|-------------|
| `expert_rating_minimum` | 10 | Minimum expert ratings required for consensus |
| `model_run_minimum` | 10 | Minimum model runs required for aggregation |

## Performance Considerations

1. **Indexing Strategy**
   - Index on `hyperparameter_hash` for GROUP BY operations
   - Index on `expertise_history(user_id, effective_from, effective_to)`
   - Partial index on `WHERE effective_to IS NULL` for current expertise

2. **Refresh Strategy Options**
   - **Full Refresh**: Truncate and rebuild (current approach)
   - **Incremental**: Only update changed records (more complex)
   - **Materialized Views**: PostgreSQL native materialized views (alternative approach)

3. **Optimization Opportunities**
   - Consider partitioning large tables by date
   - Use UNLOGGED tables for intermediate calculations
   - Implement incremental refresh for better performance at scale

## Implementation Notes

### Option 1: Direct SQL Execution
Execute these functions directly in PostgreSQL during database setup.

### Option 2: Application-Level Implementation
Implement equivalent logic in TypeScript using Prisma:
```typescript
// Example: Calculate expert consensus in application
const expertRatings = await prisma.benchmarkRating.groupBy({
  by: ['questionId'],
  where: {
    user: {
      expertiseHistory: {
        some: {
          expertiseLevel: 'EXPERT',
          effectiveFrom: { lte: rating.createdAt },
          OR: [
            { effectiveTo: null },
            { effectiveTo: { gt: rating.createdAt }}
          ]
        }
      }
    }
  },
  _avg: { rating: true },
  _count: true,
  having: { rating: { _count: { gte: 10 }}}
});
```

### Option 3: Hybrid Approach
Use SQL for complex aggregations, application logic for orchestration.

## Testing Checklist

- [ ] Verify expertise history temporal queries return correct values
- [ ] Test hash generation consistency across same hyperparameters
- [ ] Confirm aggregation respects configured thresholds
- [ ] Validate RMSE calculations against manual calculations
- [ ] Test trigger fires correctly on insert/update
- [ ] Verify performance with large datasets (>1M records)
- [ ] Test configuration fallbacks when system_config is empty

## Future Enhancements

1. **Incremental Refresh**: Track last processed timestamp to only update new/changed data
2. **Caching Layer**: Add Redis caching for frequently accessed aggregations
3. **Real-time Updates**: Use PostgreSQL NOTIFY/LISTEN for real-time leaderboard updates
4. **Domain-specific Thresholds**: Different minimum requirements per scale/domain
5. **Weighted Expertise**: Give more weight to senior experts vs new experts