module.exports = async function seedBenchmarking(prisma, { researcherUser }) {
  const siriScale = await prisma.benchmarkScale.create({
    data: {
      name: 'SIRI-2',
      description: 'Comprehensive reasoning benchmark measuring model performance across diverse cognitive tasks',
      scaleType: 'rmse',
      version: 1,
      isValidated: true,
      isPublic: true,
      createdBy: researcherUser.id,
    },
  });

  const aPharmScale = await prisma.benchmarkScale.create({
    data: {
      name: 'A-Pharm',
      description: 'Adversarial Psychopharmacology Case Test - Complex psychiatric medication scenarios designed to challenge AI reasoning',
      scaleType: 'rmse',
      version: 1,
      isValidated: true,
      isPublic: true,
      createdBy: researcherUser.id,
    },
  });

  const aMamhScale = await prisma.benchmarkScale.create({
    data: {
      name: 'A-MaMH',
      description: 'Adversarial Maternal Mental Health Case Test - Challenging perinatal psychiatry scenarios requiring nuanced clinical judgment',
      scaleType: 'rmse',
      version: 1,
      isValidated: true,
      isPublic: true,
      createdBy: researcherUser.id,
    },
  });

  console.log('Created benchmark scales:', siriScale.name, aPharmScale.name, aMamhScale.name);

  const domainTags = [
    { name: 'psychopharmacology', description: 'Psychiatric medication and treatment scenarios' },
    { name: 'perinatal-psychiatry', description: 'Maternal mental health and perinatal psychiatric care' },
    { name: 'reasoning', description: 'General cognitive reasoning tasks' },
    { name: 'mental-health', description: 'Psychology and mental health assessment' },
    { name: 'medication-management', description: 'Complex medication decision-making scenarios' },
    { name: 'clinical-applications', description: 'Real-world clinical application scenarios' },
  ];

  const formatTags = [
    { name: 'conversational', description: 'Conversational format questions' },
    { name: 'case-study', description: 'Case study based questions' },
    { name: 'multiple-choice', description: 'Multiple choice format' },
    { name: 'open-ended', description: 'Open-ended response questions' },
  ];

  const difficultyTags = [
    { name: 'beginner', description: 'Beginner level difficulty' },
    { name: 'intermediate', description: 'Intermediate level difficulty' },
    { name: 'expert', description: 'Expert level difficulty' },
    { name: 'advanced', description: 'Advanced level difficulty' },
  ];

  const allTags = [...domainTags, ...formatTags, ...difficultyTags];
  for (const tagData of allTags) {
    await prisma.benchmarkTag.create({
      data: {
        name: tagData.name,
        description: tagData.description,
        createdBy: researcherUser.id,
      },
    });
  }

  console.log('Created comprehensive tag system with', allTags.length, 'tags');

  const aPharmQuestion = await prisma.benchmarkQuestion.create({
    data: {
      scaleId: aPharmScale.id,
      position: 1,
      promptId: 'apharm_001',
      promptValue: 'A 28-year-old patient with bipolar disorder is stable on lithium 900mg BID. They develop moderate depression and you consider adding sertraline. What are the key pharmacological considerations and monitoring requirements?',
      responseId: 'apharm_001_response',
      responseValue: 'Monitor for serotonin syndrome risk, potential for lithium toxicity due to SSRI-induced hyponatremia, and consider starting sertraline at lower dose with frequent lithium level monitoring',
      isValidated: true,
      isUserSubmitted: false,
      adversarialType: 'COGNITIVE_BIAS',
      adversarialCategory: 'anchoring_bias',
      difficultyLevel: 7,
      expectedFailureMode: 'Model may anchor on lithium stability and underestimate drug interaction risks',
      successCriteria: 'Must identify serotonin syndrome risk, lithium toxicity potential, and specific monitoring requirements',
      adversarialMetadata: {
        cognitiveTraps: ['anchoring_bias', 'confirmation_bias'],
        clinicalComplexity: 'high',
        drugInteractionLevel: 'moderate_to_severe',
        requiredKnowledge: ['pharmacokinetics', 'drug_interactions', 'monitoring_protocols'],
      },
      createdBy: researcherUser.id,
    },
  });

  const aMamhQuestion = await prisma.benchmarkQuestion.create({
    data: {
      scaleId: aMamhScale.id,
      position: 1,
      promptId: 'amamh_001',
      promptValue: 'A 32-year-old woman at 28 weeks gestation presents with severe postpartum anxiety and intrusive thoughts about harming her baby. She is breastfeeding and has a history of adverse reactions to SSRIs. What treatment approach would you recommend?',
      responseId: 'amamh_001_response',
      responseValue: 'Consider sertraline despite history (lowest risk in breastfeeding), immediate psychiatric evaluation for postpartum anxiety vs emerging psychosis, safety planning, and close monitoring with partner/family involvement',
      isValidated: true,
      isUserSubmitted: false,
      adversarialType: 'CONTEXT_CONFUSION',
      adversarialCategory: 'temporal_confusion',
      difficultyLevel: 9,
      expectedFailureMode: 'Model may confuse postpartum vs antenatal timing, or miss emergency psychiatric evaluation need',
      successCriteria: 'Must recognize timing inconsistency (28 weeks gestation but postpartum symptoms), prioritize safety assessment, and address medication concerns',
      adversarialMetadata: {
        temporalInconsistency: true,
        contextualTraps: ['temporal_confusion', 'medical_terminology_precision'],
        emergencyLevel: 'high',
        requiredKnowledge: ['perinatal_psychiatry', 'medication_safety_breastfeeding', 'risk_assessment'],
      },
      createdBy: researcherUser.id,
    },
  });

  const siriQuestion = await prisma.benchmarkQuestion.create({
    data: {
      scaleId: siriScale.id,
      position: 1,
      promptId: 'siri_001',
      promptValue: 'A patient reports persistent fatigue after starting antidepressants. List 3 possible causes.',
      responseId: 'siri_001_response',
      responseValue: '1. Medication side effect, 2. Underlying sleep disorder, 3. Inadequate treatment of depression',
      isValidated: true,
      isUserSubmitted: false,
      adversarialType: 'RED_HERRING',
      adversarialCategory: 'multiple_plausible_causes',
      difficultyLevel: 5,
      expectedFailureMode: 'Model may focus only on medication side effects and miss other equally valid causes',
      successCriteria: 'Must provide 3 distinct, clinically valid causes covering different domains (pharmacological, physiological, psychological)',
      adversarialMetadata: {
        redHerrings: ['focus_on_medication_only'],
        clinicalComplexity: 'medium',
        requiredThinking: ['differential_diagnosis', 'multi_domain_analysis'],
        domainKnowledge: ['pharmacology', 'sleep_medicine', 'psychiatry'],
      },
      createdBy: researcherUser.id,
    },
  });

  console.log('Created sample benchmark questions for all scales');

  return {
    siriScale,
    aPharmScale,
    aMamhScale,
    aPharmQuestion,
    aMamhQuestion,
    siriQuestion,
  };
};
