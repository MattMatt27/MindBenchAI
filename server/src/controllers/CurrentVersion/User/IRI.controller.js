const { PrismaClient } = require('../../../../prisma/generated/prisma');

const prisma = new PrismaClient();

// Subscale mappings with reverse-scored items
const IRI_SUBSCALES = {
  PT: {
    name: 'Perspective Taking',
    questions: ['IRI_3', 'IRI_8', 'IRI_11', 'IRI_15', 'IRI_21', 'IRI_25', 'IRI_28'],
    reversed: ['IRI_3', 'IRI_15'], // Items to reverse score
  },
  FS: {
    name: 'Fantasy',
    questions: ['IRI_1', 'IRI_5', 'IRI_7', 'IRI_12', 'IRI_16', 'IRI_23', 'IRI_26'],
    reversed: ['IRI_7', 'IRI_12'],
  },
  EC: {
    name: 'Empathic Concern',
    questions: ['IRI_2', 'IRI_4', 'IRI_9', 'IRI_14', 'IRI_18', 'IRI_20', 'IRI_22'],
    reversed: ['IRI_4', 'IRI_14', 'IRI_18'],
  },
  PD: {
    name: 'Personal Distress',
    questions: ['IRI_6', 'IRI_10', 'IRI_13', 'IRI_17', 'IRI_19', 'IRI_24', 'IRI_27'],
    reversed: ['IRI_13', 'IRI_19'],
  },
};

// Reverse score a value (0-4 scale becomes 4-0)
const reverseScore = (value) => {
  if (value === null || value === undefined) return null;
  return 4 - value;
};

// Calculate subscale score from answers
const calculateSubscaleScore = (answers, subscale) => {
  const subscaleConfig = IRI_SUBSCALES[subscale];
  if (!subscaleConfig) return null;

  let total = 0;
  let count = 0;

  for (const answer of answers) {
    const questionKey = answer.question.questionKey;
    if (!subscaleConfig.questions.includes(questionKey)) continue;

    const value = answer.numericValue ? Number(answer.numericValue) : null;
    if (value === null) continue;

    // Apply reverse scoring if needed
    const score = subscaleConfig.reversed.includes(questionKey)
      ? reverseScore(value)
      : value;

    total += score;
    count++;
  }

  // Each subscale has 7 items, max score is 28 (7 × 4)
  return count > 0 ? total : null;
};

const getIRIProfiles = async (req, res, next) => {
  try {
    // 1. Get the IRI test
    const iriTest = await prisma.responseProfileTest.findUnique({
      where: { name: 'Interpersonal Reactivity Index' },
      include: {
        questions: true,
      },
    });

    if (!iriTest) {
      return res.status(404).json({
        success: false,
        error: 'IRI test not found',
      });
    }

    // 2. Get all IRI answers with model version information
    const answers = await prisma.responseProfileAnswer.findMany({
      where: {
        question: {
          testId: iriTest.id,
        },
        isApproved: true,
      },
      include: {
        question: true,
        evaluationEntity: {
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
        },
      },
    });

    // 3. Group answers by model version and calculate subscale scores
    const profilesByModelVersion = {};

    for (const answer of answers) {
      const modelVersion = answer.evaluationEntity?.modelVersion;
      if (!modelVersion) continue;

      const versionId = modelVersion.id;

      if (!profilesByModelVersion[versionId]) {
        profilesByModelVersion[versionId] = {
          modelVersion,
          answers: [],
        };
      }

      profilesByModelVersion[versionId].answers.push(answer);
    }

    // 4. Calculate scores for each model version
    const profiles = Object.values(profilesByModelVersion).map((data) => {
      const modelVersion = data.modelVersion;
      const model = modelVersion.model;
      const family = model?.modelFamily;

      return {
        id: `iri-${modelVersion.id}`,
        model_version_id: modelVersion.id,
        version: modelVersion.version,
        is_latest: modelVersion.isLatest,
        release_date: modelVersion.releaseDate,
        model_id: model?.id ?? null,
        model_name: model?.name ?? null,
        model_family: family?.name ?? null,
        perspective_taking: calculateSubscaleScore(data.answers, 'PT'),
        fantasy: calculateSubscaleScore(data.answers, 'FS'),
        empathic_concern: calculateSubscaleScore(data.answers, 'EC'),
        personal_distress: calculateSubscaleScore(data.answers, 'PD'),
      };
    });

    // 5. Sort by model name and version
    profiles.sort((a, b) => {
      const nameCompare = (a.model_name || '').localeCompare(b.model_name || '');
      if (nameCompare !== 0) return nameCompare;
      return (b.version || '').localeCompare(a.version || '');
    });

    res.json({
      success: true,
      data: profiles,
    });
  } catch (error) {
    console.error('Error fetching IRI profiles:', error);
    next(error);
  }
};

module.exports = {
  getIRIProfiles,
};
