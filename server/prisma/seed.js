const { PrismaClient } = require('./generated/prisma');

const seedModels = require('./seeds/models');
const seedTechProfiles = require('./seeds/techProfiles');
const seedIRIConversationalProfile = require('./seeds/iriConversationalProfile');
const seedHexacoConversationalProfile = require('./seeds/hexacoConversationalProfile');
const seedCSIConversationalProfile = require('./seeds/csiConversationalProfile');
const seedUsers = require('./seeds/users');
const seedResources = require('./seeds/resources');
const seedCommunity = require('./seeds/community');
const seedBenchmarking = require('./seeds/benchmarking');
const seedBenchmarkScoreAggregates = require('./seeds/benchmarkScoreAggregates');
const seedExperiments = require('./seeds/experiments');
const seedHyperparameters = require('./seeds/hyperparameters');
const seedResults = require('./seeds/results');
const seedSystem = require('./seeds/system');
const seedRatings = require('./seeds/ratings');

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

  await seedCSIConversationalProfile(prisma, {
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

  const benchmarking = await seedBenchmarking(prisma, {
    researcherUser: users.researcherUser,
  });

  await seedBenchmarkScoreAggregates(prisma, {
    benchmarking,
  });

  // Temporarily commented out due to model version lookup issues
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
