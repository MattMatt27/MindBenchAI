// Component-specific types

export interface NavBarProps {
  // Add props if NavBar receives any in the future
}

export interface QuestionDefinition {
  key: string;
  category: string;
  questionText: string;
  questionLabel: string;
  questionType: string;
  displayOrder: number;
}

export interface FilterState {
  android_support: boolean;
  ios_support: boolean;
  web_support: boolean;
  free_tier: boolean;
  crisis_detection: boolean;
  mood_tracking: boolean;
  hipaa_compliant: boolean;
  multimodal: boolean;
  open_source: boolean;
  function_calling: boolean;
  code_generation: boolean;
}
