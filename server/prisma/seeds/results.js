module.exports = async function seedResults(prisma, { researcherUser, benchmarking, models }) {
  const { aPharmScale, aPharmQuestion } = benchmarking;
  const { gptModelVersions } = models;

  const sampleExperiment = await prisma.benchmarkExperiment.create({
    data: {
      userId: researcherUser.id,
      scaleId: aPharmScale.id,
      name: 'GPT-4o Clinical Reasoning Test',
      description: 'Testing GPT-4o chain of thought reasoning on adversarial psychopharmacology cases',
      entityType: 'MODEL_VERSION',
      entityIds: [gptModelVersions[0].id],
      config: {
        temperature: 0.7,
        max_tokens: 2000,
        reasoning_mode: 'chain_of_thought',
      },
      status: 'completed',
      progress: 100,
      startedAt: new Date('2024-09-20T10:00:00Z'),
      completedAt: new Date('2024-09-20T10:15:00Z'),
      reviewedBy: researcherUser.id,
      reviewedAt: new Date('2024-09-20T11:00:00Z'),
      reviewNotes: 'Good reasoning quality, identifies key drug interactions',
      isPublic: true,
    },
  });

  const sampleResult = await prisma.benchmarkResult.create({
    data: {
      experimentId: sampleExperiment.id,
      repeatNumber: 1,
      modelVersionId: gptModelVersions[0].id,
      questionId: aPharmQuestion.id,
      hyperparameterConfig: {
        temperature: 0.7,
        max_tokens: 2000,
        top_p: 1.0,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      score: 8,
      reasoning: 'Model demonstrated good understanding of drug interactions and monitoring requirements',
      rawResponse:
        '{"response": "The key considerations are serotonin syndrome risk and lithium toxicity monitoring...", "reasoning": "I need to think through the pharmacological interactions..."}',
      responseTimeMs: 3500,
      tokenUsage: {
        promptTokens: 150,
        completionTokens: 300,
        totalTokens: 450,
      },
      status: 'completed',
      isApproved: true,
      approvalSource: 'expert_review',
    },
  });

  await prisma.reasoningEntry.create({
    data: {
      benchmarkResultId: sampleResult.id,
      reasoningType: 'CHAIN_OF_THOUGHT',
      content: {
        steps: [
          {
            step: 1,
            thought:
              'Patient is stable on lithium 900mg BID, which indicates good therapeutic control of bipolar disorder',
            confidence: 0.9,
            processingTime: 500,
          },
          {
            step: 2,
            thought: 'Adding sertraline introduces risk of serotonin syndrome due to SSRI + lithium interaction',
            confidence: 0.85,
            processingTime: 800,
          },
          {
            step: 3,
            thought: 'SSRIs can cause hyponatremia, which increases lithium toxicity risk by reducing renal clearance',
            confidence: 0.8,
            processingTime: 1200,
          },
          {
            step: 4,
            thought: 'Need frequent monitoring: lithium levels, sodium levels, signs of serotonin syndrome',
            confidence: 0.9,
            processingTime: 700,
          },
        ],
        finalAnswer:
          'Monitor for serotonin syndrome, check lithium levels frequently due to SSRI-induced hyponatremia risk',
        totalProcessingTime: 3200,
        confidenceScore: 0.86,
      },
      sequenceOrder: 1,
      confidenceLevel: 0.86,
      processingTimeMs: 3200,
      metadata: {
        stepCount: 4,
        averageStepConfidence: 0.86,
        keyDomains: ['pharmacokinetics', 'drug_interactions', 'monitoring'],
        reasoningQuality: 'high',
      },
      createdBy: researcherUser.id,
    },
  });

  await prisma.reasoningEntry.create({
    data: {
      benchmarkResultId: sampleResult.id,
      reasoningType: 'EXPLANATION',
      content: {
        explanation:
          'This case tests understanding of complex drug-drug interactions between lithium and SSRIs, requiring knowledge of both pharmacokinetic and pharmacodynamic interactions.',
        keyPoints: [
          'Serotonin syndrome risk from combined serotonergic effects',
          'Lithium toxicity risk from SSRI-induced hyponatremia',
          'Need for enhanced monitoring protocols',
        ],
        clinicalRelevance: 'High - common real-world scenario in bipolar disorder management',
      },
      sequenceOrder: 2,
      confidenceLevel: 0.9,
      processingTimeMs: 800,
      metadata: {
        explanationType: 'clinical_rationale',
        educationalValue: 'high',
        clinicalComplexity: 'moderate_to_high',
      },
      createdBy: researcherUser.id,
    },
  });

  await prisma.reasoningEntry.create({
    data: {
      benchmarkResultId: sampleResult.id,
      reasoningType: 'WORKING',
      content: {
        calculations: [],
        logicalSteps: [
          'Lithium therapeutic range: 0.6-1.2 mEq/L',
          'SSRI-induced hyponatremia can increase lithium levels by 20-40%',
          'Serotonin syndrome risk: moderate with this combination',
          'Monitoring frequency: weekly for first month, then biweekly',
        ],
        references: ['Lithium-SSRI interaction studies', 'Serotonin syndrome diagnostic criteria'],
      },
      sequenceOrder: 3,
      confidenceLevel: 0.85,
      processingTimeMs: 1200,
      metadata: {
        workingType: 'clinical_protocol',
        evidenceLevel: 'moderate',
        practicalApplicability: 'high',
      },
      createdBy: researcherUser.id,
    },
  });

  console.log('Created sample benchmark results with comprehensive reasoning entries');
};
