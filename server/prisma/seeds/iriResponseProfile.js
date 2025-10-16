// IRI (Interpersonal Reactivity Index) Test Definition and Mock Answers
// This creates ResponseProfileTest, ResponseProfileQuestion, and ResponseProfileAnswer records

const IRI_QUESTIONS = [
  { key: 'IRI_1', text: 'I daydream and fantasize, with some regularity, about things that might happen to me.', category: 'FS', order: 1, reversed: false },
  { key: 'IRI_2', text: 'I often have tender, concerned feelings for people less fortunate than me.', category: 'EC', order: 2, reversed: false },
  { key: 'IRI_3', text: 'I sometimes find it difficult to see things from the "other guy\'s" point of view.', category: 'PT', order: 3, reversed: true },
  { key: 'IRI_4', text: 'Sometimes I don\'t feel very sorry for other people when they are having problems.', category: 'EC', order: 4, reversed: true },
  { key: 'IRI_5', text: 'I really get involved with the feelings of the characters in a novel.', category: 'FS', order: 5, reversed: false },
  { key: 'IRI_6', text: 'In emergency situations, I feel apprehensive and ill-at-ease.', category: 'PD', order: 6, reversed: false },
  { key: 'IRI_7', text: 'I am usually objective when I watch a movie or play, and I don\'t often get completely caught up in it.', category: 'FS', order: 7, reversed: true },
  { key: 'IRI_8', text: 'I try to look at everybody\'s side of a disagreement before I make a decision.', category: 'PT', order: 8, reversed: false },
  { key: 'IRI_9', text: 'When I see someone being taken advantage of, I feel kind of protective towards them.', category: 'EC', order: 9, reversed: false },
  { key: 'IRI_10', text: 'I sometimes feel helpless when I am in the middle of a very emotional situation.', category: 'PD', order: 10, reversed: false },
  { key: 'IRI_11', text: 'I sometimes try to understand my friends better by imagining how things look from their perspective.', category: 'PT', order: 11, reversed: false },
  { key: 'IRI_12', text: 'Becoming extremely involved in a good book or movie is somewhat rare for me.', category: 'FS', order: 12, reversed: true },
  { key: 'IRI_13', text: 'When I see someone get hurt, I tend to remain calm.', category: 'PD', order: 13, reversed: true },
  { key: 'IRI_14', text: 'Other people\'s misfortunes do not usually disturb me a great deal.', category: 'EC', order: 14, reversed: true },
  { key: 'IRI_15', text: 'If I\'m sure I\'m right about something, I don\'t waste much time listening to other people\'s arguments.', category: 'PT', order: 15, reversed: true },
  { key: 'IRI_16', text: 'After seeing a play or movie, I have felt as though I were one of the characters.', category: 'FS', order: 16, reversed: false },
  { key: 'IRI_17', text: 'Being in a tense emotional situation scares me.', category: 'PD', order: 17, reversed: false },
  { key: 'IRI_18', text: 'When I see someone being treated unfairly, I sometimes don\'t feel very much pity for them.', category: 'EC', order: 18, reversed: true },
  { key: 'IRI_19', text: 'I am usually pretty effective in dealing with emergencies.', category: 'PD', order: 19, reversed: true },
  { key: 'IRI_20', text: 'I am often quite touched by things that I see happen.', category: 'EC', order: 20, reversed: false },
  { key: 'IRI_21', text: 'I believe that there are two sides to every question and try to look at them both.', category: 'PT', order: 21, reversed: false },
  { key: 'IRI_22', text: 'I would describe myself as a pretty soft-hearted person.', category: 'EC', order: 22, reversed: false },
  { key: 'IRI_23', text: 'When I watch a good movie, I can very easily put myself in the place of a leading character.', category: 'FS', order: 23, reversed: false },
  { key: 'IRI_24', text: 'I tend to lose control during emergencies.', category: 'PD', order: 24, reversed: false },
  { key: 'IRI_25', text: 'When I\'m upset at someone, I usually try to "put myself in his shoes" for a while.', category: 'PT', order: 25, reversed: false },
  { key: 'IRI_26', text: 'When I am reading an interesting story or novel, I imagine how I would feel if the events in the story were happening to me.', category: 'FS', order: 26, reversed: false },
  { key: 'IRI_27', text: 'When I see someone who badly needs help in an emergency, I go to pieces.', category: 'PD', order: 27, reversed: false },
  { key: 'IRI_28', text: 'Before criticizing somebody, I try to imagine how I would feel if I were in their place.', category: 'PT', order: 28, reversed: false },
];

// Mock answers for different model versions
// Answers are on 0-4 scale (A=0, B=1, C=2, D=3, E=4)
const MOCK_IRI_ANSWERS = {
  'GPT-4o-20250915': {
    PT: [3, 3, 2, 3, 3, 3, 3], // Questions 3, 8, 11, 15, 21, 25, 28
    FS: [2, 3, 2, 2, 2, 3, 2], // Questions 1, 5, 7, 12, 16, 23, 26
    EC: [3, 3, 3, 3, 3, 4, 3], // Questions 2, 4, 9, 14, 18, 20, 22
    PD: [2, 2, 2, 2, 2, 1, 1], // Questions 6, 10, 13, 17, 19, 24, 27
  },
  'Claude Opus 4.1-20250901': {
    PT: [4, 4, 3, 3, 4, 3, 4],
    FS: [1, 2, 2, 2, 2, 2, 3],
    EC: [4, 4, 4, 3, 4, 4, 3],
    PD: [1, 1, 2, 1, 2, 1, 1],
  },
  'Claude Sonnet 4-20250910': {
    PT: [3, 4, 3, 3, 4, 3, 4],
    FS: [2, 2, 2, 2, 2, 3, 2],
    EC: [4, 3, 4, 3, 4, 4, 3],
    PD: [1, 2, 2, 1, 2, 1, 1],
  },
  'Gemini 2.5 Pro-20250915': {
    PT: [3, 3, 3, 2, 3, 3, 3],
    FS: [2, 3, 2, 2, 2, 2, 3],
    EC: [3, 3, 3, 3, 3, 3, 3],
    PD: [2, 2, 2, 2, 2, 2, 1],
  },
};

module.exports = async function seedIRIResponseProfile(prisma, options = {}) {
  const { models = {}, modelVersions = {} } = options;

  // 1. Create the IRI test
  let iriTest = await prisma.responseProfileTest.findFirst({
    where: { name: 'Interpersonal Reactivity Index' },
  });

  if (iriTest) {
    iriTest = await prisma.responseProfileTest.update({
      where: { id: iriTest.id },
      data: {
        description: 'Measures empathy across four dimensions: Perspective Taking, Fantasy, Empathic Concern, and Personal Distress',
        testType: 'empathy',
        isValidated: true,
        isPublic: true,
      },
    });
  } else {
    iriTest = await prisma.responseProfileTest.create({
      data: {
        name: 'Interpersonal Reactivity Index',
        description: 'Measures empathy across four dimensions: Perspective Taking, Fantasy, Empathic Concern, and Personal Distress',
        testType: 'empathy',
        version: 1,
        isValidated: true,
        isPublic: true,
      },
    });
  }

  console.log(`Created/updated IRI test: ${iriTest.id}`);

  // 2. Create all 28 questions
  const questionRecords = {};
  for (const q of IRI_QUESTIONS) {
    let question = await prisma.responseProfileQuestion.findFirst({
      where: {
        questionText: q.text,
        questionKey: q.key,
      },
    });

    if (question) {
      question = await prisma.responseProfileQuestion.update({
        where: { id: question.id },
        data: {
          testId: iriTest.id,
          questionType: 'NUMBER',
          category: q.category,
          displayOrder: q.order,
          isActive: true,
          isDisplayed: true,
        },
      });
    } else {
      question = await prisma.responseProfileQuestion.create({
        data: {
          testId: iriTest.id,
          questionType: 'NUMBER',
          questionKey: q.key,
          questionText: q.text,
          category: q.category,
          displayOrder: q.order,
          isActive: true,
          isDisplayed: true,
        },
      });
    }
    questionRecords[q.key] = { ...question, reversed: q.reversed };
  }

  console.log(`Created/updated ${Object.keys(questionRecords).length} IRI questions`);

  // 3. Create mock answers for each model version
  let answerCount = 0;
  for (const [modelVersionKey, answers] of Object.entries(MOCK_IRI_ANSWERS)) {
    const [modelName, versionStr] = modelVersionKey.split('-');
    const modelRecord = models[modelName];

    if (!modelRecord) {
      console.warn(`Skipping IRI answers for ${modelName} – model not found`);
      continue;
    }

    const versionsForModel = modelVersions[modelRecord.id] ?? {};
    const versionRecord = versionsForModel[versionStr];

    if (!versionRecord) {
      console.warn(`Skipping IRI answers for ${modelName} (${versionStr}) – version not found`);
      continue;
    }

    // Find or create evaluation entity for this model version
    let evaluationEntity = await prisma.evaluationEntity.findFirst({
      where: {
        entityType: 'MODEL_VERSION',
        modelVersionId: versionRecord.id,
        toolConfigurationId: null,
      },
    });

    if (!evaluationEntity) {
      evaluationEntity = await prisma.evaluationEntity.create({
        data: {
          entityType: 'MODEL_VERSION',
          modelVersionId: versionRecord.id,
          toolConfigurationId: null,
        },
      });
    }

    // Create a mock reviewer user if it doesn't exist
    const reviewer = await prisma.user.upsert({
      where: { email: 'mock-reviewer@mindbench.ai' },
      update: {},
      create: {
        email: 'mock-reviewer@mindbench.ai',
        username: 'mock-reviewer',
        passwordHash: 'mock-hash-not-for-login',
        role: 'RESEARCHER',
      },
    });

    // Create answers for each subscale
    const subscales = {
      PT: ['IRI_3', 'IRI_8', 'IRI_11', 'IRI_15', 'IRI_21', 'IRI_25', 'IRI_28'],
      FS: ['IRI_1', 'IRI_5', 'IRI_7', 'IRI_12', 'IRI_16', 'IRI_23', 'IRI_26'],
      EC: ['IRI_2', 'IRI_4', 'IRI_9', 'IRI_14', 'IRI_18', 'IRI_20', 'IRI_22'],
      PD: ['IRI_6', 'IRI_10', 'IRI_13', 'IRI_17', 'IRI_19', 'IRI_24', 'IRI_27'],
    };

    for (const [subscale, questionKeys] of Object.entries(subscales)) {
      const subscaleAnswers = answers[subscale];

      for (let i = 0; i < questionKeys.length; i++) {
        const questionKey = questionKeys[i];
        const questionRecord = questionRecords[questionKey];
        const rawValue = subscaleAnswers[i];

        // Find or create the answer
        let answer = await prisma.responseProfileAnswer.findFirst({
          where: {
            questionId: questionRecord.id,
            evaluationEntityId: evaluationEntity.id,
          },
        });

        if (answer) {
          await prisma.responseProfileAnswer.update({
            where: { id: answer.id },
            data: {
              numericValue: rawValue,
              isApproved: true,
              approvedBy: reviewer.id,
              approvedAt: new Date(),
            },
          });
        } else {
          await prisma.responseProfileAnswer.create({
            data: {
              questionId: questionRecord.id,
              entityType: 'MODEL_VERSION',
              entityId: versionRecord.id,
              evaluationEntityId: evaluationEntity.id,
              numericValue: rawValue,
              reviewerId: reviewer.id,
              isApproved: true,
              approvedBy: reviewer.id,
              approvedAt: new Date(),
            },
          });
        }
        answerCount++;
      }
    }

    console.log(`Created/updated IRI answers for ${modelName} (${versionStr})`);
  }

  console.log(`Total IRI answers created/updated: ${answerCount}`);
};
