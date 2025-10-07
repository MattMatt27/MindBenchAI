const { PrismaClient, EntityType } = require('../../../../prisma/generated/prisma');

const prisma = new PrismaClient();

const ENTITY_TYPE_QUERY_MAP = {
  tool_configuration: EntityType.TOOL_CONFIGURATION,
  base_model: EntityType.MODEL_VERSION,
};

const toClientEntityType = (entityType) =>
  entityType === EntityType.TOOL_CONFIGURATION ? 'tool_configuration' : 'base_model';

const extractAnswerValue = (answer) => {
  const rawPayload = answer.answer ?? null;
  let typeSource = answer.question.questionType;
  let value = rawPayload;

  if (rawPayload && typeof rawPayload === 'object' && 'value' in rawPayload) {
    value = rawPayload.value;
    if (rawPayload.type) {
      typeSource = rawPayload.type.toUpperCase();
    }
  }

  const normalizedType = (typeSource || 'TEXT').toString().toLowerCase();

  if (normalizedType === 'boolean' && typeof value !== 'boolean') {
    value = Boolean(value);
  }

  return {
    type: normalizedType,
    value,
  };
};

const getTechProfileDisplay = async (req, res, next) => {
  try {
    const rawEntityType = req.query.entityType?.toLowerCase();
    const whereClause = {
      isApproved: true,
      ...(rawEntityType && ENTITY_TYPE_QUERY_MAP[rawEntityType]
        ? { entityType: ENTITY_TYPE_QUERY_MAP[rawEntityType] }
        : {}),
    };

    const answers = await prisma.techProfileAnswer.findMany({
      where: whereClause,
      include: {
        question: true,
        evaluationEntity: {
          include: {
            toolConfiguration: {
              include: {
                tool: true,
                model: true,
              },
            },
            modelVersion: {
              include: { model: true },
            },
          },
        },
      },
      orderBy: [
        { entityId: 'asc' },
        { question: { displayOrder: 'asc' } },
      ],
    });

    const grouped = new Map();

    for (const answer of answers) {
      const entityType = toClientEntityType(answer.entityType);
      const question = answer.question;
      const evaluationEntity = answer.evaluationEntity;

      const toolConfiguration = evaluationEntity?.toolConfiguration;
      const modelVersion = evaluationEntity?.modelVersion;
      const modelFromToolConfig = toolConfiguration?.model;
      const baseModel = modelVersion?.model ?? modelFromToolConfig;

      const profileId = toolConfiguration?.id || modelVersion?.id || answer.entityId;

      if (!grouped.has(profileId)) {
        if (entityType === 'tool_configuration') {
          grouped.set(profileId, {
            id: profileId,
            entity_type: entityType,
            name: toolConfiguration?.configurationName ?? null,
            tool_name: toolConfiguration?.tool?.name ?? null,
            base_model_name: modelFromToolConfig?.name ?? null,
            answers: {},
          });
        } else {
          grouped.set(profileId, {
            id: profileId,
            entity_type: entityType,
            name: baseModel?.name ?? null,
            developer: baseModel?.developer ?? null,
            version: modelVersion?.version ?? null,
            answers: {},
          });
        }
      }

      const bucket = grouped.get(profileId);
      if (!bucket) {
        continue;
      }

      bucket.answers[question.questionKey] = {
        ...extractAnswerValue(answer),
        notes: answer.notes ?? null,
      };
    }

    res.json({ success: true, data: Array.from(grouped.values()) });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTechProfileDisplay,
};
