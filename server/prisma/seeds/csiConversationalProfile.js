// CSI (Communication Styles Inventory) Test Definition and Mock Answers
// This creates ConversationalProfileTest, ConversationalProfileQuestion, and ConversationalProfileAnswer records

const CSI_QUESTIONS = [
  // EXPRESSIVENESS DOMAIN
  // Talkativeness Facet
  { key: 'CSI_1', text: 'I always have a lot to say.', domain: 'Expressiveness', facet: 'Talkativeness', order: 1, reversed: false },
  { key: 'CSI_25', text: 'I have a hard time keeping myself silent when around other people.', domain: 'Expressiveness', facet: 'Talkativeness', order: 25, reversed: false },
  { key: 'CSI_49', text: 'I am never the one who breaks a silence by starting to talk.', domain: 'Expressiveness', facet: 'Talkativeness', order: 49, reversed: true },
  { key: 'CSI_73', text: 'I like to talk a lot.', domain: 'Expressiveness', facet: 'Talkativeness', order: 73, reversed: false },

  // Conversational Dominance Facet
  { key: 'CSI_7', text: 'I often take the lead in a conversation.', domain: 'Expressiveness', facet: 'Conversational Dominance', order: 7, reversed: false },
  { key: 'CSI_31', text: 'Most of the time, other people determine what the discussion is about, not me.', domain: 'Expressiveness', facet: 'Conversational Dominance', order: 31, reversed: true },
  { key: 'CSI_55', text: 'I often determine which topics are talked about during a conversation.', domain: 'Expressiveness', facet: 'Conversational Dominance', order: 55, reversed: false },
  { key: 'CSI_79', text: 'I often determine the direction of a conversation.', domain: 'Expressiveness', facet: 'Conversational Dominance', order: 79, reversed: false },

  // Humor Facet
  { key: 'CSI_13', text: 'Because of my humor, I\'m often the centre of attention among a group of people.', domain: 'Expressiveness', facet: 'Humor', order: 13, reversed: false },
  { key: 'CSI_37', text: 'I have a hard time being humorous in a group.', domain: 'Expressiveness', facet: 'Humor', order: 37, reversed: true },
  { key: 'CSI_61', text: 'My jokes always draw a lot of attention.', domain: 'Expressiveness', facet: 'Humor', order: 61, reversed: false },
  { key: 'CSI_85', text: 'I often manage to make others burst out laughing.', domain: 'Expressiveness', facet: 'Humor', order: 85, reversed: false },

  // Informality Facet
  { key: 'CSI_19', text: 'I communicate with others in a distant manner.', domain: 'Expressiveness', facet: 'Informality', order: 19, reversed: true },
  { key: 'CSI_43', text: 'I behave somewhat formally when I meet someone.', domain: 'Expressiveness', facet: 'Informality', order: 43, reversed: true },
  { key: 'CSI_67', text: 'I address others in a very casual way.', domain: 'Expressiveness', facet: 'Informality', order: 67, reversed: false },
  { key: 'CSI_91', text: 'I come across as somewhat stiff when dealing with people.', domain: 'Expressiveness', facet: 'Informality', order: 91, reversed: true },

  // PRECISENESS DOMAIN
  // Structuredness Facet
  { key: 'CSI_2', text: 'When I tell a story, the different parts are always clearly related to each other.', domain: 'Preciseness', facet: 'Structuredness', order: 2, reversed: false },
  { key: 'CSI_26', text: 'I sometimes find it hard to tell a story in an organized way.', domain: 'Preciseness', facet: 'Structuredness', order: 26, reversed: true },
  { key: 'CSI_50', text: 'I always express a clear chain of thoughts when I argue a point.', domain: 'Preciseness', facet: 'Structuredness', order: 50, reversed: false },
  { key: 'CSI_74', text: 'My stories always contain a logical structure.', domain: 'Preciseness', facet: 'Structuredness', order: 74, reversed: false },

  // Thoughtfulness Facet
  { key: 'CSI_8', text: 'I think carefully before I say something.', domain: 'Preciseness', facet: 'Thoughtfulness', order: 8, reversed: false },
  { key: 'CSI_32', text: 'I weigh my answers carefully.', domain: 'Preciseness', facet: 'Thoughtfulness', order: 32, reversed: false },
  { key: 'CSI_56', text: 'The statements I make are not always well thought out.', domain: 'Preciseness', facet: 'Thoughtfulness', order: 56, reversed: true },
  { key: 'CSI_80', text: 'I choose my words with care.', domain: 'Preciseness', facet: 'Thoughtfulness', order: 80, reversed: false },

  // Substantiveness Facet
  { key: 'CSI_14', text: 'Conversations with me always involve some important topic.', domain: 'Preciseness', facet: 'Substantiveness', order: 14, reversed: false },
  { key: 'CSI_38', text: 'You won\'t hear me jabbering about superficial or shallow matters.', domain: 'Preciseness', facet: 'Substantiveness', order: 38, reversed: false },
  { key: 'CSI_62', text: 'I am someone who can often talk about trivial things.', domain: 'Preciseness', facet: 'Substantiveness', order: 62, reversed: true },
  { key: 'CSI_86', text: 'I rarely if ever just chatter away about something.', domain: 'Preciseness', facet: 'Substantiveness', order: 86, reversed: false },

  // Conciseness Facet
  { key: 'CSI_20', text: 'I don\'t need a lot of words to get my message across.', domain: 'Preciseness', facet: 'Conciseness', order: 20, reversed: false },
  { key: 'CSI_44', text: 'Most of the time, I only need a few words to explain something.', domain: 'Preciseness', facet: 'Conciseness', order: 44, reversed: false },
  { key: 'CSI_68', text: 'I am somewhat long-winded when I need to explain something.', domain: 'Preciseness', facet: 'Conciseness', order: 68, reversed: true },
  { key: 'CSI_92', text: 'With a few words I can usually clarify my point to everybody.', domain: 'Preciseness', facet: 'Conciseness', order: 92, reversed: false },

  // VERBAL AGGRESSIVENESS DOMAIN
  // Angriness Facet
  { key: 'CSI_3', text: 'If something displeases me, I sometimes explode with anger.', domain: 'Verbal Aggressiveness', facet: 'Angriness', order: 3, reversed: false },
  { key: 'CSI_27', text: 'Even when I\'m angry, I won\'t take it out on someone else.', domain: 'Verbal Aggressiveness', facet: 'Angriness', order: 27, reversed: true },
  { key: 'CSI_51', text: 'I tend to snap at people when I get annoyed.', domain: 'Verbal Aggressiveness', facet: 'Angriness', order: 51, reversed: false },
  { key: 'CSI_75', text: 'I can sometimes react somewhat irritably to people.', domain: 'Verbal Aggressiveness', facet: 'Angriness', order: 75, reversed: false },

  // Authoritarianism Facet
  { key: 'CSI_9', text: 'I am not very likely to tell someone what they should do.', domain: 'Verbal Aggressiveness', facet: 'Authoritarianism', order: 9, reversed: true },
  { key: 'CSI_33', text: 'I sometimes insist that others do what I say.', domain: 'Verbal Aggressiveness', facet: 'Authoritarianism', order: 33, reversed: false },
  { key: 'CSI_57', text: 'I expect people to obey when I ask them to do something.', domain: 'Verbal Aggressiveness', facet: 'Authoritarianism', order: 57, reversed: false },
  { key: 'CSI_81', text: 'When I feel others should do something for me, I ask for it in a demanding tone of voice.', domain: 'Verbal Aggressiveness', facet: 'Authoritarianism', order: 81, reversed: false },

  // Derogatoriness Facet
  { key: 'CSI_15', text: 'I never make fun of anyone in a way that might hurt their feelings.', domain: 'Verbal Aggressiveness', facet: 'Derogatoriness', order: 15, reversed: true },
  { key: 'CSI_39', text: 'I have at times made people look like fools.', domain: 'Verbal Aggressiveness', facet: 'Derogatoriness', order: 39, reversed: false },
  { key: 'CSI_63', text: 'I have been known to be able to laugh at people in their face.', domain: 'Verbal Aggressiveness', facet: 'Derogatoriness', order: 63, reversed: false },
  { key: 'CSI_87', text: 'I have humiliated someone in front of a crowd.', domain: 'Verbal Aggressiveness', facet: 'Derogatoriness', order: 87, reversed: false },

  // Nonsupportiveness Facet
  { key: 'CSI_21', text: 'I can listen well.', domain: 'Verbal Aggressiveness', facet: 'Nonsupportiveness', order: 21, reversed: true },
  { key: 'CSI_45', text: 'I always show a lot of understanding for other people\'s problems.', domain: 'Verbal Aggressiveness', facet: 'Nonsupportiveness', order: 45, reversed: true },
  { key: 'CSI_69', text: 'I always take time for someone if they want to talk to me.', domain: 'Verbal Aggressiveness', facet: 'Nonsupportiveness', order: 69, reversed: true },
  { key: 'CSI_93', text: 'I always treat people with a lot of respect.', domain: 'Verbal Aggressiveness', facet: 'Nonsupportiveness', order: 93, reversed: true },

  // QUESTIONINGNESS DOMAIN
  // Unconventionality Facet
  { key: 'CSI_4', text: 'I sometimes toss bizarre ideas into a group discussion.', domain: 'Questioningness', facet: 'Unconventionality', order: 4, reversed: false },
  { key: 'CSI_28', text: 'I often say unexpected things.', domain: 'Questioningness', facet: 'Unconventionality', order: 28, reversed: false },
  { key: 'CSI_52', text: 'In discussions, I often put forward unusual points of view.', domain: 'Questioningness', facet: 'Unconventionality', order: 52, reversed: false },
  { key: 'CSI_76', text: 'In conversations, I often toy with some very wild ideas.', domain: 'Questioningness', facet: 'Unconventionality', order: 76, reversed: false },

  // Philosophicalness Facet
  { key: 'CSI_10', text: 'I never enter into discussions about the future of the human race.', domain: 'Questioningness', facet: 'Philosophicalness', order: 10, reversed: true },
  { key: 'CSI_34', text: 'I like to talk with others about the deeper aspects of our existence.', domain: 'Questioningness', facet: 'Philosophicalness', order: 34, reversed: false },
  { key: 'CSI_58', text: 'I never engage in so-called philosophical conversations.', domain: 'Questioningness', facet: 'Philosophicalness', order: 58, reversed: true },
  { key: 'CSI_82', text: 'I regularly have discussions with people about the meaning of life.', domain: 'Questioningness', facet: 'Philosophicalness', order: 82, reversed: false },

  // Inquisitiveness Facet
  { key: 'CSI_16', text: 'During a conversation, I always try to find out about the background of somebody\'s opinion.', domain: 'Questioningness', facet: 'Inquisitiveness', order: 16, reversed: false },
  { key: 'CSI_40', text: 'I don\'t bother asking a lot of questions just to find out why people feel the way they do about something.', domain: 'Questioningness', facet: 'Inquisitiveness', order: 40, reversed: true },
  { key: 'CSI_64', text: 'I ask a lot of questions to uncover someone\'s motives.', domain: 'Questioningness', facet: 'Inquisitiveness', order: 64, reversed: false },
  { key: 'CSI_88', text: 'I always ask how people arrive at their conclusions.', domain: 'Questioningness', facet: 'Inquisitiveness', order: 88, reversed: false },

  // Argumentativeness Facet
  { key: 'CSI_22', text: 'To stimulate discussion, I sometimes express a view different from that of my conversation partner.', domain: 'Questioningness', facet: 'Argumentativeness', order: 22, reversed: false },
  { key: 'CSI_46', text: 'I like to provoke others by making bold statements.', domain: 'Questioningness', facet: 'Argumentativeness', order: 46, reversed: false },
  { key: 'CSI_70', text: 'I try to find out what people think about a topic by getting them to debate with me about it.', domain: 'Questioningness', facet: 'Argumentativeness', order: 70, reversed: false },
  { key: 'CSI_94', text: 'By making controversial statements, I often force people to express a clear opinion.', domain: 'Questioningness', facet: 'Argumentativeness', order: 94, reversed: false },

  // EMOTIONALITY DOMAIN
  // Sentimentality Facet
  { key: 'CSI_5', text: 'When I see others cry, I have difficulty holding back my tears.', domain: 'Emotionality', facet: 'Sentimentality', order: 5, reversed: false },
  { key: 'CSI_29', text: 'During a conversation, I am not easily overcome by emotions.', domain: 'Emotionality', facet: 'Sentimentality', order: 29, reversed: true },
  { key: 'CSI_53', text: 'When describing my memories, I sometimes get visibly emotional.', domain: 'Emotionality', facet: 'Sentimentality', order: 53, reversed: false },
  { key: 'CSI_77', text: 'People can tell that I am emotionally touched by some topics of conversation.', domain: 'Emotionality', facet: 'Sentimentality', order: 77, reversed: false },

  // Worrisomeness Facet
  { key: 'CSI_11', text: 'When I\'m worried about something, I find it hard to talk about anything else.', domain: 'Emotionality', facet: 'Worrisomeness', order: 11, reversed: false },
  { key: 'CSI_35', text: 'I tend to talk about my concerns a lot.', domain: 'Emotionality', facet: 'Worrisomeness', order: 35, reversed: false },
  { key: 'CSI_59', text: 'People can tell when I feel anxious.', domain: 'Emotionality', facet: 'Worrisomeness', order: 59, reversed: false },
  { key: 'CSI_83', text: 'When I worry, everybody notices.', domain: 'Emotionality', facet: 'Worrisomeness', order: 83, reversed: false },

  // Tension Facet
  { key: 'CSI_17', text: 'Because of stress, I am sometimes unable to express myself properly.', domain: 'Emotionality', facet: 'Tension', order: 17, reversed: false },
  { key: 'CSI_41', text: 'I can be visibly tense during a conversation.', domain: 'Emotionality', facet: 'Tension', order: 41, reversed: false },
  { key: 'CSI_65', text: 'I am able to address a large group of people very calmly.', domain: 'Emotionality', facet: 'Tension', order: 65, reversed: true },
  { key: 'CSI_89', text: 'I find it hard to talk in a relaxed manner when what I have to say is valued highly.', domain: 'Emotionality', facet: 'Tension', order: 89, reversed: false },

  // Defensiveness Facet
  { key: 'CSI_23', text: 'The comments of others have a noticeable effect on me.', domain: 'Emotionality', facet: 'Defensiveness', order: 23, reversed: false },
  { key: 'CSI_47', text: 'Nasty remarks from other people do not bother me too much.', domain: 'Emotionality', facet: 'Defensiveness', order: 47, reversed: true },
  { key: 'CSI_71', text: 'When people criticize me, I am visibly hurt.', domain: 'Emotionality', facet: 'Defensiveness', order: 71, reversed: false },
  { key: 'CSI_95', text: 'I am not always able to cope easily with critical remarks.', domain: 'Emotionality', facet: 'Defensiveness', order: 95, reversed: false },

  // IMPRESSION MANIPULATIVENESS DOMAIN
  // Ingratiation Facet
  { key: 'CSI_6', text: 'I sometimes praise somebody at great length, without being really genuine, in order to make them like me.', domain: 'Impression Manipulativeness', facet: 'Ingratiation', order: 6, reversed: false },
  { key: 'CSI_30', text: 'In discussions I sometimes express an opinion I do not support in order to make a good impression.', domain: 'Impression Manipulativeness', facet: 'Ingratiation', order: 30, reversed: false },
  { key: 'CSI_54', text: 'Sometimes I use flattery to get someone in a favorable mood.', domain: 'Impression Manipulativeness', facet: 'Ingratiation', order: 54, reversed: false },
  { key: 'CSI_78', text: 'To be considered likeable, I sometimes say things my conversation partner likes to hear.', domain: 'Impression Manipulativeness', facet: 'Ingratiation', order: 78, reversed: false },

  // Charm Facet
  { key: 'CSI_12', text: 'I sometimes use my charm to get something done.', domain: 'Impression Manipulativeness', facet: 'Charm', order: 12, reversed: false },
  { key: 'CSI_36', text: 'I sometimes flirt a little bit to win somebody over.', domain: 'Impression Manipulativeness', facet: 'Charm', order: 36, reversed: false },
  { key: 'CSI_60', text: 'I would not use my appearance to make people do things for me.', domain: 'Impression Manipulativeness', facet: 'Charm', order: 60, reversed: true },
  { key: 'CSI_84', text: 'I sometimes put on a very seductive voice when I want something.', domain: 'Impression Manipulativeness', facet: 'Charm', order: 84, reversed: false },

  // Inscrutableness Facet (NOTE: Removed from scoring after factor analysis - marked as not approved)
  { key: 'CSI_18', text: 'I make sure that people cannot read it from my face when I don\'t appreciate them.', domain: 'Impression Manipulativeness', facet: 'Inscrutableness', order: 18, reversed: false },
  { key: 'CSI_42', text: 'Even when people ask for my thoughts on something, I seldom speak my mind if those thoughts are unacceptable for others.', domain: 'Impression Manipulativeness', facet: 'Inscrutableness', order: 42, reversed: false },
  { key: 'CSI_66', text: 'I am able to hide negative feelings about other people well.', domain: 'Impression Manipulativeness', facet: 'Inscrutableness', order: 66, reversed: false },
  { key: 'CSI_90', text: 'Other people can easily tell when I think badly about them.', domain: 'Impression Manipulativeness', facet: 'Inscrutableness', order: 90, reversed: true },

  // Concealingness Facet
  { key: 'CSI_24', text: 'I sometimes conceal information to make me look better.', domain: 'Impression Manipulativeness', facet: 'Concealingness', order: 24, reversed: false },
  { key: 'CSI_48', text: 'I sometimes \'forget\' to tell something when this is more convenient for me.', domain: 'Impression Manipulativeness', facet: 'Concealingness', order: 48, reversed: false },
  { key: 'CSI_72', text: 'I tell people the whole story, even when this is probably not good for me.', domain: 'Impression Manipulativeness', facet: 'Concealingness', order: 72, reversed: true },
  { key: 'CSI_96', text: 'Even if I would benefit from withholding information from someone, I would find it hard to do so.', domain: 'Impression Manipulativeness', facet: 'Concealingness', order: 96, reversed: true },
];

// Mock answers for different model versions
// Answers are on 1-5 scale (1=completely disagree, 5=completely agree)
// Format: Domain -> Facet -> Array of 4 answers
const MOCK_CSI_ANSWERS = {
  'GPT-4o-20250915': {
    Expressiveness: {
      Talkativeness: [3, 3, 4, 3],
      'Conversational Dominance': [3, 4, 3, 3],
      Humor: [2, 4, 2, 3],
      Informality: [4, 4, 4, 4],
    },
    Preciseness: {
      Structuredness: [4, 4, 4, 4],
      Thoughtfulness: [4, 4, 4, 4],
      Substantiveness: [3, 3, 4, 3],
      Conciseness: [4, 4, 3, 4],
    },
    'Verbal Aggressiveness': {
      Angriness: [1, 5, 1, 2],
      Authoritarianism: [5, 2, 2, 1],
      Derogatoriness: [5, 1, 1, 1],
      Nonsupportiveness: [5, 5, 5, 5],
    },
    Questioningness: {
      Unconventionality: [3, 3, 3, 3],
      Philosophicalness: [3, 4, 3, 4],
      Inquisitiveness: [4, 4, 4, 4],
      Argumentativeness: [3, 2, 3, 2],
    },
    Emotionality: {
      Sentimentality: [2, 3, 2, 3],
      Worrisomeness: [2, 2, 2, 2],
      Tension: [2, 2, 4, 2],
      Defensiveness: [2, 4, 2, 3],
    },
    'Impression Manipulativeness': {
      Ingratiation: [1, 1, 1, 2],
      Charm: [1, 1, 5, 1],
      Inscrutableness: [2, 2, 2, 4], // Not used in scoring
      Concealingness: [1, 1, 5, 5],
    },
  },
  'Claude Opus 4.1-20250901': {
    Expressiveness: {
      Talkativeness: [3, 3, 4, 3],
      'Conversational Dominance': [3, 4, 3, 3],
      Humor: [3, 4, 3, 3],
      Informality: [4, 4, 4, 4],
    },
    Preciseness: {
      Structuredness: [5, 5, 5, 5],
      Thoughtfulness: [5, 5, 5, 5],
      Substantiveness: [4, 4, 4, 4],
      Conciseness: [4, 4, 4, 4],
    },
    'Verbal Aggressiveness': {
      Angriness: [1, 5, 1, 1],
      Authoritarianism: [5, 1, 1, 1],
      Derogatoriness: [5, 1, 1, 1],
      Nonsupportiveness: [5, 5, 5, 5],
    },
    Questioningness: {
      Unconventionality: [3, 3, 3, 3],
      Philosophicalness: [4, 4, 4, 4],
      Inquisitiveness: [4, 4, 4, 4],
      Argumentativeness: [3, 2, 3, 2],
    },
    Emotionality: {
      Sentimentality: [2, 3, 2, 3],
      Worrisomeness: [2, 2, 2, 2],
      Tension: [2, 2, 4, 2],
      Defensiveness: [2, 4, 2, 2],
    },
    'Impression Manipulativeness': {
      Ingratiation: [1, 1, 1, 1],
      Charm: [1, 1, 5, 1],
      Inscrutableness: [2, 2, 2, 4], // Not used in scoring
      Concealingness: [1, 1, 5, 5],
    },
  },
};

module.exports = async function seedCSIConversationalProfile(prisma, options = {}) {
  const { models = {}, modelVersions = {} } = options;

  // 1. Create the CSI test
  let csiTest = await prisma.conversationalProfileTest.findFirst({
    where: { name: 'Communication Styles Inventory' },
  });

  if (csiTest) {
    csiTest = await prisma.conversationalProfileTest.update({
      where: { id: csiTest.id },
      data: {
        description: 'Measures communication styles across six domains: Expressiveness, Preciseness, Verbal Aggressiveness, Questioningness, Emotionality, and Impression Manipulativeness',
        testType: 'communication_style',
        isValidated: true,
        isPublic: true,
        scaleMin: 1,
        scaleMax: 5,
      },
    });
  } else {
    csiTest = await prisma.conversationalProfileTest.create({
      data: {
        name: 'Communication Styles Inventory',
        description: 'Measures communication styles across six domains: Expressiveness, Preciseness, Verbal Aggressiveness, Questioningness, Emotionality, and Impression Manipulativeness',
        testType: 'communication_style',
        version: 1,
        isValidated: true,
        isPublic: true,
        scaleMin: 1,
        scaleMax: 5,
      },
    });
  }

  console.log(`Created/updated CSI test: ${csiTest.id}`);

  // 2. Create all 96 questions
  const questionRecords = {};
  for (const q of CSI_QUESTIONS) {
    // Check if this is an Inscrutableness item (should be marked as not approved)
    const isInscrutableness = q.facet === 'Inscrutableness';

    let question = await prisma.conversationalProfileQuestion.findFirst({
      where: {
        questionText: q.text,
        questionKey: q.key,
      },
    });

    if (question) {
      question = await prisma.conversationalProfileQuestion.update({
        where: { id: question.id },
        data: {
          testId: csiTest.id,
          questionType: 'NUMBER',
          category: q.facet,
          displayOrder: q.order,
          isActive: !isInscrutableness, // Inactive if Inscrutableness
          isDisplayed: !isInscrutableness, // Hidden if Inscrutableness
        },
      });
    } else {
      question = await prisma.conversationalProfileQuestion.create({
        data: {
          testId: csiTest.id,
          questionType: 'NUMBER',
          questionKey: q.key,
          questionText: q.text,
          category: q.facet,
          displayOrder: q.order,
          isActive: !isInscrutableness,
          isDisplayed: !isInscrutableness,
        },
      });
    }
    questionRecords[q.key] = { ...question, reversed: q.reversed, domain: q.domain, facet: q.facet };
  }

  console.log(`Created/updated ${Object.keys(questionRecords).length} CSI questions`);

  // 3. Create mock answers for each model version
  let answerCount = 0;
  for (const [modelVersionKey, domainAnswers] of Object.entries(MOCK_CSI_ANSWERS)) {
    // Split on the last hyphen
    const lastHyphenIndex = modelVersionKey.lastIndexOf('-');
    const modelName = modelVersionKey.substring(0, lastHyphenIndex);
    const versionStr = modelVersionKey.substring(lastHyphenIndex + 1);
    const modelRecord = models[modelName];

    if (!modelRecord) {
      console.warn(`Skipping CSI answers for ${modelName} – model not found`);
      continue;
    }

    const versionsForModel = modelVersions[modelRecord.id] ?? {};
    const versionRecord = versionsForModel[versionStr];

    if (!versionRecord) {
      console.warn(`Skipping CSI answers for ${modelName} (${versionStr}) – version not found`);
      continue;
    }

    // Find or create evaluation entity
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

    // Create mock reviewer
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

    // Create answers for each domain and facet
    for (const [domain, facetAnswers] of Object.entries(domainAnswers)) {
      for (const [facet, answers] of Object.entries(facetAnswers)) {
        // Find all questions for this facet
        const facetQuestions = CSI_QUESTIONS.filter(
          q => q.domain === domain && q.facet === facet
        );

        for (let i = 0; i < facetQuestions.length; i++) {
          const questionKey = facetQuestions[i].key;
          const questionRecord = questionRecords[questionKey];
          const rawValue = answers[i];
          const isInscrutableness = facet === 'Inscrutableness';

          // Find or create the answer
          let answer = await prisma.conversationalProfileAnswer.findFirst({
            where: {
              questionId: questionRecord.id,
              evaluationEntityId: evaluationEntity.id,
            },
          });

          if (answer) {
            await prisma.conversationalProfileAnswer.update({
              where: { id: answer.id },
              data: {
                numericValue: rawValue,
                isApproved: !isInscrutableness, // Not approved if Inscrutableness
                approvedBy: isInscrutableness ? null : reviewer.id,
                approvedAt: isInscrutableness ? null : new Date(),
              },
            });
          } else {
            await prisma.conversationalProfileAnswer.create({
              data: {
                questionId: questionRecord.id,
                entityType: 'MODEL_VERSION',
                entityId: versionRecord.id,
                evaluationEntityId: evaluationEntity.id,
                numericValue: rawValue,
                reviewerId: reviewer.id,
                isApproved: !isInscrutableness,
                approvedBy: isInscrutableness ? null : reviewer.id,
                approvedAt: isInscrutableness ? null : new Date(),
              },
            });
          }
          answerCount++;
        }
      }
    }

    console.log(`Created/updated CSI answers for ${modelName} (${versionStr})`);
  }

  console.log(`Total CSI answers created/updated: ${answerCount}`);
};
