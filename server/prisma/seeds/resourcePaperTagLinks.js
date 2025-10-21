/**
 * Seed data for ResourcePaperTagLink table
 * Links papers to their relevant tags
 */

const resourcePaperTagLinks = [
  // "Can AI Help in Therapeutic Conversations?"
  { paperId: '880e8400-e29b-41d4-a716-446655440100', tagId: '660e8400-e29b-41d4-a716-446655440100' }, // Mental Health
  { paperId: '880e8400-e29b-41d4-a716-446655440100', tagId: '660e8400-e29b-41d4-a716-446655440103' }, // Counseling
  { paperId: '880e8400-e29b-41d4-a716-446655440100', tagId: '660e8400-e29b-41d4-a716-446655440401' }, // Conversational AI
  { paperId: '880e8400-e29b-41d4-a716-446655440100', tagId: '660e8400-e29b-41d4-a716-446655440404' }, // Empathy & Understanding
  { paperId: '880e8400-e29b-41d4-a716-446655440100', tagId: '660e8400-e29b-41d4-a716-446655440403' }, // Safety & Risk

  // "A Framework for Evaluating Empathy"
  { paperId: '880e8400-e29b-41d4-a716-446655440101', tagId: '660e8400-e29b-41d4-a716-446655440100' }, // Mental Health
  { paperId: '880e8400-e29b-41d4-a716-446655440101', tagId: '660e8400-e29b-41d4-a716-446655440300' }, // LLM Evaluation
  { paperId: '880e8400-e29b-41d4-a716-446655440101', tagId: '660e8400-e29b-41d4-a716-446655440404' }, // Empathy & Understanding
  { paperId: '880e8400-e29b-41d4-a716-446655440101', tagId: '660e8400-e29b-41d4-a716-446655440101' }, // Clinical Psychology

  // "Risks and Benefits: A Systematic Review"
  { paperId: '880e8400-e29b-41d4-a716-446655440102', tagId: '660e8400-e29b-41d4-a716-446655440100' }, // Mental Health
  { paperId: '880e8400-e29b-41d4-a716-446655440102', tagId: '660e8400-e29b-41d4-a716-446655440300' }, // LLM Evaluation
  { paperId: '880e8400-e29b-41d4-a716-446655440102', tagId: '660e8400-e29b-41d4-a716-446655440403' }, // Safety & Risk
  { paperId: '880e8400-e29b-41d4-a716-446655440102', tagId: '660e8400-e29b-41d4-a716-446655440101' }  // Clinical Psychology
];

module.exports = { resourcePaperTagLinks };
