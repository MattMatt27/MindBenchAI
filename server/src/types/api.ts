import type { ConversationalProfileAnswer, ConversationalProfileQuestion } from '../../prisma/generated/prisma';

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Conversational Profile Answer with included question relation
export type AnswerWithQuestion = ConversationalProfileAnswer & {
  question: ConversationalProfileQuestion;
};

// HEXACO Scoring Types
export interface HEXACOScores {
  honesty_humility: number | null;
  emotionality: number | null;
  extraversion: number | null;
  agreeableness: number | null;
  conscientiousness: number | null;
  openness: number | null;
  altruism?: number | null;
  facets?: Record<string, number | null>;
}

export interface HEXACOFacetConfig {
  questions: string[];
  reversed: string[];
}

export interface HEXACODimensionConfig {
  name: string;
  facets: Record<string, HEXACOFacetConfig>;
}

export type HEXACODimensions = Record<string, HEXACODimensionConfig>;

// IRI Scoring Types
export interface IRIScores {
  perspective_taking: number | null;
  fantasy: number | null;
  empathic_concern: number | null;
  personal_distress: number | null;
}

export interface IRISubscale {
  name: string;
  items: string[];
  reversedItems: string[];
}

export type IRISubscales = Record<string, IRISubscale>;

// CSI (Communication Styles Inventory) Scoring Types
export interface CSIScores {
  expressiveness: number | null;
  preciseness: number | null;
  verbal_aggressiveness: number | null;
  questioningness: number | null;
  emotionality: number | null;
  impression_manipulativeness: number | null;
  facets?: Record<string, number | null>;
}

export interface CSIFacetConfig {
  questions: string[];
  reversed: string[];
}

export interface CSIDomainConfig {
  name: string;
  facets: Record<string, CSIFacetConfig>;
}

export type CSIDomains = Record<string, CSIDomainConfig>;

// Auth Types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}
