module.exports = async function seedHyperparameters(
  prisma,
  { researcherUser, gptModelVersion, claudeModelVersion }
) {
  const temperatureParam = await prisma.hyperparameter.upsert({
    where: { name: 'temperature' },
    update: {},
    create: {
      name: 'temperature',
      displayName: 'Temperature',
      parameterType: 'float',
      description:
        'Controls randomness in responses. Higher values make output more creative and unpredictable.',
      isActive: true,
      createdBy: researcherUser.id,
    },
  });

  const topPParam = await prisma.hyperparameter.upsert({
    where: { name: 'top_p' },
    update: {},
    create: {
      name: 'top_p',
      displayName: 'Top P (Nucleus Sampling)',
      parameterType: 'float',
      description:
        'Controls diversity via nucleus sampling. Lower values focus on more probable tokens.',
      isActive: true,
      createdBy: researcherUser.id,
    },
  });

  const maxTokensParam = await prisma.hyperparameter.upsert({
    where: { name: 'max_tokens' },
    update: {},
    create: {
      name: 'max_tokens',
      displayName: 'Maximum Tokens',
      parameterType: 'int',
      description: 'Maximum number of tokens to generate in the response.',
      isActive: true,
      createdBy: researcherUser.id,
    },
  });

  await prisma.hyperparameter.upsert({
    where: { name: 'frequency_penalty' },
    update: {},
    create: {
      name: 'frequency_penalty',
      displayName: 'Frequency Penalty',
      parameterType: 'float',
      description:
        'Penalizes repeated tokens based on their frequency in the text so far.',
      isActive: true,
      createdBy: researcherUser.id,
    },
  });

  console.log('Created sample hyperparameters');

  await prisma.modelHyperparameterLink.upsert({
    where: {
      modelVersionId_hyperparameterId: {
        modelVersionId: gptModelVersion.id,
        hyperparameterId: temperatureParam.id,
      },
    },
    update: {
      isConfigurable: true,
      isRequired: false,
      minValue: 0.0,
      maxValue: 2.0,
      stepValue: 0.1,
      defaultValue: 0.7,
      uiComponent: 'slider',
      uiOrder: 1,
      helpText: 'Recommended: 0.7 for balanced creativity',
    },
    create: {
      modelVersionId: gptModelVersion.id,
      hyperparameterId: temperatureParam.id,
      isConfigurable: true,
      isRequired: false,
      minValue: 0.0,
      maxValue: 2.0,
      stepValue: 0.1,
      defaultValue: 0.7,
      uiComponent: 'slider',
      uiOrder: 1,
      helpText: 'Recommended: 0.7 for balanced creativity',
      createdBy: researcherUser.id,
    },
  });

  await prisma.modelHyperparameterLink.upsert({
    where: {
      modelVersionId_hyperparameterId: {
        modelVersionId: gptModelVersion.id,
        hyperparameterId: topPParam.id,
      },
    },
    update: {
      isConfigurable: true,
      isRequired: false,
      minValue: 0.1,
      maxValue: 1.0,
      stepValue: 0.1,
      defaultValue: 1.0,
      uiComponent: 'slider',
      uiOrder: 2,
      helpText: 'Lower values increase focus',
    },
    create: {
      modelVersionId: gptModelVersion.id,
      hyperparameterId: topPParam.id,
      isConfigurable: true,
      isRequired: false,
      minValue: 0.1,
      maxValue: 1.0,
      stepValue: 0.1,
      defaultValue: 1.0,
      uiComponent: 'slider',
      uiOrder: 2,
      helpText: 'Lower values increase focus',
      createdBy: researcherUser.id,
    },
  });

  await prisma.modelHyperparameterLink.upsert({
    where: {
      modelVersionId_hyperparameterId: {
        modelVersionId: gptModelVersion.id,
        hyperparameterId: maxTokensParam.id,
      },
    },
    update: {
      isConfigurable: true,
      isRequired: true,
      minValue: 1,
      maxValue: 4096,
      stepValue: 1,
      defaultValue: 1000,
      uiComponent: 'input',
      uiOrder: 3,
      helpText: 'Must be between 1 and 4096',
    },
    create: {
      modelVersionId: gptModelVersion.id,
      hyperparameterId: maxTokensParam.id,
      isConfigurable: true,
      isRequired: true,
      minValue: 1,
      maxValue: 4096,
      stepValue: 1,
      defaultValue: 1000,
      uiComponent: 'input',
      uiOrder: 3,
      helpText: 'Must be between 1 and 4096',
      createdBy: researcherUser.id,
    },
  });

  await prisma.modelHyperparameterLink.upsert({
    where: {
      modelVersionId_hyperparameterId: {
        modelVersionId: claudeModelVersion.id,
        hyperparameterId: temperatureParam.id,
      },
    },
    update: {
      isConfigurable: false,
      isRequired: false,
      lockedValue: 1.0,
      lockedAt: new Date('2024-09-01'),
      lockedReason: 'Anthropic locked temperature parameter for this model version',
      uiComponent: 'readonly',
      uiOrder: 1,
      helpText: 'Temperature is fixed at 1.0 for this model',
    },
    create: {
      modelVersionId: claudeModelVersion.id,
      hyperparameterId: temperatureParam.id,
      isConfigurable: false,
      isRequired: false,
      lockedValue: 1.0,
      lockedAt: new Date('2024-09-01'),
      lockedReason: 'Anthropic locked temperature parameter for this model version',
      uiComponent: 'readonly',
      uiOrder: 1,
      helpText: 'Temperature is fixed at 1.0 for this model',
      createdBy: researcherUser.id,
    },
  });

  console.log('Created model hyperparameter links demonstrating configurable and locked parameters');
};
