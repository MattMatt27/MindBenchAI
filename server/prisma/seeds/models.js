const toolData = [
  { name: 'ChatGPT', developer: 'OpenAI' },
  { name: 'Claude', developer: 'Anthropic' },
  { name: 'Gemini', developer: 'Google' },
];

const modelData = [
  { name: 'GPT-4o', developer: 'OpenAI', toolName: 'ChatGPT' },
  { name: 'Sonnet 3.7', developer: 'Anthropic', toolName: 'Claude' },
  { name: 'Gemini 2.0 Flash', developer: 'Google', toolName: 'Gemini' },
];

module.exports = async function seedModels(prisma) {
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
    const record = await prisma.model.upsert({
      where: { name: model.name },
      update: {
        developer: model.developer ?? null,
      },
      create: {
        name: model.name,
        developer: model.developer ?? null,
      },
    });
    models[model.name] = record;
  }

  const modelVersions = {};
  for (const model of modelData) {
    const parent = models[model.name];
    const record = await prisma.modelVersion.upsert({
      where: {
        modelId_version: {
          modelId: parent.id,
          version: 'latest',
        },
      },
      update: {
        isLatest: true,
        isAvailable: true,
        releaseDate: null,
        deprecationDate: null,
      },
      create: {
        modelId: parent.id,
        version: 'latest',
        isLatest: true,
        isAvailable: true,
      },
    });
    modelVersions[parent.id] = record;
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
    toolConfigurations[parentModel.id] = record;
  }

  return {
    tools,
    models,
    modelVersions,
    toolConfigurations,
  };
};
