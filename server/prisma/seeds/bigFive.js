const BIG_FIVE_PROFILES = [
  // GPT-4o versions
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

  // GPT-3.5 Turbo versions
  {
    modelFamily: 'GPT',
    modelName: 'GPT-3.5 Turbo',
    version: '20250815',
    openness: 40,
    conscientiousness: 30,
    extraversion: 40,
    agreeableness: 35,
    neuroticism: 25,
  },
  {
    modelFamily: 'GPT',
    modelName: 'GPT-3.5 Turbo',
    version: '20250701',
    openness: 38,
    conscientiousness: 28,
    extraversion: 38,
    agreeableness: 33,
    neuroticism: 27,
  },

  // GPT-4o Mini versions
  {
    modelFamily: 'GPT',
    modelName: 'GPT-4o Mini',
    version: '20250815',
    openness: 35,
    conscientiousness: 32,
    extraversion: 35,
    agreeableness: 38,
    neuroticism: 28,
  },
  {
    modelFamily: 'GPT',
    modelName: 'GPT-4o Mini',
    version: '20250701',
    openness: 33,
    conscientiousness: 30,
    extraversion: 33,
    agreeableness: 36,
    neuroticism: 30,
  },

  // GPT-5
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

  // Claude Opus 4.1 versions
  {
    modelFamily: 'Claude',
    modelName: 'Claude Opus 4.1',
    version: '20250901',
    openness: 25,
    conscientiousness: 40,
    extraversion: 25,
    agreeableness: 35,
    neuroticism: 12,
  },
  {
    modelFamily: 'Claude',
    modelName: 'Claude Opus 4.1',
    version: '20250815',
    openness: 23,
    conscientiousness: 38,
    extraversion: 23,
    agreeableness: 33,
    neuroticism: 14,
  },
  {
    modelFamily: 'Claude',
    modelName: 'Claude Opus 4.1',
    version: '20250701',
    openness: 21,
    conscientiousness: 36,
    extraversion: 21,
    agreeableness: 31,
    neuroticism: 16,
  },

  // Claude Sonnet 4 versions
  {
    modelFamily: 'Claude',
    modelName: 'Claude Sonnet 4',
    version: '20250910',
    openness: 32,
    conscientiousness: 43,
    extraversion: 23,
    agreeableness: 15,
    neuroticism: 27,
  },
  {
    modelFamily: 'Claude',
    modelName: 'Claude Sonnet 4',
    version: '20250810',
    openness: 30,
    conscientiousness: 41,
    extraversion: 22,
    agreeableness: 17,
    neuroticism: 26,
  },
  {
    modelFamily: 'Claude',
    modelName: 'Claude Sonnet 4',
    version: '20250705',
    openness: 29,
    conscientiousness: 39,
    extraversion: 21,
    agreeableness: 18,
    neuroticism: 25,
  },

  // Claude 3.5 Sonnet versions
  {
    modelFamily: 'Claude',
    modelName: 'Claude 3.5 Sonnet',
    version: '20241022',
    openness: 20,
    conscientiousness: 30,
    extraversion: 20,
    agreeableness: 26,
    neuroticism: 18,
  },
  {
    modelFamily: 'Claude',
    modelName: 'Claude 3.5 Sonnet',
    version: '20240620',
    openness: 18,
    conscientiousness: 28,
    extraversion: 18,
    agreeableness: 24,
    neuroticism: 20,
  },

  // Claude 3.5 Haiku versions
  {
    modelFamily: 'Claude',
    modelName: 'Claude 3.5 Haiku',
    version: '20241022',
    openness: 18,
    conscientiousness: 26,
    extraversion: 18,
    agreeableness: 24,
    neuroticism: 20,
  },
  {
    modelFamily: 'Claude',
    modelName: 'Claude 3.5 Haiku',
    version: '20240701',
    openness: 16,
    conscientiousness: 24,
    extraversion: 16,
    agreeableness: 22,
    neuroticism: 22,
  },

  // Gemini 2.5 Pro versions
  {
    modelFamily: 'Gemini',
    modelName: 'Gemini 2.5 Pro',
    version: '20250915',
    openness: 29,
    conscientiousness: 33,
    extraversion: 29,
    agreeableness: 31,
    neuroticism: 22,
  },
  {
    modelFamily: 'Gemini',
    modelName: 'Gemini 2.5 Pro',
    version: '20250815',
    openness: 27,
    conscientiousness: 31,
    extraversion: 27,
    agreeableness: 29,
    neuroticism: 24,
  },
  {
    modelFamily: 'Gemini',
    modelName: 'Gemini 2.5 Pro',
    version: '20250701',
    openness: 25,
    conscientiousness: 29,
    extraversion: 25,
    agreeableness: 27,
    neuroticism: 26,
  },

  // Gemini 2.5 Flash versions
  {
    modelFamily: 'Gemini',
    modelName: 'Gemini 2.5 Flash',
    version: '20250815',
    openness: 27,
    conscientiousness: 31,
    extraversion: 27,
    agreeableness: 29,
    neuroticism: 24,
  },
  {
    modelFamily: 'Gemini',
    modelName: 'Gemini 2.5 Flash',
    version: '20250701',
    openness: 25,
    conscientiousness: 29,
    extraversion: 25,
    agreeableness: 27,
    neuroticism: 26,
  },

  // Gemini 2.0 Flash versions
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
