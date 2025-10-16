const IRI_PROFILES = [
  // GPT-4o versions
  {
    modelFamily: 'GPT',
    modelName: 'GPT-4o',
    version: '20250915',
    perspectiveTaking: 22,
    fantasy: 18,
    empathaticConcern: 24,
    personalDistress: 12,
  },
  {
    modelFamily: 'GPT',
    modelName: 'GPT-4o',
    version: '20250815',
    perspectiveTaking: 21,
    fantasy: 17,
    empathaticConcern: 23,
    personalDistress: 13,
  },
  {
    modelFamily: 'GPT',
    modelName: 'GPT-4o',
    version: '20250701',
    perspectiveTaking: 20,
    fantasy: 16,
    empathaticConcern: 22,
    personalDistress: 14,
  },

  // GPT-3.5 Turbo versions
  {
    modelFamily: 'GPT',
    modelName: 'GPT-3.5 Turbo',
    version: '20250815',
    perspectiveTaking: 18,
    fantasy: 15,
    empathaticConcern: 19,
    personalDistress: 16,
  },
  {
    modelFamily: 'GPT',
    modelName: 'GPT-3.5 Turbo',
    version: '20250701',
    perspectiveTaking: 17,
    fantasy: 14,
    empathaticConcern: 18,
    personalDistress: 17,
  },

  // GPT-4o Mini versions
  {
    modelFamily: 'GPT',
    modelName: 'GPT-4o Mini',
    version: '20250815',
    perspectiveTaking: 19,
    fantasy: 16,
    empathaticConcern: 20,
    personalDistress: 15,
  },
  {
    modelFamily: 'GPT',
    modelName: 'GPT-4o Mini',
    version: '20250701',
    perspectiveTaking: 18,
    fantasy: 15,
    empathaticConcern: 19,
    personalDistress: 16,
  },

  // GPT-5
  {
    modelFamily: 'GPT',
    modelName: 'GPT-5',
    version: '2025-08-07',
    perspectiveTaking: 23,
    fantasy: 19,
    empathaticConcern: 25,
    personalDistress: 11,
  },

  // Claude Opus 4.1 versions
  {
    modelFamily: 'Claude',
    modelName: 'Claude Opus 4.1',
    version: '20250901',
    perspectiveTaking: 25,
    fantasy: 14,
    empathaticConcern: 26,
    personalDistress: 9,
  },
  {
    modelFamily: 'Claude',
    modelName: 'Claude Opus 4.1',
    version: '20250815',
    perspectiveTaking: 24,
    fantasy: 13,
    empathaticConcern: 25,
    personalDistress: 10,
  },
  {
    modelFamily: 'Claude',
    modelName: 'Claude Opus 4.1',
    version: '20250701',
    perspectiveTaking: 23,
    fantasy: 12,
    empathaticConcern: 24,
    personalDistress: 11,
  },

  // Claude Sonnet 4 versions
  {
    modelFamily: 'Claude',
    modelName: 'Claude Sonnet 4',
    version: '20250910',
    perspectiveTaking: 24,
    fantasy: 15,
    empathaticConcern: 25,
    personalDistress: 10,
  },
  {
    modelFamily: 'Claude',
    modelName: 'Claude Sonnet 4',
    version: '20250810',
    perspectiveTaking: 23,
    fantasy: 14,
    empathaticConcern: 24,
    personalDistress: 11,
  },
  {
    modelFamily: 'Claude',
    modelName: 'Claude Sonnet 4',
    version: '20250705',
    perspectiveTaking: 22,
    fantasy: 13,
    empathaticConcern: 23,
    personalDistress: 12,
  },

  // Claude 3.5 Sonnet versions
  {
    modelFamily: 'Claude',
    modelName: 'Claude 3.5 Sonnet',
    version: '20241022',
    perspectiveTaking: 21,
    fantasy: 12,
    empathaticConcern: 22,
    personalDistress: 13,
  },
  {
    modelFamily: 'Claude',
    modelName: 'Claude 3.5 Sonnet',
    version: '20240620',
    perspectiveTaking: 20,
    fantasy: 11,
    empathaticConcern: 21,
    personalDistress: 14,
  },

  // Claude 3.5 Haiku versions
  {
    modelFamily: 'Claude',
    modelName: 'Claude 3.5 Haiku',
    version: '20241022',
    perspectiveTaking: 19,
    fantasy: 11,
    empathaticConcern: 20,
    personalDistress: 14,
  },
  {
    modelFamily: 'Claude',
    modelName: 'Claude 3.5 Haiku',
    version: '20240701',
    perspectiveTaking: 18,
    fantasy: 10,
    empathaticConcern: 19,
    personalDistress: 15,
  },

  // Gemini 2.5 Pro versions
  {
    modelFamily: 'Gemini',
    modelName: 'Gemini 2.5 Pro',
    version: '20250915',
    perspectiveTaking: 20,
    fantasy: 17,
    empathaticConcern: 21,
    personalDistress: 13,
  },
  {
    modelFamily: 'Gemini',
    modelName: 'Gemini 2.5 Pro',
    version: '20250815',
    perspectiveTaking: 19,
    fantasy: 16,
    empathaticConcern: 20,
    personalDistress: 14,
  },
  {
    modelFamily: 'Gemini',
    modelName: 'Gemini 2.5 Pro',
    version: '20250701',
    perspectiveTaking: 18,
    fantasy: 15,
    empathaticConcern: 19,
    personalDistress: 15,
  },

  // Gemini 2.5 Flash versions
  {
    modelFamily: 'Gemini',
    modelName: 'Gemini 2.5 Flash',
    version: '20250815',
    perspectiveTaking: 19,
    fantasy: 16,
    empathaticConcern: 20,
    personalDistress: 14,
  },
  {
    modelFamily: 'Gemini',
    modelName: 'Gemini 2.5 Flash',
    version: '20250701',
    perspectiveTaking: 18,
    fantasy: 15,
    empathaticConcern: 19,
    personalDistress: 15,
  },

  // Gemini 2.0 Flash versions
  {
    modelFamily: 'Gemini',
    modelName: 'Gemini 2.0 Flash',
    version: '20250815',
    perspectiveTaking: 17,
    fantasy: 19,
    empathaticConcern: 18,
    personalDistress: 16,
  },
  {
    modelFamily: 'Gemini',
    modelName: 'Gemini 2.0 Flash',
    version: '20241215',
    perspectiveTaking: 16,
    fantasy: 18,
    empathaticConcern: 17,
    personalDistress: 17,
  },
  {
    modelFamily: 'Gemini',
    modelName: 'Gemini 2.0 Flash',
    version: '20240601',
    perspectiveTaking: 15,
    fantasy: 17,
    empathaticConcern: 16,
    personalDistress: 18,
  },
];

module.exports = async function seedIRI(prisma, options = {}) {
  const { models = {}, modelVersions = {} } = options;

  for (const profile of IRI_PROFILES) {
    const modelRecord = models[profile.modelName];
    if (!modelRecord) {
      console.warn(
        `Skipping IRI profile for ${profile.modelName} – model not found during seeding.`,
      );
      continue;
    }

    const versionsForModel = modelVersions[modelRecord.id] ?? {};
    const versionRecord = versionsForModel[profile.version];
    if (!versionRecord) {
      console.warn(
        `Skipping IRI profile for ${profile.modelName} (${profile.version}) – model version not found during seeding.`,
      );
      continue;
    }

    await prisma.iRIProfile.upsert({
      where: { modelVersionId: versionRecord.id },
      update: {
        modelFamily: profile.modelFamily ?? null,
        perspectiveTaking: profile.perspectiveTaking,
        fantasy: profile.fantasy,
        empathaticConcern: profile.empathaticConcern,
        personalDistress: profile.personalDistress,
      },
      create: {
        modelVersionId: versionRecord.id,
        modelFamily: profile.modelFamily ?? null,
        perspectiveTaking: profile.perspectiveTaking,
        fantasy: profile.fantasy,
        empathaticConcern: profile.empathaticConcern,
        personalDistress: profile.personalDistress,
      },
    });

    console.log(
      `Seeded IRI profile for ${profile.modelName} (${profile.version}).`,
    );
  }
};
