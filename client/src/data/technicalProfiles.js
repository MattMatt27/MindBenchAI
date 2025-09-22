export const baseModels = [
  { id: 1, name: "GPT-4", version: "1.0", developer: "OpenAI" },
  { id: 2, name: "Claude 3", version: "3.5", developer: "Anthropic" },
  { id: 3, name: "Gemini Pro", version: "1.5", developer: "Google" },
  { id: 4, name: "LLaMA 3", version: "3.1", developer: "Meta" },
  { id: 5, name: "Mistral", version: "0.2", developer: "Mistral AI" },
  { id: 6, name: "DeepSeek-V3", version: "3.0", developer: "DeepSeek" },
  { id: 7, name: "Mixtral 8x22B", version: "1.0", developer: "Mistral AI" },
  { id: 8, name: "Command R+", version: "1.1", developer: "Cohere" },
  { id: 9, name: "Phi-3 Medium", version: "3.0", developer: "Microsoft" },
  { id: 10, name: "Qwen2-72B", version: "2.0", developer: "Alibaba" },
  { id: 11, name: "Gemma 2", version: "2.0", developer: "Google" },
  { id: 12, name: "MPT-30B", version: "1.0", developer: "MosaicML" }
];

export const tools = [
  { id: 1, name: "ChatGPT", version: "5.0", developer: "OpenAI" },
  { id: 2, name: "Perplexity", version: "3.7.3v2", developer: "PerplexityAI" },
  { id: 3, name: "Claude", version: "2.1", developer: "Anthropic" },
  { id: 4, name: "Gemini", version: "v2.3", developer: "Google" },
  { id: 5, name: "Replika", version: "11.23.0", developer: "Luka Inc" },
  { id: 6, name: "Woebot", version: "4.2.1", developer: "Woebot Health" },
  { id: 7, name: "Microsoft Copilot", version: "1.12", developer: "Microsoft" },
  { id: 8, name: "YouChat", version: "4.0", developer: "You.com" },
  { id: 9, name: "Poe", version: "3.2", developer: "Quora" },
  { id: 10, name: "Character.AI", version: "2.9", developer: "Character Technologies" },
  { id: 11, name: "Khanmigo", version: "2024.9", developer: "Khan Academy" },
  { id: 12, name: "HuggingChat", version: "0.9", developer: "Hugging Face" }
];

export const toolConfigurations = [
  { id: 1, tool_id: 1, base_model_id: 1, configuration_name: "ChatGPT with GPT-4" },
  { id: 2, tool_id: 2, base_model_id: 1, configuration_name: "Perplexity with GPT-4" },
  { id: 3, tool_id: 3, base_model_id: 2, configuration_name: "Claude with Claude 3" },
  { id: 4, tool_id: 4, base_model_id: 3, configuration_name: "Gemini with Gemini Pro" },
  { id: 5, tool_id: 5, base_model_id: 1, configuration_name: "Replika with GPT-4" },
  { id: 6, tool_id: 6, base_model_id: 2, configuration_name: "Woebot with Claude 3" },
  { id: 7, tool_id: 7, base_model_id: 1, configuration_name: "Copilot with GPT-4" },
  { id: 8, tool_id: 7, base_model_id: 9, configuration_name: "Copilot with Phi-3 Medium" },
  { id: 9, tool_id: 8, base_model_id: 6, configuration_name: "YouChat with DeepSeek-V3" },
  { id: 10, tool_id: 9, base_model_id: 7, configuration_name: "Poe with Mixtral 8x22B" },
  { id: 11, tool_id: 10, base_model_id: 12, configuration_name: "Character.AI with MPT-30B" },
  { id: 12, tool_id: 11, base_model_id: 2, configuration_name: "Khanmigo with Claude 3" },
  { id: 13, tool_id: 12, base_model_id: 5, configuration_name: "HuggingChat with Mistral" },
  { id: 14, tool_id: 12, base_model_id: 10, configuration_name: "HuggingChat with Qwen2-72B" },
  { id: 15, tool_id: 4, base_model_id: 11, configuration_name: "Gemini with Gemma 2" },
  { id: 16, tool_id: 9, base_model_id: 8, configuration_name: "Poe with Command R+" },
  { id: 17, tool_id: 2, base_model_id: 6, configuration_name: "Perplexity with DeepSeek-V3" },
  { id: 18, tool_id: 1, base_model_id: 7, configuration_name: "ChatGPT with Mixtral 8x22B" }
];

export const techProfileQuestions = [
  { id: 1, entity_type: "tool_configuration", question_key: "platform_android", question_text: "Android Support", category: "Platform", question_type: "boolean", display_order: 1, is_displayed: true },
  { id: 2, entity_type: "tool_configuration", question_key: "platform_ios", question_text: "iOS Support", category: "Platform", question_type: "boolean", display_order: 2, is_displayed: true },
  { id: 3, entity_type: "tool_configuration", question_key: "platform_web", question_text: "Web Support", category: "Platform", question_type: "boolean", display_order: 3, is_displayed: true },
  { id: 4, entity_type: "tool_configuration", question_key: "has_free_tier", question_text: "Free Tier Available", category: "Pricing", question_type: "boolean", display_order: 4, is_displayed: true },
  { id: 5, entity_type: "tool_configuration", question_key: "monthly_price", question_text: "Monthly Price", category: "Pricing", question_type: "text", display_order: 5, is_displayed: true },
  { id: 6, entity_type: "tool_configuration", question_key: "annual_price", question_text: "Annual Price", category: "Pricing", question_type: "text", display_order: 6, is_displayed: true },
  { id: 7, entity_type: "tool_configuration", question_key: "crisis_detection", question_text: "Crisis Detection", category: "Mental Health Features", question_type: "boolean", display_order: 7, is_displayed: true },
  { id: 8, entity_type: "tool_configuration", question_key: "mood_tracking", question_text: "Mood Tracking", category: "Mental Health Features", question_type: "boolean", display_order: 8, is_displayed: true },
  { id: 9, entity_type: "tool_configuration", question_key: "therapeutic_techniques", question_text: "Therapeutic Techniques", category: "Mental Health Features", question_type: "list", display_order: 9, is_displayed: true },
  { id: 10, entity_type: "tool_configuration", question_key: "hipaa_compliant", question_text: "HIPAA Compliant", category: "Privacy & Security", question_type: "boolean", display_order: 10, is_displayed: true },
  { id: 11, entity_type: "tool_configuration", question_key: "data_retention_days", question_text: "Data Retention (days)", category: "Privacy & Security", question_type: "number", display_order: 11, is_displayed: true },
  { id: 101, entity_type: "base_model", question_key: "parameters_billions", question_text: "Parameters (B)", category: "Model Architecture", question_type: "number", display_order: 1, is_displayed: true },
  { id: 102, entity_type: "base_model", question_key: "context_window", question_text: "Context Window", category: "Model Architecture", question_type: "number", display_order: 2, is_displayed: true },
  { id: 103, entity_type: "base_model", question_key: "training_data_cutoff", question_text: "Training Data Cutoff", category: "Model Architecture", question_type: "text", display_order: 3, is_displayed: true },
  { id: 104, entity_type: "base_model", question_key: "multimodal", question_text: "Multimodal", category: "Model Architecture", question_type: "boolean", display_order: 4, is_displayed: true },
  { id: 105, entity_type: "base_model", question_key: "mmlu_score", question_text: "MMLU Score", category: "Performance Metrics", question_type: "number", display_order: 5, is_displayed: true },
  { id: 106, entity_type: "base_model", question_key: "humaneval_score", question_text: "HumanEval Score", category: "Performance Metrics", question_type: "number", display_order: 6, is_displayed: true },
  { id: 107, entity_type: "base_model", question_key: "chatbot_arena_elo", question_text: "Chatbot Arena ELO", category: "Performance Metrics", question_type: "number", display_order: 7, is_displayed: true },
  { id: 108, entity_type: "base_model", question_key: "code_generation", question_text: "Code Generation", category: "Capabilities", question_type: "boolean", display_order: 8, is_displayed: true },
  { id: 109, entity_type: "base_model", question_key: "function_calling", question_text: "Function Calling", category: "Capabilities", question_type: "boolean", display_order: 9, is_displayed: true },
  { id: 110, entity_type: "base_model", question_key: "open_source", question_text: "Open Source", category: "Safety & Licensing", question_type: "boolean", display_order: 10, is_displayed: true },
  { id: 111, entity_type: "base_model", question_key: "commercial_use", question_text: "Commercial Use", category: "Safety & Licensing", question_type: "boolean", display_order: 11, is_displayed: true }
];

const toolConfigurationsLocal = toolConfigurations;

const toolConfigAnswers = [];
toolConfigurationsLocal.forEach(config => {
  toolConfigAnswers.push(
    { entity_type: "tool_configuration", entity_id: config.id, question_id: 1, boolean_value: config.id !== 3, is_approved: true },
    { entity_type: "tool_configuration", entity_id: config.id, question_id: 2, boolean_value: config.id !== 3, is_approved: true },
    { entity_type: "tool_configuration", entity_id: config.id, question_id: 3, boolean_value: true, is_approved: true },
    { entity_type: "tool_configuration", entity_id: config.id, question_id: 4, boolean_value: config.id === 4 || config.id === 13 || config.id === 14, is_approved: true },
    { entity_type: "tool_configuration", entity_id: config.id, question_id: 5, text_value: (config.id === 4 || config.id === 13 || config.id === 14) ? "Free" : `$${config.id * 5 + 15}/month`, is_approved: true },
    { entity_type: "tool_configuration", entity_id: config.id, question_id: 6, text_value: (config.id === 4 || config.id === 13 || config.id === 14) ? "Free" : `$${(config.id * 5 + 15) * 10}/year`, is_approved: true },
    { entity_type: "tool_configuration", entity_id: config.id, question_id: 7, boolean_value: config.id % 2 === 0, is_approved: true },
    { entity_type: "tool_configuration", entity_id: config.id, question_id: 8, boolean_value: config.id % 3 === 0 || config.id >= 5, is_approved: true },
    { entity_type: "tool_configuration", entity_id: config.id, question_id: 9, list_value: (config.id % 4 === 0) ? '["CBT","Mindfulness","Psychoeducation"]' : (config.id % 3 === 0) ? '["CBT","DBT","Exposure"]' : '["Active listening","General support"]', is_approved: true },
    { entity_type: "tool_configuration", entity_id: config.id, question_id: 10, boolean_value: config.id % 6 === 0 || config.id === 6, is_approved: true },
    { entity_type: "tool_configuration", entity_id: config.id, question_id: 11, numeric_value: (config.id % 2 === 0) ? 30 : 90, is_approved: true }
  );
});

const baseModelAnswers = [];
baseModels.forEach(model => {
  baseModelAnswers.push(
    { entity_type: "base_model", entity_id: model.id, question_id: 101, numeric_value: model.id === 1 ? 1760 : model.id === 2 ? 2000 : model.id === 3 ? 1800 : model.id === 4 ? 405 : model.id === 5 ? 34 : model.id === 6 ? 671 : model.id === 7 ? 176 : model.id === 8 ? 104 : model.id === 9 ? 14 : model.id === 10 ? 72 : model.id === 11 ? 27 : 30, is_approved: true },
    { entity_type: "base_model", entity_id: model.id, question_id: 102, numeric_value: model.id === 1 ? 128000 : model.id === 2 ? 200000 : model.id === 3 ? 1000000 : model.id === 4 ? 128000 : model.id === 5 ? 32000 : model.id === 6 ? 200000 : model.id === 7 ? 64000 : model.id === 8 ? 200000 : model.id === 9 ? 128000 : model.id === 10 ? 131072 : model.id === 11 ? 1000000 : 65536, is_approved: true },
    { entity_type: "base_model", entity_id: model.id, question_id: 103, text_value: model.id <= 3 ? "November 2023" : model.id <= 6 ? "April 2024" : model.id <= 9 ? "December 2023" : "June 2024", is_approved: true },
    { entity_type: "base_model", entity_id: model.id, question_id: 104, boolean_value: model.id % 2 === 1 || model.id <= 3, is_approved: true },
    { entity_type: "base_model", entity_id: model.id, question_id: 105, numeric_value: model.id === 1 ? 86.4 : model.id === 2 ? 88.5 : model.id === 3 ? 90.1 : model.id === 4 ? 86.1 : model.id === 5 ? 78.2 : model.id === 6 ? 87.3 : model.id === 7 ? 85.9 : model.id === 8 ? 84.2 : model.id === 9 ? 79.5 : model.id === 10 ? 83.3 : model.id === 11 ? 81.0 : 76.4, is_approved: true },
    { entity_type: "base_model", entity_id: model.id, question_id: 106, numeric_value: model.id === 1 ? 67.0 : model.id === 2 ? 92.0 : model.id === 3 ? 74.4 : model.id === 4 ? 81.7 : model.id === 5 ? 56.1 : model.id === 6 ? 63.8 : model.id === 7 ? 61.0 : model.id === 8 ? 65.5 : model.id === 9 ? 52.3 : model.id === 10 ? 58.9 : model.id === 11 ? 60.4 : 48.1, is_approved: true },
    { entity_type: "base_model", entity_id: model.id, question_id: 107, numeric_value: model.id === 1 ? 1260 : model.id === 2 ? 1271 : model.id === 3 ? 1255 : model.id === 4 ? 1250 : model.id === 5 ? 1180 : model.id === 6 ? 1242 : model.id === 7 ? 1215 : model.id === 8 ? 1208 : model.id === 9 ? 1119 : model.id === 10 ? 1195 : model.id === 11 ? 1178 : 1114, is_approved: true },
    { entity_type: "base_model", entity_id: model.id, question_id: 108, boolean_value: true, is_approved: true },
    { entity_type: "base_model", entity_id: model.id, question_id: 109, boolean_value: model.id <= 8, is_approved: true },
    { entity_type: "base_model", entity_id: model.id, question_id: 110, boolean_value: model.id >= 4 && model.id !== 8, is_approved: true },
    { entity_type: "base_model", entity_id: model.id, question_id: 111, boolean_value: model.id !== 4 || model.id >= 5, is_approved: true }
  );
});

export const techProfileAnswers = [...toolConfigAnswers, ...baseModelAnswers];

export function getTechProfileDisplay(entityType = null) {
  return techProfileAnswers
    .filter(a => a.is_approved && (!entityType || a.entity_type === entityType))
    .map(answer => {
      const question = techProfileQuestions.find(q => q.id === answer.question_id);
      if (answer.entity_type === "tool_configuration") {
        const config = toolConfigurationsLocal.find(tc => tc.id === answer.entity_id);
        const tool = tools.find(t => t.id === config?.tool_id);
        const baseModel = baseModels.find(bm => bm.id === config?.base_model_id);
        return {
          entity_type: answer.entity_type,
          entity_id: answer.entity_id,
          entity_name: config?.configuration_name,
          tool_name: tool?.name,
          base_model_name: baseModel?.name,
          question_id: question?.id,
          question_key: question?.question_key,
          question_text: question?.question_text,
          category: question?.category,
          question_type: question?.question_type,
          display_order: question?.display_order,
          boolean_value: answer.boolean_value,
          numeric_value: answer.numeric_value,
          text_value: answer.text_value,
          list_value: answer.list_value,
          evidence_url: answer.evidence_url
        };
      } else if (answer.entity_type === "base_model") {
        const model = baseModels.find(bm => bm.id === answer.entity_id);
        return {
          entity_type: answer.entity_type,
          entity_id: answer.entity_id,
          entity_name: model?.name,
          developer: model?.developer,
          version: model?.version,
          question_id: question?.id,
          question_key: question?.question_key,
          question_text: question?.question_text,
          category: question?.category,
          question_type: question?.question_type,
          display_order: question?.display_order,
          boolean_value: answer.boolean_value,
          numeric_value: answer.numeric_value,
          text_value: answer.text_value,
          list_value: answer.list_value,
          evidence_url: answer.evidence_url
        };
      }
      return null;
    })
    .filter(Boolean)
    .sort((a, b) => (a.entity_id !== b.entity_id ? a.entity_id - b.entity_id : a.display_order - b.display_order));
}

export function getConfigurationProfiles() {
  return getEntityProfiles("tool_configuration");
}

export function getEntityProfiles(entityType) {
  const profiles = {};
  const displayData = getTechProfileDisplay(entityType);
  displayData.forEach(item => {
    if (!profiles[item.entity_id]) {
      profiles[item.entity_id] = {
        id: item.entity_id,
        name: item.entity_name,
        tool_name: item.tool_name,
        base_model_name: item.base_model_name,
        developer: item.developer,
        version: item.version,
        answers: {}
      };
    }
    profiles[item.entity_id].answers[item.question_key] = {
      question_text: item.question_text,
      category: item.category,
      type: item.question_type,
      value:
        item.boolean_value !== null && item.boolean_value !== undefined
          ? item.boolean_value
          : item.numeric_value !== null && item.numeric_value !== undefined
          ? item.numeric_value
          : item.text_value !== null && item.text_value !== undefined
          ? item.text_value
          : item.list_value !== null && item.list_value !== undefined
          ? JSON.parse(item.list_value || "[]")
          : null
    };
  });
  return Object.values(profiles);
}
