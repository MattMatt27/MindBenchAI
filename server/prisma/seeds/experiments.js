module.exports = async function seedExperiments(
  prisma,
  { researcherUser, professionalUser, benchmarking, models }
) {
  const { aPharmScale, aMamhScale } = benchmarking;
  const { gptModelVersions, claudeModelVersions } = models;

  await prisma.benchmarkExperiment.create({
    data: {
      userId: researcherUser.id,
      scaleId: aPharmScale.id,
      name: 'LLM Psychopharmacology Assessment',
      description: 'Evaluating LLM performance on adversarial psychopharmacology case studies',
      entityType: 'MODEL_VERSION',
      entityIds: ['gpt-4o-20240915', 'claude-opus-20240901'],
      config: {
        temperature: 0.3,
        maxTokens: 1000,
        systemPrompt: 'clinical-psychiatrist-expert',
      },
      status: 'approved',
      reviewedBy: researcherUser.id,
      reviewedAt: new Date('2024-09-20'),
      reviewNotes: 'Comprehensive evaluation of psychiatric medication reasoning capabilities',
      isPublic: true,
      completedAt: new Date('2024-09-22'),
      progress: 100,
    },
  });

  await prisma.benchmarkExperiment.create({
    data: {
      userId: professionalUser.id,
      scaleId: aMamhScale.id,
      name: 'Maternal Mental Health Reasoning',
      description: 'Testing AI performance on complex perinatal psychiatry scenarios',
      entityType: 'MODEL_VERSION',
      entityIds: ['claude-sonnet-20240620'],
      config: {
        temperature: 0.5,
        maxTokens: 1200,
      },
      status: 'pending',
      isPublic: false,
      completedAt: new Date('2024-09-25'),
      progress: 100,
    },
  });

  console.log('Created sample experiments with approval workflow');

  return {
    gptModelVersion: gptModelVersions[0],
    claudeModelVersion: claudeModelVersions[0],
  };
};
