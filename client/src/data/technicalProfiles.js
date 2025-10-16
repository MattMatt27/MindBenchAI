export const baseModels = [
  { id: 1, name: "GPT-4o", version: "20250915", developer: "OpenAI" },
  { id: 2, name: "Claude 3.5 Sonnet", version: "20241022", developer: "Anthropic" },
  { id: 3, name: "Gemini 2.5 Pro", version: "20250915", developer: "Google" },
  { id: 4, name: "LLaMA 3.1 405B", version: "20250815", developer: "Meta" },
  { id: 5, name: "Mistral 7B", version: "20250701", developer: "Mistral AI" },
  { id: 6, name: "DeepSeek-V3", version: "20250915", developer: "DeepSeek" },
  { id: 7, name: "Mixtral 8x22B", version: "20250815", developer: "Mistral AI" },
  { id: 8, name: "Command R+", version: "20250701", developer: "Cohere" },
  { id: 9, name: "Phi-3 Medium", version: "20250601", developer: "Microsoft" },
  { id: 10, name: "Qwen2-72B", version: "20250815", developer: "Alibaba" },
  { id: 11, name: "Gemma 2", version: "20250701", developer: "Google" },
  { id: 12, name: "MPT-30B", version: "20241101", developer: "MosaicML" }
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
  { id: 1, tool_id: 1, base_model_id: 1, configuration_name: "ChatGPT with GPT-4o" },
  { id: 2, tool_id: 2, base_model_id: 1, configuration_name: "Perplexity with GPT-4o" },
  { id: 3, tool_id: 3, base_model_id: 2, configuration_name: "Claude with Claude 3.5 Sonnet" },
  { id: 4, tool_id: 4, base_model_id: 3, configuration_name: "Gemini with Gemini 2.5 Pro" },
  { id: 5, tool_id: 5, base_model_id: 1, configuration_name: "Replika with GPT-4o" },
  { id: 6, tool_id: 6, base_model_id: 2, configuration_name: "Woebot with Claude 3.5 Sonnet" },
  { id: 7, tool_id: 7, base_model_id: 1, configuration_name: "Copilot with GPT-4o" },
  { id: 8, tool_id: 7, base_model_id: 9, configuration_name: "Copilot with Phi-3 Medium" },
  { id: 9, tool_id: 8, base_model_id: 6, configuration_name: "YouChat with DeepSeek-V3" },
  { id: 10, tool_id: 9, base_model_id: 7, configuration_name: "Poe with Mixtral 8x22B" },
  { id: 11, tool_id: 10, base_model_id: 12, configuration_name: "Character.AI with MPT-30B" },
  { id: 12, tool_id: 11, base_model_id: 2, configuration_name: "Khanmigo with Claude 3.5 Sonnet" },
  { id: 13, tool_id: 12, base_model_id: 5, configuration_name: "HuggingChat with Mistral 7B" },
  { id: 14, tool_id: 12, base_model_id: 10, configuration_name: "HuggingChat with Qwen2-72B" },
  { id: 15, tool_id: 4, base_model_id: 11, configuration_name: "Gemini with Gemma 2" },
  { id: 16, tool_id: 9, base_model_id: 8, configuration_name: "Poe with Command R+" },
  { id: 17, tool_id: 2, base_model_id: 6, configuration_name: "Perplexity with DeepSeek-V3" },
  { id: 18, tool_id: 1, base_model_id: 7, configuration_name: "ChatGPT with Mixtral 8x22B" }
];

export const techProfileQuestions = [
  // Universal Questions (Apply to Both Base LLMs and LLM-Based Tools)
  // Background & Development
  { id: 1, entity_type: "both", question_key: "developed_by_government", question_text: "Developed by a government entity?", short_text: "Gov't Dev", category: "Background & Development", question_type: "boolean", display_order: 1, is_displayed: false },
  { id: 2, entity_type: "both", question_key: "developed_by_for_profit", question_text: "Developed by a for-profit company?", short_text: "For-Profit", category: "Background & Development", question_type: "boolean", display_order: 2, is_displayed: true },
  { id: 3, entity_type: "both", question_key: "developed_by_non_profit", question_text: "Developed by a non-profit organization?", short_text: "Non-Profit", category: "Background & Development", question_type: "boolean", display_order: 3, is_displayed: false },
  { id: 4, entity_type: "both", question_key: "developed_by_healthcare", question_text: "Developed by a trusted healthcare company?", short_text: "Healthcare", category: "Background & Development", question_type: "boolean", display_order: 4, is_displayed: false },
  { id: 5, entity_type: "both", question_key: "developed_by_academic", question_text: "Developed by an academic institution?", short_text: "Academic", category: "Background & Development", question_type: "boolean", display_order: 5, is_displayed: false },
  { id: 6, entity_type: "both", question_key: "is_open_source", question_text: "Open-source or proprietary?", short_text: "License", category: "Background & Development", question_type: "text", display_order: 6, is_displayed: true },
  { id: 7, entity_type: "both", question_key: "has_mental_health_professionals", question_text: "Development team includes mental health professionals?", short_text: "MH Team", category: "Background & Development", question_type: "boolean", display_order: 7, is_displayed: false },

  // Accessibility
  { id: 8, entity_type: "both", question_key: "available_web", question_text: "Available via web browser?", short_text: "Web", category: "Accessibility", question_type: "boolean", display_order: 8, is_displayed: true },
  { id: 9, entity_type: "both", question_key: "available_ios", question_text: "Available as iOS app?", short_text: "iOS", category: "Accessibility", question_type: "boolean", display_order: 9, is_displayed: true },
  { id: 10, entity_type: "both", question_key: "available_android", question_text: "Available as Android app?", short_text: "Android", category: "Accessibility", question_type: "boolean", display_order: 10, is_displayed: true },
  { id: 11, entity_type: "both", question_key: "app_store_category", question_text: "If app-based, what is the app store category?", short_text: "App Category", category: "Accessibility", question_type: "text", display_order: 11, is_displayed: false },
  { id: 12, entity_type: "both", question_key: "completely_free", question_text: "Completely free to use?", short_text: "Free", category: "Accessibility", question_type: "boolean", display_order: 12, is_displayed: true },
  { id: 13, entity_type: "both", question_key: "free_with_limits", question_text: "Free with limited features?", short_text: "Freemium", category: "Accessibility", question_type: "boolean", display_order: 13, is_displayed: false },
  { id: 14, entity_type: "both", question_key: "features_behind_paywall", question_text: "Features behind paywall?", short_text: "Paywall", category: "Accessibility", question_type: "boolean", display_order: 14, is_displayed: false },
  { id: 15, entity_type: "both", question_key: "subscription_based", question_text: "Subscription-based?", short_text: "Subscription", category: "Accessibility", question_type: "boolean", display_order: 15, is_displayed: false },
  { id: 16, entity_type: "both", question_key: "supported_languages", question_text: "Supported languages?", short_text: "Languages", category: "Accessibility", question_type: "list", display_order: 16, is_displayed: false },
  { id: 17, entity_type: "both", question_key: "accessibility_features", question_text: "Accessibility features for users with disabilities?", short_text: "A11y Features", category: "Accessibility", question_type: "text", display_order: 17, is_displayed: false },

  // Privacy & Security
  { id: 18, entity_type: "both", question_key: "has_privacy_policy", question_text: "Privacy policy exists?", short_text: "Privacy Policy", category: "Privacy & Security", question_type: "boolean", display_order: 18, is_displayed: true },
  { id: 19, entity_type: "both", question_key: "privacy_policy_reading_level", question_text: "Privacy policy reading level (Flesch-Kincaid scale)?", short_text: "Reading Level", category: "Privacy & Security", question_type: "number", display_order: 19, is_displayed: false },
  { id: 20, entity_type: "both", question_key: "user_data_deletion", question_text: "User data deletion available?", short_text: "Data Deletion", category: "Privacy & Security", question_type: "boolean", display_order: 20, is_displayed: true },
  { id: 21, entity_type: "both", question_key: "data_use_declared", question_text: "Data use and purpose declared?", short_text: "Data Use", category: "Privacy & Security", question_type: "boolean", display_order: 21, is_displayed: false },
  { id: 22, entity_type: "both", question_key: "security_controls_specified", question_text: "Security controls specified?", short_text: "Security", category: "Privacy & Security", question_type: "boolean", display_order: 22, is_displayed: false },
  { id: 23, entity_type: "both", question_key: "phi_shared", question_text: "PHI (Protected Health Information) shared?", short_text: "PHI Shared", category: "Privacy & Security", question_type: "boolean", display_order: 23, is_displayed: false },
  { id: 24, entity_type: "both", question_key: "deidentified_data_shared", question_text: "De-identified/anonymized data shared?", short_text: "De-ID Data", category: "Privacy & Security", question_type: "boolean", display_order: 24, is_displayed: false },
  { id: 25, entity_type: "both", question_key: "aggregate_data_shared", question_text: "Aggregate data shared?", short_text: "Aggregate Data", category: "Privacy & Security", question_type: "boolean", display_order: 25, is_displayed: false },
  { id: 26, entity_type: "both", question_key: "opt_out_data_collection", question_text: "User can opt out of data collection?", short_text: "Opt-Out", category: "Privacy & Security", question_type: "boolean", display_order: 26, is_displayed: true },
  { id: 27, entity_type: "both", question_key: "hipaa_compliant", question_text: "HIPAA compliant?", short_text: "HIPAA", category: "Privacy & Security", question_type: "boolean", display_order: 27, is_displayed: true },
  { id: 28, entity_type: "both", question_key: "gdpr_compliant", question_text: "GDPR compliant?", short_text: "GDPR", category: "Privacy & Security", question_type: "boolean", display_order: 28, is_displayed: true },
  { id: 29, entity_type: "both", question_key: "data_breach_notification", question_text: "Data breach notification policy?", short_text: "Breach Policy", category: "Privacy & Security", question_type: "boolean", display_order: 29, is_displayed: false },
  { id: 30, entity_type: "both", question_key: "third_party_data_sharing", question_text: "Third-party data sharing disclosed?", short_text: "3rd Party", category: "Privacy & Security", question_type: "boolean", display_order: 30, is_displayed: false },
  { id: 31, entity_type: "both", question_key: "data_retention_period", question_text: "Data retention period specified?", short_text: "Retention", category: "Privacy & Security", question_type: "text", display_order: 31, is_displayed: false },

  // Evidence & Validation
  { id: 32, entity_type: "both", question_key: "has_supporting_studies", question_text: "Contains supporting studies?", short_text: "Studies", category: "Evidence & Validation", question_type: "boolean", display_order: 32, is_displayed: true },
  { id: 33, entity_type: "both", question_key: "num_feasibility_studies", question_text: "Number of feasibility/usability studies?", short_text: "Feasibility", category: "Evidence & Validation", question_type: "number", display_order: 33, is_displayed: false },
  { id: 34, entity_type: "both", question_key: "num_efficacy_studies", question_text: "Number of efficacy studies?", short_text: "Efficacy", category: "Evidence & Validation", question_type: "number", display_order: 34, is_displayed: false },
  { id: 35, entity_type: "both", question_key: "has_peer_reviewed_publications", question_text: "Peer-reviewed publications?", short_text: "Peer Review", category: "Evidence & Validation", question_type: "boolean", display_order: 35, is_displayed: true },
  { id: 36, entity_type: "both", question_key: "has_adverse_event_reporting", question_text: "Adverse event reporting system?", short_text: "Event Report", category: "Evidence & Validation", question_type: "boolean", display_order: 36, is_displayed: false },

  // Disclaimers & Limitations
  { id: 37, entity_type: "both", question_key: "states_not_replacement", question_text: "States it is not a replacement for medical care?", short_text: "Not Medical", category: "Disclaimers & Limitations", question_type: "boolean", display_order: 37, is_displayed: true },
  { id: 38, entity_type: "both", question_key: "crisis_protocols_disclosed", question_text: "Crisis intervention protocols disclosed?", short_text: "Crisis", category: "Disclaimers & Limitations", question_type: "boolean", display_order: 38, is_displayed: true },
  { id: 39, entity_type: "both", question_key: "age_restrictions", question_text: "Age restrictions specified?", short_text: "Age", category: "Disclaimers & Limitations", question_type: "text", display_order: 39, is_displayed: false },

  // Base LLM-Specific Questions
  // Model Architecture
  { id: 101, entity_type: "base_model", question_key: "model_size_parameters", question_text: "Model size (parameters)?", short_text: "Params", category: "Model Architecture", question_type: "number", display_order: 101, is_displayed: true },
  { id: 102, entity_type: "base_model", question_key: "model_version_date", question_text: "Model version/release date?", short_text: "Version", category: "Model Architecture", question_type: "text", display_order: 102, is_displayed: true },
  { id: 103, entity_type: "base_model", question_key: "token_limit", question_text: "Token limit per interaction?", short_text: "Token Limit", category: "Model Architecture", question_type: "number", display_order: 103, is_displayed: false },
  { id: 104, entity_type: "base_model", question_key: "context_window_size", question_text: "Context window size (tokens)?", short_text: "Context", category: "Model Architecture", question_type: "number", display_order: 104, is_displayed: true },
  { id: 105, entity_type: "base_model", question_key: "training_data_cutoff", question_text: "Training data cutoff date?", short_text: "Data Cutoff", category: "Model Architecture", question_type: "text", display_order: 105, is_displayed: true },
  { id: 106, entity_type: "base_model", question_key: "model_card_url", question_text: "Model card or datasheet URL?", short_text: "Model Card", category: "Model Architecture", question_type: "text", display_order: 106, is_displayed: false },

  // Technical Specifications
  { id: 107, entity_type: "base_model", question_key: "api_availability", question_text: "API availability?", short_text: "API", category: "Technical Specifications", question_type: "boolean", display_order: 107, is_displayed: true },
  { id: 108, entity_type: "base_model", question_key: "api_rate_limits", question_text: "API rate limits?", short_text: "Rate Limits", category: "Technical Specifications", question_type: "text", display_order: 108, is_displayed: false },
  { id: 109, entity_type: "base_model", question_key: "model_update_policy", question_text: "Model update/versioning policy?", short_text: "Updates", category: "Technical Specifications", question_type: "text", display_order: 109, is_displayed: false },
  { id: 110, entity_type: "base_model", question_key: "inference_latency", question_text: "Inference latency specifications?", short_text: "Latency", category: "Technical Specifications", question_type: "text", display_order: 110, is_displayed: false },
  { id: 111, entity_type: "base_model", question_key: "multimodal_capabilities", question_text: "Multi-modal capabilities (text/image/audio)?", short_text: "Multimodal", category: "Technical Specifications", question_type: "list", display_order: 111, is_displayed: true },

  // Training & Safety
  { id: 112, entity_type: "base_model", question_key: "training_data_sources", question_text: "Training data sources disclosed?", short_text: "Data Sources", category: "Training & Safety", question_type: "boolean", display_order: 112, is_displayed: false },
  { id: 113, entity_type: "base_model", question_key: "safety_alignment_methods", question_text: "Safety alignment methods described?", short_text: "Safety", category: "Training & Safety", question_type: "boolean", display_order: 113, is_displayed: true },
  { id: 114, entity_type: "base_model", question_key: "red_team_testing", question_text: "Red team testing conducted?", short_text: "Red Team", category: "Training & Safety", question_type: "boolean", display_order: 114, is_displayed: false },
  { id: 115, entity_type: "base_model", question_key: "known_limitations_documented", question_text: "Known limitations documented?", short_text: "Limitations", category: "Training & Safety", question_type: "boolean", display_order: 115, is_displayed: false },

  // LLM-Based Tool/Application-Specific Questions
  // Underlying Model
  { id: 201, entity_type: "tool_configuration", question_key: "underlying_base_model", question_text: "Underlying base model disclosed (GPT, Claude, Gemini, LLaMA, etc.)?", short_text: "Base Model", category: "Underlying Model", question_type: "text", display_order: 201, is_displayed: true },
  { id: 202, entity_type: "tool_configuration", question_key: "base_model_version", question_text: "Base model version specified?", short_text: "Version", category: "Underlying Model", question_type: "text", display_order: 202, is_displayed: true },
  { id: 203, entity_type: "tool_configuration", question_key: "fine_tuned_mental_health", question_text: "Fine-tuned for mental health use?", short_text: "Fine-Tuned", category: "Underlying Model", question_type: "boolean", display_order: 203, is_displayed: true },
  { id: 204, entity_type: "tool_configuration", question_key: "fine_tuning_approach", question_text: "Fine-tuning approach/datasets disclosed?", short_text: "Tuning Data", category: "Underlying Model", question_type: "text", display_order: 204, is_displayed: false },
  { id: 205, entity_type: "tool_configuration", question_key: "rag_implemented", question_text: "Retrieval-augmented generation (RAG) implemented?", short_text: "RAG", category: "Underlying Model", question_type: "boolean", display_order: 205, is_displayed: false },
  { id: 206, entity_type: "tool_configuration", question_key: "additional_safety_layers", question_text: "Additional safety layers added beyond base model?", short_text: "Safety+", category: "Underlying Model", question_type: "boolean", display_order: 206, is_displayed: true },
  { id: 207, entity_type: "tool_configuration", question_key: "model_update_frequency", question_text: "Model update frequency specified?", short_text: "Updates", category: "Underlying Model", question_type: "text", display_order: 207, is_displayed: false },
  { id: 208, entity_type: "tool_configuration", question_key: "user_notification_updates", question_text: "User notification of model changes?", short_text: "Notifications", category: "Underlying Model", question_type: "boolean", display_order: 208, is_displayed: false },

  // User Interface & Interaction
  { id: 209, entity_type: "tool_configuration", question_key: "text_input_supported", question_text: "Text input supported?", short_text: "Text Input", category: "User Interface & Interaction", question_type: "boolean", display_order: 209, is_displayed: false },
  { id: 210, entity_type: "tool_configuration", question_key: "speech_input_supported", question_text: "Speech input supported?", short_text: "Voice Input", category: "User Interface & Interaction", question_type: "boolean", display_order: 210, is_displayed: true },
  { id: 211, entity_type: "tool_configuration", question_key: "image_input_supported", question_text: "Image input supported?", short_text: "Image Input", category: "User Interface & Interaction", question_type: "boolean", display_order: 211, is_displayed: false },
  { id: 212, entity_type: "tool_configuration", question_key: "video_input_supported", question_text: "Video input supported?", short_text: "Video Input", category: "User Interface & Interaction", question_type: "boolean", display_order: 212, is_displayed: false },
  { id: 213, entity_type: "tool_configuration", question_key: "text_output_provided", question_text: "Text output provided?", short_text: "Text Output", category: "User Interface & Interaction", question_type: "boolean", display_order: 213, is_displayed: false },
  { id: 214, entity_type: "tool_configuration", question_key: "speech_output_provided", question_text: "Speech output provided?", short_text: "Voice Output", category: "User Interface & Interaction", question_type: "boolean", display_order: 214, is_displayed: true },
  { id: 215, entity_type: "tool_configuration", question_key: "image_output_generated", question_text: "Image output generated?", short_text: "Image Output", category: "User Interface & Interaction", question_type: "boolean", display_order: 215, is_displayed: false },
  { id: 216, entity_type: "tool_configuration", question_key: "video_output_generated", question_text: "Video output generated?", short_text: "Video Output", category: "User Interface & Interaction", question_type: "boolean", display_order: 216, is_displayed: false },
  { id: 217, entity_type: "tool_configuration", question_key: "prescripted_prompts", question_text: "Pre-scripted prompt options?", short_text: "Templates", category: "User Interface & Interaction", question_type: "boolean", display_order: 217, is_displayed: false },
  { id: 218, entity_type: "tool_configuration", question_key: "open_ended_prompting", question_text: "Open-ended prompting allowed?", short_text: "Open Prompts", category: "User Interface & Interaction", question_type: "boolean", display_order: 218, is_displayed: false },
  { id: 219, entity_type: "tool_configuration", question_key: "conversation_history_viewable", question_text: "Conversation history viewable?", short_text: "History", category: "User Interface & Interaction", question_type: "boolean", display_order: 219, is_displayed: true },
  { id: 220, entity_type: "tool_configuration", question_key: "conversation_export", question_text: "Conversation export available?", short_text: "Export", category: "User Interface & Interaction", question_type: "boolean", display_order: 220, is_displayed: false },

  // Customization & Personalization
  { id: 221, entity_type: "tool_configuration", question_key: "interface_color_customizable", question_text: "Interface color customizable?", short_text: "Color", category: "Customization & Personalization", question_type: "boolean", display_order: 221, is_displayed: false },
  { id: 222, entity_type: "tool_configuration", question_key: "text_size_adjustable", question_text: "Text size adjustable?", short_text: "Text Size", category: "Customization & Personalization", question_type: "boolean", display_order: 222, is_displayed: false },
  { id: 223, entity_type: "tool_configuration", question_key: "communication_mode_changeable", question_text: "Communication mode changeable (text vs voice)?", short_text: "Mode Switch", category: "Customization & Personalization", question_type: "boolean", display_order: 223, is_displayed: false },
  { id: 224, entity_type: "tool_configuration", question_key: "has_unique_identity", question_text: "Has unique identity (name, persona)?", short_text: "Persona", category: "Customization & Personalization", question_type: "boolean", display_order: 224, is_displayed: true },
  { id: 225, entity_type: "tool_configuration", question_key: "system_prompt_exists", question_text: "System prompt exists?", short_text: "Sys Prompt", category: "Customization & Personalization", question_type: "boolean", display_order: 225, is_displayed: false },
  { id: 226, entity_type: "tool_configuration", question_key: "system_prompt_transparent", question_text: "System prompt transparent to users?", short_text: "Transparent", category: "Customization & Personalization", question_type: "boolean", display_order: 226, is_displayed: false },
  { id: 227, entity_type: "tool_configuration", question_key: "personalizes_user_needs", question_text: "Personalizes based on user needs?", short_text: "Personalized", category: "Customization & Personalization", question_type: "boolean", display_order: 227, is_displayed: true },

  // Memory & Data Persistence
  { id: 228, entity_type: "tool_configuration", question_key: "conversation_memory_session", question_text: "Maintains conversation memory within session?", short_text: "Session Mem", category: "Memory & Data Persistence", question_type: "boolean", display_order: 228, is_displayed: false },
  { id: 229, entity_type: "tool_configuration", question_key: "persistent_memory_across_sessions", question_text: "Persistent memory across sessions?", short_text: "Persistent", category: "Memory & Data Persistence", question_type: "boolean", display_order: 229, is_displayed: true },
  { id: 230, entity_type: "tool_configuration", question_key: "data_stored_device", question_text: "User data stored on device?", short_text: "Device Store", category: "Memory & Data Persistence", question_type: "boolean", display_order: 230, is_displayed: false },
  { id: 231, entity_type: "tool_configuration", question_key: "data_stored_server", question_text: "User data stored on server?", short_text: "Server Store", category: "Memory & Data Persistence", question_type: "boolean", display_order: 231, is_displayed: false },
  { id: 232, entity_type: "tool_configuration", question_key: "memory_retention_period", question_text: "Memory retention period specified?", short_text: "Retention", category: "Memory & Data Persistence", question_type: "text", display_order: 232, is_displayed: false },
  { id: 233, entity_type: "tool_configuration", question_key: "user_can_edit_memories", question_text: "User can edit/delete specific memories?", short_text: "Edit Memory", category: "Memory & Data Persistence", question_type: "boolean", display_order: 233, is_displayed: false },

  // Clinical Integration
  { id: 234, entity_type: "tool_configuration", question_key: "offers_standardized_screening", question_text: "Offers standardized mental health screening tools (e.g., PHQ-9)?", short_text: "Screening", category: "Clinical Integration", question_type: "boolean", display_order: 234, is_displayed: true },
  { id: 235, entity_type: "tool_configuration", question_key: "connects_peer_support", question_text: "Connects users to peer support?", short_text: "Peer Support", category: "Clinical Integration", question_type: "boolean", display_order: 235, is_displayed: false },
  { id: 236, entity_type: "tool_configuration", question_key: "connects_professional_support", question_text: "Connects users to professional mental health support?", short_text: "Pro Support", category: "Clinical Integration", question_type: "boolean", display_order: 236, is_displayed: true },
  { id: 237, entity_type: "tool_configuration", question_key: "emergency_services_integration", question_text: "Emergency services integration?", short_text: "Emergency", category: "Clinical Integration", question_type: "boolean", display_order: 237, is_displayed: true },
  { id: 238, entity_type: "tool_configuration", question_key: "provider_dashboard", question_text: "Provider dashboard/reporting available?", short_text: "Dashboard", category: "Clinical Integration", question_type: "boolean", display_order: 238, is_displayed: false },
  { id: 239, entity_type: "tool_configuration", question_key: "care_team_collaboration", question_text: "Care team collaboration features?", short_text: "Care Team", category: "Clinical Integration", question_type: "boolean", display_order: 239, is_displayed: false },

  // Behavioral Monitoring
  { id: 240, entity_type: "tool_configuration", question_key: "sends_notifications_reminders", question_text: "Sends notifications/reminders?", short_text: "Reminders", category: "Behavioral Monitoring", question_type: "boolean", display_order: 240, is_displayed: false },
  { id: 241, entity_type: "tool_configuration", question_key: "collects_geolocation", question_text: "Collects geolocation data?", short_text: "Geolocation", category: "Behavioral Monitoring", question_type: "boolean", display_order: 241, is_displayed: false },
  { id: 242, entity_type: "tool_configuration", question_key: "monitors_screen_time", question_text: "Monitors screen time?", short_text: "Screen Time", category: "Behavioral Monitoring", question_type: "boolean", display_order: 242, is_displayed: false },
  { id: 243, entity_type: "tool_configuration", question_key: "tracks_user_clicks", question_text: "Tracks user clicks/interactions?", short_text: "Click Track", category: "Behavioral Monitoring", question_type: "boolean", display_order: 243, is_displayed: false },
  { id: 244, entity_type: "tool_configuration", question_key: "records_keystroke_patterns", question_text: "Records keystroke patterns?", short_text: "Keystrokes", category: "Behavioral Monitoring", question_type: "boolean", display_order: 244, is_displayed: false },
  { id: 245, entity_type: "tool_configuration", question_key: "logs_settings_changes", question_text: "Logs settings changes?", short_text: "Settings Log", category: "Behavioral Monitoring", question_type: "boolean", display_order: 245, is_displayed: false },
  { id: 246, entity_type: "tool_configuration", question_key: "mood_tracking_features", question_text: "Mood tracking features?", short_text: "Mood Track", category: "Behavioral Monitoring", question_type: "boolean", display_order: 246, is_displayed: true },
  { id: 247, entity_type: "tool_configuration", question_key: "usage_pattern_analysis", question_text: "Usage pattern analysis?", short_text: "Usage Pattern", category: "Behavioral Monitoring", question_type: "boolean", display_order: 247, is_displayed: false },

  // Content & Safety Features
  { id: 248, entity_type: "tool_configuration", question_key: "content_filtering_active", question_text: "Content filtering/moderation active?", short_text: "Filtering", category: "Content & Safety Features", question_type: "boolean", display_order: 248, is_displayed: true },
  { id: 249, entity_type: "tool_configuration", question_key: "self_harm_prevention", question_text: "Self-harm prevention protocols?", short_text: "Self-Harm", category: "Content & Safety Features", question_type: "boolean", display_order: 249, is_displayed: true },
  { id: 250, entity_type: "tool_configuration", question_key: "user_reporting_mechanisms", question_text: "User reporting mechanisms?", short_text: "Reporting", category: "Content & Safety Features", question_type: "boolean", display_order: 250, is_displayed: false },
  { id: 251, entity_type: "tool_configuration", question_key: "age_appropriate_content", question_text: "Age-appropriate content controls?", short_text: "Age Control", category: "Content & Safety Features", question_type: "boolean", display_order: 251, is_displayed: false },

  // Target Demographics
  { id: 252, entity_type: "tool_configuration", question_key: "target_age_group", question_text: "Target age group specified?", short_text: "Target Age", category: "Target Demographics", question_type: "text", display_order: 252, is_displayed: true },
  { id: 253, entity_type: "tool_configuration", question_key: "target_mental_health_conditions", question_text: "Target mental health conditions specified?", short_text: "Conditions", category: "Target Demographics", question_type: "list", display_order: 253, is_displayed: true }
];

const toolConfigurationsLocal = toolConfigurations;

// Sample answer data - only for displayed questions to keep data manageable
// Generate answers programmatically for demonstrated functionality
const generateToolAnswers = () => {
  const answers = [];

  toolConfigurations.forEach(config => {
    // Universal questions (both)
    answers.push(
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 2, boolean_value: true, is_approved: true }, // For-Profit
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 6, text_value: "Proprietary", is_approved: true }, // License
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 8, boolean_value: true, is_approved: true }, // Web
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 9, boolean_value: config.id !== 3, is_approved: true }, // iOS
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 10, boolean_value: config.id !== 3, is_approved: true }, // Android
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 12, boolean_value: config.id === 4 || config.id === 13, is_approved: true }, // Free
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 18, boolean_value: true, is_approved: true }, // Privacy Policy
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 20, boolean_value: config.id % 2 === 0, is_approved: true }, // Data Deletion
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 26, boolean_value: config.id % 3 === 0, is_approved: true }, // Opt-Out
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 27, boolean_value: config.id === 6, is_approved: true }, // HIPAA
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 28, boolean_value: config.id % 2 === 1, is_approved: true }, // GDPR
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 32, boolean_value: config.id % 4 === 0, is_approved: true }, // Studies
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 35, boolean_value: config.id % 5 === 0, is_approved: true }, // Peer Review
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 37, boolean_value: config.id >= 5, is_approved: true }, // Not Medical
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 38, boolean_value: config.id % 3 === 0, is_approved: true }, // Crisis

      // Tool-specific questions
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 201, text_value: baseModels.find(bm => bm.id === config.base_model_id)?.name || "Unknown", is_approved: true }, // Base Model
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 202, text_value: baseModels.find(bm => bm.id === config.base_model_id)?.version || "Unknown", is_approved: true }, // Version
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 203, boolean_value: [5, 6].includes(config.id), is_approved: true }, // Fine-Tuned
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 206, boolean_value: config.id >= 5, is_approved: true }, // Safety+
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 210, boolean_value: config.id % 3 === 0, is_approved: true }, // Voice Input
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 214, boolean_value: config.id % 4 === 0, is_approved: true }, // Voice Output
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 219, boolean_value: true, is_approved: true }, // History
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 224, boolean_value: [5, 6, 10].includes(config.id), is_approved: true }, // Persona
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 227, boolean_value: config.id % 2 === 0, is_approved: true }, // Personalized
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 229, boolean_value: config.id >= 5, is_approved: true }, // Persistent
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 234, boolean_value: config.id === 6, is_approved: true }, // Screening
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 236, boolean_value: [6, 7].includes(config.id), is_approved: true }, // Pro Support
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 237, boolean_value: config.id % 5 === 0, is_approved: true }, // Emergency
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 246, boolean_value: [5, 6].includes(config.id), is_approved: true }, // Mood Track
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 248, boolean_value: true, is_approved: true }, // Filtering
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 249, boolean_value: config.id >= 5, is_approved: true }, // Self-Harm
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 252, text_value: config.id === 11 ? "7-17" : "18+", is_approved: true }, // Target Age
      { entity_type: "tool_configuration", entity_id: config.id, question_id: 253, list_value: JSON.stringify(config.id === 6 ? ["Depression", "Anxiety"] : ["General wellness"]), is_approved: true } // Conditions
    );
  });

  return answers;
};

const generateBaseModelAnswers = () => {
  const answers = [];

  baseModels.forEach(model => {
    // Universal questions (both)
    answers.push(
      { entity_type: "base_model", entity_id: model.id, question_id: 2, boolean_value: [1, 2, 3].includes(model.id), is_approved: true }, // For-Profit
      { entity_type: "base_model", entity_id: model.id, question_id: 6, text_value: [4, 5, 11].includes(model.id) ? "Open Source" : "Proprietary", is_approved: true }, // License
      { entity_type: "base_model", entity_id: model.id, question_id: 8, boolean_value: true, is_approved: true }, // Web (API)
      { entity_type: "base_model", entity_id: model.id, question_id: 9, boolean_value: false, is_approved: true }, // iOS
      { entity_type: "base_model", entity_id: model.id, question_id: 10, boolean_value: false, is_approved: true }, // Android
      { entity_type: "base_model", entity_id: model.id, question_id: 12, boolean_value: [4, 11].includes(model.id), is_approved: true }, // Free
      { entity_type: "base_model", entity_id: model.id, question_id: 18, boolean_value: true, is_approved: true }, // Privacy Policy
      { entity_type: "base_model", entity_id: model.id, question_id: 20, boolean_value: model.id <= 3, is_approved: true }, // Data Deletion
      { entity_type: "base_model", entity_id: model.id, question_id: 26, boolean_value: model.id % 2 === 0, is_approved: true }, // Opt-Out
      { entity_type: "base_model", entity_id: model.id, question_id: 27, boolean_value: false, is_approved: true }, // HIPAA
      { entity_type: "base_model", entity_id: model.id, question_id: 28, boolean_value: [1, 2, 3].includes(model.id), is_approved: true }, // GDPR
      { entity_type: "base_model", entity_id: model.id, question_id: 32, boolean_value: true, is_approved: true }, // Studies
      { entity_type: "base_model", entity_id: model.id, question_id: 35, boolean_value: true, is_approved: true }, // Peer Review
      { entity_type: "base_model", entity_id: model.id, question_id: 37, boolean_value: true, is_approved: true }, // Not Medical
      { entity_type: "base_model", entity_id: model.id, question_id: 38, boolean_value: false, is_approved: true }, // Crisis

      // Base model-specific questions
      { entity_type: "base_model", entity_id: model.id, question_id: 101, numeric_value: model.id === 1 ? 1760 : model.id === 2 ? 2000 : model.id === 3 ? 1800 : model.id === 4 ? 405 : model.id === 6 ? 671 : model.id === 7 ? 176 : model.id === 10 ? 72 : model.id === 11 ? 27 : 30, is_approved: true }, // Params
      { entity_type: "base_model", entity_id: model.id, question_id: 102, text_value: model.version, is_approved: true }, // Version
      { entity_type: "base_model", entity_id: model.id, question_id: 104, numeric_value: model.id === 1 ? 128000 : model.id === 2 ? 200000 : model.id === 3 ? 1000000 : model.id === 4 ? 128000 : model.id === 6 ? 200000 : 64000, is_approved: true }, // Context
      { entity_type: "base_model", entity_id: model.id, question_id: 105, text_value: model.id <= 3 ? "Jan 2024" : model.id <= 6 ? "Apr 2024" : "Dec 2023", is_approved: true }, // Data Cutoff
      { entity_type: "base_model", entity_id: model.id, question_id: 107, boolean_value: true, is_approved: true }, // API
      { entity_type: "base_model", entity_id: model.id, question_id: 111, list_value: JSON.stringify([1, 2, 3].includes(model.id) ? ["text", "image", "audio"] : ["text"]), is_approved: true }, // Multimodal
      { entity_type: "base_model", entity_id: model.id, question_id: 113, boolean_value: true, is_approved: true } // Safety
    );
  });

  return answers;
};

export const techProfileAnswers = [...generateToolAnswers(), ...generateBaseModelAnswers()];

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
