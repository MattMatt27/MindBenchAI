const BIG_FIVE_PROFILES = [
  {
    modelFamily: 'GPT',
    modelName: 'GPT-4o',
    version: '20250915',
    openness: 44,
    conscientiousness: 45,
    extraversion: 33,
    agreeableness: 47,
    neuroticism: 18,
  },
  {
    modelFamily: 'GPT',
    modelName: 'GPT-4o',
    version: '20250815',
    openness: 44,
    conscientiousness: 18,
    extraversion: 47,
    agreeableness: 33,
    neuroticism: 45,
  },
  {
    modelFamily: 'GPT',
    modelName: 'GPT-4o',
    version: '20250701',
    openness: 42,
    conscientiousness: 20,
    extraversion: 45,
    agreeableness: 35,
    neuroticism: 43,
  },
  {
    modelFamily: 'GPT',
    modelName: 'GPT-5',
    version: '2025-08-07',
    openness: 38,
    conscientiousness: 30,
    extraversion: 40,
    agreeableness: 35,
    neuroticism: 25,
  },
  {
    modelFamily: 'Claude 3',
    modelName: 'Sonnet 3.7',
    version: '20250910',
    openness: 32,
    conscientiousness: 43,
    extraversion: 23,
    agreeableness: 15,
    neuroticism: 27,
  },
  {
    modelFamily: 'Claude 3',
    modelName: 'Sonnet 3.7',
    version: '20250810',
    openness: 30,
    conscientiousness: 41,
    extraversion: 22,
    agreeableness: 17,
    neuroticism: 26,
  },
  {
    modelFamily: 'Claude 3',
    modelName: 'Sonnet 3.7',
    version: '20250705',
    openness: 29,
    conscientiousness: 39,
    extraversion: 21,
    agreeableness: 18,
    neuroticism: 25,
  },
  {
    modelFamily: 'Gemini',
    modelName: 'Gemini 2.0 Flash',
    version: '20250815',
    openness: 34,
    conscientiousness: 13,
    extraversion: 45,
    agreeableness: 23,
    neuroticism: 36,
  },
  {
    modelFamily: 'Gemini',
    modelName: 'Gemini 2.0 Flash',
    version: '20241215',
    openness: 32,
    conscientiousness: 15,
    extraversion: 42,
    agreeableness: 25,
    neuroticism: 34,
  },
  {
    modelFamily: 'Gemini',
    modelName: 'Gemini 2.0 Flash',
    version: '20240601',
    openness: 30,
    conscientiousness: 17,
    extraversion: 40,
    agreeableness: 26,
    neuroticism: 33,
  },
];

module.exports = async function seedBigFive(prisma, options = {}) {
  const { models = {}, modelVersions = {} } = options;

  for (const profile of BIG_FIVE_PROFILES) {
    const modelRecord = models[profile.modelName];
    if (!modelRecord) {
      console.warn(
        `Skipping Big Five profile for ${profile.modelName} – model not found during seeding.`,
      );
      continue;
    }

    const versionsForModel = modelVersions[modelRecord.id] ?? {};
    const versionRecord = versionsForModel[profile.version];
    if (!versionRecord) {
      console.warn(
        `Skipping Big Five profile for ${profile.modelName} (${profile.version}) – model version not found during seeding.`,
      );
      continue;
    }

    await prisma.bigFiveProfile.upsert({
      where: { modelVersionId: versionRecord.id },
      update: {
        modelFamily: profile.modelFamily ?? null,
        openness: profile.openness,
        conscientiousness: profile.conscientiousness,
        extraversion: profile.extraversion,
        agreeableness: profile.agreeableness,
        neuroticism: profile.neuroticism,
      },
      create: {
        modelVersionId: versionRecord.id,
        modelFamily: profile.modelFamily ?? null,
        openness: profile.openness,
        conscientiousness: profile.conscientiousness,
        extraversion: profile.extraversion,
        agreeableness: profile.agreeableness,
        neuroticism: profile.neuroticism,
      },
    });

    console.log(
      `Seeded Big Five profile for ${profile.modelName} (${profile.version}).`,
    );
  }
};
