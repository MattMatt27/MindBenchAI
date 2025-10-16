const toolData = [
  { name: 'ChatGPT', developer: 'OpenAI' },
  { name: 'Claude', developer: 'Anthropic' },
  { name: 'Gemini', developer: 'Google' },
];

const modelFamilyData = [
  { name: 'GPT' },
  { name: 'Claude' },
  { name: 'Gemini' },
];

const modelData = [
  { name: 'GPT-4o', developer: 'OpenAI', toolName: 'ChatGPT', modelFamilyName: 'GPT' },
  { name: 'GPT-3.5 Turbo', developer: 'OpenAI', toolName: 'ChatGPT', modelFamilyName: 'GPT' },
  { name: 'GPT-4o Mini', developer: 'OpenAI', toolName: 'ChatGPT', modelFamilyName: 'GPT' },
  { name: 'GPT-5', developer: 'OpenAI', toolName: 'ChatGPT', modelFamilyName: 'GPT' },
  { name: 'Claude Opus 4.1', developer: 'Anthropic', toolName: 'Claude', modelFamilyName: 'Claude' },
  { name: 'Claude Sonnet 4', developer: 'Anthropic', toolName: 'Claude', modelFamilyName: 'Claude' },
  { name: 'Claude 3.5 Sonnet', developer: 'Anthropic', toolName: 'Claude', modelFamilyName: 'Claude' },
  { name: 'Claude 3.5 Haiku', developer: 'Anthropic', toolName: 'Claude', modelFamilyName: 'Claude' },
  { name: 'Gemini 2.5 Pro', developer: 'Google', toolName: 'Gemini', modelFamilyName: 'Gemini' },
  { name: 'Gemini 2.5 Flash', developer: 'Google', toolName: 'Gemini', modelFamilyName: 'Gemini' },
  { name: 'Gemini 2.0 Flash', developer: 'Google', toolName: 'Gemini', modelFamilyName: 'Gemini' },
];

const modelVersionData = [
  {
    modelName: 'GPT-4o',
    versions: [
      {
        version: '20250915',
        isLatest: true,
        isAvailable: true,
        releaseDate: new Date('2025-09-15'),
        deprecationDate: null,
      },
      {
        version: '20250815',
        isLatest: false,
        isAvailable: true,
        releaseDate: new Date('2025-08-15'),
        deprecationDate: null,
      },
      {
        version: '20250701',
        isLatest: false,
        isAvailable: true,
        releaseDate: new Date('2025-07-01'),
        deprecationDate: null,
      },
    ],
  },
  {
    modelName: 'Claude Sonnet 4',
    versions: [
      {
        version: '20250910',
        isLatest: true,
        isAvailable: true,
        releaseDate: new Date('2025-09-10'),
        deprecationDate: null,
      },
      {
        version: '20250810',
        isLatest: false,
        isAvailable: true,
        releaseDate: new Date('2025-08-10'),
        deprecationDate: null,
      },
      {
        version: '20250705',
        isLatest: false,
        isAvailable: true,
        releaseDate: new Date('2025-07-05'),
        deprecationDate: null,
      },
    ],
  },
  {
    modelName: 'Gemini 2.0 Flash',
    versions: [
      {
        version: '20250815',
        isLatest: true,
        isAvailable: true,
        releaseDate: new Date('2025-08-15'),
        deprecationDate: null,
      },
      {
        version: '20241215',
        isLatest: false,
        isAvailable: true,
        releaseDate: new Date('2024-12-15'),
        deprecationDate: null,
      },
      {
        version: '20240601',
        isLatest: false,
        isAvailable: true,
        releaseDate: new Date('2024-06-01'),
        deprecationDate: null,
      },
    ],
  },
  {
    modelName: 'GPT-3.5 Turbo',
    versions: [
      {
        version: '20250815',
        isLatest: true,
        isAvailable: true,
        releaseDate: new Date('2025-08-15'),
        deprecationDate: null,
      },
      {
        version: '20250701',
        isLatest: false,
        isAvailable: true,
        releaseDate: new Date('2025-07-01'),
        deprecationDate: null,
      },
    ],
  },
  {
    modelName: 'GPT-4o Mini',
    versions: [
      {
        version: '20250815',
        isLatest: true,
        isAvailable: true,
        releaseDate: new Date('2025-08-15'),
        deprecationDate: null,
      },
      {
        version: '20250701',
        isLatest: false,
        isAvailable: true,
        releaseDate: new Date('2025-07-01'),
        deprecationDate: null,
      },
    ],
  },
  {
    modelName: 'GPT-5',
    versions: [
      {
        version: '2025-08-07',
        isLatest: true,
        isAvailable: true,
        releaseDate: new Date('2025-08-07'),
        deprecationDate: null,
      },
    ],
  },
  {
    modelName: 'Claude Opus 4.1',
    versions: [
      {
        version: '20250901',
        isLatest: true,
        isAvailable: true,
        releaseDate: new Date('2025-09-01'),
        deprecationDate: null,
      },
      {
        version: '20250815',
        isLatest: false,
        isAvailable: true,
        releaseDate: new Date('2025-08-15'),
        deprecationDate: null,
      },
      {
        version: '20250701',
        isLatest: false,
        isAvailable: true,
        releaseDate: new Date('2025-07-01'),
        deprecationDate: null,
      },
    ],
  },
  {
    modelName: 'Claude 3.5 Sonnet',
    versions: [
      {
        version: '20241022',
        isLatest: true,
        isAvailable: true,
        releaseDate: new Date('2024-10-22'),
        deprecationDate: null,
      },
      {
        version: '20240620',
        isLatest: false,
        isAvailable: true,
        releaseDate: new Date('2024-06-20'),
        deprecationDate: null,
      },
    ],
  },
  {
    modelName: 'Claude 3.5 Haiku',
    versions: [
      {
        version: '20241022',
        isLatest: true,
        isAvailable: true,
        releaseDate: new Date('2024-10-22'),
        deprecationDate: null,
      },
      {
        version: '20240701',
        isLatest: false,
        isAvailable: true,
        releaseDate: new Date('2024-07-01'),
        deprecationDate: null,
      },
    ],
  },
  {
    modelName: 'Gemini 2.5 Pro',
    versions: [
      {
        version: '20250915',
        isLatest: true,
        isAvailable: true,
        releaseDate: new Date('2025-09-15'),
        deprecationDate: null,
      },
      {
        version: '20250815',
        isLatest: false,
        isAvailable: true,
        releaseDate: new Date('2025-08-15'),
        deprecationDate: null,
      },
      {
        version: '20250701',
        isLatest: false,
        isAvailable: true,
        releaseDate: new Date('2025-07-01'),
        deprecationDate: null,
      },
    ],
  },
  {
    modelName: 'Gemini 2.5 Flash',
    versions: [
      {
        version: '20250815',
        isLatest: true,
        isAvailable: true,
        releaseDate: new Date('2025-08-15'),
        deprecationDate: null,
      },
      {
        version: '20250701',
        isLatest: false,
        isAvailable: true,
        releaseDate: new Date('2025-07-01'),
        deprecationDate: null,
      },
    ],
  },
];

module.exports = async function seedModels(prisma) {
  const modelFamilies = {};
  for (const family of modelFamilyData) {
    const record = await prisma.modelFamily.upsert({
      where: { name: family.name },
      update: {},
      create: {
        name: family.name,
      },
    });
    modelFamilies[family.name] = record;
  }

  const tools = {};
  for (const tool of toolData) {
    const record = await prisma.tool.upsert({
      where: { name: tool.name },
      update: { developer: tool.developer ?? null },
      create: {
        name: tool.name,
        developer: tool.developer ?? null,
      },
    });
    tools[tool.name] = record;
  }

  const models = {};
  for (const model of modelData) {
    const family = modelFamilies[model.modelFamilyName];
    if (!family) {
      console.warn(`Skipping model ${model.name} because family ${model.modelFamilyName} was not found.`);
      continue;
    }

    const record = await prisma.model.upsert({
      where: { name: model.name },
      update: {
        developer: model.developer ?? null,
        modelFamilyId: family.id,
      },
      create: {
        name: model.name,
        developer: model.developer ?? null,
        modelFamilyId: family.id,
      },
    });
    models[model.name] = record;
  }

  const modelVersions = {};
  for (const definition of modelVersionData) {
    const parent = models[definition.modelName];
    if (!parent) continue;

    for (const versionDef of definition.versions) {
      const record = await prisma.modelVersion.upsert({
        where: {
          modelId_version: {
            modelId: parent.id,
            version: versionDef.version,
          },
        },
        update: {
          isLatest: versionDef.isLatest ?? false,
          isAvailable: versionDef.isAvailable ?? true,
          releaseDate: versionDef.releaseDate ?? null,
          deprecationDate: versionDef.deprecationDate ?? null,
        },
        create: {
          modelId: parent.id,
          version: versionDef.version,
          isLatest: versionDef.isLatest ?? false,
          isAvailable: versionDef.isAvailable ?? true,
          releaseDate: versionDef.releaseDate ?? null,
          deprecationDate: versionDef.deprecationDate ?? null,
        },
      });

      if (!modelVersions[parent.id]) {
        modelVersions[parent.id] = {};
      }
      modelVersions[parent.id][versionDef.version] = record;
    }
  }

  const toolConfigurations = {};
  for (const model of modelData) {
    const tool = tools[model.toolName];
    const parentModel = models[model.name];
    const configName = `${model.toolName} ${model.name}`;
    const record = await prisma.toolConfiguration.upsert({
      where: {
        toolId_modelId: {
          toolId: tool.id,
          modelId: parentModel.id,
        },
      },
      update: {
        configurationName: configName,
        isActive: true,
      },
      create: {
        toolId: tool.id,
        modelId: parentModel.id,
        configurationName: configName,
        isActive: true,
      },
    });
    if (!toolConfigurations[parentModel.id]) {
      toolConfigurations[parentModel.id] = {};
    }
    toolConfigurations[parentModel.id][configName] = record;
  }

  return {
    modelFamilies,
    tools,
    models,
    modelVersions,
    toolConfigurations,
  };
};
