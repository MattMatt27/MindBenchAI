# 🔧 Technical Profile API Routes

## Overview
The Technical Profile page displays model versions and tool configurations in a filterable table format, showing technical capabilities and characteristics based on questionnaire responses.

## Data Flow Analysis

### **Current Frontend Requirements:**
1. **Two main entity types**: `tool_configuration` and `model_version` (base models)
2. **Dynamic filtering**: Search, category filters, capability filters
3. **Question-based display**: Grouped by categories with nested headers
4. **Real-time filtering**: Client-side filtering of large datasets

---

## 📊 Core API Routes

### **1. Get Technical Profile Data**
```javascript
// Get all profiles with answers (main data endpoint)
'GET /api/technical-profiles': {
  auth: 'optional', // Public data
  cache: 'redis:1hour',
  query_params: {
    entity_type: ['tool_configuration', 'model_version'], // Filter by type
    include_inactive: boolean, // Default: false
    category: string, // Filter by question category
    search: string, // Search in names/developers
    limit: number, // Default: 100
    offset: number // Pagination
  },
  response: {
    data: [
      {
        id: 'uuid',
        entity_type: 'tool_configuration|model_version',
        // Tool Configuration fields
        tool_name?: string,
        configuration_name?: string,
        base_model_name?: string,
        // Model Version fields
        name?: string,
        developer?: string,
        version?: string,
        // Common fields
        is_active: boolean,
        answers: {
          [question_key]: {
            type: 'boolean|number|text|list',
            value: any,
            category: string,
            last_updated: timestamp
          }
        }
      }
    ],
    pagination: {
      total: number,
      limit: number,
      offset: number,
      has_more: boolean
    }
  }
}
```

### **2. Get Questions Configuration**
```javascript
// Get all questions for building table headers and filters
'GET /api/technical-profiles/questions': {
  auth: 'optional',
  cache: 'redis:6hours', // Questions change infrequently
  query_params: {
    entity_type: ['tool_configuration', 'model_version'],
    category: string, // Filter by category
    displayed_only: boolean // Default: true
  },
  response: {
    data: [
      {
        id: 'uuid',
        entity_type: 'tool_configuration|model_version',
        question_key: string,
        question_text: string,
        category: string,
        question_type: 'boolean|number|text|list',
        display_order: number,
        is_displayed: boolean,
        is_active: boolean
      }
    ],
    categories: [
      {
        name: string,
        entity_type: 'tool_configuration|model_version',
        question_count: number,
        display_order: number
      }
    ]
  }
}
```

### **3. Get Optimized Profile Data (Recommended)**
```javascript
// Combined endpoint optimized for frontend display
'GET /api/technical-profiles/display': {
  auth: 'optional',
  cache: 'redis:1hour',
  query_params: {
    entity_type: 'tool_configuration|model_version',
    category: string, // 'all' or specific category
    search: string,
    filters: string, // JSON encoded dynamic filter object: {"question_key": value}
    limit: number,
    offset: number
  },
  response: {
    profiles: [
      {
        id: 'uuid',
        entity_type: 'tool_configuration|model_version',
        display_name: string, // Primary name for display
        secondary_name: string, // Developer or base model
        version?: string,
        answers: {
          [question_key]: {
            type: 'boolean|number|text|list',
            value: any
          }
        }
      }
    ],
    questions: [
      {
        id: 'uuid',
        question_key: string,
        question_text: string,
        category: string,
        question_type: 'boolean|number|text|list',
        display_order: number
      }
    ],
    categories: [string], // Ordered list of categories
    total_count: number,
    applied_filters: object
  }
}
```

---

## 🔍 Search & Filtering Routes

### **4. Search Suggestions**
```javascript
// Get search autocomplete suggestions
'GET /api/technical-profiles/search': {
  auth: 'optional',
  cache: 'redis:30min',
  query_params: {
    q: string, // Search query (min 2 chars)
    entity_type: 'tool_configuration|model_version',
    limit: number // Default: 10
  },
  response: {
    suggestions: [
      {
        type: 'tool_name|model_name|developer|configuration',
        value: string,
        match_count: number // How many profiles match
      }
    ]
  }
}
```

### **5. Dynamic Filter Options**
```javascript
// Get dynamically generated filter options based on database questions
'GET /api/technical-profiles/filters': {
  auth: 'optional',
  cache: 'redis:2hours',
  query_params: {
    entity_type: 'tool_configuration|model_version',
    include_counts: boolean, // Default: true
    filterable_only: boolean // Default: true - only questions marked as filterable
  },
  response: {
    filters: [
      {
        category: string, // e.g., "Platforms", "Architecture", "Capabilities"
        display_order: number,
        questions: [
          {
            question_id: 'uuid',
            question_key: string, // e.g., "platform_android", "multimodal"
            question_text: string, // e.g., "Android Support", "Multimodal Capabilities"
            question_type: 'boolean|number|text|list',
            filter_config: {
              // For boolean questions
              type: 'checkbox',
              options: [
                { value: true, label: 'Yes', count: number },
                { value: false, label: 'No', count: number }
              ]
            } | {
              // For list questions
              type: 'multi_select',
              options: [
                { value: string, label: string, count: number }
              ]
            } | {
              // For numeric questions
              type: 'range',
              min: number,
              max: number,
              step: number,
              distribution: [
                { range: string, count: number } // e.g., "0-10": 5, "11-20": 3
              ]
            } | {
              // For text questions (if filterable)
              type: 'search',
              unique_values: [
                { value: string, count: number }
              ]
            }
          }
        ]
      }
    ],
    entity_type: string,
    total_profiles: number,
    last_updated: timestamp
  }
}
```

---

## 🔧 Database Schema Enhancements for Dynamic Filtering

### **Enhanced Question Schema**
To support dynamic filtering, we need to add filtering metadata to the questions table:

```sql
-- Add columns to tech_profile_questions table
ALTER TABLE tech_profile_questions
ADD COLUMN is_filterable boolean DEFAULT false,
ADD COLUMN filter_type varchar(20), -- 'checkbox', 'multi_select', 'range', 'search'
ADD COLUMN filter_config jsonb; -- Additional filter configuration

-- Example filter_config for different question types:
-- Boolean: {"show_counts": true, "labels": {"true": "Yes", "false": "No"}}
-- List: {"multi_select": true, "separator": ","}
-- Number: {"show_as_range": true, "step": 1, "show_distribution": true}
-- Text: {"searchable": true, "show_unique_values": true}
```

### **Dynamic Filter Query Examples**
```sql
-- Get filterable questions with value distributions
SELECT
  tpq.id,
  tpq.question_key,
  tpq.question_text,
  tpq.category,
  tpq.question_type,
  tpq.filter_config,
  -- For boolean questions
  CASE WHEN tpq.question_type = 'boolean' THEN
    jsonb_build_object(
      'true', COUNT(*) FILTER (WHERE tpa.boolean_value = true),
      'false', COUNT(*) FILTER (WHERE tpa.boolean_value = false)
    )
  -- For list questions
  WHEN tpq.question_type = 'list' THEN
    jsonb_object_agg(
      trim(value),
      COUNT(*)
    )
  -- For numeric questions
  WHEN tpq.question_type = 'number' THEN
    jsonb_build_object(
      'min', MIN(tpa.numeric_value),
      'max', MAX(tpa.numeric_value),
      'avg', AVG(tpa.numeric_value)
    )
  END as value_distribution
FROM tech_profile_questions tpq
LEFT JOIN tech_profile_answers tpa ON tpq.id = tpa.question_id AND tpa.is_approved = true
LEFT JOIN unnest(string_to_array(tpa.list_value, ',')) AS value ON tpq.question_type = 'list'
WHERE tpq.is_filterable = true
  AND tpq.entity_type = $1
GROUP BY tpq.id, tpq.question_key, tpq.question_text, tpq.category, tpq.question_type, tpq.filter_config
ORDER BY tpq.display_order;
```

### **Dynamic Filter Processing**
```javascript
// Example filter processing logic
const processFilters = (filters, entityType) => {
  const conditions = [];
  const params = [];

  for (const [questionKey, filterValue] of Object.entries(filters)) {
    // Get question metadata
    const question = await getQuestionByKey(questionKey, entityType);

    switch (question.question_type) {
      case 'boolean':
        conditions.push(`tpa.boolean_value = ?`);
        params.push(filterValue);
        break;

      case 'list':
        // Support array of values for multi-select
        if (Array.isArray(filterValue)) {
          const listConditions = filterValue.map(() => 'tpa.list_value LIKE ?');
          conditions.push(`(${listConditions.join(' OR ')})`);
          filterValue.forEach(val => params.push(`%${val}%`));
        }
        break;

      case 'number':
        // Support range filtering
        if (filterValue.min !== undefined) {
          conditions.push(`tpa.numeric_value >= ?`);
          params.push(filterValue.min);
        }
        if (filterValue.max !== undefined) {
          conditions.push(`tpa.numeric_value <= ?`);
          params.push(filterValue.max);
        }
        break;

      case 'text':
        conditions.push(`tpa.text_value ILIKE ?`);
        params.push(`%${filterValue}%`);
        break;
    }
  }

  return { conditions, params };
};
```

---

## 📝 Management Routes (Admin/Research)

### **6. Update Profile Answer**
```javascript
// Update a specific answer for a profile
'PATCH /api/technical-profiles/:entity_type/:entity_id/answers/:question_id': {
  auth: 'required',
  roles: ['RESEARCHER', 'ADMIN'],
  body: {
    value: any, // Based on question type
    notes?: string // Optional reviewer notes
  },
  response: {
    answer: {
      id: 'uuid',
      value: any,
      updated_at: timestamp,
      reviewer_id: 'uuid',
      is_approved: boolean
    }
  }
}
```

### **7. Bulk Update Answers**
```javascript
// Update multiple answers for a profile
'PUT /api/technical-profiles/:entity_type/:entity_id/answers': {
  auth: 'required',
  roles: ['RESEARCHER', 'ADMIN'],
  body: {
    answers: [
      {
        question_id: 'uuid',
        value: any,
        notes?: string
      }
    ]
  },
  response: {
    updated_count: number,
    errors: [
      {
        question_id: 'uuid',
        error: string
      }
    ]
  }
}
```

### **8. Get Profile Review Status**
```javascript
// Get review status and completeness
'GET /api/technical-profiles/:entity_type/:entity_id/review': {
  auth: 'required',
  roles: ['RESEARCHER', 'ADMIN'],
  response: {
    profile: {
      id: 'uuid',
      entity_type: string,
      name: string,
      completeness: {
        answered: number,
        total: number,
        percentage: number
      },
      review_status: {
        status: 'not_started|in_progress|submitted|approved|rejected',
        reviewer_id?: 'uuid',
        last_updated: timestamp,
        notes?: string
      },
      missing_answers: [
        {
          question_id: 'uuid',
          question_text: string,
          category: string
        }
      ]
    }
  }
}
```

---

## 🎯 Performance Optimizations

### **Cache Strategy**
```javascript
const cacheStrategy = {
  // Static data - updated infrequently
  questions: {
    key: 'tech_profiles:questions:{entity_type}',
    ttl: '6 hours',
    invalidate_on: ['question_updated', 'question_created']
  },

  // Dynamic data - updated regularly
  profiles: {
    key: 'tech_profiles:data:{entity_type}:{hash}',
    ttl: '1 hour',
    invalidate_on: ['answer_updated', 'profile_updated']
  },

  // Filter metadata
  filters: {
    key: 'tech_profiles:filters:{entity_type}',
    ttl: '2 hours',
    invalidate_on: ['answer_updated', 'profile_created']
  }
};
```

### **Database Query Optimizations**
```sql
-- Pre-computed materialized view for performance
CREATE MATERIALIZED VIEW tech_profile_display AS
SELECT
  tpa.entity_type,
  tpa.entity_id,
  CASE
    WHEN tpa.entity_type = 'tool_configuration' THEN tc.configuration_name
    WHEN tpa.entity_type = 'model_version' THEN mv.name
  END as display_name,
  CASE
    WHEN tpa.entity_type = 'tool_configuration' THEN m.name
    WHEN tpa.entity_type = 'model_version' THEN mv.developer
  END as secondary_name,
  mv.version,
  jsonb_object_agg(
    tpq.question_key,
    jsonb_build_object(
      'type', tpq.question_type,
      'value', COALESCE(tpa.boolean_value::text, tpa.numeric_value::text, tpa.text_value, tpa.list_value),
      'category', tpq.category
    )
  ) as answers
FROM tech_profile_answers tpa
JOIN tech_profile_questions tpq ON tpa.question_id = tpq.id
LEFT JOIN tool_configurations tc ON tpa.entity_id = tc.id AND tpa.entity_type = 'tool_configuration'
LEFT JOIN model_versions mv ON tpa.entity_id = mv.id AND tpa.entity_type = 'model_version'
LEFT JOIN tools t ON tc.tool_id = t.id
LEFT JOIN models m ON mv.model_id = m.id
WHERE tpa.is_approved = true
  AND tpq.is_displayed = true
GROUP BY tpa.entity_type, tpa.entity_id, tc.configuration_name, mv.name, mv.developer, mv.version, m.name;

-- Refresh strategy
REFRESH MATERIALIZED VIEW CONCURRENTLY tech_profile_display;
```

---

## 📋 API Route Summary

| Route | Method | Auth | Cache | Purpose |
|-------|--------|------|-------|---------|
| `/api/technical-profiles/display` | GET | Optional | 1h | **Recommended**: Combined profiles + questions |
| `/api/technical-profiles` | GET | Optional | 1h | Raw profile data |
| `/api/technical-profiles/questions` | GET | Optional | 6h | Question definitions |
| `/api/technical-profiles/search` | GET | Optional | 30m | Search autocomplete |
| `/api/technical-profiles/filters` | GET | Optional | 2h | Filter options & counts |
| `/api/technical-profiles/:type/:id/answers/:qid` | PATCH | Required | None | Update single answer |
| `/api/technical-profiles/:type/:id/answers` | PUT | Required | None | Bulk update answers |
| `/api/technical-profiles/:type/:id/review` | GET | Required | None | Review status |

---

## 🔧 Implementation Priority

### **Phase 1 - Core Functionality**
1. `GET /api/technical-profiles/display` - Primary data endpoint
2. `GET /api/technical-profiles/questions` - Question metadata
3. `GET /api/technical-profiles/filters` - Filter options

### **Phase 2 - Enhanced UX**
4. `GET /api/technical-profiles/search` - Search suggestions
5. Caching implementation with Redis
6. Database materialized views

### **Phase 3 - Management Features**
7. Answer update endpoints (PATCH/PUT)
8. Review status tracking
9. Bulk operations

---

## 🎨 Frontend Integration for Dynamic Filters

### **React Hook for Dynamic Filtering**
```javascript
// Custom hook to manage dynamic filters
const useDynamicFilters = (entityType) => {
  const [filters, setFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    // Load filter options from API
    fetch(`/api/technical-profiles/filters?entity_type=${entityType}`)
      .then(res => res.json())
      .then(data => setFilterOptions(data.filters));
  }, [entityType]);

  const updateFilter = (questionKey, value) => {
    setFilters(prev => ({
      ...prev,
      [questionKey]: value
    }));
  };

  const clearFilter = (questionKey) => {
    setFilters(prev => {
      const updated = { ...prev };
      delete updated[questionKey];
      return updated;
    });
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  return {
    filters,
    filterOptions,
    updateFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters: Object.keys(filters).length > 0
  };
};
```

### **Dynamic Filter Components**
```javascript
// Render filters based on question type
const FilterGroup = ({ category, questions, filters, onFilterChange }) => {
  return (
    <div className="filter-group">
      <div className="filter-heading">{category}</div>
      {questions.map(question => (
        <FilterQuestion
          key={question.question_id}
          question={question}
          value={filters[question.question_key]}
          onChange={(value) => onFilterChange(question.question_key, value)}
        />
      ))}
    </div>
  );
};

const FilterQuestion = ({ question, value, onChange }) => {
  switch (question.filter_config.type) {
    case 'checkbox':
      return (
        <label className="filter-item">
          <input
            type="checkbox"
            checked={value === true}
            onChange={(e) => onChange(e.target.checked ? true : null)}
          />
          <span>
            {question.question_text}
            {question.filter_config.options?.find(opt => opt.value === true)?.count &&
              ` (${question.filter_config.options.find(opt => opt.value === true).count})`
            }
          </span>
        </label>
      );

    case 'multi_select':
      return (
        <div className="filter-multi-select">
          <label className="filter-label">{question.question_text}</label>
          {question.filter_config.options.map(option => (
            <label key={option.value} className="filter-item">
              <input
                type="checkbox"
                checked={value?.includes(option.value) || false}
                onChange={(e) => {
                  const currentValues = value || [];
                  if (e.target.checked) {
                    onChange([...currentValues, option.value]);
                  } else {
                    onChange(currentValues.filter(v => v !== option.value));
                  }
                }}
              />
              <span>{option.label} ({option.count})</span>
            </label>
          ))}
        </div>
      );

    case 'range':
      return (
        <div className="filter-range">
          <label className="filter-label">{question.question_text}</label>
          <div className="range-inputs">
            <input
              type="number"
              placeholder="Min"
              value={value?.min || ''}
              onChange={(e) => onChange({
                ...value,
                min: e.target.value ? Number(e.target.value) : undefined
              })}
            />
            <input
              type="number"
              placeholder="Max"
              value={value?.max || ''}
              onChange={(e) => onChange({
                ...value,
                max: e.target.value ? Number(e.target.value) : undefined
              })}
            />
          </div>
        </div>
      );

    default:
      return null;
  }
};
```

### **Updated Main Component**
```javascript
export default function TechnicalProfile() {
  const [activeTab, setActiveTab] = useState('tools');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Replace hardcoded filters with dynamic filters
  const {
    filters,
    filterOptions,
    updateFilter,
    clearAllFilters,
    hasActiveFilters
  } = useDynamicFilters(activeTab === 'tools' ? 'tool_configuration' : 'model_version');

  // Fetch profiles with dynamic filters
  const { data: profileData } = useFetch('/api/technical-profiles/display', {
    entity_type: activeTab === 'tools' ? 'tool_configuration' : 'model_version',
    category: selectedCategory,
    search: searchQuery,
    filters: JSON.stringify(filters)
  });

  return (
    <>
      <div className="page-tabs">
        <button
          className={`page-tab ${activeTab === 'tools' ? 'active' : ''}`}
          onClick={() => setActiveTab('tools')}
        >
          Tools
        </button>
        <button
          className={`page-tab ${activeTab === 'models' ? 'active' : ''}`}
          onClick={() => setActiveTab('models')}
        >
          Base Models
        </button>
      </div>

      <div className="layout">
        <aside className="sidebar island">
          <div className="search-island">
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={activeTab === 'tools' ?
                "Search by tool, model, or configuration name" :
                "Search by model name, developer, or version"
              }
              className="search-input"
            />
          </div>

          <div className="filter-header">
            <h3 className="sidebar-title">Search Filters</h3>
            {hasActiveFilters && (
              <button onClick={clearAllFilters} className="clear-filters-btn">
                Clear All
              </button>
            )}
          </div>

          {/* Dynamic filter groups */}
          {filterOptions.map(category => (
            <FilterGroup
              key={category.category}
              category={category.category}
              questions={category.questions}
              filters={filters}
              onFilterChange={updateFilter}
            />
          ))}

          <div className="filter-group">
            <div className="filter-heading">Category View</div>
            <select
              className="category-select"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {profileData?.categories?.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </aside>

        {/* Rest of component remains the same */}
        <main className="content">
          {/* Table rendering */}
        </main>
      </div>
    </>
  );
}
```

This dynamic approach provides:

- **Complete flexibility**: Filters are generated based on database state
- **Automatic UI updates**: New questions automatically become filterable
- **Type-aware filtering**: Different UI components for different question types
- **Performance optimization**: Counts and value distributions computed server-side
- **Easy maintenance**: No hardcoded filter logic to maintain
- **Extensible**: Easy to add new question types and filter mechanisms