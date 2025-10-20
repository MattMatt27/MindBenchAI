// HEXACO Personality Inventory Scoring Module
// Handles scoring logic for the HEXACO personality assessment

import type { HEXACOScores, HEXACODimensions, AnswerWithQuestion } from '../../types/api';

// HEXACO dimension and facet mappings with reverse-scored items
const HEXACO_DIMENSIONS: HEXACODimensions = {
  H: {
    name: 'Honesty-Humility',
    facets: {
      Sincerity: {
        questions: ['HEXACO_6', 'HEXACO_30', 'HEXACO_54', 'HEXACO_78'],
        reversed: ['HEXACO_6', 'HEXACO_54'], // 6, 54 are reversed
      },
      Fairness: {
        questions: ['HEXACO_12', 'HEXACO_36', 'HEXACO_60', 'HEXACO_84'],
        reversed: ['HEXACO_12', 'HEXACO_36', 'HEXACO_84'], // 12, 36, 84 are reversed
      },
      'Greed-Avoidance': {
        questions: ['HEXACO_18', 'HEXACO_42', 'HEXACO_66', 'HEXACO_90'],
        reversed: ['HEXACO_42', 'HEXACO_66', 'HEXACO_90'], // 42, 66, 90 are reversed
      },
      Modesty: {
        questions: ['HEXACO_24', 'HEXACO_48', 'HEXACO_72', 'HEXACO_96'],
        reversed: ['HEXACO_72', 'HEXACO_96'], // 72, 96 are reversed
      },
    },
  },
  E: {
    name: 'Emotionality',
    facets: {
      Fearfulness: {
        questions: ['HEXACO_5', 'HEXACO_29', 'HEXACO_53', 'HEXACO_77'],
        reversed: ['HEXACO_29', 'HEXACO_77'], // 29, 77 are reversed
      },
      Anxiety: {
        questions: ['HEXACO_11', 'HEXACO_35', 'HEXACO_59', 'HEXACO_83'],
        reversed: ['HEXACO_35', 'HEXACO_59'], // 35, 59 are reversed
      },
      Dependence: {
        questions: ['HEXACO_17', 'HEXACO_41', 'HEXACO_65', 'HEXACO_89'],
        reversed: ['HEXACO_41', 'HEXACO_89'], // 41, 89 are reversed
      },
      Sentimentality: {
        questions: ['HEXACO_23', 'HEXACO_47', 'HEXACO_71', 'HEXACO_95'],
        reversed: ['HEXACO_95'], // 95 is reversed
      },
    },
  },
  X: {
    name: 'Extraversion',
    facets: {
      'Social Self-Esteem': {
        questions: ['HEXACO_4', 'HEXACO_28', 'HEXACO_52', 'HEXACO_76'],
        reversed: ['HEXACO_52', 'HEXACO_76'], // 52, 76 are reversed
      },
      'Social Boldness': {
        questions: ['HEXACO_10', 'HEXACO_34', 'HEXACO_58', 'HEXACO_82'],
        reversed: ['HEXACO_10', 'HEXACO_82'], // 10, 82 are reversed
      },
      Sociability: {
        questions: ['HEXACO_16', 'HEXACO_40', 'HEXACO_64', 'HEXACO_88'],
        reversed: ['HEXACO_16'], // 16 is reversed
      },
      Liveliness: {
        questions: ['HEXACO_22', 'HEXACO_46', 'HEXACO_70', 'HEXACO_94'],
        reversed: ['HEXACO_70', 'HEXACO_94'], // 70, 94 are reversed
      },
    },
  },
  A: {
    name: 'Agreeableness',
    facets: {
      Forgiveness: {
        questions: ['HEXACO_3', 'HEXACO_27', 'HEXACO_51', 'HEXACO_75'],
        reversed: ['HEXACO_51', 'HEXACO_75'], // 51, 75 are reversed
      },
      Gentleness: {
        questions: ['HEXACO_9', 'HEXACO_33', 'HEXACO_57', 'HEXACO_81'],
        reversed: ['HEXACO_9'], // 9 is reversed
      },
      Flexibility: {
        questions: ['HEXACO_15', 'HEXACO_39', 'HEXACO_63', 'HEXACO_87'],
        reversed: ['HEXACO_15', 'HEXACO_63', 'HEXACO_87'], // 15, 63, 87 are reversed
      },
      Patience: {
        questions: ['HEXACO_21', 'HEXACO_45', 'HEXACO_69', 'HEXACO_93'],
        reversed: ['HEXACO_21', 'HEXACO_93'], // 21, 93 are reversed
      },
    },
  },
  C: {
    name: 'Conscientiousness',
    facets: {
      Organization: {
        questions: ['HEXACO_2', 'HEXACO_26', 'HEXACO_50', 'HEXACO_74'],
        reversed: ['HEXACO_50', 'HEXACO_74'], // 50, 74 are reversed
      },
      Diligence: {
        questions: ['HEXACO_8', 'HEXACO_32', 'HEXACO_56', 'HEXACO_80'],
        reversed: ['HEXACO_56', 'HEXACO_80'], // 56, 80 are reversed
      },
      Perfectionism: {
        questions: ['HEXACO_14', 'HEXACO_38', 'HEXACO_62', 'HEXACO_86'],
        reversed: ['HEXACO_38'], // 38 is reversed
      },
      Prudence: {
        questions: ['HEXACO_20', 'HEXACO_44', 'HEXACO_68', 'HEXACO_92'],
        reversed: ['HEXACO_20', 'HEXACO_44', 'HEXACO_92'], // 20, 44, 92 are reversed
      },
    },
  },
  O: {
    name: 'Openness to Experience',
    facets: {
      'Aesthetic Appreciation': {
        questions: ['HEXACO_1', 'HEXACO_25', 'HEXACO_49', 'HEXACO_73'],
        reversed: ['HEXACO_1', 'HEXACO_25'], // 1, 25 are reversed
      },
      Inquisitiveness: {
        questions: ['HEXACO_7', 'HEXACO_31', 'HEXACO_55', 'HEXACO_79'],
        reversed: ['HEXACO_55', 'HEXACO_79'], // 55, 79 are reversed
      },
      Creativity: {
        questions: ['HEXACO_13', 'HEXACO_37', 'HEXACO_61', 'HEXACO_85'],
        reversed: ['HEXACO_13', 'HEXACO_85'], // 13, 85 are reversed
      },
      Unconventionality: {
        questions: ['HEXACO_19', 'HEXACO_43', 'HEXACO_67', 'HEXACO_91'],
        reversed: ['HEXACO_19', 'HEXACO_91'], // 19, 91 are reversed
      },
    },
  },
  I: {
    name: 'Altruism (Interstitial)',
    facets: {
      Altruism: {
        questions: ['HEXACO_97', 'HEXACO_98', 'HEXACO_99', 'HEXACO_100'],
        reversed: ['HEXACO_99', 'HEXACO_100'], // 99, 100 are reversed
      },
    },
  },
};

// Reverse score a value (1-5 scale becomes 5-1)
const reverseScore = (value: number | null): number | null => {
  if (value === null || value === undefined) return null;
  return 6 - value;
};

// Calculate facet score from answers
const calculateFacetScore = (
  answers: AnswerWithQuestion[],
  dimension: string,
  facetName: string
): number | null => {
  const facetConfig = HEXACO_DIMENSIONS[dimension]?.facets[facetName];
  if (!facetConfig) return null;

  let total = 0;
  let count = 0;

  for (const answer of answers) {
    const questionKey = answer.question.questionKey;
    if (!facetConfig.questions.includes(questionKey)) continue;

    const value = answer.numericValue ? Number(answer.numericValue) : null;
    if (value === null) continue;

    // Apply reverse scoring if needed
    const score = facetConfig.reversed.includes(questionKey)
      ? reverseScore(value)
      : value;

    if (score !== null) {
      total += score;
      count++;
    }
  }

  // Each facet has 4 items, return average score
  return count > 0 ? total / count : null;
};

// Calculate dimension score (average of all facet scores)
const calculateDimensionScore = (
  answers: AnswerWithQuestion[],
  dimension: string
): number | null => {
  const dimensionConfig = HEXACO_DIMENSIONS[dimension];
  if (!dimensionConfig) return null;

  const facetScores: number[] = [];

  for (const facetName in dimensionConfig.facets) {
    const facetScore = calculateFacetScore(answers, dimension, facetName);
    if (facetScore !== null) {
      facetScores.push(facetScore);
    }
  }

  // Return average of facet scores
  return facetScores.length > 0
    ? facetScores.reduce((sum, score) => sum + score, 0) / facetScores.length
    : null;
};

// Calculate all dimension and facet scores for a set of answers
const calculateScores = (answers: AnswerWithQuestion[]): HEXACOScores => {
  const scores: HEXACOScores = {
    honesty_humility: calculateDimensionScore(answers, 'H'),
    emotionality: calculateDimensionScore(answers, 'E'),
    extraversion: calculateDimensionScore(answers, 'X'),
    agreeableness: calculateDimensionScore(answers, 'A'),
    conscientiousness: calculateDimensionScore(answers, 'C'),
    openness: calculateDimensionScore(answers, 'O'),
    altruism: calculateDimensionScore(answers, 'I'),
    facets: {},
  };

  // Calculate facet scores for each dimension
  for (const [dimensionCode, dimensionConfig] of Object.entries(HEXACO_DIMENSIONS)) {
    for (const facetName in dimensionConfig.facets) {
      const facetKey = `${dimensionConfig.name.toLowerCase().replace(/[^a-z]+/g, '_')}_${facetName.toLowerCase().replace(/[^a-z]+/g, '_')}`;
      scores.facets![facetKey] = calculateFacetScore(answers, dimensionCode, facetName);
    }
  }

  return scores;
};

export {
  HEXACO_DIMENSIONS as dimensions,
  calculateScores,
  reverseScore,
  calculateFacetScore,
  calculateDimensionScore,
};

export const testName = 'HEXACO Personality Inventory';
