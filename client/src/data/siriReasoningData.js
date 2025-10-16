// Mock data for SIRI-2 reasoning page

// Question-by-question performance data (mean scores)
export const siriQuestions = [
  { id: '1A', label: 'Q1A' },
  { id: '1B', label: 'Q1B' },
  { id: '2A', label: 'Q2A' },
  { id: '2B', label: 'Q2B' },
  { id: '3A', label: 'Q3A' },
  { id: '3B', label: 'Q3B' },
  { id: '4A', label: 'Q4A' },
  { id: '4B', label: 'Q4B' },
  { id: '5A', label: 'Q5A' },
  { id: '5B', label: 'Q5B' },
  { id: '6A', label: 'Q6A' },
  { id: '6B', label: 'Q6B' },
];

export const models = [
  { id: 'expert', name: 'Expert', color: '#10b981' },
  { id: 'gpt-35-turbo', name: 'GPT-3.5 Turbo', color: '#93c5fd' },
  { id: 'gpt-4o', name: 'GPT-4o', color: '#3b82f6' },
  { id: 'claude-35-sonnet', name: 'Claude 3.5 Sonnet', color: '#fb923c' },
  { id: 'claude-opus-4', name: 'Claude Opus 4', color: '#f97316' },
  { id: 'gemini-2-flash', name: 'Gemini 2.0 Flash', color: '#c4b5fd' },
  { id: 'gemini-25-pro', name: 'Gemini 2.5 Pro', color: '#a78bfa' },
];

// Question by question mean scores (simulated data)
export const questionScores = {
  '1A': {
    'expert': -2.8,
    'gpt-35-turbo': 0.1,
    'gpt-4o': -2.7,
    'claude-35-sonnet': -2.1,
    'claude-opus-4': -3.2,
    'gemini-2-flash': 0.2,
    'gemini-25-pro': -3.1
  },
  '1B': {
    'expert': 2.9,
    'gpt-35-turbo': 1.9,
    'gpt-4o': 0.5,
    'claude-35-sonnet': 2.8,
    'claude-opus-4': 0.4,
    'gemini-2-flash': 2.6,
    'gemini-25-pro': 2.1
  },
  '2A': {
    'expert': -2.7,
    'gpt-35-turbo': 0.2,
    'gpt-4o': -2.8,
    'claude-35-sonnet': -2.3,
    'claude-opus-4': -3.0,
    'gemini-2-flash': 0.0,
    'gemini-25-pro': -2.9
  },
  '2B': {
    'expert': 2.8,
    'gpt-35-turbo': 1.9,
    'gpt-4o': 2.9,
    'claude-35-sonnet': 2.7,
    'claude-opus-4': 2.0,
    'gemini-2-flash': 2.8,
    'gemini-25-pro': 2.7
  },
  '3A': {
    'expert': 1.5,
    'gpt-35-turbo': 0.0,
    'gpt-4o': 1.3,
    'claude-35-sonnet': -2.1,
    'claude-opus-4': -0.4,
    'gemini-2-flash': 0.1,
    'gemini-25-pro': -0.2
  },
  '3B': {
    'expert': 3.1,
    'gpt-35-turbo': 2.1,
    'gpt-4o': 2.1,
    'claude-35-sonnet': 2.8,
    'claude-opus-4': 1.9,
    'gemini-2-flash': 2.7,
    'gemini-25-pro': 2.9
  },
  '4A': {
    'expert': 1.2,
    'gpt-35-turbo': 0.1,
    'gpt-4o': -1.6,
    'claude-35-sonnet': 1.3,
    'claude-opus-4': -3.1,
    'gemini-2-flash': 1.9,
    'gemini-25-pro': 2.0
  },
  '4B': {
    'expert': -2.9,
    'gpt-35-turbo': 0.0,
    'gpt-4o': -2.9,
    'claude-35-sonnet': 2.1,
    'claude-opus-4': -2.8,
    'gemini-2-flash': 0.0,
    'gemini-25-pro': 2.9
  },
  '5A': {
    'expert': 2.6,
    'gpt-35-turbo': 0.9,
    'gpt-4o': 2.2,
    'claude-35-sonnet': 2.3,
    'claude-opus-4': 1.7,
    'gemini-2-flash': 2.9,
    'gemini-25-pro': 2.8
  },
  '5B': {
    'expert': -3.0,
    'gpt-35-turbo': 0.0,
    'gpt-4o': -2.9,
    'claude-35-sonnet': -2.0,
    'claude-opus-4': -3.1,
    'gemini-2-flash': 0.1,
    'gemini-25-pro': -3.0
  },
  '6A': {
    'expert': 0.8,
    'gpt-35-turbo': 0.1,
    'gpt-4o': 0.2,
    'claude-35-sonnet': 0.9,
    'claude-opus-4': -2.1,
    'gemini-2-flash': 0.8,
    'gemini-25-pro': 1.0
  },
  '6B': {
    'expert': 2.7,
    'gpt-35-turbo': 2.6,
    'gpt-4o': 1.6,
    'claude-35-sonnet': 2.1,
    'claude-opus-4': 2.0,
    'gemini-2-flash': 2.2,
    'gemini-25-pro': 2.2
  }
};

// Chain of thought embedding consistency (simulated - lower is more consistent)
export const cotConsistency = [
  { model: 'GPT-4o', consistency: 0.12 },
  { model: 'GPT-3.5 Turbo', consistency: 0.28 },
  { model: 'Claude 3.5 Sonnet', consistency: 0.15 },
  { model: 'Claude Opus 4', consistency: 0.09 },
  { model: 'Gemini 2.0 Flash', consistency: 0.31 },
  { model: 'Gemini 2.5 Pro', consistency: 0.14 },
];

// Standard deviation of appropriateness scores (simulated - lower is more consistent)
export const scoreConsistency = [
  { model: 'GPT-4o', sd: 1.42 },
  { model: 'GPT-3.5 Turbo', sd: 2.18 },
  { model: 'Claude 3.5 Sonnet', sd: 1.56 },
  { model: 'Claude Opus 4', sd: 1.28 },
  { model: 'Gemini 2.0 Flash', sd: 2.34 },
  { model: 'Gemini 2.5 Pro', sd: 1.48 },
];
