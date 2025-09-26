const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

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
      expertiseLevel: 'Expert',
      expertiseAreas: JSON.stringify(['NLP', 'Machine Learning', 'Benchmarking']),
    },
  });

  console.log('Created researcher user:', researcherUser.email);

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