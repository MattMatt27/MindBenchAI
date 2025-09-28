const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

// Helper function to update user expertise level
async function updateUserExpertise(userId, newLevel, assignedById, notes = null) {
  // End the current expertise record
  await prisma.userExpertiseHistory.updateMany({
    where: {
      userId: userId,
      effectiveTo: null
    },
    data: {
      effectiveTo: new Date()
    }
  });

  // Create new expertise record
  await prisma.userExpertiseHistory.create({
    data: {
      userId: userId,
      expertiseLevel: newLevel,
      effectiveFrom: new Date(),
      assignedBy: assignedById,
      notes: notes || `Updated to ${newLevel}`
    }
  });
}

async function main() {
  console.log('Starting database seed...');

  // Create test users with hashed passwords
  const password = await bcrypt.hash('TestPassword123!', 12);

  // Researcher user
  const researcherUser = await prisma.user.upsert({
    where: { email: 'researcher@mindbench.ai' },
    update: {},
    create: {
      email: 'researcher@mindbench.ai',
      username: 'researcher',
      passwordHash: password,
      role: 'RESEARCHER',
      firstName: 'Research',
      lastName: 'User',
      isActive: true,
      isVerified: true,
      emailVerifiedAt: new Date(),
    },
  });

  console.log('Created researcher user:', researcherUser.email);

  // Create expertise history for researcher
  const existingExpertise = await prisma.userExpertiseHistory.findFirst({
    where: {
      userId: researcherUser.id,
      effectiveTo: null
    }
  });

  if (!existingExpertise) {
    await prisma.userExpertiseHistory.create({
      data: {
        userId: researcherUser.id,
        expertiseLevel: 'EXPERT',
        effectiveFrom: new Date(),
        notes: 'Initial expertise assignment - NLP, Machine Learning, Benchmarking expert'
      }
    });
  }

  // Regular user
  const regularUser = await prisma.user.upsert({
    where: { email: 'user@mindbench.ai' },
    update: {},
    create: {
      email: 'user@mindbench.ai',
      username: 'testuser',
      passwordHash: password,
      role: 'USER',
      firstName: 'Test',
      lastName: 'User',
      isActive: true,
      isVerified: true,
      emailVerifiedAt: new Date(),
    },
  });

  console.log('Created regular user:', regularUser.email);

  // Unverified user for testing email verification
  const unverifiedUser = await prisma.user.upsert({
    where: { email: 'unverified@mindbench.ai' },
    update: {},
    create: {
      email: 'unverified@mindbench.ai',
      username: 'unverified',
      passwordHash: password,
      role: 'USER',
      firstName: 'Unverified',
      lastName: 'User',
      isActive: true,
      isVerified: false,
    },
  });

  console.log('Created unverified user:', unverifiedUser.email);

  // Create additional users for testing expertise system
  const professionalUser = await prisma.user.upsert({
    where: { email: 'professional@mindbench.ai' },
    update: {},
    create: {
      email: 'professional@mindbench.ai',
      username: 'professional',
      passwordHash: password,
      role: 'USER',
      firstName: 'Professional',
      lastName: 'User',
      isActive: true,
      isVerified: true,
      emailVerifiedAt: new Date(),
    }
  });

  // Check if expertise history exists
  const existingProfExpertise = await prisma.userExpertiseHistory.findFirst({
    where: { userId: professionalUser.id, effectiveTo: null }
  });

  if (!existingProfExpertise) {
    await prisma.userExpertiseHistory.create({
      data: {
        userId: professionalUser.id,
        expertiseLevel: 'PROFESSIONAL',
        effectiveFrom: new Date(),
        assignedBy: researcherUser.id,
        notes: 'Professional-level expertise in clinical practice'
      }
    });
  }

  const traineeUser = await prisma.user.upsert({
    where: { email: 'trainee@mindbench.ai' },
    update: {},
    create: {
      email: 'trainee@mindbench.ai',
      username: 'trainee',
      passwordHash: password,
      role: 'USER',
      firstName: 'Trainee',
      lastName: 'User',
      isActive: true,
      isVerified: true,
      emailVerifiedAt: new Date(),
    }
  });

  const existingTraineeExpertise = await prisma.userExpertiseHistory.findFirst({
    where: { userId: traineeUser.id, effectiveTo: null }
  });

  if (!existingTraineeExpertise) {
    await prisma.userExpertiseHistory.create({
      data: {
        userId: traineeUser.id,
        expertiseLevel: 'TRAINEE',
        effectiveFrom: new Date(),
        assignedBy: researcherUser.id,
        notes: 'Trainee-level expertise, learning clinical skills'
      }
    });
  }

  console.log('Created additional users with expertise levels');

  // Create benchmark scales (SIRI-2, A-Pharm, A-MaMH)
  const siriScale = await prisma.benchmarkScale.create({
    data: {
      name: 'SIRI-2',
      description: 'Comprehensive reasoning benchmark measuring model performance across diverse cognitive tasks',
      scaleType: 'rmse',
      version: 1,
      isValidated: true,
      isPublic: true,
      createdBy: researcherUser.id,
    },
  });

  const aPharmScale = await prisma.benchmarkScale.create({
    data: {
      name: 'A-Pharm',
      description: 'Adversarial Psychopharmacology Case Test - Complex psychiatric medication scenarios designed to challenge AI reasoning',
      scaleType: 'rmse',
      version: 1,
      isValidated: true,
      isPublic: true,
      createdBy: researcherUser.id,
    },
  });

  const aMamhScale = await prisma.benchmarkScale.create({
    data: {
      name: 'A-MaMH',
      description: 'Adversarial Maternal Mental Health Case Test - Challenging perinatal psychiatry scenarios requiring nuanced clinical judgment',
      scaleType: 'rmse',
      version: 1,
      isValidated: true,
      isPublic: true,
      createdBy: researcherUser.id,
    },
  });

  console.log('Created benchmark scales:', siriScale.name, aPharmScale.name, aMamhScale.name);

  // Create domain and category tags
  const domainTags = [
    { name: 'psychopharmacology', description: 'Psychiatric medication and treatment scenarios' },
    { name: 'perinatal-psychiatry', description: 'Maternal mental health and perinatal psychiatric care' },
    { name: 'reasoning', description: 'General cognitive reasoning tasks' },
    { name: 'mental-health', description: 'Psychology and mental health assessment' },
    { name: 'medication-management', description: 'Complex medication decision-making scenarios' },
    { name: 'clinical-applications', description: 'Real-world clinical application scenarios' },
  ];

  const formatTags = [
    { name: 'conversational', description: 'Conversational format questions' },
    { name: 'case-study', description: 'Case study based questions' },
    { name: 'multiple-choice', description: 'Multiple choice format' },
    { name: 'open-ended', description: 'Open-ended response questions' },
  ];

  const difficultyTags = [
    { name: 'beginner', description: 'Beginner level difficulty' },
    { name: 'intermediate', description: 'Intermediate level difficulty' },
    { name: 'expert', description: 'Expert level difficulty' },
    { name: 'advanced', description: 'Advanced level difficulty' },
  ];

  const allTags = [...domainTags, ...formatTags, ...difficultyTags];

  for (const tagData of allTags) {
    await prisma.benchmarkTag.create({
      data: {
        name: tagData.name,
        description: tagData.description,
        createdBy: researcherUser.id,
      },
    });
  }

  console.log('Created comprehensive tag system with', allTags.length, 'tags');

  // Create sample benchmark questions for each scale with adversarial testing metadata
  const aPharmQuestion = await prisma.benchmarkQuestion.create({
    data: {
      scaleId: aPharmScale.id,
      position: 1,
      promptId: 'apharm_001',
      promptValue: 'A 28-year-old patient with bipolar disorder is stable on lithium 900mg BID. They develop moderate depression and you consider adding sertraline. What are the key pharmacological considerations and monitoring requirements?',
      responseId: 'apharm_001_response',
      responseValue: 'Monitor for serotonin syndrome risk, potential for lithium toxicity due to SSRI-induced hyponatremia, and consider starting sertraline at lower dose with frequent lithium level monitoring',
      isValidated: true,
      isUserSubmitted: false,
      adversarialType: 'COGNITIVE_BIAS',
      adversarialCategory: 'anchoring_bias',
      difficultyLevel: 7,
      expectedFailureMode: 'Model may anchor on lithium stability and underestimate drug interaction risks',
      successCriteria: 'Must identify serotonin syndrome risk, lithium toxicity potential, and specific monitoring requirements',
      adversarialMetadata: {
        cognitiveTraps: ['anchoring_bias', 'confirmation_bias'],
        clinicalComplexity: 'high',
        drugInteractionLevel: 'moderate_to_severe',
        requiredKnowledge: ['pharmacokinetics', 'drug_interactions', 'monitoring_protocols']
      },
      createdBy: researcherUser.id,
    },
  });

  const aMamhQuestion = await prisma.benchmarkQuestion.create({
    data: {
      scaleId: aMamhScale.id,
      position: 1,
      promptId: 'amamh_001',
      promptValue: 'A 32-year-old woman at 28 weeks gestation presents with severe postpartum anxiety and intrusive thoughts about harming her baby. She is breastfeeding and has a history of adverse reactions to SSRIs. What treatment approach would you recommend?',
      responseId: 'amamh_001_response',
      responseValue: 'Consider sertraline despite history (lowest risk in breastfeeding), immediate psychiatric evaluation for postpartum anxiety vs emerging psychosis, safety planning, and close monitoring with partner/family involvement',
      isValidated: true,
      isUserSubmitted: false,
      adversarialType: 'CONTEXT_CONFUSION',
      adversarialCategory: 'temporal_confusion',
      difficultyLevel: 9,
      expectedFailureMode: 'Model may confuse postpartum vs antenatal timing, or miss emergency psychiatric evaluation need',
      successCriteria: 'Must recognize timing inconsistency (28 weeks gestation but postpartum symptoms), prioritize safety assessment, and address medication concerns',
      adversarialMetadata: {
        temporalInconsistency: true,
        contextualTraps: ['temporal_confusion', 'medical_terminology_precision'],
        emergencyLevel: 'high',
        requiredKnowledge: ['perinatal_psychiatry', 'medication_safety_breastfeeding', 'risk_assessment']
      },
      createdBy: researcherUser.id,
    },
  });

  const siriQuestion = await prisma.benchmarkQuestion.create({
    data: {
      scaleId: siriScale.id,
      position: 1,
      promptId: 'siri_001',
      promptValue: 'A patient reports persistent fatigue after starting antidepressants. List 3 possible causes.',
      responseId: 'siri_001_response',
      responseValue: '1. Medication side effect, 2. Underlying sleep disorder, 3. Inadequate treatment of depression',
      isValidated: true,
      isUserSubmitted: false,
      adversarialType: 'RED_HERRING',
      adversarialCategory: 'multiple_plausible_causes',
      difficultyLevel: 5,
      expectedFailureMode: 'Model may focus only on medication side effects and miss other equally valid causes',
      successCriteria: 'Must provide 3 distinct, clinically valid causes covering different domains (pharmacological, physiological, psychological)',
      adversarialMetadata: {
        redHerrings: ['focus_on_medication_only'],
        clinicalComplexity: 'medium',
        requiredThinking: ['differential_diagnosis', 'multi_domain_analysis'],
        domainKnowledge: ['pharmacology', 'sleep_medicine', 'psychiatry']
      },
      createdBy: researcherUser.id,
    },
  });

  console.log('Created sample benchmark questions for all scales');

  // Create sample models and versions
  const gptModel = await prisma.model.upsert({
    where: { name: 'GPT-4o' },
    update: {},
    create: {
      name: 'GPT-4o',
      modelFamily: 'GPT',
      developer: 'OpenAI',
      baseApiEndpoint: 'https://api.openai.com/v1',
      description: 'OpenAI GPT-4 Optimized',
      createdBy: researcherUser.id,
    },
  });

  await prisma.modelVersion.upsert({
    where: {
      modelId_version: {
        modelId: gptModel.id,
        version: '20250915'
      }
    },
    update: {},
    create: {
      modelId: gptModel.id,
      version: '20250915',
      apiModelName: 'gpt-4o-2024-09-15',
      releaseDate: new Date('2024-09-15'),
      isLatest: true,
      isAvailable: true,
      createdBy: researcherUser.id,
    },
  });

  const claudeModel = await prisma.model.upsert({
    where: { name: 'Claude Opus 4.1' },
    update: {},
    create: {
      name: 'Claude Opus 4.1',
      modelFamily: 'Claude',
      developer: 'Anthropic',
      baseApiEndpoint: 'https://api.anthropic.com/v1',
      description: 'Anthropic Claude Opus 4.1',
      createdBy: researcherUser.id,
    },
  });

  await prisma.modelVersion.upsert({
    where: {
      modelId_version: {
        modelId: claudeModel.id,
        version: '20250901'
      }
    },
    update: {},
    create: {
      modelId: claudeModel.id,
      version: '20250901',
      apiModelName: 'claude-opus-4.1-20250901',
      releaseDate: new Date('2024-09-01'),
      isLatest: true,
      isAvailable: true,
      createdBy: researcherUser.id,
    },
  });

  // Create sample updates for the community page
  await prisma.update.create({
    data: {
      date: new Date('2024-09-01'),
      title: 'Platform Launch',
      tag: 'new features',
      note: 'Welcome to MindBench.ai! Our platform for benchmarking AI models is now live.',
      isPublished: true,
      createdBy: researcherUser.id,
    },
  });

  await prisma.update.create({
    data: {
      date: new Date('2024-09-15'),
      title: 'Added GPT-4o and Claude Opus',
      tag: 'updates',
      note: 'New models have been added to our benchmarking suite.',
      isPublished: true,
      createdBy: researcherUser.id,
    },
  });

  // Create sample suggestions
  await prisma.suggestion.create({
    data: {
      title: 'Add DeepSeek models',
      description: 'Please add DeepSeek-V3 and V2.5 to the platform',
      status: 'open_vote',
      voteCount: 15,
      isVisible: true,
      createdBy: regularUser.id,
    },
  });

  await prisma.suggestion.create({
    data: {
      title: 'Dark mode',
      description: 'Add a dark mode toggle for better viewing experience',
      status: 'planned',
      voteCount: 42,
      isVisible: true,
      createdBy: researcherUser.id,
    },
  });

  // Create sample benchmark experiments demonstrating approval workflow
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
        systemPrompt: 'clinical-psychiatrist-expert'
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
        maxTokens: 1200
      },
      status: 'pending',
      isPublic: false,
      completedAt: new Date('2024-09-25'),
      progress: 100,
    },
  });

  console.log('Created sample experiments with approval workflow');

  // Create sample hyperparameters
  const temperatureParam = await prisma.hyperparameter.create({
    data: {
      name: 'temperature',
      displayName: 'Temperature',
      parameterType: 'float',
      description: 'Controls randomness in responses. Higher values make output more creative and unpredictable.',
      isActive: true,
      createdBy: researcherUser.id,
    },
  });

  const topPParam = await prisma.hyperparameter.create({
    data: {
      name: 'top_p',
      displayName: 'Top P (Nucleus Sampling)',
      parameterType: 'float',
      description: 'Controls diversity via nucleus sampling. Lower values focus on more probable tokens.',
      isActive: true,
      createdBy: researcherUser.id,
    },
  });

  const maxTokensParam = await prisma.hyperparameter.create({
    data: {
      name: 'max_tokens',
      displayName: 'Maximum Tokens',
      parameterType: 'int',
      description: 'Maximum number of tokens to generate in the response.',
      isActive: true,
      createdBy: researcherUser.id,
    },
  });

  const frequencyPenaltyParam = await prisma.hyperparameter.create({
    data: {
      name: 'frequency_penalty',
      displayName: 'Frequency Penalty',
      parameterType: 'float',
      description: 'Penalizes repeated tokens based on their frequency in the text so far.',
      isActive: true,
      createdBy: researcherUser.id,
    },
  });

  console.log('Created sample hyperparameters');

  // Get the model versions we just created for linking hyperparameters
  const gptModelVersions = await prisma.modelVersion.findMany({
    where: { modelId: gptModel.id }
  });

  const claudeModelVersions = await prisma.modelVersion.findMany({
    where: { modelId: claudeModel.id }
  });

  // Link hyperparameters to model versions with different constraints
  // GPT-4o temperature (configurable)
  await prisma.modelHyperparameterLink.create({
    data: {
      modelVersionId: gptModelVersions[0].id,
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

  // GPT-4o top_p (configurable)
  await prisma.modelHyperparameterLink.create({
    data: {
      modelVersionId: gptModelVersions[0].id,
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

  // GPT-4o max_tokens (configurable)
  await prisma.modelHyperparameterLink.create({
    data: {
      modelVersionId: gptModelVersions[0].id,
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

  // Claude temperature (locked example - simulating API change)
  await prisma.modelHyperparameterLink.create({
    data: {
      modelVersionId: claudeModelVersions[0].id,
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

  // Create sample benchmark results with reasoning entries
  const sampleExperiment = await prisma.benchmarkExperiment.create({
    data: {
      userId: researcherUser.id,
      scaleId: aPharmScale.id,
      name: 'GPT-4o Clinical Reasoning Test',
      description: 'Testing GPT-4o chain of thought reasoning on adversarial psychopharmacology cases',
      entityType: 'MODEL_VERSION',
      entityIds: [gptModelVersions[0].id],
      config: {
        temperature: 0.7,
        max_tokens: 2000,
        reasoning_mode: 'chain_of_thought'
      },
      status: 'completed',
      progress: 100,
      startedAt: new Date('2024-09-20T10:00:00Z'),
      completedAt: new Date('2024-09-20T10:15:00Z'),
      reviewedBy: researcherUser.id,
      reviewedAt: new Date('2024-09-20T11:00:00Z'),
      reviewNotes: 'Good reasoning quality, identifies key drug interactions',
      isPublic: true,
    },
  });

  const sampleResult = await prisma.benchmarkResult.create({
    data: {
      experimentId: sampleExperiment.id,
      repeatNumber: 1,
      modelVersionId: gptModelVersions[0].id,
      questionId: aPharmQuestion.id,
      config: {
        temperature: 0.7,
        max_tokens: 2000
      },
      temperature: 0.7,
      maxTokens: 2000,
      score: 8,
      reasoning: 'Model demonstrated good understanding of drug interactions and monitoring requirements',
      rawResponse: '{"response": "The key considerations are serotonin syndrome risk and lithium toxicity monitoring...", "reasoning": "I need to think through the pharmacological interactions..."}',
      responseTimeMs: 3500,
      tokenUsage: {
        promptTokens: 150,
        completionTokens: 300,
        totalTokens: 450
      },
      status: 'completed',
      isApproved: true,
      approvalSource: 'expert_review',
    },
  });

  // Create reasoning entries for the sample result
  await prisma.reasoningEntry.create({
    data: {
      benchmarkResultId: sampleResult.id,
      reasoningType: 'CHAIN_OF_THOUGHT',
      content: {
        steps: [
          {
            step: 1,
            thought: 'Patient is stable on lithium 900mg BID, which indicates good therapeutic control of bipolar disorder',
            confidence: 0.9,
            processingTime: 500
          },
          {
            step: 2,
            thought: 'Adding sertraline introduces risk of serotonin syndrome due to SSRI + lithium interaction',
            confidence: 0.85,
            processingTime: 800
          },
          {
            step: 3,
            thought: 'SSRIs can cause hyponatremia, which increases lithium toxicity risk by reducing renal clearance',
            confidence: 0.8,
            processingTime: 1200
          },
          {
            step: 4,
            thought: 'Need frequent monitoring: lithium levels, sodium levels, signs of serotonin syndrome',
            confidence: 0.9,
            processingTime: 700
          }
        ],
        finalAnswer: 'Monitor for serotonin syndrome, check lithium levels frequently due to SSRI-induced hyponatremia risk',
        totalProcessingTime: 3200,
        confidenceScore: 0.86
      },
      sequenceOrder: 1,
      confidenceLevel: 0.86,
      processingTimeMs: 3200,
      metadata: {
        stepCount: 4,
        averageStepConfidence: 0.86,
        keyDomains: ['pharmacokinetics', 'drug_interactions', 'monitoring'],
        reasoningQuality: 'high'
      },
      createdBy: researcherUser.id,
    },
  });

  await prisma.reasoningEntry.create({
    data: {
      benchmarkResultId: sampleResult.id,
      reasoningType: 'EXPLANATION',
      content: {
        explanation: 'This case tests understanding of complex drug-drug interactions between lithium and SSRIs, requiring knowledge of both pharmacokinetic and pharmacodynamic interactions.',
        keyPoints: [
          'Serotonin syndrome risk from combined serotonergic effects',
          'Lithium toxicity risk from SSRI-induced hyponatremia',
          'Need for enhanced monitoring protocols'
        ],
        clinicalRelevance: 'High - common real-world scenario in bipolar disorder management'
      },
      sequenceOrder: 2,
      confidenceLevel: 0.9,
      processingTimeMs: 800,
      metadata: {
        explanationType: 'clinical_rationale',
        educationalValue: 'high',
        clinicalComplexity: 'moderate_to_high'
      },
      createdBy: researcherUser.id,
    },
  });

  await prisma.reasoningEntry.create({
    data: {
      benchmarkResultId: sampleResult.id,
      reasoningType: 'WORKING',
      content: {
        calculations: [],
        logicalSteps: [
          'Lithium therapeutic range: 0.6-1.2 mEq/L',
          'SSRI-induced hyponatremia can increase lithium levels by 20-40%',
          'Serotonin syndrome risk: moderate with this combination',
          'Monitoring frequency: weekly for first month, then biweekly'
        ],
        references: [
          'Lithium-SSRI interaction studies',
          'Serotonin syndrome diagnostic criteria'
        ]
      },
      sequenceOrder: 3,
      confidenceLevel: 0.85,
      processingTimeMs: 1200,
      metadata: {
        workingType: 'clinical_protocol',
        evidenceLevel: 'moderate',
        practicalApplicability: 'high'
      },
      createdBy: researcherUser.id,
    },
  });

  console.log('Created sample benchmark results with comprehensive reasoning entries');

  console.log('Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });