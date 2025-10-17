// HEXACO Personality Inventory - Conversational Profile Implementation
// This creates ConversationalProfileTest, ConversationalProfileQuestion, and ConversationalProfileAnswer records

const HEXACO_QUESTIONS = [
  { key: 'HEXACO_1', text: 'I would be quite bored by a visit to an art gallery.', category: 'O', subcategory: 'Aesthetic Appreciation', order: 1, reversed: true },
  { key: 'HEXACO_2', text: 'I clean my office or home quite frequently.', category: 'C', subcategory: 'Organization', order: 2, reversed: false },
  { key: 'HEXACO_3', text: 'I rarely hold a grudge, even against people who have badly wronged me.', category: 'A', subcategory: 'Forgiveness', order: 3, reversed: false },
  { key: 'HEXACO_4', text: 'I feel reasonably satisfied with myself overall.', category: 'X', subcategory: 'Social Self-Esteem', order: 4, reversed: false },
  { key: 'HEXACO_5', text: 'I would feel afraid if I had to travel in bad weather conditions.', category: 'E', subcategory: 'Fearfulness', order: 5, reversed: false },
  { key: 'HEXACO_6', text: 'If I want something from a person I dislike, I will act very nicely toward that person in order to get it.', category: 'H', subcategory: 'Sincerity', order: 6, reversed: true },
  { key: 'HEXACO_7', text: 'I\'m interested in learning about the history and politics of other countries.', category: 'O', subcategory: 'Inquisitiveness', order: 7, reversed: false },
  { key: 'HEXACO_8', text: 'When working, I often set ambitious goals for myself.', category: 'C', subcategory: 'Diligence', order: 8, reversed: false },
  { key: 'HEXACO_9', text: 'People sometimes tell me that I am too critical of others.', category: 'A', subcategory: 'Gentleness', order: 9, reversed: true },
  { key: 'HEXACO_10', text: 'I rarely express my opinions in group meetings.', category: 'X', subcategory: 'Social Boldness', order: 10, reversed: true },
  { key: 'HEXACO_11', text: 'I sometimes can\'t help worrying about little things.', category: 'E', subcategory: 'Anxiety', order: 11, reversed: false },
  { key: 'HEXACO_12', text: 'If I knew that I could never get caught, I would be willing to steal a million dollars.', category: 'H', subcategory: 'Fairness', order: 12, reversed: true },
  { key: 'HEXACO_13', text: 'I would like a job that requires following a routine rather than being creative.', category: 'O', subcategory: 'Creativity', order: 13, reversed: true },
  { key: 'HEXACO_14', text: 'I often check my work over repeatedly to find any mistakes.', category: 'C', subcategory: 'Perfectionism', order: 14, reversed: false },
  { key: 'HEXACO_15', text: 'People sometimes tell me that I\'m too stubborn.', category: 'A', subcategory: 'Flexibility', order: 15, reversed: true },
  { key: 'HEXACO_16', text: 'I avoid making "small talk" with people.', category: 'X', subcategory: 'Sociability', order: 16, reversed: true },
  { key: 'HEXACO_17', text: 'When I suffer from a painful experience, I need someone to make me feel comfortable.', category: 'E', subcategory: 'Dependence', order: 17, reversed: false },
  { key: 'HEXACO_18', text: 'Having a lot of money is not especially important to me.', category: 'H', subcategory: 'Greed-Avoidance', order: 18, reversed: false },
  { key: 'HEXACO_19', text: 'I think that paying attention to radical ideas is a waste of time.', category: 'O', subcategory: 'Unconventionality', order: 19, reversed: true },
  { key: 'HEXACO_20', text: 'I make decisions based on the feeling of the moment rather than on careful thought.', category: 'C', subcategory: 'Prudence', order: 20, reversed: true },
  { key: 'HEXACO_21', text: 'People think of me as someone who has a quick temper.', category: 'A', subcategory: 'Patience', order: 21, reversed: true },
  { key: 'HEXACO_22', text: 'I am energetic nearly all the time.', category: 'X', subcategory: 'Liveliness', order: 22, reversed: false },
  { key: 'HEXACO_23', text: 'I feel like crying when I see other people crying.', category: 'E', subcategory: 'Sentimentality', order: 23, reversed: false },
  { key: 'HEXACO_24', text: 'I am an ordinary person who is no better than others.', category: 'H', subcategory: 'Modesty', order: 24, reversed: false },
  { key: 'HEXACO_25', text: 'I wouldn\'t spend my time reading a book of poetry.', category: 'O', subcategory: 'Aesthetic Appreciation', order: 25, reversed: true },
  { key: 'HEXACO_26', text: 'I plan ahead and organize things, to avoid scrambling at the last minute.', category: 'C', subcategory: 'Organization', order: 26, reversed: false },
  { key: 'HEXACO_27', text: 'My attitude toward people who have treated me badly is "forgive and forget".', category: 'A', subcategory: 'Forgiveness', order: 27, reversed: false },
  { key: 'HEXACO_28', text: 'I think that most people like some aspects of my personality.', category: 'X', subcategory: 'Social Self-Esteem', order: 28, reversed: false },
  { key: 'HEXACO_29', text: 'I don\'t mind doing jobs that involve dangerous work.', category: 'E', subcategory: 'Fearfulness', order: 29, reversed: true },
  { key: 'HEXACO_30', text: 'I wouldn\'t use flattery to get a raise or promotion at work, even if I thought it would succeed.', category: 'H', subcategory: 'Sincerity', order: 30, reversed: false },
  { key: 'HEXACO_31', text: 'I enjoy looking at maps of different places.', category: 'O', subcategory: 'Inquisitiveness', order: 31, reversed: false },
  { key: 'HEXACO_32', text: 'I often push myself very hard when trying to achieve a goal.', category: 'C', subcategory: 'Diligence', order: 32, reversed: false },
  { key: 'HEXACO_33', text: 'I generally accept people\'s faults without complaining about them.', category: 'A', subcategory: 'Gentleness', order: 33, reversed: false },
  { key: 'HEXACO_34', text: 'In social situations, I\'m usually the one who makes the first move.', category: 'X', subcategory: 'Social Boldness', order: 34, reversed: false },
  { key: 'HEXACO_35', text: 'I worry a lot less than most people do.', category: 'E', subcategory: 'Anxiety', order: 35, reversed: true },
  { key: 'HEXACO_36', text: 'I would be tempted to buy stolen property if I were financially tight.', category: 'H', subcategory: 'Fairness', order: 36, reversed: true },
  { key: 'HEXACO_37', text: 'I would enjoy creating a work of art, such as a novel, a song, or a painting.', category: 'O', subcategory: 'Creativity', order: 37, reversed: false },
  { key: 'HEXACO_38', text: 'When working on something, I don\'t pay much attention to small details.', category: 'C', subcategory: 'Perfectionism', order: 38, reversed: true },
  { key: 'HEXACO_39', text: 'I am usually quite flexible in my opinions when people disagree with me.', category: 'A', subcategory: 'Flexibility', order: 39, reversed: false },
  { key: 'HEXACO_40', text: 'I enjoy having lots of people around to talk with.', category: 'X', subcategory: 'Sociability', order: 40, reversed: false },
  { key: 'HEXACO_41', text: 'I can handle difficult situations without needing emotional support from anyone else.', category: 'E', subcategory: 'Dependence', order: 41, reversed: true },
  { key: 'HEXACO_42', text: 'I would like to live in a very expensive, high-class neighborhood.', category: 'H', subcategory: 'Greed-Avoidance', order: 42, reversed: true },
  { key: 'HEXACO_43', text: 'I like people who have unconventional views.', category: 'O', subcategory: 'Unconventionality', order: 43, reversed: false },
  { key: 'HEXACO_44', text: 'I make a lot of mistakes because I don\'t think before I act.', category: 'C', subcategory: 'Prudence', order: 44, reversed: true },
  { key: 'HEXACO_45', text: 'I rarely feel anger, even when people treat me quite badly.', category: 'A', subcategory: 'Patience', order: 45, reversed: false },
  { key: 'HEXACO_46', text: 'On most days, I feel cheerful and optimistic.', category: 'X', subcategory: 'Liveliness', order: 46, reversed: false },
  { key: 'HEXACO_47', text: 'When someone I know well is unhappy, I can almost feel that person\'s pain myself.', category: 'E', subcategory: 'Sentimentality', order: 47, reversed: false },
  { key: 'HEXACO_48', text: 'I wouldn\'t want people to treat me as though I were superior to them.', category: 'H', subcategory: 'Modesty', order: 48, reversed: false },
  { key: 'HEXACO_49', text: 'If I had the opportunity, I would like to attend a classical music concert.', category: 'O', subcategory: 'Aesthetic Appreciation', order: 49, reversed: false },
  { key: 'HEXACO_50', text: 'People often joke with me about the messiness of my room or desk.', category: 'C', subcategory: 'Organization', order: 50, reversed: true },
  { key: 'HEXACO_51', text: 'If someone has cheated me once, I will always feel suspicious of that person.', category: 'A', subcategory: 'Forgiveness', order: 51, reversed: true },
  { key: 'HEXACO_52', text: 'I feel that I am an unpopular person.', category: 'X', subcategory: 'Social Self-Esteem', order: 52, reversed: true },
  { key: 'HEXACO_53', text: 'When it comes to physical danger, I am very fearful.', category: 'E', subcategory: 'Fearfulness', order: 53, reversed: false },
  { key: 'HEXACO_54', text: 'If I want something from someone, I will laugh at that person\'s worst jokes.', category: 'H', subcategory: 'Sincerity', order: 54, reversed: true },
  { key: 'HEXACO_55', text: 'I would be very bored by a book about the history of science and technology.', category: 'O', subcategory: 'Inquisitiveness', order: 55, reversed: true },
  { key: 'HEXACO_56', text: 'Often when I set a goal, I end up quitting without having reached it.', category: 'C', subcategory: 'Diligence', order: 56, reversed: true },
  { key: 'HEXACO_57', text: 'I tend to be lenient in judging other people.', category: 'A', subcategory: 'Gentleness', order: 57, reversed: false },
  { key: 'HEXACO_58', text: 'When I\'m in a group of people, I\'m often the one who speaks on behalf of the group.', category: 'X', subcategory: 'Social Boldness', order: 58, reversed: false },
  { key: 'HEXACO_59', text: 'I rarely, if ever, have trouble sleeping due to stress or anxiety.', category: 'E', subcategory: 'Anxiety', order: 59, reversed: true },
  { key: 'HEXACO_60', text: 'I would never accept a bribe, even if it were very large.', category: 'H', subcategory: 'Fairness', order: 60, reversed: false },
  { key: 'HEXACO_61', text: 'People have often told me that I have a good imagination.', category: 'O', subcategory: 'Creativity', order: 61, reversed: false },
  { key: 'HEXACO_62', text: 'I always try to be accurate in my work, even at the expense of time.', category: 'C', subcategory: 'Perfectionism', order: 62, reversed: false },
  { key: 'HEXACO_63', text: 'When people tell me that I\'m wrong, my first reaction is to argue with them.', category: 'A', subcategory: 'Flexibility', order: 63, reversed: true },
  { key: 'HEXACO_64', text: 'I prefer jobs that involve active social interaction to those that involve working alone.', category: 'X', subcategory: 'Sociability', order: 64, reversed: false },
  { key: 'HEXACO_65', text: 'Whenever I feel worried about something, I want to share my concern with another person.', category: 'E', subcategory: 'Dependence', order: 65, reversed: false },
  { key: 'HEXACO_66', text: 'I would like to be seen driving around in a very expensive car.', category: 'H', subcategory: 'Greed-Avoidance', order: 66, reversed: true },
  { key: 'HEXACO_67', text: 'I think of myself as a somewhat eccentric person.', category: 'O', subcategory: 'Unconventionality', order: 67, reversed: false },
  { key: 'HEXACO_68', text: 'I don\'t allow my impulses to govern my behavior.', category: 'C', subcategory: 'Prudence', order: 68, reversed: false },
  { key: 'HEXACO_69', text: 'Most people tend to get angry more quickly than I do.', category: 'A', subcategory: 'Patience', order: 69, reversed: false },
  { key: 'HEXACO_70', text: 'People often tell me that I should try to cheer up.', category: 'X', subcategory: 'Liveliness', order: 70, reversed: true },
  { key: 'HEXACO_71', text: 'I feel strong emotions when someone close to me is going away for a long time.', category: 'E', subcategory: 'Sentimentality', order: 71, reversed: false },
  { key: 'HEXACO_72', text: 'I think that I am entitled to more respect than the average person is.', category: 'H', subcategory: 'Modesty', order: 72, reversed: true },
  { key: 'HEXACO_73', text: 'Sometimes I like to just watch the wind as it blows through the trees.', category: 'O', subcategory: 'Aesthetic Appreciation', order: 73, reversed: false },
  { key: 'HEXACO_74', text: 'When working, I sometimes have difficulties due to being disorganized.', category: 'C', subcategory: 'Organization', order: 74, reversed: true },
  { key: 'HEXACO_75', text: 'I find it hard to fully forgive someone who has done something mean to me.', category: 'A', subcategory: 'Forgiveness', order: 75, reversed: true },
  { key: 'HEXACO_76', text: 'I sometimes feel that I am a worthless person.', category: 'X', subcategory: 'Social Self-Esteem', order: 76, reversed: true },
  { key: 'HEXACO_77', text: 'Even in an emergency I wouldn\'t feel like panicking.', category: 'E', subcategory: 'Fearfulness', order: 77, reversed: true },
  { key: 'HEXACO_78', text: 'I wouldn\'t pretend to like someone just to get that person to do favors for me.', category: 'H', subcategory: 'Sincerity', order: 78, reversed: false },
  { key: 'HEXACO_79', text: 'I\'ve never really enjoyed looking through an encyclopedia.', category: 'O', subcategory: 'Inquisitiveness', order: 79, reversed: true },
  { key: 'HEXACO_80', text: 'I do only the minimum amount of work needed to get by.', category: 'C', subcategory: 'Diligence', order: 80, reversed: true },
  { key: 'HEXACO_81', text: 'Even when people make a lot of mistakes, I rarely say anything negative.', category: 'A', subcategory: 'Gentleness', order: 81, reversed: false },
  { key: 'HEXACO_82', text: 'I tend to feel quite self-conscious when speaking in front of a group of people.', category: 'X', subcategory: 'Social Boldness', order: 82, reversed: true },
  { key: 'HEXACO_83', text: 'I get very anxious when waiting to hear about an important decision.', category: 'E', subcategory: 'Anxiety', order: 83, reversed: false },
  { key: 'HEXACO_84', text: 'I\'d be tempted to use counterfeit money, if I were sure I could get away with it.', category: 'H', subcategory: 'Fairness', order: 84, reversed: true },
  { key: 'HEXACO_85', text: 'I don\'t think of myself as the artistic or creative type.', category: 'O', subcategory: 'Creativity', order: 85, reversed: true },
  { key: 'HEXACO_86', text: 'People often call me a perfectionist.', category: 'C', subcategory: 'Perfectionism', order: 86, reversed: false },
  { key: 'HEXACO_87', text: 'I find it hard to compromise with people when I really think I\'m right.', category: 'A', subcategory: 'Flexibility', order: 87, reversed: true },
  { key: 'HEXACO_88', text: 'The first thing that I always do in a new place is to make friends.', category: 'X', subcategory: 'Sociability', order: 88, reversed: false },
  { key: 'HEXACO_89', text: 'I rarely discuss my problems with other people.', category: 'E', subcategory: 'Dependence', order: 89, reversed: true },
  { key: 'HEXACO_90', text: 'I would get a lot of pleasure from owning expensive luxury goods.', category: 'H', subcategory: 'Greed-Avoidance', order: 90, reversed: true },
  { key: 'HEXACO_91', text: 'I find it boring to discuss philosophy.', category: 'O', subcategory: 'Unconventionality', order: 91, reversed: true },
  { key: 'HEXACO_92', text: 'I prefer to do whatever comes to mind, rather than stick to a plan.', category: 'C', subcategory: 'Prudence', order: 92, reversed: true },
  { key: 'HEXACO_93', text: 'I find it hard to keep my temper when people insult me.', category: 'A', subcategory: 'Patience', order: 93, reversed: true },
  { key: 'HEXACO_94', text: 'Most people are more upbeat and dynamic than I generally am.', category: 'X', subcategory: 'Liveliness', order: 94, reversed: true },
  { key: 'HEXACO_95', text: 'I remain unemotional even in situations where most people get very sentimental.', category: 'E', subcategory: 'Sentimentality', order: 95, reversed: true },
  { key: 'HEXACO_96', text: 'I want people to know that I am an important person of high status.', category: 'H', subcategory: 'Modesty', order: 96, reversed: true },
  // Interstitial - Altruism scale (questions 97-100)
  { key: 'HEXACO_97', text: 'I have sympathy for people who are less fortunate than I am.', category: 'I', subcategory: 'Altruism', order: 97, reversed: false },
  { key: 'HEXACO_98', text: 'I try to give generously to those in need.', category: 'I', subcategory: 'Altruism', order: 98, reversed: false },
  { key: 'HEXACO_99', text: 'It wouldn\'t bother me to harm someone I didn\'t like.', category: 'I', subcategory: 'Altruism', order: 99, reversed: true },
  { key: 'HEXACO_100', text: 'People see me as a hard-hearted person.', category: 'I', subcategory: 'Altruism', order: 100, reversed: true },
];

// Helper function to convert Big Five scores to HEXACO scores (on 1-5 scale)
// Big Five uses raw scores, HEXACO uses 1-5 Likert scale
const convertBigFiveToHexaco = (bigFiveProfile) => {
  // Convert raw scores to approximate 1-5 scale
  // Big Five max per dimension is typically 50, so divide by 10
  const normalize = (score) => Math.max(1, Math.min(5, Math.round(score / 10)));

  return {
    openness: normalize(bigFiveProfile.openness),
    conscientiousness: normalize(bigFiveProfile.conscientiousness),
    extraversion: normalize(bigFiveProfile.extraversion),
    // Split agreeableness between Agreeableness and Honesty-Humility
    agreeableness: normalize(bigFiveProfile.agreeableness * 0.7),
    emotionality: normalize(bigFiveProfile.neuroticism), // Neuroticism maps to Emotionality
    honestyHumility: normalize(bigFiveProfile.agreeableness * 0.6), // Derive from agreeableness
    altruism: normalize(bigFiveProfile.agreeableness * 0.8), // Interstitial scale
  };
};

// Generate mock answers for each model based on Big Five data
// Each answer is on a 1-5 scale (strongly disagree to strongly agree)
const generateMockAnswersForModel = (hexacoScores) => {
  const answers = {};

  // Map categories to their HEXACO dimension scores
  const categoryScores = {
    'O': hexacoScores.openness,
    'C': hexacoScores.conscientiousness,
    'X': hexacoScores.extraversion,
    'A': hexacoScores.agreeableness,
    'E': hexacoScores.emotionality,
    'H': hexacoScores.honestyHumility,
    'I': hexacoScores.altruism,
  };

  // Generate answers for each question
  // NOTE: We store RAW responses (1-5) here. The scoring module will handle reversal.
  HEXACO_QUESTIONS.forEach(q => {
    const baseScore = categoryScores[q.category];
    // Add some variation (-1 to +1) to make it realistic
    const variation = Math.floor(Math.random() * 3) - 1;
    let score = baseScore + variation;
    score = Math.max(1, Math.min(5, score)); // Clamp to 1-5

    // Store the raw response (reversal happens in scoring module)
    answers[q.key] = score;
  });

  return answers;
};

// Import Big Five data and convert to HEXACO mock answers
const BIG_FIVE_PROFILES = [
  // GPT-4o versions
  { modelName: 'GPT-4o', version: '20250915', openness: 44, conscientiousness: 45, extraversion: 33, agreeableness: 47, neuroticism: 18 },
  { modelName: 'GPT-4o', version: '20250815', openness: 44, conscientiousness: 18, extraversion: 47, agreeableness: 33, neuroticism: 45 },
  { modelName: 'GPT-4o', version: '20250701', openness: 42, conscientiousness: 20, extraversion: 45, agreeableness: 35, neuroticism: 43 },
  // GPT-3.5 Turbo versions
  { modelName: 'GPT-3.5 Turbo', version: '20250815', openness: 40, conscientiousness: 30, extraversion: 40, agreeableness: 35, neuroticism: 25 },
  { modelName: 'GPT-3.5 Turbo', version: '20250701', openness: 38, conscientiousness: 28, extraversion: 38, agreeableness: 33, neuroticism: 27 },
  // GPT-4o Mini versions
  { modelName: 'GPT-4o Mini', version: '20250815', openness: 35, conscientiousness: 32, extraversion: 35, agreeableness: 38, neuroticism: 28 },
  { modelName: 'GPT-4o Mini', version: '20250701', openness: 33, conscientiousness: 30, extraversion: 33, agreeableness: 36, neuroticism: 30 },
  // GPT-5
  { modelName: 'GPT-5', version: '2025-08-07', openness: 38, conscientiousness: 30, extraversion: 40, agreeableness: 35, neuroticism: 25 },
  // Claude Opus 4.1 versions
  { modelName: 'Claude Opus 4.1', version: '20250901', openness: 25, conscientiousness: 40, extraversion: 25, agreeableness: 35, neuroticism: 12 },
  { modelName: 'Claude Opus 4.1', version: '20250815', openness: 23, conscientiousness: 38, extraversion: 23, agreeableness: 33, neuroticism: 14 },
  { modelName: 'Claude Opus 4.1', version: '20250701', openness: 21, conscientiousness: 36, extraversion: 21, agreeableness: 31, neuroticism: 16 },
  // Claude Sonnet 4 versions
  { modelName: 'Claude Sonnet 4', version: '20250910', openness: 32, conscientiousness: 43, extraversion: 23, agreeableness: 15, neuroticism: 27 },
  { modelName: 'Claude Sonnet 4', version: '20250810', openness: 30, conscientiousness: 41, extraversion: 22, agreeableness: 17, neuroticism: 26 },
  { modelName: 'Claude Sonnet 4', version: '20250705', openness: 29, conscientiousness: 39, extraversion: 21, agreeableness: 18, neuroticism: 25 },
  // Claude 3.5 Sonnet versions
  { modelName: 'Claude 3.5 Sonnet', version: '20241022', openness: 20, conscientiousness: 30, extraversion: 20, agreeableness: 26, neuroticism: 18 },
  { modelName: 'Claude 3.5 Sonnet', version: '20240620', openness: 18, conscientiousness: 28, extraversion: 18, agreeableness: 24, neuroticism: 20 },
  // Claude 3.5 Haiku versions
  { modelName: 'Claude 3.5 Haiku', version: '20241022', openness: 18, conscientiousness: 26, extraversion: 18, agreeableness: 24, neuroticism: 20 },
  { modelName: 'Claude 3.5 Haiku', version: '20240701', openness: 16, conscientiousness: 24, extraversion: 16, agreeableness: 22, neuroticism: 22 },
  // Gemini 2.5 Pro versions
  { modelName: 'Gemini 2.5 Pro', version: '20250915', openness: 29, conscientiousness: 33, extraversion: 29, agreeableness: 31, neuroticism: 22 },
  { modelName: 'Gemini 2.5 Pro', version: '20250815', openness: 27, conscientiousness: 31, extraversion: 27, agreeableness: 29, neuroticism: 24 },
  { modelName: 'Gemini 2.5 Pro', version: '20250701', openness: 25, conscientiousness: 29, extraversion: 25, agreeableness: 27, neuroticism: 26 },
  // Gemini 2.5 Flash versions
  { modelName: 'Gemini 2.5 Flash', version: '20250815', openness: 27, conscientiousness: 31, extraversion: 27, agreeableness: 29, neuroticism: 24 },
  { modelName: 'Gemini 2.5 Flash', version: '20250701', openness: 25, conscientiousness: 29, extraversion: 25, agreeableness: 27, neuroticism: 26 },
  // Gemini 2.0 Flash versions
  { modelName: 'Gemini 2.0 Flash', version: '20250815', openness: 34, conscientiousness: 13, extraversion: 45, agreeableness: 23, neuroticism: 36 },
  { modelName: 'Gemini 2.0 Flash', version: '20241215', openness: 32, conscientiousness: 15, extraversion: 42, agreeableness: 25, neuroticism: 34 },
  { modelName: 'Gemini 2.0 Flash', version: '20240601', openness: 30, conscientiousness: 17, extraversion: 40, agreeableness: 26, neuroticism: 33 },
];

// Convert Big Five profiles to HEXACO mock answers
const MOCK_HEXACO_ANSWERS = {};
BIG_FIVE_PROFILES.forEach(profile => {
  const key = `${profile.modelName}-${profile.version}`;
  const hexacoScores = convertBigFiveToHexaco(profile);
  MOCK_HEXACO_ANSWERS[key] = generateMockAnswersForModel(hexacoScores);
});

module.exports = async function seedHexacoConversationalProfile(prisma, options = {}) {
  const { models = {}, modelVersions = {} } = options;

  // 1. Create the HEXACO test
  let hexacoTest = await prisma.conversationalProfileTest.findFirst({
    where: { name: 'HEXACO Personality Inventory' },
  });

  if (hexacoTest) {
    hexacoTest = await prisma.conversationalProfileTest.update({
      where: { id: hexacoTest.id },
      data: {
        description: 'Measures personality across six dimensions: Honesty-Humility, Emotionality, Extraversion, Agreeableness, Conscientiousness, and Openness to Experience, plus an Altruism interstitial scale',
        testType: 'personality',
        isValidated: true,
        isPublic: true,
      },
    });
  } else {
    hexacoTest = await prisma.conversationalProfileTest.create({
      data: {
        name: 'HEXACO Personality Inventory',
        description: 'Measures personality across six dimensions: Honesty-Humility, Emotionality, Extraversion, Agreeableness, Conscientiousness, and Openness to Experience, plus an Altruism interstitial scale',
        testType: 'personality',
        version: 1,
        isValidated: true,
        isPublic: true,
      },
    });
  }

  console.log(`Created/updated HEXACO test: ${hexacoTest.id}`);

  // 2. Create all 100 questions
  const questionRecords = {};
  for (const q of HEXACO_QUESTIONS) {
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
          test: {
            connect: { id: hexacoTest.id },
          },
          questionType: 'NUMBER',
          category: q.category,
          subcategory: q.subcategory,
          displayOrder: q.order,
          isActive: true,
          isDisplayed: true,
        },
      });
    } else {
      question = await prisma.conversationalProfileQuestion.create({
        data: {
          test: {
            connect: { id: hexacoTest.id },
          },
          questionType: 'NUMBER',
          questionKey: q.key,
          questionText: q.text,
          category: q.category,
          subcategory: q.subcategory,
          displayOrder: q.order,
          isActive: true,
          isDisplayed: true,
        },
      });
    }
    questionRecords[q.key] = { ...question, reversed: q.reversed };
  }

  console.log(`Created/updated ${Object.keys(questionRecords).length} HEXACO questions`);

  // 3. Create mock reviewer user if needed
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

  // 4. Create mock answers for each model version
  let answerCount = 0;
  for (const [modelVersionKey, answers] of Object.entries(MOCK_HEXACO_ANSWERS)) {
    const lastHyphenIndex = modelVersionKey.lastIndexOf('-');
    const modelName = modelVersionKey.substring(0, lastHyphenIndex);
    const versionStr = modelVersionKey.substring(lastHyphenIndex + 1);
    const modelRecord = models[modelName];

    if (!modelRecord) {
      console.warn(`Skipping HEXACO answers for ${modelName} – model not found`);
      continue;
    }

    const versionsForModel = modelVersions[modelRecord.id] ?? {};
    const versionRecord = versionsForModel[versionStr];

    if (!versionRecord) {
      console.warn(`Skipping HEXACO answers for ${modelName} (${versionStr}) – version not found`);
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

    // Create answers for all 100 questions
    for (const q of HEXACO_QUESTIONS) {
      const questionRecord = questionRecords[q.key];
      const answerValue = answers[q.key];

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
            numericValue: answerValue,
            isApproved: true,
            approvedBy: reviewer.id,
            approvedAt: new Date(),
          },
        });
      } else {
        await prisma.conversationalProfileAnswer.create({
          data: {
            questionId: questionRecord.id,
            entityType: 'MODEL_VERSION',
            entityId: versionRecord.id,
            evaluationEntityId: evaluationEntity.id,
            numericValue: answerValue,
            reviewerId: reviewer.id,
            isApproved: true,
            approvedBy: reviewer.id,
            approvedAt: new Date(),
          },
        });
      }
      answerCount++;
    }

    console.log(`Created/updated HEXACO answers for ${modelName} (${versionStr})`);
  }

  console.log(`Total HEXACO answers created/updated: ${answerCount}`);
};
