const { PrismaClient } = require('../../../../prisma/generated/prisma');

const prisma = new PrismaClient();

const normalizeProfile = (profile) => {
  const modelVersion = profile.modelVersion;
  const model = modelVersion?.model;
  const family = model?.modelFamily;

  return {
    id: profile.id,
    model_version_id: modelVersion?.id ?? null,
    version: modelVersion?.version ?? null,
    is_latest: modelVersion?.isLatest ?? false,
    release_date: modelVersion?.releaseDate ?? null,
    model_id: model?.id ?? null,
    model_name: model?.name ?? null,
    model_family: family?.name ?? null,
    openness: profile.openness,
    conscientiousness: profile.conscientiousness,
    extraversion: profile.extraversion,
    agreeableness: profile.agreeableness,
    neuroticism: profile.neuroticism,
  };
};

const getBigFiveProfiles = async (req, res, next) => {
  try {
    const profiles = await prisma.bigFiveProfile.findMany({
      include: {
        modelVersion: {
          include: {
            model: {
              include: {
                modelFamily: true,
              },
            },
          },
        },
      },
      orderBy: [
        { modelVersion: { model: { name: 'asc' } } },
        { modelVersion: { version: 'desc' } },
      ],
    });

    res.json({
      success: true,
      data: profiles.map(normalizeProfile),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBigFiveProfiles,
};
