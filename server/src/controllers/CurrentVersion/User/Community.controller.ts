import { Request, Response, NextFunction } from 'express';
import { PrismaClient, UpdateCategory, SuggestionStatus, SuggestionCategory } from '../../../../prisma/generated/prisma';

const prisma = new PrismaClient();

// Map query parameter update categories to Prisma UpdateCategory enum
const UPDATE_CATEGORY_QUERY_MAP: Record<string, UpdateCategory> = {
  feature: UpdateCategory.FEATURE,
  bug_fix: UpdateCategory.BUG_FIX,
  improvement: UpdateCategory.IMPROVEMENT,
  announcement: UpdateCategory.ANNOUNCEMENT,
  research: UpdateCategory.RESEARCH,
  community: UpdateCategory.COMMUNITY,
};

// Map query parameter suggestion status to Prisma SuggestionStatus enum
const SUGGESTION_STATUS_QUERY_MAP: Record<string, SuggestionStatus> = {
  open_vote: SuggestionStatus.OPEN_VOTE,
  under_review: SuggestionStatus.UNDER_REVIEW,
  planned: SuggestionStatus.PLANNED,
  in_progress: SuggestionStatus.IN_PROGRESS,
  completed: SuggestionStatus.COMPLETED,
  declined: SuggestionStatus.DECLINED,
  duplicate: SuggestionStatus.DUPLICATE,
};

// Map query parameter suggestion category to Prisma SuggestionCategory enum
const SUGGESTION_CATEGORY_QUERY_MAP: Record<string, SuggestionCategory> = {
  feature: SuggestionCategory.FEATURE,
  benchmark: SuggestionCategory.BENCHMARK,
  model: SuggestionCategory.MODEL,
  ui_ux: SuggestionCategory.UI_UX,
  documentation: SuggestionCategory.DOCUMENTATION,
  bug: SuggestionCategory.BUG,
  other: SuggestionCategory.OTHER,
};

// Convert Prisma UpdateCategory enum to client-friendly string
const toClientUpdateCategory = (category: UpdateCategory): string => {
  if (category === UpdateCategory.FEATURE) return 'feature';
  if (category === UpdateCategory.BUG_FIX) return 'bug_fix';
  if (category === UpdateCategory.IMPROVEMENT) return 'improvement';
  if (category === UpdateCategory.ANNOUNCEMENT) return 'announcement';
  if (category === UpdateCategory.RESEARCH) return 'research';
  if (category === UpdateCategory.COMMUNITY) return 'community';
  return 'announcement';
};

// Convert Prisma SuggestionStatus enum to client-friendly string
const toClientSuggestionStatus = (status: SuggestionStatus): string => {
  if (status === SuggestionStatus.OPEN_VOTE) return 'open_vote';
  if (status === SuggestionStatus.UNDER_REVIEW) return 'under_review';
  if (status === SuggestionStatus.PLANNED) return 'planned';
  if (status === SuggestionStatus.IN_PROGRESS) return 'in_progress';
  if (status === SuggestionStatus.COMPLETED) return 'completed';
  if (status === SuggestionStatus.DECLINED) return 'declined';
  if (status === SuggestionStatus.DUPLICATE) return 'duplicate';
  return 'open_vote';
};

// Convert Prisma SuggestionCategory enum to client-friendly string
const toClientSuggestionCategory = (category: SuggestionCategory | null): string | null => {
  if (!category) return null;
  if (category === SuggestionCategory.FEATURE) return 'feature';
  if (category === SuggestionCategory.BENCHMARK) return 'benchmark';
  if (category === SuggestionCategory.MODEL) return 'model';
  if (category === SuggestionCategory.UI_UX) return 'ui_ux';
  if (category === SuggestionCategory.DOCUMENTATION) return 'documentation';
  if (category === SuggestionCategory.BUG) return 'bug';
  if (category === SuggestionCategory.OTHER) return 'other';
  return null;
};

/**
 * GET /api/current/community/updates
 * Fetch community updates/news with optional filtering
 * Query params:
 *  - category: feature | bug_fix | improvement | announcement | research | community
 *  - isFeatured: true | false
 *  - isPublished: true | false (default: true)
 *  - limit: number (optional)
 */
export const getUpdates = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const rawCategory = (req.query.category as string)?.toLowerCase();
    const isFeatured = req.query.isFeatured === 'true';
    const isPublished = req.query.isPublished !== 'false'; // Default to true
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;

    const whereClause: any = {
      isPublished,
    };

    // Filter by category if provided
    if (rawCategory && UPDATE_CATEGORY_QUERY_MAP[rawCategory]) {
      whereClause.category = UPDATE_CATEGORY_QUERY_MAP[rawCategory];
    }

    // Filter by featured status if explicitly requested
    if (req.query.isFeatured !== undefined) {
      whereClause.isFeatured = isFeatured;
    }

    const updates = await prisma.update.findMany({
      where: whereClause,
      include: {
        createdByUser: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        reactions: true,
      },
      orderBy: [
        { date: 'desc' },
        { createdAt: 'desc' },
      ],
      take: limit,
    });

    // Transform to client-friendly format
    const transformedUpdates = updates.map((update) => ({
      id: update.id,
      date: update.date.toISOString(),
      title: update.title,
      category: toClientUpdateCategory(update.category),
      note: update.note,
      image_url: update.imageUrl,
      image_storage_path: update.imageStoragePath,
      is_published: update.isPublished,
      is_featured: update.isFeatured,
      published_at: update.publishedAt ? update.publishedAt.toISOString() : null,
      slug: update.slug,
      created_at: update.createdAt.toISOString(),
      created_by: update.createdBy,
      created_by_user: update.createdByUser,
      updated_at: update.updatedAt ? update.updatedAt.toISOString() : null,
      reaction_count: update.reactions.length,
    }));

    res.json({
      success: true,
      data: transformedUpdates,
      count: transformedUpdates.length,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/current/community/suggestions
 * Fetch community suggestions with optional filtering
 * Query params:
 *  - status: open_vote | under_review | planned | in_progress | completed | declined | duplicate
 *  - category: feature | benchmark | model | ui_ux | documentation | bug | other
 *  - isVisible: true | false (default: true)
 *  - limit: number (optional)
 */
export const getSuggestions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const rawStatus = (req.query.status as string)?.toLowerCase();
    const rawCategory = (req.query.category as string)?.toLowerCase();
    const isVisible = req.query.isVisible !== 'false'; // Default to true
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;

    const whereClause: any = {
      isVisible,
    };

    // Filter by status if provided
    if (rawStatus && SUGGESTION_STATUS_QUERY_MAP[rawStatus]) {
      whereClause.status = SUGGESTION_STATUS_QUERY_MAP[rawStatus];
    }

    // Filter by category if provided
    if (rawCategory && SUGGESTION_CATEGORY_QUERY_MAP[rawCategory]) {
      whereClause.category = SUGGESTION_CATEGORY_QUERY_MAP[rawCategory];
    }

    const suggestions = await prisma.suggestion.findMany({
      where: whereClause,
      include: {
        createdByUser: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        reviewer: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        votes: true,
      },
      orderBy: [
        { voteCount: 'desc' },
        { createdAt: 'desc' },
      ],
      take: limit,
    });

    // Transform to client-friendly format
    const transformedSuggestions = suggestions.map((suggestion) => ({
      id: suggestion.id,
      title: suggestion.title,
      description: suggestion.description,
      category: toClientSuggestionCategory(suggestion.category),
      status: toClientSuggestionStatus(suggestion.status),
      priority: suggestion.priority,
      vote_count: suggestion.voteCount,
      is_visible: suggestion.isVisible,
      reviewed_by: suggestion.reviewedBy,
      reviewed_at: suggestion.reviewedAt ? suggestion.reviewedAt.toISOString() : null,
      implemented_at: suggestion.implementedAt ? suggestion.implementedAt.toISOString() : null,
      closed_at: suggestion.closedAt ? suggestion.closedAt.toISOString() : null,
      closed_reason: suggestion.closedReason,
      related_issue_url: suggestion.relatedIssueUrl,
      created_at: suggestion.createdAt.toISOString(),
      created_by: suggestion.createdBy,
      created_by_user: suggestion.createdByUser,
      reviewer: suggestion.reviewer,
      updated_at: suggestion.updatedAt ? suggestion.updatedAt.toISOString() : null,
      user_votes: suggestion.votes.length,
    }));

    res.json({
      success: true,
      data: transformedSuggestions,
      count: transformedSuggestions.length,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/current/community/team-members
 * Fetch team members
 * Query params:
 *  - isActive: true | false (default: true)
 */
export const getTeamMembers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const isActive = req.query.isActive !== 'false'; // Default to true

    const teamMembers = await prisma.teamMember.findMany({
      where: {
        isActive,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
      orderBy: [
        { sortOrder: 'asc' },
        { startDate: 'desc' },
      ],
    });

    // Transform to client-friendly format
    const transformedTeamMembers = teamMembers.map((member) => ({
      id: member.id,
      user_id: member.userId,
      display_name: member.displayName,
      role: member.role,
      bio: member.bio,
      avatar_url: member.avatarUrl,
      image_storage_path: member.imageStoragePath,
      sort_order: member.sortOrder,
      start_date: member.startDate ? member.startDate.toISOString() : null,
      end_date: member.endDate ? member.endDate.toISOString() : null,
      social_links: member.socialLinks,
      expertise: member.expertise,
      is_active: member.isActive,
      created_at: member.createdAt.toISOString(),
      updated_at: member.updatedAt ? member.updatedAt.toISOString() : null,
      user: member.user,
    }));

    res.json({
      success: true,
      data: transformedTeamMembers,
      count: transformedTeamMembers.length,
    });
  } catch (error) {
    next(error);
  }
};
