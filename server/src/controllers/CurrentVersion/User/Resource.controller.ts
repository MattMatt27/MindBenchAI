import { Request, Response, NextFunction } from 'express';
import { PrismaClient, BenchmarkType } from '../../../../prisma/generated/prisma';

const prisma = new PrismaClient();

// Map query parameter benchmark types to Prisma BenchmarkType enum
const BENCHMARK_TYPE_QUERY_MAP: Record<string, BenchmarkType> = {
  multiple_choice: BenchmarkType.MULTIPLE_CHOICE,
  open_ended: BenchmarkType.OPEN_ENDED,
  conversation: BenchmarkType.CONVERSATION,
  mixed: BenchmarkType.MIXED,
  other: BenchmarkType.OTHER,
};

// Convert Prisma BenchmarkType enum to client-friendly string
const toClientBenchmarkType = (benchmarkType: BenchmarkType): string => {
  if (benchmarkType === BenchmarkType.MULTIPLE_CHOICE) return 'multiple_choice';
  if (benchmarkType === BenchmarkType.OPEN_ENDED) return 'open_ended';
  if (benchmarkType === BenchmarkType.CONVERSATION) return 'conversation';
  if (benchmarkType === BenchmarkType.MIXED) return 'mixed';
  if (benchmarkType === BenchmarkType.OTHER) return 'other';
  return 'other';
};

/**
 * GET /api/current/resources/benchmarks
 * Fetch resource benchmarks with optional filtering
 * Query params:
 *  - benchmarkType: multiple_choice | open_ended | conversation | mixed | other
 *  - isFeatured: true | false
 *  - isActive: true | false (default: true)
 *  - organization: string
 */
export const getResourceBenchmarks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const rawBenchmarkType = (req.query.benchmarkType as string)?.toLowerCase();
    const isFeatured = req.query.isFeatured === 'true';
    const isActive = req.query.isActive !== 'false'; // Default to true
    const organization = req.query.organization as string | undefined;

    const whereClause: any = {
      isActive,
    };

    // Filter by benchmark type if provided
    if (rawBenchmarkType && BENCHMARK_TYPE_QUERY_MAP[rawBenchmarkType]) {
      whereClause.benchmarkType = BENCHMARK_TYPE_QUERY_MAP[rawBenchmarkType];
    }

    // Filter by featured status if explicitly requested
    if (req.query.isFeatured !== undefined) {
      whereClause.isFeatured = isFeatured;
    }

    // Filter by organization if provided
    if (organization) {
      whereClause.organization = {
        contains: organization,
        mode: 'insensitive',
      };
    }

    const benchmarks = await prisma.resourceBenchmark.findMany({
      where: whereClause,
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: [
        { isFeatured: 'desc' },
        { firstReleased: 'desc' },
        { name: 'asc' },
      ],
    });

    // Transform to client-friendly format
    const transformedBenchmarks = benchmarks.map((benchmark) => ({
      id: benchmark.id,
      name: benchmark.name,
      description: benchmark.description,
      benchmark_type: toClientBenchmarkType(benchmark.benchmarkType),
      format: benchmark.format,
      image_url: benchmark.imageUrl,
      image_storage_path: benchmark.imageStoragePath,
      links: benchmark.links,
      first_released: benchmark.firstReleased
        ? benchmark.firstReleased.toISOString()
        : null,
      organization: benchmark.organization,
      language: benchmark.language,
      question_count: benchmark.questionCount,
      is_active: benchmark.isActive,
      is_featured: benchmark.isFeatured,
      metadata: benchmark.metadata,
      tags: benchmark.tags.map((tagLink) => ({
        id: tagLink.tag.id,
        name: tagLink.tag.name,
        slug: tagLink.tag.slug,
        category: tagLink.tag.category,
        color: tagLink.tag.color,
        icon: tagLink.tag.icon,
      })),
      created_at: benchmark.createdAt.toISOString(),
      updated_at: benchmark.updatedAt ? benchmark.updatedAt.toISOString() : null,
    }));

    res.json({
      success: true,
      data: transformedBenchmarks,
      count: transformedBenchmarks.length,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/current/resources/benchmarks/:id
 * Fetch a single resource benchmark by ID
 */
export const getResourceBenchmarkById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const benchmark = await prisma.resourceBenchmark.findUnique({
      where: { id },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!benchmark) {
      res.status(404).json({
        success: false,
        error: 'Benchmark not found',
      });
      return;
    }

    // Transform to client-friendly format
    const transformedBenchmark = {
      id: benchmark.id,
      name: benchmark.name,
      description: benchmark.description,
      benchmark_type: toClientBenchmarkType(benchmark.benchmarkType),
      format: benchmark.format,
      image_url: benchmark.imageUrl,
      image_storage_path: benchmark.imageStoragePath,
      links: benchmark.links,
      first_released: benchmark.firstReleased
        ? benchmark.firstReleased.toISOString()
        : null,
      organization: benchmark.organization,
      language: benchmark.language,
      question_count: benchmark.questionCount,
      is_active: benchmark.isActive,
      is_featured: benchmark.isFeatured,
      metadata: benchmark.metadata,
      tags: benchmark.tags.map((tagLink) => ({
        id: tagLink.tag.id,
        name: tagLink.tag.name,
        slug: tagLink.tag.slug,
        category: tagLink.tag.category,
        color: tagLink.tag.color,
        icon: tagLink.tag.icon,
      })),
      created_at: benchmark.createdAt.toISOString(),
      updated_at: benchmark.updatedAt ? benchmark.updatedAt.toISOString() : null,
    };

    res.json({
      success: true,
      data: transformedBenchmark,
    });
  } catch (error) {
    next(error);
  }
};
