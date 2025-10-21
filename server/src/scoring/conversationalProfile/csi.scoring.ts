// CSI (Communication Styles Inventory) Scoring Module
// Handles scoring logic for the CSI communication styles assessment

import type { CSIScores, CSIDomains, AnswerWithQuestion } from '../../types/api';

// CSI domain and facet mappings with reverse-scored items
const CSI_DOMAINS: CSIDomains = {
  EXP: {
    name: 'Expressiveness',
    facets: {
      Talkativeness: {
        questions: ['CSI_1', 'CSI_25', 'CSI_49', 'CSI_73'],
        reversed: ['CSI_73'],
      },
      'Conversational Dominance': {
        questions: ['CSI_2', 'CSI_26', 'CSI_50', 'CSI_74'],
        reversed: ['CSI_74'],
      },
      Humor: {
        questions: ['CSI_3', 'CSI_27', 'CSI_51', 'CSI_75'],
        reversed: ['CSI_75'],
      },
      Informality: {
        questions: ['CSI_4', 'CSI_28', 'CSI_52', 'CSI_76'],
        reversed: ['CSI_76'],
      },
    },
  },
  PRE: {
    name: 'Preciseness',
    facets: {
      Accuracy: {
        questions: ['CSI_5', 'CSI_29', 'CSI_53', 'CSI_77'],
        reversed: ['CSI_77'],
      },
      Detail: {
        questions: ['CSI_6', 'CSI_30', 'CSI_54', 'CSI_78'],
        reversed: ['CSI_78'],
      },
      Brevity: {
        questions: ['CSI_7', 'CSI_31', 'CSI_55', 'CSI_79'],
        reversed: ['CSI_79'],
      },
      'Verbal Organization': {
        questions: ['CSI_8', 'CSI_32', 'CSI_56', 'CSI_80'],
        reversed: ['CSI_80'],
      },
    },
  },
  VAG: {
    name: 'Verbal Aggressiveness',
    facets: {
      Argumentativeness: {
        questions: ['CSI_9', 'CSI_33', 'CSI_57', 'CSI_81'],
        reversed: ['CSI_81'],
      },
      Authoritarianism: {
        questions: ['CSI_10', 'CSI_34', 'CSI_58', 'CSI_82'],
        reversed: ['CSI_82'],
      },
      Defensiveness: {
        questions: ['CSI_11', 'CSI_35', 'CSI_59', 'CSI_83'],
        reversed: ['CSI_83'],
      },
      Hostility: {
        questions: ['CSI_12', 'CSI_36', 'CSI_60', 'CSI_84'],
        reversed: ['CSI_84'],
      },
    },
  },
  QUE: {
    name: 'Questioningness',
    facets: {
      Inquisitiveness: {
        questions: ['CSI_13', 'CSI_37', 'CSI_61', 'CSI_85'],
        reversed: ['CSI_85'],
      },
      'Philosophical Tendency': {
        questions: ['CSI_14', 'CSI_38', 'CSI_62', 'CSI_86'],
        reversed: ['CSI_86'],
      },
      Indecision: {
        questions: ['CSI_15', 'CSI_39', 'CSI_63', 'CSI_87'],
        reversed: ['CSI_87'],
      },
      'Self-Disclosure': {
        questions: ['CSI_16', 'CSI_40', 'CSI_64', 'CSI_88'],
        reversed: ['CSI_88'],
      },
    },
  },
  EMO: {
    name: 'Emotionality',
    facets: {
      'Positive Feeling Expression': {
        questions: ['CSI_17', 'CSI_41', 'CSI_65', 'CSI_89'],
        reversed: ['CSI_89'],
      },
      'Negative Feeling Expression': {
        questions: ['CSI_18', 'CSI_42', 'CSI_66', 'CSI_90'],
        reversed: ['CSI_90'],
      },
      Passionateness: {
        questions: ['CSI_19', 'CSI_43', 'CSI_67', 'CSI_91'],
        reversed: ['CSI_91'],
      },
      Encouragement: {
        questions: ['CSI_20', 'CSI_44', 'CSI_68', 'CSI_92'],
        reversed: ['CSI_92'],
      },
    },
  },
  IMP: {
    name: 'Impression Manipulativeness',
    facets: {
      Conceitedness: {
        questions: ['CSI_21', 'CSI_45', 'CSI_69', 'CSI_93'],
        reversed: ['CSI_93'],
      },
      Artificiality: {
        questions: ['CSI_22', 'CSI_46', 'CSI_70', 'CSI_94'],
        reversed: ['CSI_94'],
      },
      Evasiveness: {
        questions: ['CSI_23', 'CSI_47', 'CSI_71', 'CSI_95'],
        reversed: ['CSI_95'],
      },
      // Note: Inscrutableness facet is excluded from scoring per factor analysis
      // Questions CSI_24, CSI_48, CSI_72, CSI_96 are not included in domain calculation
      Inscrutableness: {
        questions: ['CSI_24', 'CSI_48', 'CSI_72', 'CSI_96'],
        reversed: ['CSI_96'],
      },
    },
  },
};

// Reverse score a value (1-5 scale becomes 5-1)
const reverseScore = (value: number | null): number | null => {
  if (value === null || value === undefined) return null;
  return 6 - value;
};

// Calculate facet score from answers (average of items)
const calculateFacetScore = (
  answers: AnswerWithQuestion[],
  domain: string,
  facetName: string
): number | null => {
  const facetConfig = CSI_DOMAINS[domain]?.facets[facetName];
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

// Calculate domain score (average of facet scores)
// Special case: Impression Manipulativeness excludes Inscrutableness facet
const calculateDomainScore = (
  answers: AnswerWithQuestion[],
  domain: string
): number | null => {
  const domainConfig = CSI_DOMAINS[domain];
  if (!domainConfig) return null;

  const facetScores: number[] = [];

  for (const facetName in domainConfig.facets) {
    // Skip Inscrutableness facet when calculating Impression Manipulativeness domain score
    if (domain === 'IMP' && facetName === 'Inscrutableness') {
      continue;
    }

    const facetScore = calculateFacetScore(answers, domain, facetName);
    if (facetScore !== null) {
      facetScores.push(facetScore);
    }
  }

  // Return average of facet scores
  return facetScores.length > 0
    ? facetScores.reduce((sum, score) => sum + score, 0) / facetScores.length
    : null;
};

// Calculate all domain and facet scores for a set of answers
const calculateScores = (answers: AnswerWithQuestion[]): CSIScores => {
  const scores: CSIScores = {
    expressiveness: calculateDomainScore(answers, 'EXP'),
    preciseness: calculateDomainScore(answers, 'PRE'),
    verbal_aggressiveness: calculateDomainScore(answers, 'VAG'),
    questioningness: calculateDomainScore(answers, 'QUE'),
    emotionality: calculateDomainScore(answers, 'EMO'),
    impression_manipulativeness: calculateDomainScore(answers, 'IMP'),
    facets: {},
  };

  // Calculate facet scores for each domain
  for (const [domainCode, domainConfig] of Object.entries(CSI_DOMAINS)) {
    for (const facetName in domainConfig.facets) {
      const facetKey = `${domainConfig.name.toLowerCase().replace(/[^a-z]+/g, '_')}_${facetName.toLowerCase().replace(/[^a-z]+/g, '_')}`;
      scores.facets![facetKey] = calculateFacetScore(answers, domainCode, facetName);
    }
  }

  return scores;
};

export {
  CSI_DOMAINS as domains,
  calculateScores,
  reverseScore,
  calculateFacetScore,
  calculateDomainScore,
};

export const testName = 'Communication Styles Inventory';
