const { PrismaClient } = require('./generated/prisma');

const seedModels = require('./seeds/models');
const seedTechProfiles = require('./seeds/techProfiles');
const seedIRIConversationalProfile = require('./seeds/iriConversationalProfile');
const seedHexacoConversationalProfile = require('./seeds/hexacoConversationalProfile');
const seedUsers = require('./seeds/users');
const seedResources = require('./seeds/resources');
const seedCommunity = require('./seeds/community');
// const seedBenchmarking = require('./seeds/benchmarking');
// const seedExperiments = require('./seeds/experiments');
// const seedHyperparameters = require('./seeds/hyperparameters');
// const seedResults = require('./seeds/results');
// const seedSystem = require('./seeds/system');
// const seedRatings = require('./seeds/ratings');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  const users = await seedUsers(prisma);
  const models = await seedModels(prisma);

  await seedIRIConversationalProfile(prisma, {
    models: models.models,
    modelVersions: models.modelVersions,
  });

  await seedHexacoConversationalProfile(prisma, {
    models: models.models,
    modelVersions: models.modelVersions,
  });

  await seedTechProfiles(prisma, {
    // researcherUser: users?.researcherUser,
    toolConfigurations: models.toolConfigurations,
    tools: models.tools,
    models: models.models,
    modelVersions: models.modelVersions,
  });

  await seedResources(prisma);

  await seedCommunity(prisma, {
    researcherUser: users.researcherUser,
    regularUser: users.regularUser,
  });

  // const benchmarking = await seedBenchmarking(prisma, {
  //   researcherUser: users.researcherUser,
  // });

  // const experimentContexts = await seedExperiments(prisma, {
  //   researcherUser: users.researcherUser,
  //   professionalUser: users.professionalUser,
  //   benchmarking,
  //   models,
  // });

  // await seedHyperparameters(prisma, {
  //   researcherUser: users.researcherUser,
  //   gptModelVersion: experimentContexts.gptModelVersion,
  //   claudeModelVersion: experimentContexts.claudeModelVersion,
  // });

  // await seedResults(prisma, {
  //   researcherUser: users.researcherUser,
  //   benchmarking,
  //   models,
  // });

  // await seedSystem(prisma, {
  //   researcherUser: users.researcherUser,
  // });

  // await seedRatings(prisma, {
  //   researcherUser: users.researcherUser,
  //   professionalUser: users.professionalUser,
  //   benchmarking,
  // });

  console.log('Database seed completed successfully (core models + tech profiles + resources + community).');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
