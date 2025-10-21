/**
 * Seed data for ResourceTag table
 * Tags for categorizing benchmarks, articles, and papers
 */

const resourceTags = [
  // Domain Tags
  {
    id: '660e8400-e29b-41d4-a716-446655440100',
    name: 'Mental Health',
    slug: 'mental-health',
    description: 'General mental health and psychological well-being',
    category: 'domain',
    color: '#8B5CF6', // Purple
    icon: 'brain',
    sortOrder: 1,
    isActive: true
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440101',
    name: 'Clinical Psychology',
    slug: 'clinical-psychology',
    description: 'Clinical psychology practice and assessment',
    category: 'domain',
    color: '#7C3AED',
    icon: 'clipboard-check',
    sortOrder: 2,
    isActive: true
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440102',
    name: 'Psychiatry',
    slug: 'psychiatry',
    description: 'Medical psychiatry and psychopharmacology',
    category: 'domain',
    color: '#6D28D9',
    icon: 'medical',
    sortOrder: 3,
    isActive: true
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440103',
    name: 'Counseling',
    slug: 'counseling',
    description: 'Therapeutic counseling and psychotherapy',
    category: 'domain',
    color: '#5B21B6',
    icon: 'comments',
    sortOrder: 4,
    isActive: true
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440104',
    name: 'General Medicine',
    slug: 'general-medicine',
    description: 'Broad medical knowledge and practice',
    category: 'domain',
    color: '#DC2626',
    icon: 'hospital',
    sortOrder: 5,
    isActive: true
  },

  // Condition Tags
  {
    id: '660e8400-e29b-41d4-a716-446655440200',
    name: 'Depression',
    slug: 'depression',
    description: 'Major depressive disorder and related conditions',
    category: 'condition',
    color: '#3B82F6',
    icon: 'cloud-rain',
    sortOrder: 10,
    isActive: true
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440201',
    name: 'Anxiety',
    slug: 'anxiety',
    description: 'Anxiety disorders and related conditions',
    category: 'condition',
    color: '#F59E0B',
    icon: 'exclamation-circle',
    sortOrder: 11,
    isActive: true
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440202',
    name: 'PTSD',
    slug: 'ptsd',
    description: 'Post-traumatic stress disorder',
    category: 'condition',
    color: '#EF4444',
    icon: 'shield-alert',
    sortOrder: 12,
    isActive: true
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440203',
    name: 'Trauma',
    slug: 'trauma',
    description: 'Trauma and traumatic experiences',
    category: 'condition',
    color: '#DC2626',
    icon: 'heart-broken',
    sortOrder: 13,
    isActive: true
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440204',
    name: 'OCD',
    slug: 'ocd',
    description: 'Obsessive-compulsive disorder',
    category: 'condition',
    color: '#7C3AED',
    icon: 'repeat',
    sortOrder: 14,
    isActive: true
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440205',
    name: 'Bipolar Disorder',
    slug: 'bipolar-disorder',
    description: 'Bipolar disorder and mood disorders',
    category: 'condition',
    color: '#EC4899',
    icon: 'chart-line',
    sortOrder: 15,
    isActive: true
  },

  // Method Tags
  {
    id: '660e8400-e29b-41d4-a716-446655440300',
    name: 'LLM Evaluation',
    slug: 'llm-evaluation',
    description: 'Evaluation and benchmarking of large language models',
    category: 'method',
    color: '#10B981',
    icon: 'chart-bar',
    sortOrder: 20,
    isActive: true
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440301',
    name: 'Clinical Assessment',
    slug: 'clinical-assessment',
    description: 'Clinical diagnostic and assessment tools',
    category: 'method',
    color: '#059669',
    icon: 'stethoscope',
    sortOrder: 21,
    isActive: true
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440302',
    name: 'Expert Evaluation',
    slug: 'expert-evaluation',
    description: 'Human expert review and validation',
    category: 'method',
    color: '#047857',
    icon: 'user-check',
    sortOrder: 22,
    isActive: true
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440303',
    name: 'Multimodal',
    slug: 'multimodal',
    description: 'Audio, video, and text modalities',
    category: 'method',
    color: '#0891B2',
    icon: 'video',
    sortOrder: 23,
    isActive: true
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440304',
    name: 'Social Media Analysis',
    slug: 'social-media-analysis',
    description: 'Analysis of social media data',
    category: 'method',
    color: '#0EA5E9',
    icon: 'hashtag',
    sortOrder: 24,
    isActive: true
  },

  // Application Tags
  {
    id: '660e8400-e29b-41d4-a716-446655440400',
    name: 'Question Answering',
    slug: 'question-answering',
    description: 'Mental health question answering tasks',
    category: 'application',
    color: '#6366F1',
    icon: 'question-circle',
    sortOrder: 30,
    isActive: true
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440401',
    name: 'Conversational AI',
    slug: 'conversational-ai',
    description: 'Multi-turn dialogue and conversation',
    category: 'application',
    color: '#8B5CF6',
    icon: 'message-circle',
    sortOrder: 31,
    isActive: true
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440402',
    name: 'Detection & Screening',
    slug: 'detection-screening',
    description: 'Mental health condition detection and screening',
    category: 'application',
    color: '#F59E0B',
    icon: 'search',
    sortOrder: 32,
    isActive: true
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440403',
    name: 'Safety & Risk',
    slug: 'safety-risk',
    description: 'Safety evaluation and risk assessment',
    category: 'application',
    color: '#EF4444',
    icon: 'shield-exclamation',
    sortOrder: 33,
    isActive: true
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440404',
    name: 'Empathy & Understanding',
    slug: 'empathy-understanding',
    description: 'Emotional recognition and empathetic response',
    category: 'application',
    color: '#EC4899',
    icon: 'heart',
    sortOrder: 34,
    isActive: true
  },

  // Data Source Tags
  {
    id: '660e8400-e29b-41d4-a716-446655440500',
    name: 'Clinical Trials',
    slug: 'clinical-trials',
    description: 'Data from clinical trials and studies',
    category: 'source',
    color: '#14B8A6',
    icon: 'flask',
    sortOrder: 40,
    isActive: true
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440501',
    name: 'Synthetic Data',
    slug: 'synthetic-data',
    description: 'LLM-generated or synthetic datasets',
    category: 'source',
    color: '#06B6D4',
    icon: 'cog',
    sortOrder: 41,
    isActive: true
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440502',
    name: 'Reddit',
    slug: 'reddit',
    description: 'Data sourced from Reddit',
    category: 'source',
    color: '#FF4500',
    icon: 'reddit',
    sortOrder: 42,
    isActive: true
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440503',
    name: 'PubMed',
    slug: 'pubmed',
    description: 'Based on PubMed research abstracts',
    category: 'source',
    color: '#2563EB',
    icon: 'book-medical',
    sortOrder: 43,
    isActive: true
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440504',
    name: 'Standardized Exams',
    slug: 'standardized-exams',
    description: 'Professional certification and licensing exams',
    category: 'source',
    color: '#7C3AED',
    icon: 'graduation-cap',
    sortOrder: 44,
    isActive: true
  }
];

module.exports = { resourceTags };
