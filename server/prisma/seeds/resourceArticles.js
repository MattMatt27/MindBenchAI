/**
 * Seed data for ResourceArticle table
 * News articles and blog posts about mental health AI
 */

const resourceArticles = [
  {
    id: '770e8400-e29b-41d4-a716-446655440100',
    title: 'AI Chatbots for Mental Health: Promise and Peril',
    author: 'Dr. Sarah Chen',
    publicationDate: new Date('2024-11-15'),
    publisher: 'Nature',
    url: 'https://www.nature.com/articles/example-ai-mental-health',
    summary: 'An in-depth look at the growing use of AI-powered chatbots in mental health care, examining both the potential benefits for accessibility and the ethical concerns around safety, privacy, and the quality of therapeutic relationships. Reviews recent benchmarks and evaluation frameworks.',
    imageUrl: null,
    imageStoragePath: null,
    articleType: 'research_summary',
    language: 'en',
    readTimeMinutes: 12,
    isPublished: true,
    isFeatured: true,
    publishedAt: new Date('2024-11-15'),
    metadata: {
      keywords: ['AI chatbots', 'mental health', 'ethics', 'accessibility'],
      doi: '10.1038/example'
    }
  },

  {
    id: '770e8400-e29b-41d4-a716-446655440101',
    title: 'Stanford Researchers Develop New Benchmark for Evaluating AI Therapists',
    author: 'Michael Rodriguez',
    publicationDate: new Date('2025-03-20'),
    publisher: 'MIT Technology Review',
    url: 'https://www.technologyreview.com/example-ai-therapist-benchmark',
    summary: 'Stanford researchers have released a new benchmark dataset featuring real patient questions and expert therapist evaluations. The benchmark aims to address gaps in current LLM evaluation for mental health applications, with particular focus on safety and empathy metrics.',
    imageUrl: null,
    imageStoragePath: null,
    articleType: 'news',
    language: 'en',
    readTimeMinutes: 7,
    isPublished: true,
    isFeatured: true,
    publishedAt: new Date('2025-03-20'),
    metadata: {
      keywords: ['benchmark', 'Stanford', 'evaluation', 'LLM'],
      institution: 'Stanford University'
    }
  },

  {
    id: '770e8400-e29b-41d4-a716-446655440102',
    title: 'Why Mental Health Benchmarks Need More Than Accuracy',
    author: 'Dr. James Park',
    publicationDate: new Date('2024-09-10'),
    publisher: 'The Gradient',
    url: 'https://thegradient.pub/example-mental-health-metrics',
    summary: 'A critical analysis of current mental health AI benchmarks and their limitations. Argues that accuracy-focused metrics miss crucial dimensions like empathy, cultural sensitivity, and harm prevention. Proposes a multi-dimensional evaluation framework drawing from clinical psychology.',
    imageUrl: null,
    imageStoragePath: null,
    articleType: 'opinion',
    language: 'en',
    readTimeMinutes: 10,
    isPublished: true,
    isFeatured: false,
    publishedAt: new Date('2024-09-10'),
    metadata: {
      keywords: ['evaluation metrics', 'empathy', 'clinical psychology', 'bias']
    }
  },

  {
    id: '770e8400-e29b-41d4-a716-446655440103',
    title: 'The Role of Large Language Models in Digital Mental Health: An Interview with Leading Researchers',
    author: 'Emma Thompson',
    publicationDate: new Date('2024-12-05'),
    publisher: 'Psychology Today',
    url: 'https://www.psychologytoday.com/example-llm-interview',
    summary: 'Interviews with researchers from Penn, Georgetown, and CUHK on the current state and future of LLMs in mental health. Discusses recent benchmarks including CounselBench and MentalChat16K, clinical validation challenges, and the importance of human oversight.',
    imageUrl: null,
    imageStoragePath: null,
    articleType: 'interview',
    language: 'en',
    readTimeMinutes: 15,
    isPublished: true,
    isFeatured: true,
    publishedAt: new Date('2024-12-05'),
    metadata: {
      keywords: ['LLM', 'interviews', 'experts', 'digital health'],
      interviewees: ['Penn Shen Lab', 'Georgetown IR Lab', 'CUHK ARISE']
    }
  }
];

module.exports = { resourceArticles };
