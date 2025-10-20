import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '../../../../prisma/generated/prisma';
import type { AnswerWithQuestion } from '../../../types/api';

const prisma = new PrismaClient();

// Import scoring modules
const iriScoring = require('../../../scoring/conversationalProfile/iri.scoring');
const hexacoScoring = require('../../../scoring/conversationalProfile/hexaco.scoring');

// Scoring module interface
interface ScoringModule {
  calculateScores: (answers: AnswerWithQuestion[]) => Record<string, number | null>;
  testName: string;
}

// Map test names to their scoring modules
const SCORING_MODULES: Record<string, ScoringModule> = {
  'Interpersonal Reactivity Index': iriScoring,
  'HEXACO Personality Inventory': hexacoScoring,
};

/**
 * Get profiles for a specific conversational profile test
 * Fetches answers, applies test-specific scoring logic, and returns aggregated scores
 */
export const getProfiles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { testName } = req.params;

    // If no test name provided, default to IRI for backward compatibility
    const requestedTestName = testName || 'Interpersonal Reactivity Index';

    // Get the scoring module for this test
    const scoringModule = SCORING_MODULES[requestedTestName];

    if (!scoringModule) {
      res.status(404).json({
        success: false,
        error: `No scoring module found for test: ${requestedTestName}`,
      });
      return;
    }

    // 1. Get the test definition
    const test = await prisma.conversationalProfileTest.findFirst({
      where: { name: requestedTestName },
      include: {
        questions: true,
      },
    });

    if (!test) {
      res.status(404).json({
        success: false,
        error: `Test '${requestedTestName}' not found`,
      });
      return;
    }

    // 2. Get all approved answers with model version information
    const answers = await prisma.conversationalProfileAnswer.findMany({
      where: {
        question: {
          testId: test.id,
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

    // 3. Group answers by model version
    const profilesByModelVersion: Record<string, any> = {};

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

    // 4. Calculate scores for each model version using the scoring module
    const profiles = Object.values(profilesByModelVersion).map((data) => {
      const modelVersion = data.modelVersion;
      const model = modelVersion.model;
      const family = model?.modelFamily;

      // Apply test-specific scoring logic
      const scores = scoringModule.calculateScores(data.answers);

      return {
        id: `${requestedTestName.toLowerCase().replace(/\s+/g, '-')}-${modelVersion.id}`,
        test_name: requestedTestName,
        model_version_id: modelVersion.id,
        version: modelVersion.version,
        is_latest: modelVersion.isLatest,
        release_date: modelVersion.releaseDate,
        model_id: model?.id ?? null,
        model_name: model?.name ?? null,
        model_family: family?.name ?? null,
        ...scores, // Spread the test-specific scores
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
      test: requestedTestName,
      data: profiles,
    });
  } catch (error) {
    console.error('Error fetching conversational profiles:', error);
    next(error);
  }
};

/**
 * Get list of available conversational profile tests
 */
export const getAvailableTests = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tests = await prisma.conversationalProfileTest.findMany({
      where: {
        isPublic: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        testType: true,
        version: true,
        isValidated: true,
        scaleMin: true,
        scaleMax: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    res.json({
      success: true,
      data: tests,
    });
  } catch (error) {
    console.error('Error fetching available tests:', error);
    next(error);
  }
};

// For backward compatibility with existing IRI routes
export const getIRIProfiles = (req: Request, res: Response, next: NextFunction): Promise<void> => {
  req.params.testName = 'Interpersonal Reactivity Index';
  return getProfiles(req, res, next);
};
