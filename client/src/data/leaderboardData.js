// Leaderboard data with model family, model, and version structure

// Define model families and their models
export const modelFamilies = {
  'GPT': ['GPT-4o', 'GPT-3.5 Turbo', 'O4 Mini'],
  'Claude': ['Claude Opus 4.1', 'Claude Sonnet 4', 'Claude 3.5 Sonnet', 'Claude 3.5 Haiku'],
  'Gemini': ['Gemini 2.5 Pro', 'Gemini 2.5 Flash', 'Gemini 2.0 Flash', 'Gemma 2'],
  'DeepSeek': ['DeepSeek-V3', 'DeepSeek-V2.5'],
  'Mistral': ['Mixtral 8x22B', 'Mistral 7B'],
  'LLaMA': ['LLaMA 3.1 405B', 'LLaMA 3.1 70B'],
  'Command': ['Command R+', 'Command R'],
  'Qwen': ['Qwen2-72B', 'Qwen2.5-72B'],
  'Phi': ['Phi-3 Medium', 'Phi-3 Small']
};

// Model versions with dates and experiment parameters - expanded data
export const modelVersions = [
  // GPT-4o versions
  {
    id: 'gpt4o-v1',
    modelFamily: 'GPT',
    model: 'GPT-4o',
    version: '20250915',
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 1000,
    system_prompt_id: 'default',
    message_prompt_id: 'standard',
    SIRI_2: 1.245,
    A_pharm: 0.92,
    A_mamh: 1.08
  },
  {
    id: 'gpt4o-v2',
    modelFamily: 'GPT',
    model: 'GPT-4o',
    version: '20250815',
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 1000,
    system_prompt_id: 'default',
    message_prompt_id: 'standard',
    SIRI_2: 1.279,
    A_pharm: 0.95,
    A_mamh: 1.12
  },
  {
    id: 'gpt4o-v3',
    modelFamily: 'GPT',
    model: 'GPT-4o',
    version: '20250701',
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 1000,
    system_prompt_id: 'default',
    message_prompt_id: 'standard',
    SIRI_2: 1.312,
    A_pharm: 0.98,
    A_mamh: 1.15
  },
  {
    id: 'gpt4o-v4',
    modelFamily: 'GPT',
    model: 'GPT-4o',
    version: '20250601',
    temperature: 0.3,
    top_p: 0.9,
    max_tokens: 1000,
    system_prompt_id: 'clinical',
    message_prompt_id: 'standard',
    SIRI_2: 1.198,
    A_pharm: 0.89,
    A_mamh: 1.03
  },
  
  // GPT-3.5 Turbo versions
  {
    id: 'gpt35-v1',
    modelFamily: 'GPT',
    model: 'GPT-3.5 Turbo',
    version: '20250815',
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 1000,
    system_prompt_id: 'default',
    message_prompt_id: 'standard',
    SIRI_2: 1.737,
    A_pharm: 1.42,
    A_mamh: 1.58
  },
  {
    id: 'gpt35-v2',
    modelFamily: 'GPT',
    model: 'GPT-3.5 Turbo',
    version: '20250701',
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 1000,
    system_prompt_id: 'default',
    message_prompt_id: 'standard',
    SIRI_2: 1.782,
    A_pharm: 1.45,
    A_mamh: 1.62
  },
  
  // Claude Opus versions
  {
    id: 'opus-v1',
    modelFamily: 'Claude',
    model: 'Claude Opus 4.1',
    version: '20250901',
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 1000,
    system_prompt_id: 'default',
    message_prompt_id: 'standard',
    SIRI_2: 0.876,
    A_pharm: 0.79,
    A_mamh: 0.89
  },
  {
    id: 'opus-v2',
    modelFamily: 'Claude',
    model: 'Claude Opus 4.1',
    version: '20250815',
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 1000,
    system_prompt_id: 'default',
    message_prompt_id: 'standard',
    SIRI_2: 0.899,
    A_pharm: 0.82,
    A_mamh: 0.94
  },
  {
    id: 'opus-v3',
    modelFamily: 'Claude',
    model: 'Claude Opus 4.1',
    version: '20250701',
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 1000,
    system_prompt_id: 'default',
    message_prompt_id: 'standard',
    SIRI_2: 0.923,
    A_pharm: 0.84,
    A_mamh: 0.97
  },
  {
    id: 'opus-v4',
    modelFamily: 'Claude',
    model: 'Claude Opus 4.1',
    version: '20250601',
    temperature: 0.3,
    top_p: 0.9,
    max_tokens: 1000,
    system_prompt_id: 'clinical',
    message_prompt_id: 'standard',
    SIRI_2: 0.845,
    A_pharm: 0.76,
    A_mamh: 0.85
  },
  
  // Claude Sonnet versions
  {
    id: 'sonnet-v1',
    modelFamily: 'Claude',
    model: 'Claude Sonnet 4',
    version: '20250915',
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 1000,
    system_prompt_id: 'default',
    message_prompt_id: 'standard',
    SIRI_2: 0.865,
    A_pharm: 0.83,
    A_mamh: 0.88
  },
  {
    id: 'sonnet-v2',
    modelFamily: 'Claude',
    model: 'Claude Sonnet 4',
    version: '20250815',
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 1000,
    system_prompt_id: 'default',
    message_prompt_id: 'standard',
    SIRI_2: 0.888,
    A_pharm: 0.85,
    A_mamh: 0.91
  },
  {
    id: 'sonnet-v3',
    modelFamily: 'Claude',
    model: 'Claude Sonnet 4',
    version: '20250601',
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 1000,
    system_prompt_id: 'default',
    message_prompt_id: 'standard',
    SIRI_2: 0.912,
    A_pharm: 0.87,
    A_mamh: 0.93
  },
  
  // Claude 3.5 Sonnet versions
  {
    id: 'claude35s-v1',
    modelFamily: 'Claude',
    model: 'Claude 3.5 Sonnet',
    version: '20241022',
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 1000,
    system_prompt_id: 'default',
    message_prompt_id: 'standard',
    SIRI_2: 1.075,
    A_pharm: 1.08,
    A_mamh: 1.28
  },
  {
    id: 'claude35s-v2',
    modelFamily: 'Claude',
    model: 'Claude 3.5 Sonnet',
    version: '20240620',
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 1000,
    system_prompt_id: 'default',
    message_prompt_id: 'standard',
    SIRI_2: 1.123,
    A_pharm: 1.11,
    A_mamh: 1.32
  },
  
  // Gemini versions
  {
    id: 'gemini25p-v1',
    modelFamily: 'Gemini',
    model: 'Gemini 2.5 Pro',
    version: '20250915',
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 1000,
    system_prompt_id: 'default',
    message_prompt_id: 'standard',
    SIRI_2: 1.023,
    A_pharm: 1.19,
    A_mamh: 1.31
  },
  {
    id: 'gemini25p-v2',
    modelFamily: 'Gemini',
    model: 'Gemini 2.5 Pro',
    version: '20250815',
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 1000,
    system_prompt_id: 'default',
    message_prompt_id: 'standard',
    SIRI_2: 1.045,
    A_pharm: 1.23,
    A_mamh: 1.35
  },
  {
    id: 'gemini25p-v3',
    modelFamily: 'Gemini',
    model: 'Gemini 2.5 Pro',
    version: '20250701',
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 1000,
    system_prompt_id: 'default',
    message_prompt_id: 'standard',
    SIRI_2: 1.067,
    A_pharm: 1.26,
    A_mamh: 1.38
  },
  
  // Gemini Flash versions
  {
    id: 'gemini20f-v1',
    modelFamily: 'Gemini',
    model: 'Gemini 2.0 Flash',
    version: '20250815',
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 1000,
    system_prompt_id: 'default',
    message_prompt_id: 'standard',
    SIRI_2: 1.201,
    A_pharm: 1.18,
    A_mamh: 1.29
  },
  {
    id: 'gemini20f-v2',
    modelFamily: 'Gemini',
    model: 'Gemini 2.0 Flash',
    version: '20250701',
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 1000,
    system_prompt_id: 'default',
    message_prompt_id: 'standard',
    SIRI_2: 1.234,
    A_pharm: 1.21,
    A_mamh: 1.32
  },
  
  // DeepSeek versions
  {
    id: 'deepseek-v1',
    modelFamily: 'DeepSeek',
    model: 'DeepSeek-V3',
    version: '20250915',
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 1000,
    system_prompt_id: 'default',
    message_prompt_id: 'standard',
    SIRI_2: 1.342,
    A_pharm: 1.28,
    A_mamh: 1.45
  },
  {
    id: 'deepseek-v2',
    modelFamily: 'DeepSeek',
    model: 'DeepSeek-V3',
    version: '20250701',
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 1000,
    system_prompt_id: 'default',
    message_prompt_id: 'standard',
    SIRI_2: 1.378,
    A_pharm: 1.31,
    A_mamh: 1.48
  },
  
  // O4 Mini versions
  {
    id: 'o4mini-v1',
    modelFamily: 'GPT',
    model: 'O4 Mini',
    version: '20250815',
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 1000,
    system_prompt_id: 'default',
    message_prompt_id: 'standard',
    SIRI_2: 1.455,
    A_pharm: 1.38,
    A_mamh: 1.52
  }
];

// Get latest version for each model
export function getLatestVersions() {
  const latestMap = {};
  
  modelVersions.forEach(v => {
    const key = `${v.modelFamily}-${v.model}`;
    if (!latestMap[key] || v.version > latestMap[key].version) {
      latestMap[key] = { ...v, version: 'Latest' };
    }
  });
  
  return Object.values(latestMap);
}

// Available prompts for filtering
export const systemPrompts = [
  { id: 'default', name: 'Default System Prompt', content: 'You are a helpful assistant.' },
  { id: 'clinical', name: 'Clinical System Prompt', content: 'You are a mental health support assistant.' },
  { id: 'empathetic', name: 'Empathetic System Prompt', content: 'You are a compassionate listener.' }
];

export const messagePrompts = [
  { id: 'standard', name: 'Standard Format', content: 'Direct question format' },
  { id: 'contextual', name: 'Contextual Format', content: 'Question with context' }
];

// Helper to filter versions by parameters
export function filterVersions(versions, filters = {}) {
  return versions.filter(v => {
    if (filters.temperature !== undefined && v.temperature !== filters.temperature) return false;
    if (filters.top_p !== undefined && v.top_p !== filters.top_p) return false;
    if (filters.system_prompt_id && v.system_prompt_id !== filters.system_prompt_id) return false;
    if (filters.message_prompt_id && v.message_prompt_id !== filters.message_prompt_id) return false;
    if (filters.modelFamily && v.modelFamily !== filters.modelFamily) return false;
    if (filters.model && v.model !== filters.model) return false;
    return true;
  });
}