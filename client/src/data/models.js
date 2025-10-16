
export const models_tab = [
  {baseModel: 'GPT', models: ['GPT-4o', 'GPT-3.5 Turbo', 'GPT-4o Mini'], SIRI_2: 0.490, A_pharm: 0.294, A_mamh: 0.113},
  {baseModel: 'Claude', models: ['Claude Opus 4.1', 'Claude Sonnet 4', 'Claude 3.5 Sonnet'], SIRI_2: 0.440, A_pharm: 0.614, A_mamh: 0.331},
  {baseModel: 'Gemini', models: ['Gemini 2.5 Pro', 'Gemini 2.5 Flash', 'Gemini 2.0 Flash'], SIRI_2: 0.374, A_pharm: 0.597, A_mamh: 0.175},
  {baseModel: 'DeepSeek', models: ['DeepSeek-V3', 'DeepSeek-V2.5'], SIRI_2: 0.423, A_pharm: 0.267, A_mamh: 0.602},
  {baseModel: 'LLaMA', models: ['LLaMA 3.1 405B', 'LLaMA 3.1 70B', 'LLaMA 3'], SIRI_2: 0.243, A_pharm: 0.601, A_mamh: 0.402}
]

export const leaderboard_ext = [
  {snapshot: 'ss1', SIRI_2: 0.622, A_pharm: 0.465, A_mamh: 0.254},
  {snapshot: 'ss2', SIRI_2: 0.353, A_pharm: 0.327, A_mamh: 0.479},
  {snapshot: 'ss3', SIRI_2: 0.309, A_pharm: 0.116, A_mamh: 0.472},
  {snapshot: 'ab1', SIRI_2: 0.309, A_pharm: 0.116, A_mamh: 0.472},
  {snapshot: 'ab2', SIRI_2: 0.309, A_pharm: 0.116, A_mamh: 0.472},
  {snapshot: 'ab3', SIRI_2: 0.423, A_pharm: 0.267, A_mamh: 0.602},
]

export const leaderboard = [
  { model: "GPT-4o",              baseModel: "GPT",        snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.490, A_pharm: 0.294, A_mamh: 0.113 },
  { model: "GPT-4o Mini",         baseModel: "GPT",        snapshot: ['ab1','ab2','ab3'], SIRI_2: 0.440, A_pharm: 0.614, A_mamh: 0.331 },
  { model: "GPT-3.5 Turbo",       baseModel: "GPT",        snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.666, A_pharm: 0.270, A_mamh: 0.144 },
  { model: "Claude Opus 4.1",     baseModel: "Claude",     snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.328, A_pharm: 0.119, A_mamh: 0.537 },
  { model: "Claude Sonnet 4",     baseModel: "Claude",     snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.394, A_pharm: 0.294, A_mamh: 0.107 },
  { model: "Claude 3.5 Sonnet",   baseModel: "Claude",     snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.622, A_pharm: 0.465, A_mamh: 0.254 },
  { model: "Claude 3.5 Haiku",    baseModel: "Claude",     snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.613, A_pharm: 0.357, A_mamh: 0.287 },
  { model: "Gemini 2.5 Pro",      baseModel: "Gemini",     snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.570, A_pharm: 0.267, A_mamh: 0.413 },
  { model: "Gemini 2.5 Flash",    baseModel: "Gemini",     snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.243, A_pharm: 0.601, A_mamh: 0.402 },
  { model: "Gemini 2.0 Flash",    baseModel: "Gemini",     snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.353, A_pharm: 0.327, A_mamh: 0.479 },
  { model: "Gemma 2",             baseModel: "Gemini",     snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.256, A_pharm: 0.356, A_mamh: 0.609 },
  { model: "LLaMA 3.1 405B",      baseModel: "LLaMA",      snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.614, A_pharm: 0.435, A_mamh: 0.193 },
  { model: "LLaMA 3.1 70B",       baseModel: "LLaMA",      snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.374, A_pharm: 0.597, A_mamh: 0.175 },
  { model: "LLaMA 3",             baseModel: "LLaMA",      snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.687, A_pharm: 0.152, A_mamh: 0.219 },
  { model: "DeepSeek-V3",         baseModel: "DeepSeek",   snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.254, A_pharm: 0.588, A_mamh: 0.329 },
  { model: "DeepSeek-V2.5",       baseModel: "DeepSeek",   snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.423, A_pharm: 0.267, A_mamh: 0.602 },
  { model: "Mixtral 8x22B",       baseModel: "Mistral",    snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.327, A_pharm: 0.433, A_mamh: 0.544 },
  { model: "Mistral 7B",          baseModel: "Mistral",    snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.583, A_pharm: 0.513, A_mamh: 0.420 },
  { model: "Command R+",          baseModel: "Command",    snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.309, A_pharm: 0.116, A_mamh: 0.472 },
  { model: "Qwen2.5-72B",         baseModel: "Qwen",       snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.231, A_pharm: 0.347, A_mamh: 0.629 }
]

export const stest = [
  // GPT-4o versions
  {modelFamily: 'GPT', model: 'GPT-4o', version: '20250915', E: 33, A: 47, C: 45, N: 18, O: 44},
  {modelFamily: 'GPT', model: 'GPT-4o', version: '20250815', E: 47, A: 33, C: 18, N: 45, O: 44},
  {modelFamily: 'GPT', model: 'GPT-4o', version: '20250701', E: 45, A: 35, C: 20, N: 43, O: 42},
  
  // GPT-3.5 Turbo versions
  {modelFamily: 'GPT', model: 'GPT-3.5 Turbo', version: '20250815', E: 40, A: 35, C: 30, N: 25, O: 38},
  {modelFamily: 'GPT', model: 'GPT-3.5 Turbo', version: '20250701', E: 38, A: 33, C: 28, N: 27, O: 36},
  
  // GPT-4o Mini versions
  {modelFamily: 'GPT', model: 'GPT-4o Mini', version: '20250815', E: 35, A: 38, C: 32, N: 28, O: 36},
  {modelFamily: 'GPT', model: 'GPT-4o Mini', version: '20250701', E: 33, A: 36, C: 30, N: 30, O: 34},
  
  // Claude Opus 4.1 versions
  {modelFamily: 'Claude', model: 'Claude Opus 4.1', version: '20250901', E: 25, A: 35, C: 40, N: 12, O: 38},
  {modelFamily: 'Claude', model: 'Claude Opus 4.1', version: '20250815', E: 23, A: 33, C: 38, N: 14, O: 36},
  {modelFamily: 'Claude', model: 'Claude Opus 4.1', version: '20250701', E: 21, A: 31, C: 36, N: 16, O: 34},
  
  // Claude Sonnet 4 versions
  {modelFamily: 'Claude', model: 'Claude Sonnet 4', version: '20250915', E: 17, A: 23, C: 28, N: 15, O: 24},
  {modelFamily: 'Claude', model: 'Claude Sonnet 4', version: '20250815', E: 15, A: 21, C: 26, N: 17, O: 22},
  
  // Claude 3.5 Sonnet versions
  {modelFamily: 'Claude', model: 'Claude 3.5 Sonnet', version: '20241022', E: 20, A: 26, C: 30, N: 18, O: 26},
  {modelFamily: 'Claude', model: 'Claude 3.5 Sonnet', version: '20240620', E: 18, A: 24, C: 28, N: 20, O: 24},
  
  // Claude 3.5 Haiku versions
  {modelFamily: 'Claude', model: 'Claude 3.5 Haiku', version: '20241022', E: 18, A: 24, C: 26, N: 20, O: 22},
  {modelFamily: 'Claude', model: 'Claude 3.5 Haiku', version: '20240701', E: 16, A: 22, C: 24, N: 22, O: 20},
  
  // Gemini 2.5 Pro versions
  {modelFamily: 'Gemini', model: 'Gemini 2.5 Pro', version: '20250915', E: 29, A: 31, C: 33, N: 22, O: 35},
  {modelFamily: 'Gemini', model: 'Gemini 2.5 Pro', version: '20250815', E: 27, A: 29, C: 31, N: 24, O: 33},
  
  // Gemini 2.5 Flash versions
  {modelFamily: 'Gemini', model: 'Gemini 2.5 Flash', version: '20250815', E: 27, A: 29, C: 31, N: 24, O: 33},
  {modelFamily: 'Gemini', model: 'Gemini 2.5 Flash', version: '20250701', E: 25, A: 27, C: 29, N: 26, O: 31},
  
  // Gemini 2.0 Flash versions
  {modelFamily: 'Gemini', model: 'Gemini 2.0 Flash', version: '20250815', E: 26, A: 28, C: 30, N: 25, O: 32},
  {modelFamily: 'Gemini', model: 'Gemini 2.0 Flash', version: '20241215', E: 24, A: 26, C: 28, N: 27, O: 30},
  
  // Gemma 2 versions
  {modelFamily: 'Gemini', model: 'Gemma 2', version: '20250701', E: 24, A: 26, C: 28, N: 27, O: 30},
  {modelFamily: 'Gemini', model: 'Gemma 2', version: '20250601', E: 22, A: 24, C: 26, N: 29, O: 28},
  
  // DeepSeek-V3 versions
  {modelFamily: 'DeepSeek', model: 'DeepSeek-V3', version: '20250915', E: 22, A: 26, C: 35, N: 20, O: 30},
  {modelFamily: 'DeepSeek', model: 'DeepSeek-V3', version: '20250815', E: 20, A: 24, C: 33, N: 22, O: 28},
  
  // DeepSeek-V2.5 versions
  {modelFamily: 'DeepSeek', model: 'DeepSeek-V2.5', version: '20250701', E: 20, A: 24, C: 33, N: 22, O: 28},
  {modelFamily: 'DeepSeek', model: 'DeepSeek-V2.5', version: '20250601', E: 18, A: 22, C: 31, N: 24, O: 26},
  
  // Mixtral 8x22B versions
  {modelFamily: 'Mistral', model: 'Mixtral 8x22B', version: '20250815', E: 31, A: 29, C: 32, N: 24, O: 34},
  {modelFamily: 'Mistral', model: 'Mixtral 8x22B', version: '20250701', E: 29, A: 27, C: 30, N: 26, O: 32},
  
  // Mistral 7B versions
  {modelFamily: 'Mistral', model: 'Mistral 7B', version: '20250701', E: 29, A: 27, C: 30, N: 26, O: 32},
  {modelFamily: 'Mistral', model: 'Mistral 7B', version: '20250601', E: 27, A: 25, C: 28, N: 28, O: 30},
  
  // LLaMA 3.1 405B versions
  {modelFamily: 'LLaMA', model: 'LLaMA 3.1 405B', version: '20250815', E: 28, A: 32, C: 34, N: 21, O: 36},
  {modelFamily: 'LLaMA', model: 'LLaMA 3.1 405B', version: '20250701', E: 26, A: 30, C: 32, N: 23, O: 34},
  
  // LLaMA 3.1 70B versions
  {modelFamily: 'LLaMA', model: 'LLaMA 3.1 70B', version: '20250701', E: 26, A: 30, C: 32, N: 23, O: 34},
  {modelFamily: 'LLaMA', model: 'LLaMA 3.1 70B', version: '20250601', E: 24, A: 28, C: 30, N: 25, O: 32},
  
  // LLaMA 3 versions
  {modelFamily: 'LLaMA', model: 'LLaMA 3', version: '20250601', E: 24, A: 28, C: 30, N: 25, O: 32},
  {modelFamily: 'LLaMA', model: 'LLaMA 3', version: '20250501', E: 22, A: 26, C: 28, N: 27, O: 30},
  
  // Command R+ versions
  {modelFamily: 'Command', model: 'Command R+', version: '20250701', E: 24, A: 27, C: 31, N: 26, O: 33},
  {modelFamily: 'Command', model: 'Command R+', version: '20250601', E: 22, A: 25, C: 29, N: 28, O: 31},
  
  // Command R versions
  {modelFamily: 'Command', model: 'Command R', version: '20250601', E: 22, A: 25, C: 29, N: 28, O: 31},
  {modelFamily: 'Command', model: 'Command R', version: '20250501', E: 20, A: 23, C: 27, N: 30, O: 29},
  
  // Qwen2-72B versions
  {modelFamily: 'Qwen', model: 'Qwen2-72B', version: '20250815', E: 27, A: 30, C: 33, N: 23, O: 35},
  {modelFamily: 'Qwen', model: 'Qwen2-72B', version: '20250701', E: 25, A: 28, C: 31, N: 25, O: 33},
  
  // Qwen2.5-72B versions
  {modelFamily: 'Qwen', model: 'Qwen2.5-72B', version: '20250701', E: 25, A: 28, C: 31, N: 25, O: 33},
  {modelFamily: 'Qwen', model: 'Qwen2.5-72B', version: '20250601', E: 23, A: 26, C: 29, N: 27, O: 31},
  
  // Phi-3 Medium versions
  {modelFamily: 'Phi', model: 'Phi-3 Medium', version: '20250601', E: 23, A: 25, C: 29, N: 27, O: 31},
  {modelFamily: 'Phi', model: 'Phi-3 Medium', version: '20250501', E: 21, A: 23, C: 27, N: 29, O: 29},
  
  // Phi-3 Small versions
  {modelFamily: 'Phi', model: 'Phi-3 Small', version: '20250501', E: 21, A: 23, C: 27, N: 29, O: 29},
  {modelFamily: 'Phi', model: 'Phi-3 Small', version: '20250401', E: 19, A: 21, C: 25, N: 31, O: 27},
  
  // Yi-34B versions
  {modelFamily: 'Yi', model: 'Yi-34B', version: '20250701', E: 26, A: 29, C: 32, N: 24, O: 34},
  {modelFamily: 'Yi', model: 'Yi-34B', version: '20250601', E: 24, A: 27, C: 30, N: 26, O: 32},
  
  // Vicuna v1.5 versions
  {modelFamily: 'Vicuna', model: 'Vicuna v1.5', version: '20250601', E: 24, A: 27, C: 30, N: 26, O: 32},
  {modelFamily: 'Vicuna', model: 'Vicuna v1.5', version: '20250501', E: 22, A: 25, C: 28, N: 28, O: 30},
  
  // Alpaca Plus versions
  {modelFamily: 'Alpaca', model: 'Alpaca Plus', version: '20250501', E: 22, A: 25, C: 28, N: 28, O: 30},
  {modelFamily: 'Alpaca', model: 'Alpaca Plus', version: '20250401', E: 20, A: 23, C: 26, N: 30, O: 28},
  
  // Falcon 180B versions
  {modelFamily: 'Falcon', model: 'Falcon 180B', version: '20250615', E: 25, A: 28, C: 31, N: 25, O: 33},
  {modelFamily: 'Falcon', model: 'Falcon 180B', version: '20250515', E: 23, A: 26, C: 29, N: 27, O: 31}
]


export const updates = [
  {date: "Sept 1st, 2025", title: "App v1.0 released", tag: 'new features', note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
  {date: "Sept 15th, 2025", title: "New model added", tag: 'updates', note: "Added Claude Sonnet 4, Chat-gpt-4o to our database"},
  {date: "Sept 17th, 2025", title: "New features added", tag:'updates', note: "Added information about the scale we use in leaderboard"},
  {date: "Sept 17th, 2025", title: "Fix comparison chart not showing", tag: 'bug fixes', note: "Comparison chart from our test is now working properly"}
]

export const suggestions = [
  {title: 'Add Deepseek to scale', desc: 'Add deepseek and its version to leaderboard', vote: 20, status: 'planned'},
  {title: 'Dark mode', desc: 'Add dark mode. Ideally add a toggle so user can switch between.', vote: 12, status: 'in-progress'},
  {title: 'Add ability for users to input data', desc: 'Allow users to enter data in the dashboard', vote: 2, status: 'open vote'}
]

export const articles = [
  {link: 'https://pubmed.ncbi.nlm.nih.gov/10169714/', Title: 'The Suicide Intervention Response Inventory: a revision and validation',}
]

// this should belong in the backend and generate along with api code
// Get latest versions of each model for the stest data
export function getLatestStestVersions() {
  const latestMap = {};
  
  stest.forEach(v => {
    const key = `${v.modelFamily}-${v.model}`;
    if (!latestMap[key] || v.version > latestMap[key].version) {
      latestMap[key] = { ...v, version: 'Latest' };
    }
  });
  
  return Object.values(latestMap);
}

// Get all available model families from stest data
export function getStestModelFamilies() {
  return Array.from(new Set(stest.map(v => v.modelFamily))).sort();
}

// Filter stest versions by model family and model
export function filterStestVersions(modelFamily, model) {
  return stest.filter(v => v.modelFamily === modelFamily && v.model === model);
}