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

  // Create sample benchmark questions for each scale
  await prisma.benchmarkQuestion.create({
    data: {
      scaleId: aPharmScale.id,
      position: 1,
      promptId: 'apharm_001',
      promptValue: 'A 28-year-old patient with bipolar disorder is stable on lithium 900mg BID. They develop moderate depression and you consider adding sertraline. What are the key pharmacological considerations and monitoring requirements?',
      responseId: 'apharm_001_response',
      responseValue: 'Monitor for serotonin syndrome risk, potential for lithium toxicity due to SSRI-induced hyponatremia, and consider starting sertraline at lower dose with frequent lithium level monitoring',
      isValidated: true,
      isUserSubmitted: false,
      createdBy: researcherUser.id,
    },
  });

  await prisma.benchmarkQuestion.create({
    data: {
      scaleId: aMamhScale.id,
      position: 1,
      promptId: 'amamh_001',
      promptValue: 'A 32-year-old woman at 28 weeks gestation presents with severe postpartum anxiety and intrusive thoughts about harming her baby. She is breastfeeding and has a history of adverse reactions to SSRIs. What treatment approach would you recommend?',
      responseId: 'amamh_001_response',
      responseValue: 'Consider sertraline despite history (lowest risk in breastfeeding), immediate psychiatric evaluation for postpartum anxiety vs emerging psychosis, safety planning, and close monitoring with partner/family involvement',
      isValidated: true,
      isUserSubmitted: false,
      createdBy: researcherUser.id,
    },
  });

  await prisma.benchmarkQuestion.create({
    data: {
      scaleId: siriScale.id,
      position: 1,
      promptId: 'siri_001',
      promptValue: 'A patient reports persistent fatigue after starting antidepressants. List 3 possible causes.',
      responseId: 'siri_001_response',
      responseValue: '1. Medication side effect, 2. Underlying sleep disorder, 3. Inadequate treatment of depression',
      isValidated: true,
      isUserSubmitted: false,
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

  await prisma.modelVersion.create({
    data: {
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

  await prisma.modelVersion.create({
    data: {
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