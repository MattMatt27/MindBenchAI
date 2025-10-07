module.exports = async function seedCommunity(prisma, { researcherUser, regularUser }) {
  await prisma.update.create({
    data: {
      date: new Date('2024-09-01'),
      title: 'Platform Launch',
      tag: 'new features',
      note: 'Welcome to MindBench.ai! Our platform for benchmarking AI models is now live.',
      isPublished: true,
      createdBy: researcherUser.id,
    },
  });

  await prisma.update.create({
    data: {
      date: new Date('2024-09-15'),
      title: 'Added GPT-4o and Claude Opus',
      tag: 'updates',
      note: 'New models have been added to our benchmarking suite.',
      isPublished: true,
      createdBy: researcherUser.id,
    },
  });

  await prisma.suggestion.create({
    data: {
      title: 'Add DeepSeek models',
      description: 'Please add DeepSeek-V3 and V2.5 to the platform',
      status: 'open_vote',
      voteCount: 15,
      isVisible: true,
      createdBy: regularUser.id,
    },
  });

  await prisma.suggestion.create({
    data: {
      title: 'Dark mode',
      description: 'Add a dark mode toggle for better viewing experience',
      status: 'planned',
      voteCount: 42,
      isVisible: true,
      createdBy: researcherUser.id,
    },
  });
};
