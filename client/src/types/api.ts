// Shared API types for MindBench.ai client

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// User types
export interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  firstName?: string;
  lastName?: string;
  isVerified: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// HEXACO types
export interface HEXACOScores {
  honesty_humility: number | null;
  emotionality: number | null;
  extraversion: number | null;
  agreeableness: number | null;
  conscientiousness: number | null;
  openness: number | null;
  altruism?: number | null;
}

// IRI types
export interface IRIScores {
  perspective_taking: number | null;
  fantasy: number | null;
  empathic_concern: number | null;
  personal_distress: number | null;
}

// Profile types
export interface ConversationalProfile {
  id: string;
  test_name: string;
  model_version_id: string;
  version: string;
  is_latest: boolean;
  release_date: string | null;
  model_id: string | null;
  model_name: string | null;
  model_family: string | null;
  // Scores are spread into the profile based on test type
  [key: string]: any; // For dynamic scores
}

export interface ConversationalTest {
  id: string;
  name: string;
  description: string;
  testType: string;
  version: string;
  isValidated: boolean;
  scaleMin: number;
  scaleMax: number;
}

export interface TechProfileAnswer {
  type: string;
  value: any;
  notes: string | null;
  category: string;
  question_text: string;
  question_label: string;
  display_order: number;
  question_type: string;
  entity_type: string;
}

export interface TechProfile {
  id: string;
  entity_type: 'tool_configuration' | 'base_model';
  name: string | null;
  tool_name?: string | null;
  developer?: string | null;
  base_model_name?: string | null;
  model_family?: string | null;
  version?: string | null;
  release_date?: string | null;
  is_latest?: boolean;
  answers: Record<string, TechProfileAnswer>;
}
