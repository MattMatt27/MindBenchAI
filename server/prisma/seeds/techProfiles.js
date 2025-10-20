const { EntityType, QuestionType } = require('../generated/prisma');

const QUESTIONS = [
  {
    questionKey: 'android_support',
    questionLabel: 'Android support',
    questionText: 'Is Android platform supported?',
    category: 'Platform',
    questionType: QuestionType.BOOLEAN,
  },
  {
    questionKey: 'ios_support',
    questionLabel: 'IOS support',
    questionText: 'Is iOS platform supported?',
    category: 'Platform',
    questionType: QuestionType.BOOLEAN,
  },
  {
    questionKey: 'web_support',
    questionLabel: 'Web support',
    questionText: 'Is web app supported?',
    category: 'Platform',
    questionType: QuestionType.BOOLEAN,
  },
  {
    questionKey: 'free_tier',
    questionLabel: 'Free tier',
    questionText: 'Is free tier available?',
    category: 'Pricing',
    questionType: QuestionType.BOOLEAN,
  },
  {
    questionKey: 'monthly_price',
    questionLabel: 'Monthly price',
    questionText: "What's the monthly price?",
    category: 'Pricing',
    questionType: QuestionType.TEXT,
  },
  {
    questionKey: 'annual_price',
    questionLabel: 'Annual price',
    questionText: "What's the annual price?",
    category: 'Pricing',
    questionType: QuestionType.TEXT,
  },
  {
    questionKey: 'crisis_detection',
    questionLabel: 'Crisis detection',
    questionText: 'Does it offer crisis detection?',
    category: 'Mental Health Features',
    questionType: QuestionType.BOOLEAN,
  },
  {
    questionKey: 'mood_tracking',
    questionLabel: 'Mood tracking',
    questionText: 'Does the config offer mood tracking?',
    category: 'Mental Health Features',
    questionType: QuestionType.BOOLEAN,
  },
  {
    questionKey: 'therapeutic_techniques',
    questionLabel: 'Therapeutic techniques',
    questionText: 'Does the config offer therapeutic techniques?',
    category: 'Mental Health Features',
    questionType: QuestionType.TEXT,
  },
  {
    questionKey: 'hipaa_compliant',
    questionLabel: 'HIPAA compliant',
    questionText: 'HIPAA Compliant?',
    category: 'Privacy & Security',
    questionType: QuestionType.BOOLEAN,
  },
  {
    questionKey: 'data_retention_days',
    questionLabel: 'Data retention days',
    questionText: 'Data retention (days)',
    category: 'Privacy & Security',
    questionType: QuestionType.TEXT,
  },
];

const TOOL_ANSWERS = {
  'ChatGPT GPT-4o': {
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
  'ChatGPT GPT-5': {
    android_support: true,
    ios_support: true,
    web_support: true,
    free_tier: false,
    monthly_price: '$150/month',
    annual_price: '$1300/year',
    crisis_detection: true,
    mood_tracking: true,
    therapeutic_techniques: 'General support, active listening, counseling',
    hipaa_compliant: false,
    data_retention_days: '45',
  },
  'Claude Sonnet 3.7': {
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
  'Gemini Gemini 2.0 Flash': {
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

const MODEL_ANSWERS = {
  'GPT-4o': {
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
  'GPT-5': {
    android_support: true,
    ios_support: true,
    web_support: true,
    free_tier: false,
    monthly_price: '$150/month',
    annual_price: '$1300/year',
    crisis_detection: true,
    mood_tracking: true,
    therapeutic_techniques: 'General support, active listening, counseling',
    hipaa_compliant: false,
    data_retention_days: '45',
  },
  'Sonnet 3.7': {
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
  'Gemini 2.0 Flash': {
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

const randomBoolean = () => Math.random() < 0.5;
const randomNumberInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const formatCurrency = (amount, cadence) => {
  const formatted = amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  if (!cadence) return `$${formatted}`;
  return cadence === 'month' ? `$${formatted}/month` : `$${formatted}/year`;
};

const normalizeListValue = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const generateModelVersionAnswer = (question, baseValue, versionRecord, versionIndex) => {
  const versionLabel = versionRecord.version ? `v${versionRecord.version}` : `version-${versionRecord.id}`;

  switch (question.questionType) {
    case QuestionType.BOOLEAN: {
      if (typeof baseValue === 'boolean') {
        if (versionIndex === 0) return baseValue;
        return versionIndex % 2 === 0 ? baseValue : !baseValue;
      }

      if (typeof baseValue === 'string') {
        const normalized = baseValue.trim().toLowerCase();
        if (['true', 'yes', '1'].includes(normalized)) return versionIndex % 2 === 0;
        if (['false', 'no', '0'].includes(normalized)) return versionIndex % 2 !== 0;
      }

      return randomBoolean();
    }
    case QuestionType.NUMBER: {
      const baseNumber = Number(baseValue);
      if (!Number.isNaN(baseNumber)) {
        if (versionIndex === 0) return baseNumber;
        const variance = Math.max(1, Math.round(baseNumber * 0.05));
        return baseNumber + (versionIndex % 2 === 0 ? variance : -variance);
      }
      return Math.round(Math.random() * 100);
    }
    case QuestionType.LIST: {
      const baseList = normalizeListValue(baseValue);
      if (versionIndex === 0 && baseList.length > 0) return baseList;

      const extras = [
        `${question.questionKey.replace(/_/g, ' ')} insights`,
        `Additional ${question.category}`,
        `Variant ${versionIndex + 1}`,
      ];

      const nextList = baseList.length > 0 ? [...baseList] : [`${question.questionKey} ${versionLabel}`];
      nextList.push(extras[versionIndex % extras.length]);

      return Array.from(new Set(nextList));
    }
    case QuestionType.TEXT:
    default: {
      if (typeof baseValue === 'string' && baseValue.trim().length > 0) {
        if (versionIndex === 0) return baseValue;
        return `${baseValue} (${versionLabel})`;
      }

      return `${question.questionText} (${versionLabel})`;
    }
  }
};

const generateToolConfigurationAnswer = (question, baseValue, config, configIndex) => {
  const configLabel = config.configurationName || `config-${config.id}`;

  switch (question.questionType) {
    case QuestionType.BOOLEAN: {
      if (typeof baseValue === 'boolean') return baseValue;
      if (typeof baseValue === 'string') {
        const normalized = baseValue.trim().toLowerCase();
        if (['true', 'yes', '1'].includes(normalized)) return true;
        if (['false', 'no', '0'].includes(normalized)) return false;
      }
      return randomBoolean();
    }
    case QuestionType.NUMBER: {
      const baseNumber = Number(baseValue);
      if (!Number.isNaN(baseNumber)) return baseNumber;
      return Math.max(1, Math.round(Math.random() * 100));
    }
    case QuestionType.LIST: {
      const baseList = normalizeListValue(baseValue);
      if (baseList.length > 0) return baseList;
      return [`${question.questionKey.replace(/_/g, ' ')} (${configLabel})`];
    }
    case QuestionType.TEXT:
    default: {
      if (baseValue !== undefined && baseValue !== null) return String(baseValue);
      const suffix = configIndex !== undefined ? `#${configIndex + 1}` : config.id;

      const key = question.questionKey ? question.questionKey.toLowerCase() : '';
      const text = question.questionText ? question.questionText.toLowerCase() : '';
      const isPricing = key.includes('price') || text.includes('price') || question.category?.toLowerCase() === 'pricing';
      if (isPricing) {
        const cadence = key.includes('annual') || text.includes('annual') ? 'year' : key.includes('monthly') || text.includes('monthly') ? 'month' : null;
        const amount = cadence === 'year'
          ? randomNumberInRange(300, 3000)
          : cadence === 'month'
          ? randomNumberInRange(10, 250)
          : randomNumberInRange(50, 500);
        return formatCurrency(amount, cadence);
      }

      return `${question.questionText} (${configLabel} ${suffix})`;
    }
  }
};

module.exports = async function seedTechProfiles(prisma, options = {}) {
  const {
    researcherUser,
    toolConfigurations = {},
    tools = {},
    models = {},
    modelVersions = {},
  } = options;

  const questions = [];
  for (let i = 0; i < QUESTIONS.length; i += 1) {
    const q = QUESTIONS[i];
    const record = await prisma.techProfileQuestion.upsert({
      where: {
        entityType_questionKey: {
          entityType: EntityType.BOTH,
          questionKey: q.questionKey,
        },
      },
      update: {
        questionText: q.questionText,
        questionLabel: q.questionLabel ?? q.questionText,
        category: q.category,
        questionType: q.questionType,
        displayOrder: i + 1,
        isActive: true,
        isDisplayed: true,
      },
      create: {
        entityType: EntityType.BOTH,
        questionKey: q.questionKey,
        questionText: q.questionText,
        questionLabel: q.questionLabel ?? q.questionText,
        category: q.category,
        questionType: q.questionType,
        displayOrder: i + 1,
        isActive: true,
        isDisplayed: true,
      },
    });
    questions.push(record);
  }

  let configIndex = 0;
  for (const configsByModel of Object.values(toolConfigurations)) {
    if (!configsByModel) continue;

    for (const config of Object.values(configsByModel)) {
      if (!config) continue;

      const configName = config.configurationName;
      const answerMap = configName ? TOOL_ANSWERS[configName] : null;

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
        const baseValue = answerMap ? answerMap[key] : undefined;
        const rawValue = generateToolConfigurationAnswer(question, baseValue, config, configIndex);

        let payload;
        if (question.questionType === QuestionType.BOOLEAN) {
          payload = { value: Boolean(rawValue), type: 'BOOLEAN' };
        } else if (question.questionType === QuestionType.NUMBER) {
          payload = { value: Number(rawValue), type: 'NUMBER' };
        } else if (question.questionType === QuestionType.LIST) {
          const listValue = Array.isArray(rawValue) ? rawValue : normalizeListValue(rawValue);
          payload = { value: listValue, type: 'LIST' };
        } else {
          payload = { value: String(rawValue), type: 'TEXT' };
        }

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
      configIndex += 1;
    }
  }

  // Seed base model (model version) answers
  for (const modelRecord of Object.values(models)) {
    if (!modelRecord) continue;

    const versionsForModel = modelVersions[modelRecord.id] ?? {};
    const answerMap = MODEL_ANSWERS[modelRecord.name];

    // prefer latest versions first
    const versionEntries = Object.values(versionsForModel ?? {}).sort((a, b) => {
      if (a.isLatest && !b.isLatest) return -1;
      if (!a.isLatest && b.isLatest) return 1;
      return String(b.version).localeCompare(String(a.version));
    });

    let versionIndex = 0;
    for (const versionRecord of versionEntries) {
      if (!versionRecord) continue;

      let evaluationEntity = await prisma.evaluationEntity.findFirst({
        where: { modelVersionId: versionRecord.id },
      });

      if (!evaluationEntity) {
        evaluationEntity = await prisma.evaluationEntity.create({
          data: {
            entityType: EntityType.MODEL_VERSION,
            modelVersionId: versionRecord.id,
          },
        });
      }

      for (const question of questions) {
        const key = question.questionKey;
        const baseValue = answerMap ? answerMap[key] : undefined;
        const rawValue = generateModelVersionAnswer(question, baseValue, versionRecord, versionIndex);

        let payload;
        if (question.questionType === QuestionType.BOOLEAN) {
          payload = { value: Boolean(rawValue), type: 'BOOLEAN' };
        } else if (question.questionType === QuestionType.NUMBER) {
          payload = { value: Number(rawValue), type: 'NUMBER' };
        } else if (question.questionType === QuestionType.LIST) {
          const listValue = Array.isArray(rawValue) ? rawValue : normalizeListValue(rawValue);
          payload = { value: listValue, type: 'LIST' };
        } else {
          payload = { value: String(rawValue), type: 'TEXT' };
        }

        const existing = await prisma.techProfileAnswer.findFirst({
          where: {
            entityId: versionRecord.id,
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
              entityType: EntityType.MODEL_VERSION,
            },
          });
        } else {
          await prisma.techProfileAnswer.create({
            data: {
              entityType: EntityType.MODEL_VERSION,
              entityId: versionRecord.id,
              evaluationEntityId: evaluationEntity.id,
              questionId: question.id,
              answer: payload,
              reviewerId: researcherUser?.id ?? null,
              isApproved: true,
            },
          });
        }
      }

      console.log('Seeded tech profile answers for model version:', versionRecord.id, versionRecord.version);
      versionIndex += 1;
    }
  }
};
