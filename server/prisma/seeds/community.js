module.exports = async function seedCommunity(prisma, { researcherUser, regularUser }) {
  // Updates with new schema
  await prisma.update.create({
    data: {
      date: new Date('2024-09-01'),
      title: 'Platform Launch',
      category: 'ANNOUNCEMENT',
      note: 'Welcome to MindBench.ai! Our platform for benchmarking AI models is now live. We\'re excited to bring rigorous, expert-driven evaluation to mental health AI systems.',
      isPublished: true,
      isFeatured: true,
      publishedAt: new Date('2024-09-01T09:00:00Z'),
      slug: 'platform-launch',
      createdBy: researcherUser.id,
    },
  });

  await prisma.update.create({
    data: {
      date: new Date('2024-09-15'),
      title: 'Added GPT-4o and Claude Opus',
      category: 'FEATURE',
      note: 'New models have been added to our benchmarking suite. GPT-4o and Claude Opus are now available for evaluation across all benchmark scales.',
      isPublished: true,
      isFeatured: false,
      publishedAt: new Date('2024-09-15T14:30:00Z'),
      slug: 'new-models-gpt4o-claude-opus',
      createdBy: researcherUser.id,
    },
  });

  await prisma.update.create({
    data: {
      date: new Date('2024-10-12'),
      title: 'Improved Leaderboard Performance',
      category: 'IMPROVEMENT',
      note: 'Optimized database queries for faster leaderboard loading. Average page load time reduced by 60%.',
      isPublished: true,
      isFeatured: false,
      publishedAt: new Date('2024-10-12T11:00:00Z'),
      slug: 'leaderboard-performance-improvements',
      createdBy: researcherUser.id,
    },
  });

  await prisma.update.create({
    data: {
      date: new Date('2024-11-05'),
      title: 'Fixed Rating Submission Bug',
      category: 'BUG_FIX',
      note: 'Resolved an issue where expert ratings were not being saved correctly on mobile devices.',
      isPublished: true,
      isFeatured: false,
      publishedAt: new Date('2024-11-05T16:45:00Z'),
      slug: 'rating-submission-bug-fix',
      createdBy: researcherUser.id,
    },
  });

  // Suggestions with new schema
  await prisma.suggestion.create({
    data: {
      title: 'Add DeepSeek models',
      description: 'Please add DeepSeek-V3 and DeepSeek-V2.5 to the platform. These models have shown impressive performance on reasoning tasks and would be valuable additions to the mental health benchmark suite.',
      category: 'MODEL',
      status: 'OPEN_VOTE',
      priority: 3,
      voteCount: 15,
      isVisible: true,
      createdBy: regularUser.id,
    },
  });

  await prisma.suggestion.create({
    data: {
      title: 'Dark mode',
      description: 'Add a dark mode toggle for better viewing experience, especially during late-night research sessions.',
      category: 'UI_UX',
      status: 'PLANNED',
      priority: 2,
      voteCount: 42,
      isVisible: true,
      reviewedBy: researcherUser.id,
      reviewedAt: new Date('2024-11-10T10:00:00Z'),
      createdBy: regularUser.id,
    },
  });

  await prisma.suggestion.create({
    data: {
      title: 'Add CounselBench to resources page',
      description: 'Include CounselBench in the external benchmarks section of the resources page with links to the paper and GitHub repo.',
      category: 'FEATURE',
      status: 'COMPLETED',
      priority: 4,
      voteCount: 28,
      isVisible: true,
      reviewedBy: researcherUser.id,
      reviewedAt: new Date('2024-10-15T14:00:00Z'),
      implementedAt: new Date('2024-10-20T16:30:00Z'),
      relatedIssueUrl: 'https://github.com/MattMatt27/MindBenchAI/issues/123',
      createdBy: regularUser.id,
    },
  });

  await prisma.suggestion.create({
    data: {
      title: 'Export benchmark results to CSV',
      description: 'Allow users to export their benchmark results and comparisons to CSV format for further analysis.',
      category: 'FEATURE',
      status: 'UNDER_REVIEW',
      priority: 3,
      voteCount: 35,
      isVisible: true,
      reviewedBy: researcherUser.id,
      reviewedAt: new Date('2024-11-12T09:30:00Z'),
      createdBy: regularUser.id,
    },
  });

  await prisma.suggestion.create({
    data: {
      title: 'Add support for GPT-3.5',
      description: 'Include GPT-3.5 Turbo in the available models for benchmarking.',
      category: 'MODEL',
      status: 'DECLINED',
      priority: 1,
      voteCount: 8,
      isVisible: true,
      reviewedBy: researcherUser.id,
      reviewedAt: new Date('2024-09-20T11:00:00Z'),
      closedAt: new Date('2024-09-20T11:15:00Z'),
      closedReason: 'GPT-3.5 does not meet our minimum performance thresholds for mental health applications. We recommend GPT-4 or newer models.',
      createdBy: regularUser.id,
    },
  });

  // Team member example with new fields
  await prisma.teamMember.create({
    data: {
      userId: researcherUser.id,
      displayName: 'Dr. Research Lead',
      role: 'Principal Investigator',
      bio: 'Clinical psychologist and AI researcher specializing in the evaluation of large language models for mental health applications. Focus on ensuring scientific rigor and clinical validity in AI benchmarking.',
      sortOrder: 1,
      startDate: new Date('2023-06-01'),
      socialLinks: {
        github: 'https://github.com/researcher',
        linkedin: 'https://linkedin.com/in/researcher',
        twitter: 'https://twitter.com/researcher'
      },
      expertise: [
        'Clinical Psychology',
        'AI Safety',
        'Mental Health Evaluation',
        'Research Design'
      ],
      isActive: true,
      createdBy: researcherUser.id,
    },
  });
};
