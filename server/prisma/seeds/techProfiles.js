const { EntityType, QuestionType } = require('../generated/prisma');

module.exports = async function seedTechProfiles(prisma, options = {}) {
  const { researcherUser, toolConfigurations = [] } = options;
  if (!toolConfigurations.length) {
    console.warn('Skipping tech profile seed: no tool configurations provided.');
    return;
  }

  const question = await prisma.techProfileQuestion.upsert({
    where: {
      entityType_questionKey: {
        entityType: EntityType.TOOL_CONFIGURATION,
        questionKey: 'android_support',
      },
    },
    update: {
      questionText: 'Supports Android platform?',
      category: 'Platform',
      questionType: QuestionType.BOOLEAN,
      displayOrder: 1,
      isActive: true,
      isDisplayed: true,
    },
    create: {
      entityType: EntityType.TOOL_CONFIGURATION,
      questionKey: 'android_support',
      questionText: 'Supports Android platform?',
      category: 'Platform',
      questionType: QuestionType.BOOLEAN,
      displayOrder: 1,
      isActive: true,
      isDisplayed: true,
    },
  });

  for (const config of toolConfigurations) {
    if (!config) continue;

    let evaluationEntity = await prisma.evaluationEntity.findFirst({
      where: { toolConfigurationId: config.id },
    });

    if (!evaluationEntity) {
      evaluationEntity = await prisma.evaluationEntity.create({
        data: {
          entityType: EntityType.TOOL_CONFIGURATION,
          toolConfigurationId: config.id,
        },
      });
    }

    const existingAnswer = await prisma.techProfileAnswer.findFirst({
      where: {
        entityId: config.id,
        questionId: question.id,
      },
    });

    if (existingAnswer) {
      await prisma.techProfileAnswer.update({
        where: { id: existingAnswer.id },
        data: {
          answer: { value: true, type: 'BOOLEAN' },
          notes: null,
          isApproved: true,
          reviewerId: researcherUser?.id ?? null,
        },
      });
    } else {
      await prisma.techProfileAnswer.create({
        data: {
          entityType: EntityType.TOOL_CONFIGURATION,
          entityId: config.id,
          evaluationEntityId: evaluationEntity.id,
          questionId: question.id,
          answer: { value: true, type: 'BOOLEAN' },
          reviewerId: researcherUser?.id ?? null,
          isApproved: true,
        },
      });
    }

    console.log('Seeded tech profile answer for tool configuration:', config.id);
  }
};
