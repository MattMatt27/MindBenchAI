const bcrypt = require('bcryptjs');

module.exports = async function seedUsers(prisma) {
  const password = await bcrypt.hash('TestPassword123!', 12);

  const researcherUser = await prisma.user.upsert({
    where: { email: 'researcher@mindbench.ai' },
    update: {},
    create: {
      email: 'researcher@mindbench.ai',
      username: 'researcher',
      passwordHash: password,
      role: 'USER',
      firstName: 'Research',
      lastName: 'User',
      isActive: true,
      isVerified: true,
      emailVerifiedAt: new Date(),
    },
  });
  console.log('Created researcher user:', researcherUser.email);

  const existingExpertise = await prisma.userExpertiseHistory.findFirst({
    where: { userId: researcherUser.id, effectiveTo: null },
  });
  if (!existingExpertise) {
    await prisma.userExpertiseHistory.create({
      data: {
        userId: researcherUser.id,
        expertiseLevel: 'EXPERT',
        effectiveFrom: new Date(),
        notes: 'Initial expertise assignment - NLP, Machine Learning, Benchmarking expert',
      },
    });
  }

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
    },
  });

  const existingProfExpertise = await prisma.userExpertiseHistory.findFirst({
    where: { userId: professionalUser.id, effectiveTo: null },
  });
  if (!existingProfExpertise) {
    await prisma.userExpertiseHistory.create({
      data: {
        userId: professionalUser.id,
        expertiseLevel: 'PROFESSIONAL',
        effectiveFrom: new Date(),
        assignedBy: researcherUser.id,
        notes: 'Professional-level expertise in clinical practice',
      },
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
    },
  });

  const existingTraineeExpertise = await prisma.userExpertiseHistory.findFirst({
    where: { userId: traineeUser.id, effectiveTo: null },
  });
  if (!existingTraineeExpertise) {
    await prisma.userExpertiseHistory.create({
      data: {
        userId: traineeUser.id,
        expertiseLevel: 'TRAINEE',
        effectiveFrom: new Date(),
        assignedBy: researcherUser.id,
        notes: 'Trainee-level expertise, learning clinical skills',
      },
    });
  }

  console.log('Created additional users with expertise levels');

  return {
    researcherUser,
    regularUser,
    unverifiedUser,
    professionalUser,
    traineeUser,
  };
};
