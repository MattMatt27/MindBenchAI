import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '../../../../prisma/generated/prisma';

const prisma = new PrismaClient();

interface HyperparameterConfig {
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  [key: string]: any;
}

interface LeaderboardEntry {
  id: string;
  modelFamily: string;
  model: string;
  version: string;
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  system_prompt_id?: string;
  message_prompt_id?: string;
  SIRI_2?: number;
  A_pharm?: number;
  A_mamh?: number;
}

/**
 * Get leaderboard data with aggregated benchmark scores
 * Returns ALL model versions (not just latest) to support frontend expand/collapse
 * Supports filtering by model family, temperature, top_p, system/message prompts
 */
export const getLeaderboardData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Extract filter parameters from query
    const {
      modelFamily,
      temperature,
      top_p,
      system_prompt_id,
      message_prompt_id,
    } = req.query;

    // Build where clause for filters
    const whereClause: any = {};

    // Apply model family filter if provided
    if (modelFamily) {
      whereClause.modelVersion = {
        model: {
          modelFamily: {
            name: modelFamily as string,
          },
        },
      };
    }

    // Apply hyperparameter filters if provided
    if (temperature || top_p) {
      const hyperparameterFilters: any = {};
      if (temperature) {
        hyperparameterFilters.path = ['temperature'];
        hyperparameterFilters.equals = parseFloat(temperature as string);
      }
      // Note: Filtering on multiple JSON fields simultaneously is complex in Prisma
      // We'll apply these filters in-memory after fetching
    }

    // Apply prompt filters
    if (system_prompt_id) {
      whereClause.systemPromptId = system_prompt_id as string;
    }
    if (message_prompt_id) {
      whereClause.messagePromptId = message_prompt_id as string;
    }

    // Fetch all benchmark score aggregates with related data
    const aggregates = await prisma.benchmarkScoreAggregate.findMany({
      where: whereClause,
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
        scale: true,
        systemPrompt: true,
        messagePrompt: true,
      },
      orderBy: [
        { modelVersion: { model: { modelFamily: { name: 'asc' } } } },
        { modelVersion: { model: { name: 'asc' } } },
        { modelVersion: { version: 'desc' } },
      ],
    });

    // Group aggregates by unique configuration
    // Key: modelVersionId + hyperparameterHash + systemPromptId + messagePromptId
    const groupedData = new Map<string, LeaderboardEntry>();

    for (const aggregate of aggregates) {
      const modelVersion = aggregate.modelVersion;
      const model = modelVersion.model;
      const modelFamilyName = model.modelFamily?.name || 'Unknown';
      const scaleName = aggregate.scale.name;

      // Extract hyperparameters from config JSON
      const hyperparameterConfig = (aggregate.hyperparameterConfig as HyperparameterConfig) || {};
      const temp = hyperparameterConfig.temperature;
      const topP = hyperparameterConfig.top_p;
      const maxTokens = hyperparameterConfig.max_tokens;

      // Apply in-memory filters for hyperparameters
      if (temperature && temp !== parseFloat(temperature as string)) continue;
      if (top_p && topP !== parseFloat(top_p as string)) continue;

      // Create unique key for grouping
      const groupKey = `${modelVersion.id}-${aggregate.hyperparameterHash || 'default'}-${aggregate.systemPromptId || 'none'}-${aggregate.messagePromptId || 'none'}`;

      // Initialize entry if it doesn't exist
      if (!groupedData.has(groupKey)) {
        groupedData.set(groupKey, {
          id: groupKey,
          modelFamily: modelFamilyName,
          model: model.name,
          version: modelVersion.version,
          temperature: temp,
          top_p: topP,
          max_tokens: maxTokens,
          system_prompt_id: aggregate.systemPromptId || undefined,
          message_prompt_id: aggregate.messagePromptId || undefined,
        });
      }

      const entry = groupedData.get(groupKey)!;

      // Map scale names to leaderboard column names
      // Scale names from seed: "SIRI-2", "A-Pharm", "A-MaMH"
      // Frontend expects: SIRI_2, A_pharm, A_mamh
      const scaleMapping: Record<string, keyof LeaderboardEntry> = {
        'SIRI-2': 'SIRI_2',
        'A-Pharm': 'A_pharm',
        'A-MaMH': 'A_mamh',
      };

      const mappedKey = scaleMapping[scaleName];
      if (mappedKey) {
        entry[mappedKey] = aggregate.rmseVsExperts ?? undefined;
      }
    }

    // Convert map to array
    const leaderboardData = Array.from(groupedData.values());

    res.json({
      success: true,
      data: leaderboardData,
      count: leaderboardData.length,
    });
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    next(error);
  }
};

/**
 * Get available system prompts for filtering
 * Returns prompts in format: { id, name, content }
 */
export const getSystemPrompts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const prompts = await prisma.benchmarkPrompt.findMany({
      where: {
        promptType: 'system',
      },
      select: {
        id: true,
        name: true,
        content: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    res.json({
      success: true,
      data: prompts,
    });
  } catch (error) {
    console.error('Error fetching system prompts:', error);
    next(error);
  }
};

/**
 * Get available message prompts for filtering
 * Returns prompts in format: { id, name, content }
 */
export const getMessagePrompts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const prompts = await prisma.benchmarkPrompt.findMany({
      where: {
        promptType: 'message',
      },
      select: {
        id: true,
        name: true,
        content: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    res.json({
      success: true,
      data: prompts,
    });
  } catch (error) {
    console.error('Error fetching message prompts:', error);
    next(error);
  }
};

/**
 * Get available model families with their models
 * Returns in format compatible with frontend expectations
 */
export const getModelFamilies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const families = await prisma.modelFamily.findMany({
      include: {
        models: {
          select: {
            id: true,
            name: true,
          },
          orderBy: {
            name: 'asc',
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    // Transform to object format: { 'GPT': ['GPT-4o', 'GPT-3.5 Turbo'], ... }
    const familiesObject: Record<string, string[]> = {};
    families.forEach(family => {
      familiesObject[family.name] = family.models.map(model => model.name);
    });

    res.json({
      success: true,
      data: familiesObject,
    });
  } catch (error) {
    console.error('Error fetching model families:', error);
    next(error);
  }
};
