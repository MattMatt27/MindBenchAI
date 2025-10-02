const { PrismaClient, EntityType } = require('../../../../prisma/generated/prisma');

const prisma = new PrismaClient();

const ENTITY_TYPE_QUERY_MAP = {
  tool_configuration: EntityType.TOOL_CONFIGURATION,
  base_model: EntityType.MODEL_VERSION,
};

const toClientEntityType = (entityType) =>
  entityType === EntityType.TOOL_CONFIGURATION ? 'tool_configuration' : 'base_model';

const toNumber = (value) =>
  value && typeof value.toNumber === 'function' ? value.toNumber() : value ?? null;

const formatToolConfiguration = (answer) => {
  const { toolConfiguration, question } = answer;
  const tool = toolConfiguration?.tool;
  const modelVersion = toolConfiguration?.modelVersion;
  const baseModel = modelVersion?.model;

  return {
    entity_type: toClientEntityType(answer.entityType),
    entity_id: toolConfiguration?.id ?? answer.entityId,
    entity_name: toolConfiguration?.configurationName ?? null,
    tool_name: tool?.name ?? null,
    base_model_name: baseModel?.name ?? null,
    question_id: question.id,
    question_key: question.questionKey,
    question_text: question.questionText,
    category: question.category,
    question_type: question.questionType.toLowerCase(),
    display_order: question.displayOrder,
    boolean_value: answer.booleanValue,
    numeric_value: toNumber(answer.numericValue),
    text_value: answer.textValue,
    list_value: answer.listValue,
    evidence_url: answer.evidenceUrl ?? null,
  };
};

const formatModelVersion = (answer) => {
  const { modelVersion, question } = answer;
  const model = modelVersion?.model;

  return {
    entity_type: toClientEntityType(answer.entityType),
    entity_id: modelVersion?.id ?? answer.entityId,
    entity_name: model?.name ?? null,
    developer: model?.developer ?? null,
    version: modelVersion?.version ?? null,
    question_id: question.id,
    question_key: question.questionKey,
    question_text: question.questionText,
    category: question.category,
    question_type: question.questionType.toLowerCase(),
    display_order: question.displayOrder,
    boolean_value: answer.booleanValue,
    numeric_value: toNumber(answer.numericValue),
    text_value: answer.textValue,
    list_value: answer.listValue,
    evidence_url: answer.evidenceUrl ?? null,
  };
};

const formatAnswer = (answer) =>
  answer.entityType === EntityType.TOOL_CONFIGURATION
    ? formatToolConfiguration(answer)
    : formatModelVersion(answer);

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
        toolConfiguration: {
          include: {
            tool: true,
            modelVersion: {
              include: { model: true },
            },
          },
        },
        modelVersion: {
          include: { model: true },
        },
      },
      orderBy: [
        { entityId: 'asc' },
        { question: { displayOrder: 'asc' } },
      ],
    });

    const payload = answers.map(formatAnswer).filter(Boolean);
    res.json({ success: true, data: payload });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTechProfileDisplay,
};
