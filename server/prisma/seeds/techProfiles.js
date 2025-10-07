const { EntityType, QuestionType } = require('../generated/prisma');

const QUESTIONS = [
  {
    questionKey: 'android_support',
    questionText: 'Is Android platform supported?',
    category: 'Platform',
    questionType: QuestionType.BOOLEAN,
  },
  {
    questionKey: 'ios_support',
    questionText: 'Is iOS platform supported?',
    category: 'Platform',
    questionType: QuestionType.BOOLEAN,
  },
  {
    questionKey: 'web_support',
    questionText: 'Is web app supported?',
    category: 'Platform',
    questionType: QuestionType.BOOLEAN,
  },
  {
    questionKey: 'free_tier',
    questionText: 'Is free tier available?',
    category: 'Pricing',
    questionType: QuestionType.BOOLEAN,
  },
  {
    questionKey: 'monthly_price',
    questionText: "What's the monthly price?",
    category: 'Pricing',
    questionType: QuestionType.TEXT,
  },
  {
    questionKey: 'annual_price',
    questionText: "What's the annual price?",
    category: 'Pricing',
    questionType: QuestionType.TEXT,
  },
  {
    questionKey: 'crisis_detection',
    questionText: 'Does it offer crisis detection?',
    category: 'Mental Health Features',
    questionType: QuestionType.BOOLEAN,
  },
  {
    questionKey: 'mood_tracking',
    questionText: 'Does the config offer mood tracking?',
    category: 'Mental Health Features',
    questionType: QuestionType.BOOLEAN,
  },
  {
    questionKey: 'therapeutic_techniques',
    questionText: 'Does the config offer therapeutic techniques?',
    category: 'Mental Health Features',
    questionType: QuestionType.TEXT,
  },
  {
    questionKey: 'hipaa_compliant',
    questionText: 'HIPAA Compliant?',
    category: 'Privacy & Security',
    questionType: QuestionType.BOOLEAN,
  },
  {
    questionKey: 'data_retention_days',
    questionText: 'Data retention (days)',
    category: 'Privacy & Security',
    questionType: QuestionType.TEXT,
  },
];

const ANSWERS = {
  ChatGPT: {
    android_support: true,
    ios_support: true,
    web_support: false,
    free_tier: true,
    monthly_price: '$100/month',
    annual_price: '$1000/year',
    crisis_detection: false,
    mood_tracking: false,
    therapeutic_techniques: 'CBD, DBT, Active Listening',
    hipaa_compliant: false,
    data_retention_days: '30',
  },
  Claude: {
    android_support: true,
    ios_support: false,
    web_support: false,
    free_tier: true,
    monthly_price: '$125/month',
    annual_price: '$1200/year',
    crisis_detection: true,
    mood_tracking: true,
    therapeutic_techniques: 'General support',
    hipaa_compliant: false,
    data_retention_days: '90',
  },
  Gemini: {
    android_support: false,
    ios_support: true,
    web_support: true,
    free_tier: true,
    monthly_price: '$180/month',
    annual_price: '$900/year',
    crisis_detection: false,
    mood_tracking: true,
    therapeutic_techniques: 'Mindfulness, Psychoeducation',
    hipaa_compliant: false,
    data_retention_days: '60',
  },
};

module.exports = async function seedTechProfiles(prisma, options = {}) {
  const { researcherUser, toolConfigurations = {}, tools = {} } = options;

  const questions = [];
  for (let i = 0; i < QUESTIONS.length; i += 1) {
    const q = QUESTIONS[i];
    const record = await prisma.techProfileQuestion.upsert({
      where: {
        entityType_questionKey: {
          entityType: EntityType.TOOL_CONFIGURATION,
          questionKey: q.questionKey,
        },
      },
      update: {
        questionText: q.questionText,
        category: q.category,
        questionType: q.questionType,
        displayOrder: i + 1,
        isActive: true,
        isDisplayed: true,
      },
      create: {
        entityType: EntityType.TOOL_CONFIGURATION,
        questionKey: q.questionKey,
        questionText: q.questionText,
        category: q.category,
        questionType: q.questionType,
        displayOrder: i + 1,
        isActive: true,
        isDisplayed: true,
      },
    });
    questions.push(record);
  }

  for (const [modelId, config] of Object.entries(toolConfigurations)) {
    if (!config) continue;

    const toolName = Object.values(tools).find((tool) => tool?.id === config.toolId)?.name;
    const answerMap = toolName ? ANSWERS[toolName] : null;
    if (!answerMap) continue;

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

    for (const question of questions) {
      const key = question.questionKey;
      const rawValue = answerMap[key];
      if (rawValue === undefined) continue;

      const payload =
        question.questionType === QuestionType.BOOLEAN
          ? { value: Boolean(rawValue), type: 'BOOLEAN' }
          : { value: String(rawValue), type: 'TEXT' };

      const existing = await prisma.techProfileAnswer.findFirst({
        where: {
          entityId: config.id,
          questionId: question.id,
        },
      });

      if (existing) {
        await prisma.techProfileAnswer.update({
          where: { id: existing.id },
          data: {
            answer: payload,
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
            answer: payload,
            reviewerId: researcherUser?.id ?? null,
            isApproved: true,
          },
        });
      }
    }

    console.log('Seeded tech profile answers for tool configuration:', config.id);
  }
};
