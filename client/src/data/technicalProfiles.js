// Mock data following the Technical Profile schema

export const baseModels = [
  { id: 1, name: 'GPT-4', version: '1.0', developer: 'OpenAI' },
  { id: 2, name: 'Claude 3', version: '3.5', developer: 'Anthropic' },
  { id: 3, name: 'Gemini Pro', version: '1.5', developer: 'Google' },
  { id: 4, name: 'LLaMA 3', version: '3.1', developer: 'Meta' },
  { id: 5, name: 'Mistral', version: '0.2', developer: 'Mistral AI' }
];

export const tools = [
  { id: 1, name: 'ChatGPT', version: '5.0', developer: 'OpenAI' },
  { id: 2, name: 'Perplexity', version: '3.7.3v2', developer: 'PerplexityAI' },
  { id: 3, name: 'Claude', version: '2.1', developer: 'Anthropic' },
  { id: 4, name: 'Gemini', version: 'v2.3', developer: 'Google' },
  { id: 5, name: 'Replika', version: '11.23.0', developer: 'Luka Inc' },
  { id: 6, name: 'Woebot', version: '4.2.1', developer: 'Woebot Health' }
];

export const toolConfigurations = [
  { id: 1, tool_id: 1, base_model_id: 1, configuration_name: 'ChatGPT with GPT-4' },
  { id: 2, tool_id: 2, base_model_id: 1, configuration_name: 'Perplexity with GPT-4' },
  { id: 3, tool_id: 3, base_model_id: 2, configuration_name: 'Claude with Claude 3' },
  { id: 4, tool_id: 4, base_model_id: 3, configuration_name: 'Gemini with Gemini Pro' },
  { id: 5, tool_id: 5, base_model_id: 1, configuration_name: 'Replika with GPT-4' },
  { id: 6, tool_id: 6, base_model_id: 2, configuration_name: 'Woebot with Claude 3' }
];

export const questions = [
  // TOOL CONFIGURATION QUESTIONS
  { id: 1, entity_type: 'tool_configuration', question_key: 'platform_android', 
    question_text: 'Android Support', category: 'Platform', question_type: 'boolean', 
    display_order: 1, is_displayed: true },
  { id: 2, entity_type: 'tool_configuration', question_key: 'platform_ios', 
    question_text: 'iOS Support', category: 'Platform', question_type: 'boolean', 
    display_order: 2, is_displayed: true },
  { id: 3, entity_type: 'tool_configuration', question_key: 'platform_web', 
    question_text: 'Web Support', category: 'Platform', question_type: 'boolean', 
    display_order: 3, is_displayed: true },
  
  // Pricing
  { id: 4, entity_type: 'tool_configuration', question_key: 'has_free_tier', 
    question_text: 'Free Tier Available', category: 'Pricing', question_type: 'boolean', 
    display_order: 4, is_displayed: true },
  { id: 5, entity_type: 'tool_configuration', question_key: 'monthly_price', 
    question_text: 'Monthly Price', category: 'Pricing', question_type: 'text', 
    display_order: 5, is_displayed: true },
  { id: 6, entity_type: 'tool_configuration', question_key: 'annual_price', 
    question_text: 'Annual Price', category: 'Pricing', question_type: 'text', 
    display_order: 6, is_displayed: true },
  
  // Mental Health Features
  { id: 7, entity_type: 'tool_configuration', question_key: 'crisis_detection', 
    question_text: 'Crisis Detection', category: 'Mental Health Features', question_type: 'boolean', 
    display_order: 7, is_displayed: true },
  { id: 8, entity_type: 'tool_configuration', question_key: 'mood_tracking', 
    question_text: 'Mood Tracking', category: 'Mental Health Features', question_type: 'boolean', 
    display_order: 8, is_displayed: true },
  { id: 9, entity_type: 'tool_configuration', question_key: 'therapeutic_techniques', 
    question_text: 'Therapeutic Techniques', category: 'Mental Health Features', question_type: 'list', 
    display_order: 9, is_displayed: true },
  
  // Privacy & Security
  { id: 10, entity_type: 'tool_configuration', question_key: 'hipaa_compliant', 
    question_text: 'HIPAA Compliant', category: 'Privacy & Security', question_type: 'boolean', 
    display_order: 10, is_displayed: true },
  { id: 11, entity_type: 'tool_configuration', question_key: 'data_retention_days', 
    question_text: 'Data Retention (days)', category: 'Privacy & Security', question_type: 'number', 
    display_order: 11, is_displayed: true },
  
  // BASE MODEL QUESTIONS
  { id: 101, entity_type: 'base_model', question_key: 'parameters_billions', 
    question_text: 'Parameters (B)', category: 'Model Architecture', question_type: 'number', 
    display_order: 1, is_displayed: true },
  { id: 102, entity_type: 'base_model', question_key: 'context_window', 
    question_text: 'Context Window', category: 'Model Architecture', question_type: 'number', 
    display_order: 2, is_displayed: true },
  { id: 103, entity_type: 'base_model', question_key: 'training_data_cutoff', 
    question_text: 'Training Data Cutoff', category: 'Model Architecture', question_type: 'text', 
    display_order: 3, is_displayed: true },
  { id: 104, entity_type: 'base_model', question_key: 'multimodal', 
    question_text: 'Multimodal', category: 'Model Architecture', question_type: 'boolean', 
    display_order: 4, is_displayed: true },
  
  // Performance Metrics
  { id: 105, entity_type: 'base_model', question_key: 'mmlu_score', 
    question_text: 'MMLU Score', category: 'Performance Metrics', question_type: 'number', 
    display_order: 5, is_displayed: true },
  { id: 106, entity_type: 'base_model', question_key: 'humaneval_score', 
    question_text: 'HumanEval Score', category: 'Performance Metrics', question_type: 'number', 
    display_order: 6, is_displayed: true },
  { id: 107, entity_type: 'base_model', question_key: 'chatbot_arena_elo', 
    question_text: 'Chatbot Arena ELO', category: 'Performance Metrics', question_type: 'number', 
    display_order: 7, is_displayed: true },
  
  // Capabilities
  { id: 108, entity_type: 'base_model', question_key: 'code_generation', 
    question_text: 'Code Generation', category: 'Capabilities', question_type: 'boolean', 
    display_order: 8, is_displayed: true },
  { id: 109, entity_type: 'base_model', question_key: 'function_calling', 
    question_text: 'Function Calling', category: 'Capabilities', question_type: 'boolean', 
    display_order: 9, is_displayed: true },
  
  // Safety & Licensing
  { id: 110, entity_type: 'base_model', question_key: 'open_source', 
    question_text: 'Open Source', category: 'Safety & Licensing', question_type: 'boolean', 
    display_order: 10, is_displayed: true },
  { id: 111, entity_type: 'base_model', question_key: 'commercial_use', 
    question_text: 'Commercial Use', category: 'Safety & Licensing', question_type: 'boolean', 
    display_order: 11, is_displayed: true },
];

// Generate answers for tool configurations
const toolConfigAnswers = [];
toolConfigurations.forEach(config => {
  // Platform availability
  toolConfigAnswers.push(
    { entity_type: 'tool_configuration', entity_id: config.id, question_id: 1, boolean_value: config.id !== 3, is_approved: true },
    { entity_type: 'tool_configuration', entity_id: config.id, question_id: 2, boolean_value: config.id !== 3, is_approved: true },
    { entity_type: 'tool_configuration', entity_id: config.id, question_id: 3, boolean_value: true, is_approved: true },
    
    // Pricing
    { entity_type: 'tool_configuration', entity_id: config.id, question_id: 4, boolean_value: config.id === 4, is_approved: true },
    { entity_type: 'tool_configuration', entity_id: config.id, question_id: 5, text_value: config.id === 4 ? 'Free' : `$${config.id * 5 + 15}/month`, is_approved: true },
    { entity_type: 'tool_configuration', entity_id: config.id, question_id: 6, text_value: config.id === 4 ? 'Free' : `$${(config.id * 5 + 15) * 10}/year`, is_approved: true },
    
    // Mental Health Features
    { entity_type: 'tool_configuration', entity_id: config.id, question_id: 7, boolean_value: config.id >= 3, is_approved: true },
    { entity_type: 'tool_configuration', entity_id: config.id, question_id: 8, boolean_value: config.id >= 5, is_approved: true },
    { entity_type: 'tool_configuration', entity_id: config.id, question_id: 9, 
      list_value: config.id === 5 ? '["CBT", "DBT", "Mindfulness"]' : 
                  config.id === 6 ? '["CBT", "Mood tracking", "Coping skills"]' :
                  '["General support", "Active listening"]', is_approved: true },
    
    // Privacy & Security
    { entity_type: 'tool_configuration', entity_id: config.id, question_id: 10, boolean_value: config.id === 6, is_approved: true },
    { entity_type: 'tool_configuration', entity_id: config.id, question_id: 11, numeric_value: config.id <= 2 ? 30 : 90, is_approved: true }
  );
});

// Generate answers for base models
const baseModelAnswers = [];
baseModels.forEach(model => {
  baseModelAnswers.push(
    // Model Architecture
    { entity_type: 'base_model', entity_id: model.id, question_id: 101, 
      numeric_value: model.id === 1 ? 1760 : model.id === 2 ? 2000 : model.id === 3 ? 1800 : model.id === 4 ? 405 : 280, is_approved: true },
    { entity_type: 'base_model', entity_id: model.id, question_id: 102, 
      numeric_value: model.id === 1 ? 128000 : model.id === 2 ? 200000 : model.id === 3 ? 1000000 : 128000, is_approved: true },
    { entity_type: 'base_model', entity_id: model.id, question_id: 103, 
      text_value: model.id === 1 ? 'April 2023' : model.id === 2 ? 'April 2024' : model.id === 3 ? 'November 2023' : 'December 2023', is_approved: true },
    { entity_type: 'base_model', entity_id: model.id, question_id: 104, 
      boolean_value: model.id <= 3, is_approved: true },
    
    // Performance Metrics
    { entity_type: 'base_model', entity_id: model.id, question_id: 105, 
      numeric_value: model.id === 1 ? 86.4 : model.id === 2 ? 88.5 : model.id === 3 ? 90.1 : model.id === 4 ? 86.1 : 75.2, is_approved: true },
    { entity_type: 'base_model', entity_id: model.id, question_id: 106, 
      numeric_value: model.id === 1 ? 67.0 : model.id === 2 ? 92.0 : model.id === 3 ? 74.4 : model.id === 4 ? 81.7 : 48.1, is_approved: true },
    { entity_type: 'base_model', entity_id: model.id, question_id: 107, 
      numeric_value: model.id === 1 ? 1260 : model.id === 2 ? 1271 : model.id === 3 ? 1255 : model.id === 4 ? 1250 : 1114, is_approved: true },
    
    // Capabilities
    { entity_type: 'base_model', entity_id: model.id, question_id: 108, boolean_value: true, is_approved: true },
    { entity_type: 'base_model', entity_id: model.id, question_id: 109, boolean_value: model.id <= 3, is_approved: true },
    
    // Safety & Licensing
    { entity_type: 'base_model', entity_id: model.id, question_id: 110, boolean_value: model.id >= 4, is_approved: true },
    { entity_type: 'base_model', entity_id: model.id, question_id: 111, 
      boolean_value: model.id !== 4 || model.id === 5, is_approved: true }
  );
});

export const answers = [...toolConfigAnswers, ...baseModelAnswers];

// Helper function to get profile display data (mimics the SQL view)
export function getProfileDisplay(entityType = null) {
  return answers
    .filter(a => a.is_approved && (!entityType || a.entity_type === entityType))
    .map(answer => {
      const question = questions.find(q => q.id === answer.question_id);
      
      if (answer.entity_type === 'tool_configuration') {
        const config = toolConfigurations.find(tc => tc.id === answer.entity_id);
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
      } else if (answer.entity_type === 'base_model') {
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
    .sort((a, b) => {
      if (a.entity_id !== b.entity_id) return a.entity_id - b.entity_id;
      return a.display_order - b.display_order;
    });
}

// Helper to group answers by configuration
export function getConfigurationProfiles() {
  return getEntityProfiles('tool_configuration');
}

// Helper to group answers by entity
export function getEntityProfiles(entityType) {
  const profiles = {};
  const displayData = getProfileDisplay(entityType);
  
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
      value: item.boolean_value !== null ? item.boolean_value :
             item.numeric_value !== null ? item.numeric_value :
             item.text_value !== null ? item.text_value :
             item.list_value !== null ? JSON.parse(item.list_value || '[]') : null
    };
  });
  
  return Object.values(profiles);
}