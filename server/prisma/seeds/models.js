module.exports = async function seedModels(prisma) {
  const chatGptTool = await prisma.tool.upsert({
    where: { name: 'ChatGPT' },
    update: {},
    create: {
      name: 'ChatGPT',
      developer: 'OpenAI',
    },
  });

  const claudeTool = await prisma.tool.upsert({
    where: { name: 'Claude' },
    update: {},
    create: {
      name: 'Claude',
      developer: 'Anthropic',
    },
  });

  const gptModel = await prisma.model.upsert({
    where: { name: 'GPT-4o' },
    update: {},
    create: {
      name: 'GPT-4o',
      developer: 'OpenAI',
    },
  });

  const claudeModel = await prisma.model.upsert({
    where: { name: 'Sonnet 3.7' },
    update: {},
    create: {
      name: 'Sonnet 3.7',
      developer: 'Anthropic',
    },
  });

  const gptModelVersion = await prisma.modelVersion.upsert({
    where: {
      modelId_version: {
        modelId: gptModel.id,
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
      modelId: gptModel.id,
      version: 'latest',
      isLatest: true,
      isAvailable: true,
    },
  });

  const claudeModelVersion = await prisma.modelVersion.upsert({
    where: {
      modelId_version: {
        modelId: claudeModel.id,
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
      modelId: claudeModel.id,
      version: 'latest',
      isLatest: true,
      isAvailable: true,
    },
  });

  const chatGptToolConfiguration = await prisma.toolConfiguration.upsert({
    where: {
      toolId_modelId: {
        toolId: chatGptTool.id,
        modelId: gptModel.id,
      },
    },
    update: {
      isActive: true,
      configurationSettings: null,
    },
    create: {
      toolId: chatGptTool.id,
      modelId: gptModel.id,
      configurationName: 'ChatGPT-4o',
      isActive: true,
      configurationSettings: null,
    },
  });

  const claudeToolConfiguration = await prisma.toolConfiguration.upsert({
    where: {
      toolId_modelId: {
        toolId: claudeTool.id,
        modelId: claudeModel.id,
      },
    },
    update: {
      isActive: true,
      configurationSettings: null,
    },
    create: {
      toolId: claudeTool.id,
      modelId: claudeModel.id,
      configurationName: 'Claude Sonnet 3.7',
      isActive: true,
      configurationSettings: null,
    },
  });

  return {
    chatGptTool,
    claudeTool,
    gptModel,
    gptModelVersion,
    claudeModel,
    claudeModelVersion,
    chatGptToolConfiguration,
    claudeToolConfiguration,
  };
};
