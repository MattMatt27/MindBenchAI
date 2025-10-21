/**
 * Seed data for ResourceArticleTagLink table
 * Links articles to their relevant tags
 */

const resourceArticleTagLinks = [
  // "AI Chatbots for Mental Health: Promise and Peril"
  { articleId: '770e8400-e29b-41d4-a716-446655440100', tagId: '660e8400-e29b-41d4-a716-446655440100' }, // Mental Health
  { articleId: '770e8400-e29b-41d4-a716-446655440100', tagId: '660e8400-e29b-41d4-a716-446655440401' }, // Conversational AI
  { articleId: '770e8400-e29b-41d4-a716-446655440100', tagId: '660e8400-e29b-41d4-a716-446655440403' }, // Safety & Risk
  { articleId: '770e8400-e29b-41d4-a716-446655440100', tagId: '660e8400-e29b-41d4-a716-446655440404' }, // Empathy & Understanding

  // "Stanford Researchers Develop New Benchmark for Evaluating AI Therapists"
  { articleId: '770e8400-e29b-41d4-a716-446655440101', tagId: '660e8400-e29b-41d4-a716-446655440100' }, // Mental Health
  { articleId: '770e8400-e29b-41d4-a716-446655440101', tagId: '660e8400-e29b-41d4-a716-446655440300' }, // LLM Evaluation
  { articleId: '770e8400-e29b-41d4-a716-446655440101', tagId: '660e8400-e29b-41d4-a716-446655440103' }, // Counseling
  { articleId: '770e8400-e29b-41d4-a716-446655440101', tagId: '660e8400-e29b-41d4-a716-446655440403' }, // Safety & Risk
  { articleId: '770e8400-e29b-41d4-a716-446655440101', tagId: '660e8400-e29b-41d4-a716-446655440404' }, // Empathy & Understanding

  // "Why Mental Health Benchmarks Need More Than Accuracy"
  { articleId: '770e8400-e29b-41d4-a716-446655440102', tagId: '660e8400-e29b-41d4-a716-446655440100' }, // Mental Health
  { articleId: '770e8400-e29b-41d4-a716-446655440102', tagId: '660e8400-e29b-41d4-a716-446655440300' }, // LLM Evaluation
  { articleId: '770e8400-e29b-41d4-a716-446655440102', tagId: '660e8400-e29b-41d4-a716-446655440101' }, // Clinical Psychology
  { articleId: '770e8400-e29b-41d4-a716-446655440102', tagId: '660e8400-e29b-41d4-a716-446655440404' }, // Empathy & Understanding

  // "The Role of Large Language Models in Digital Mental Health: An Interview"
  { articleId: '770e8400-e29b-41d4-a716-446655440103', tagId: '660e8400-e29b-41d4-a716-446655440100' }, // Mental Health
  { articleId: '770e8400-e29b-41d4-a716-446655440103', tagId: '660e8400-e29b-41d4-a716-446655440300' }, // LLM Evaluation
  { articleId: '770e8400-e29b-41d4-a716-446655440103', tagId: '660e8400-e29b-41d4-a716-446655440103' }, // Counseling
  { articleId: '770e8400-e29b-41d4-a716-446655440103', tagId: '660e8400-e29b-41d4-a716-446655440401' }  // Conversational AI
];

module.exports = { resourceArticleTagLinks };
