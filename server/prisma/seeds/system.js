module.exports = async function seedSystem(prisma, { researcherUser }) {
  const systemConfigs = [
    {
      key: 'expert_rating_minimum',
      value: { value: 10 },
      description: 'Minimum expert ratings needed for consensus calculation',
      configType: 'leaderboard',
    },
    {
      key: 'model_run_minimum',
      value: { value: 10 },
      description: 'Minimum model runs needed for leaderboard display',
      configType: 'leaderboard',
    },
    {
      key: 'cache_ttl_leaderboard',
      value: { value: 21600 },
      description: 'Leaderboard cache TTL in seconds (6 hours)',
      configType: 'performance',
    },
    {
      key: 'default_hyperparameters',
      value: {
        temperature: 0.7,
        max_tokens: 2000,
        top_p: 1.0,
      },
      description: 'Default hyperparameters for model comparisons',
      configType: 'model_params',
    },
  ];

  for (const config of systemConfigs) {
    await prisma.systemConfig.create({
      data: {
        ...config,
        createdBy: researcherUser.id,
      },
    });
  }

  console.log('Created system configuration entries');
};
