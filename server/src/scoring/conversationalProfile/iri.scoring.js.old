// IRI (Interpersonal Reactivity Index) Scoring Module
// Handles scoring logic for the IRI empathy assessment

// Subscale mappings with reverse-scored items
const IRI_SUBSCALES = {
  PT: {
    name: 'Perspective Taking',
    questions: ['IRI_3', 'IRI_8', 'IRI_11', 'IRI_15', 'IRI_21', 'IRI_25', 'IRI_28'],
    reversed: ['IRI_3', 'IRI_15'], // Items to reverse score
  },
  FS: {
    name: 'Fantasy',
    questions: ['IRI_1', 'IRI_5', 'IRI_7', 'IRI_12', 'IRI_16', 'IRI_23', 'IRI_26'],
    reversed: ['IRI_7', 'IRI_12'],
  },
  EC: {
    name: 'Empathic Concern',
    questions: ['IRI_2', 'IRI_4', 'IRI_9', 'IRI_14', 'IRI_18', 'IRI_20', 'IRI_22'],
    reversed: ['IRI_4', 'IRI_14', 'IRI_18'],
  },
  PD: {
    name: 'Personal Distress',
    questions: ['IRI_6', 'IRI_10', 'IRI_13', 'IRI_17', 'IRI_19', 'IRI_24', 'IRI_27'],
    reversed: ['IRI_13', 'IRI_19'],
  },
};

// Reverse score a value (0-4 scale becomes 4-0)
const reverseScore = (value) => {
  if (value === null || value === undefined) return null;
  return 4 - value;
};

// Calculate subscale score from answers
const calculateSubscaleScore = (answers, subscale) => {
  const subscaleConfig = IRI_SUBSCALES[subscale];
  if (!subscaleConfig) return null;

  let total = 0;
  let count = 0;

  for (const answer of answers) {
    const questionKey = answer.question.questionKey;
    if (!subscaleConfig.questions.includes(questionKey)) continue;

    const value = answer.numericValue ? Number(answer.numericValue) : null;
    if (value === null) continue;

    // Apply reverse scoring if needed
    const score = subscaleConfig.reversed.includes(questionKey)
      ? reverseScore(value)
      : value;

    total += score;
    count++;
  }

  // Each subscale has 7 items, max score is 28 (7 × 4)
  return count > 0 ? total : null;
};

// Calculate all subscale scores for a set of answers
const calculateScores = (answers) => {
  return {
    perspective_taking: calculateSubscaleScore(answers, 'PT'),
    fantasy: calculateSubscaleScore(answers, 'FS'),
    empathic_concern: calculateSubscaleScore(answers, 'EC'),
    personal_distress: calculateSubscaleScore(answers, 'PD'),
  };
};

module.exports = {
  testName: 'Interpersonal Reactivity Index',
  subscales: IRI_SUBSCALES,
  calculateScores,
  reverseScore,
  calculateSubscaleScore,
};
