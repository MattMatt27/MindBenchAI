
export const models_tab = [
  {baseModel: 'Chatgpt', models: ['Chatgpt-4', 'Chatgpt-5'], SIRI_2: 0.490, A_pharm: 0.294, A_mamh: 0.113},
  {baseModel: 'Claude', models: ['Claude Opus 4.1', 'Claude Sonnet 4'], SIRI_2: 0.440, A_pharm: 0.614, A_mamh: 0.331},
  {baseModel: 'Gemini', models: ['Gemini 2.5', 'Gemini 2.0', 'Gemini 1.5'], SIRI_2: 0.374, A_pharm: 0.597, A_mamh: 0.175},
  {baseModel: 'DeepSeek', models: ['DeepSeek-V3', 'DeepSeek-V2.5'], SIRI_2: 0.423, A_pharm: 0.267, A_mamh: 0.602},
  {baseModel: 'Llama', models: ['Llama 3', 'Llama 4'], SIRI_2: 0.243, A_pharm: 0.601, A_mamh: 0.402}
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
  { model: "Starling",         baseModel: "Starling",  snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.490, A_pharm: 0.294, A_mamh: 0.113 },
  { model: "Gemini Ultra 1.5", baseModel: "Gemini",    snapshot: ['ab1','ab2','ab3'], SIRI_2: 0.440, A_pharm: 0.614, A_mamh: 0.331 },
  { model: "Vicuna v1.5",      baseModel: "Vicuna",    snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.666, A_pharm: 0.270, A_mamh: 0.144 },
  { model: "Orca 2",           baseModel: "Orca",      snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.328, A_pharm: 0.119, A_mamh: 0.537 },
  { model: "Pythia-12B",       baseModel: "Pythia",    snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.394, A_pharm: 0.294, A_mamh: 0.107 },
  { model: "Claude 3.7 Sonnet",baseModel: "Claude",    snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.622, A_pharm: 0.465, A_mamh: 0.254 },
  { model: "ChatGLM3",         baseModel: "ChatGLM",   snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.570, A_pharm: 0.267, A_mamh: 0.413 },
  { model: "Gemma",            baseModel: "Gemma",     snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.243, A_pharm: 0.601, A_mamh: 0.402 },
  { model: "DeepSeek-V2",      baseModel: "DeepSeek",  snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.353, A_pharm: 0.327, A_mamh: 0.479 },
  { model: "LLaMA 3 70B",      baseModel: "LLaMA",     snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.614, A_pharm: 0.435, A_mamh: 0.193 },
  { model: "Mixtral 8x7B",     baseModel: "Mixtral",   snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.254, A_pharm: 0.588, A_mamh: 0.329 },
  { model: "Falcon 180B",      baseModel: "Falcon",    snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.423, A_pharm: 0.267, A_mamh: 0.602 },
  { model: "Command R+",       baseModel: "Command R", snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.327, A_pharm: 0.433, A_mamh: 0.544 },
  { model: "Claude 3 Haiku",   baseModel: "Claude",    snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.613, A_pharm: 0.357, A_mamh: 0.287 },
  { model: "Alpaca Plus",      baseModel: "Alpaca",    snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.309, A_pharm: 0.116, A_mamh: 0.472 },
  { model: "OpenLLaMA",        baseModel: "LLaMA",     snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.374, A_pharm: 0.597, A_mamh: 0.175 },
  { model: "Gemini Ultra 1.5", baseModel: "Gemini",    snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.256, A_pharm: 0.356, A_mamh: 0.609 },
  { model: "Starling",         baseModel: "Starling",  snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.687, A_pharm: 0.152, A_mamh: 0.219 },
  { model: "Pythia-12B",       baseModel: "Pythia",    snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.583, A_pharm: 0.513, A_mamh: 0.420 },
  { model: "Zephyr 7B",        baseModel: "Zephyr",    snapshot: ['ss1','ss2','ss3'], SIRI_2: 0.231, A_pharm: 0.347, A_mamh: 0.629 }
]

export const stest = [
  {snapshot: 'ss1', model: 'Chat-gpt-4o', baseModel: 'ChatGPT', E: 33, A: 47, C: 45, N: 18, O: 44},
  {snapshot: 'ss2', model: 'Chat-gpt-5o', baseModel: 'ChatGPT', E: 47, A: 33, C: 18, N: 45, O: 44},
  {snapshot: 'ss3', model: 'Claude-sonnet-4', baseModel: 'Claude', E: 17, A: 23, C: 28, N: 15, O: 24}
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
