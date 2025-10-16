module.exports = async function seedRatings(
  prisma,
  { researcherUser, professionalUser, benchmarking }
) {
  const expertUsers = [researcherUser, professionalUser];
  const { aPharmQuestion, aMamhQuestion, siriQuestion } = benchmarking;
  const questions = [aPharmQuestion, aMamhQuestion, siriQuestion];

  for (const question of questions) {
    for (let i = 0; i < 12; i++) {
      const expert = expertUsers[i % expertUsers.length];
      const baseScore =
        question.id === aPharmQuestion.id
          ? 8
          : question.id === aMamhQuestion.id
          ? 9
          : 7;
      const variance = (Math.random() - 0.5) * 2;
      const rating = Math.max(1, Math.min(10, baseScore + variance));

      await prisma.benchmarkRating.create({
        data: {
          questionId: question.id,
          userId: expert.id,
          rating,
          confidence: 0.7 + Math.random() * 0.3,
          reasoning: 'Expert assessment based on clinical experience and literature review',
          metadata: {
            expertiseAreas: ['clinical_practice', 'pharmacology', 'psychiatry'],
            yearsExperience: 10 + i,
            ratingContext: 'initial_calibration',
          },
          createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
        },
      });
    }
  }

  console.log('Created sample expert ratings for aggregation testing');
};
