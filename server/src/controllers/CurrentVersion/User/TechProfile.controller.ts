import { Request, Response, NextFunction } from 'express';
import { PrismaClient, EntityType, TechProfileAnswer } from '../../../../prisma/generated/prisma';

const prisma = new PrismaClient();

// Map query parameter entity types to Prisma EntityType enum
const ENTITY_TYPE_QUERY_MAP: Record<string, EntityType> = {
  tool_configuration: EntityType.TOOL_CONFIGURATION,
  base_model: EntityType.MODEL_VERSION,
};

// Convert Prisma EntityType enum to client-friendly string
const toClientEntityType = (entityType: EntityType): string | null => {
  if (entityType === EntityType.TOOL_CONFIGURATION) return 'tool_configuration';
  if (entityType === EntityType.MODEL_VERSION) return 'base_model';
  if (entityType === EntityType.BOTH) return 'both';
  return null;
};

// Extract answer value and type from answer payload
interface ExtractedAnswer {
  type: string;
  value: any;
}

const extractAnswerValue = (answer: TechProfileAnswer & { question: any }): ExtractedAnswer => {
  const rawPayload = answer.answer ?? null;
  let typeSource = answer.question.questionType;
  let value = rawPayload;

  if (rawPayload && typeof rawPayload === 'object' && 'value' in rawPayload) {
    value = (rawPayload as any).value;
    if ((rawPayload as any).type) {
      typeSource = (rawPayload as any).type.toUpperCase();
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

// Tech Profile Display endpoint
export const getTechProfileDisplay = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const rawEntityType = (req.query.entityType as string)?.toLowerCase();
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
                model: {
                  include: {
                    modelFamily: true,
                  },
                },
              },
            },
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
      orderBy: [
        { entityId: 'asc' },
        { question: { displayOrder: 'asc' } },
      ],
    });

    const grouped = new Map<string, any>();

    for (const answer of answers) {
      const entityType = toClientEntityType(answer.entityType);
      const question = answer.question;
      const evaluationEntity = answer.evaluationEntity;

      const toolConfiguration = evaluationEntity?.toolConfiguration;
      const modelVersion = evaluationEntity?.modelVersion;
      const modelFromToolConfig = toolConfiguration?.model;
      const baseModel = modelVersion?.model ?? modelFromToolConfig;
      const modelFamily = baseModel?.modelFamily ?? modelFromToolConfig?.modelFamily ?? null;

      const profileId = toolConfiguration?.id || modelVersion?.id || answer.entityId;

      if (!grouped.has(profileId)) {
        if (entityType === 'tool_configuration') {
          grouped.set(profileId, {
            id: profileId,
            entity_type: entityType,
            name: toolConfiguration?.configurationName ?? null,
            tool_name: toolConfiguration?.tool?.name ?? null,
            developer: toolConfiguration?.tool?.developer ?? null,
            base_model_name: modelFromToolConfig?.name ?? null,
            model_family: modelFamily?.name ?? null,
            answers: {},
          });
        } else {
          grouped.set(profileId, {
            id: profileId,
            entity_type: entityType,
            name: baseModel?.name ?? null,
            developer: baseModel?.developer ?? null,
            version: modelVersion?.version ?? null,
            release_date: modelVersion?.releaseDate
              ? modelVersion.releaseDate.toISOString()
              : null,
            is_latest: Boolean(modelVersion?.isLatest),
            model_family: modelFamily?.name ?? null,
            answers: {},
          });
        }
      }

      const bucket = grouped.get(profileId);
      if (!bucket) {
        continue;
      }

      const questionEntityType = toClientEntityType(question.entityType) ?? entityType;

      bucket.answers[question.questionKey] = {
        ...extractAnswerValue(answer),
        notes: answer.notes ?? null,
        category: question.category,
        question_text: question.questionText,
        question_label: question.questionLabel ?? question.questionText,
        display_order: question.displayOrder,
        question_type: question.questionType.toLowerCase(),
        entity_type: questionEntityType,
      };
    }

    res.json({ success: true, data: Array.from(grouped.values()) });
  } catch (error) {
    next(error);
  }
};
