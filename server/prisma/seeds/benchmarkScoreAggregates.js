const crypto = require('crypto');

// Model version data from leaderboardData.js
const leaderboardMockData = [
  // GPT-4o versions
  { modelFamily: 'GPT', model: 'GPT-4o', version: '20250915', temperature: 0.7, top_p: 0.95, max_tokens: 1000, system_prompt_id: 'default', message_prompt_id: 'standard', SIRI_2: 1.245, A_pharm: 0.92, A_mamh: 1.08 },
  { modelFamily: 'GPT', model: 'GPT-4o', version: '20250815', temperature: 0.7, top_p: 0.95, max_tokens: 1000, system_prompt_id: 'default', message_prompt_id: 'standard', SIRI_2: 1.279, A_pharm: 0.95, A_mamh: 1.12 },
  { modelFamily: 'GPT', model: 'GPT-4o', version: '20250701', temperature: 0.7, top_p: 0.95, max_tokens: 1000, system_prompt_id: 'default', message_prompt_id: 'standard', SIRI_2: 1.312, A_pharm: 0.98, A_mamh: 1.15 },
  { modelFamily: 'GPT', model: 'GPT-4o', version: '20250601', temperature: 0.3, top_p: 0.9, max_tokens: 1000, system_prompt_id: 'clinical', message_prompt_id: 'standard', SIRI_2: 1.198, A_pharm: 0.89, A_mamh: 1.03 },

  // GPT-3.5 Turbo versions
  { modelFamily: 'GPT', model: 'GPT-3.5 Turbo', version: '20250815', temperature: 0.7, top_p: 0.95, max_tokens: 1000, system_prompt_id: 'default', message_prompt_id: 'standard', SIRI_2: 1.737, A_pharm: 1.42, A_mamh: 1.58 },
  { modelFamily: 'GPT', model: 'GPT-3.5 Turbo', version: '20250701', temperature: 0.7, top_p: 0.95, max_tokens: 1000, system_prompt_id: 'default', message_prompt_id: 'standard', SIRI_2: 1.782, A_pharm: 1.45, A_mamh: 1.62 },

  // Claude Opus versions
  { modelFamily: 'Claude', model: 'Claude Opus 4.1', version: '20250901', temperature: 0.7, top_p: 0.95, max_tokens: 1000, system_prompt_id: 'default', message_prompt_id: 'standard', SIRI_2: 0.876, A_pharm: 0.79, A_mamh: 0.89 },
  { modelFamily: 'Claude', model: 'Claude Opus 4.1', version: '20250815', temperature: 0.7, top_p: 0.95, max_tokens: 1000, system_prompt_id: 'default', message_prompt_id: 'standard', SIRI_2: 0.899, A_pharm: 0.82, A_mamh: 0.94 },
  { modelFamily: 'Claude', model: 'Claude Opus 4.1', version: '20250701', temperature: 0.7, top_p: 0.95, max_tokens: 1000, system_prompt_id: 'default', message_prompt_id: 'standard', SIRI_2: 0.923, A_pharm: 0.84, A_mamh: 0.97 },
  { modelFamily: 'Claude', model: 'Claude Opus 4.1', version: '20250601', temperature: 0.3, top_p: 0.9, max_tokens: 1000, system_prompt_id: 'clinical', message_prompt_id: 'standard', SIRI_2: 0.845, A_pharm: 0.76, A_mamh: 0.85 },

  // Claude Sonnet versions
  { modelFamily: 'Claude', model: 'Claude Sonnet 4', version: '20250915', temperature: 0.7, top_p: 0.95, max_tokens: 1000, system_prompt_id: 'default', message_prompt_id: 'standard', SIRI_2: 0.865, A_pharm: 0.83, A_mamh: 0.88 },
  { modelFamily: 'Claude', model: 'Claude Sonnet 4', version: '20250815', temperature: 0.7, top_p: 0.95, max_tokens: 1000, system_prompt_id: 'default', message_prompt_id: 'standard', SIRI_2: 0.888, A_pharm: 0.85, A_mamh: 0.91 },
  { modelFamily: 'Claude', model: 'Claude Sonnet 4', version: '20250601', temperature: 0.7, top_p: 0.95, max_tokens: 1000, system_prompt_id: 'default', message_prompt_id: 'standard', SIRI_2: 0.912, A_pharm: 0.87, A_mamh: 0.93 },

  // Claude 3.5 Sonnet versions
  { modelFamily: 'Claude', model: 'Claude 3.5 Sonnet', version: '20241022', temperature: 0.7, top_p: 0.95, max_tokens: 1000, system_prompt_id: 'default', message_prompt_id: 'standard', SIRI_2: 1.075, A_pharm: 1.08, A_mamh: 1.28 },
  { modelFamily: 'Claude', model: 'Claude 3.5 Sonnet', version: '20240620', temperature: 0.7, top_p: 0.95, max_tokens: 1000, system_prompt_id: 'default', message_prompt_id: 'standard', SIRI_2: 1.123, A_pharm: 1.11, A_mamh: 1.32 },

  // Gemini versions
  { modelFamily: 'Gemini', model: 'Gemini 2.5 Pro', version: '20250915', temperature: 0.7, top_p: 0.95, max_tokens: 1000, system_prompt_id: 'default', message_prompt_id: 'standard', SIRI_2: 1.023, A_pharm: 1.19, A_mamh: 1.31 },
  { modelFamily: 'Gemini', model: 'Gemini 2.5 Pro', version: '20250815', temperature: 0.7, top_p: 0.95, max_tokens: 1000, system_prompt_id: 'default', message_prompt_id: 'standard', SIRI_2: 1.045, A_pharm: 1.23, A_mamh: 1.35 },
  { modelFamily: 'Gemini', model: 'Gemini 2.5 Pro', version: '20250701', temperature: 0.7, top_p: 0.95, max_tokens: 1000, system_prompt_id: 'default', message_prompt_id: 'standard', SIRI_2: 1.067, A_pharm: 1.26, A_mamh: 1.38 },

  // Gemini Flash versions
  { modelFamily: 'Gemini', model: 'Gemini 2.0 Flash', version: '20250815', temperature: 0.7, top_p: 0.95, max_tokens: 1000, system_prompt_id: 'default', message_prompt_id: 'standard', SIRI_2: 1.201, A_pharm: 1.18, A_mamh: 1.29 },
  { modelFamily: 'Gemini', model: 'Gemini 2.0 Flash', version: '20250701', temperature: 0.7, top_p: 0.95, max_tokens: 1000, system_prompt_id: 'default', message_prompt_id: 'standard', SIRI_2: 1.234, A_pharm: 1.21, A_mamh: 1.32 },

  // DeepSeek versions
  { modelFamily: 'DeepSeek', model: 'DeepSeek-V3', version: '20250915', temperature: 0.7, top_p: 0.95, max_tokens: 1000, system_prompt_id: 'default', message_prompt_id: 'standard', SIRI_2: 1.342, A_pharm: 1.28, A_mamh: 1.45 },
  { modelFamily: 'DeepSeek', model: 'DeepSeek-V3', version: '20250701', temperature: 0.7, top_p: 0.95, max_tokens: 1000, system_prompt_id: 'default', message_prompt_id: 'standard', SIRI_2: 1.378, A_pharm: 1.31, A_mamh: 1.48 },

  // GPT-4o Mini versions
  { modelFamily: 'GPT', model: 'GPT-4o Mini', version: '20250815', temperature: 0.7, top_p: 0.95, max_tokens: 1000, system_prompt_id: 'default', message_prompt_id: 'standard', SIRI_2: 1.455, A_pharm: 1.38, A_mamh: 1.52 },
];

function generateHyperparameterHash(config) {
  const sortedConfig = JSON.stringify(config, Object.keys(config).sort());
  return crypto.createHash('md5').update(sortedConfig).digest('hex').substring(0, 16);
}

module.exports = async function seedBenchmarkScoreAggregates(prisma, { benchmarking }) {
  const { siriScale, aPharmScale, aMamhScale, promptMap } = benchmarking;

  console.log('Starting to seed BenchmarkScoreAggregates...');

  let aggregatesCreated = 0;
  let skipped = 0;

  for (const entry of leaderboardMockData) {
    try {
      // Look up model version by family, model name, and version
      const modelVersion = await prisma.modelVersion.findFirst({
        where: {
          version: entry.version,
          model: {
            name: entry.model,
            modelFamily: {
              name: entry.modelFamily,
            },
          },
        },
        include: {
          model: {
            include: {
              modelFamily: true,
            },
          },
        },
      });

      if (!modelVersion) {
        console.warn(`Model version not found: ${entry.modelFamily} ${entry.model} ${entry.version}`);
        skipped++;
        continue;
      }

      // Build hyperparameter config
      const hyperparameterConfig = {
        temperature: entry.temperature,
        top_p: entry.top_p,
        max_tokens: entry.max_tokens,
      };
      const hyperparameterHash = generateHyperparameterHash(hyperparameterConfig);

      // Get prompt IDs
      const systemPromptId = promptMap[entry.system_prompt_id];
      const messagePromptId = promptMap[entry.message_prompt_id];

      // Create 3 score aggregates (one for each scale)
      const scales = [
        { scale: siriScale, scoreKey: 'SIRI_2' },
        { scale: aPharmScale, scoreKey: 'A_pharm' },
        { scale: aMamhScale, scoreKey: 'A_mamh' },
      ];

      for (const { scale, scoreKey } of scales) {
        const rmseScore = entry[scoreKey];

        if (rmseScore !== undefined) {
          await prisma.benchmarkScoreAggregate.create({
            data: {
              modelVersionId: modelVersion.id,
              scaleId: scale.id,
              hyperparameterHash,
              hyperparameterConfig,
              systemPromptId,
              messagePromptId,
              runCount: 5, // Mock: 5 runs per configuration
              modelMean: rmseScore,
              modelStd: rmseScore * 0.05, // Mock: 5% standard deviation
              modelMin: rmseScore * 0.95,
              modelMax: rmseScore * 1.05,
              modelMedian: rmseScore,
              expertConsensusMean: 7.5, // Mock expert consensus
              rmseVsExperts: rmseScore,
              firstRun: new Date('2025-01-01'),
              lastRun: new Date('2025-01-15'),
              experimentCount: 1,
              lastRefreshed: new Date(),
            },
          });
          aggregatesCreated++;
        }
      }
    } catch (error) {
      console.error(`Error creating aggregate for ${entry.modelFamily} ${entry.model} ${entry.version}:`, error.message);
      skipped++;
    }
  }

  console.log(`Created ${aggregatesCreated} benchmark score aggregates (${skipped} skipped)`);
};
