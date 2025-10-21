/**
 * Seed data for ResourceBenchmarkTagLink table
 * Links benchmarks to their relevant tags
 */

const resourceBenchmarkTagLinks = [
  // CounselBench tags
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440100', tagId: '660e8400-e29b-41d4-a716-446655440100' }, // Mental Health
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440100', tagId: '660e8400-e29b-41d4-a716-446655440103' }, // Counseling
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440100', tagId: '660e8400-e29b-41d4-a716-446655440300' }, // LLM Evaluation
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440100', tagId: '660e8400-e29b-41d4-a716-446655440302' }, // Expert Evaluation
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440100', tagId: '660e8400-e29b-41d4-a716-446655440400' }, // Question Answering
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440100', tagId: '660e8400-e29b-41d4-a716-446655440403' }, // Safety & Risk
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440100', tagId: '660e8400-e29b-41d4-a716-446655440404' }, // Empathy & Understanding

  // DAIC-WOZ tags
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440101', tagId: '660e8400-e29b-41d4-a716-446655440100' }, // Mental Health
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440101', tagId: '660e8400-e29b-41d4-a716-446655440101' }, // Clinical Psychology
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440101', tagId: '660e8400-e29b-41d4-a716-446655440200' }, // Depression
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440101', tagId: '660e8400-e29b-41d4-a716-446655440201' }, // Anxiety
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440101', tagId: '660e8400-e29b-41d4-a716-446655440202' }, // PTSD
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440101', tagId: '660e8400-e29b-41d4-a716-446655440301' }, // Clinical Assessment
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440101', tagId: '660e8400-e29b-41d4-a716-446655440303' }, // Multimodal
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440101', tagId: '660e8400-e29b-41d4-a716-446655440402' }, // Detection & Screening
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440101', tagId: '660e8400-e29b-41d4-a716-446655440500' }, // Clinical Trials

  // MentalChat16K tags
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440102', tagId: '660e8400-e29b-41d4-a716-446655440100' }, // Mental Health
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440102', tagId: '660e8400-e29b-41d4-a716-446655440103' }, // Counseling
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440102', tagId: '660e8400-e29b-41d4-a716-446655440200' }, // Depression
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440102', tagId: '660e8400-e29b-41d4-a716-446655440201' }, // Anxiety
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440102', tagId: '660e8400-e29b-41d4-a716-446655440300' }, // LLM Evaluation
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440102', tagId: '660e8400-e29b-41d4-a716-446655440401' }, // Conversational AI
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440102', tagId: '660e8400-e29b-41d4-a716-446655440400' }, // Question Answering
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440102', tagId: '660e8400-e29b-41d4-a716-446655440500' }, // Clinical Trials
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440102', tagId: '660e8400-e29b-41d4-a716-446655440501' }, // Synthetic Data

  // SMHD tags
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440103', tagId: '660e8400-e29b-41d4-a716-446655440100' }, // Mental Health
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440103', tagId: '660e8400-e29b-41d4-a716-446655440200' }, // Depression
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440103', tagId: '660e8400-e29b-41d4-a716-446655440201' }, // Anxiety
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440103', tagId: '660e8400-e29b-41d4-a716-446655440202' }, // PTSD
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440103', tagId: '660e8400-e29b-41d4-a716-446655440204' }, // OCD
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440103', tagId: '660e8400-e29b-41d4-a716-446655440205' }, // Bipolar Disorder
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440103', tagId: '660e8400-e29b-41d4-a716-446655440304' }, // Social Media Analysis
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440103', tagId: '660e8400-e29b-41d4-a716-446655440402' }, // Detection & Screening
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440103', tagId: '660e8400-e29b-41d4-a716-446655440502' }, // Reddit

  // PsychoBench (Counseling Competence) tags
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440104', tagId: '660e8400-e29b-41d4-a716-446655440100' }, // Mental Health
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440104', tagId: '660e8400-e29b-41d4-a716-446655440103' }, // Counseling
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440104', tagId: '660e8400-e29b-41d4-a716-446655440101' }, // Clinical Psychology
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440104', tagId: '660e8400-e29b-41d4-a716-446655440300' }, // LLM Evaluation
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440104', tagId: '660e8400-e29b-41d4-a716-446655440504' }, // Standardized Exams

  // PsychoBench (Psychological Portrayal) tags
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440105', tagId: '660e8400-e29b-41d4-a716-446655440100' }, // Mental Health
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440105', tagId: '660e8400-e29b-41d4-a716-446655440101' }, // Clinical Psychology
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440105', tagId: '660e8400-e29b-41d4-a716-446655440300' }, // LLM Evaluation
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440105', tagId: '660e8400-e29b-41d4-a716-446655440301' }, // Clinical Assessment

  // MHQA tags
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440106', tagId: '660e8400-e29b-41d4-a716-446655440100' }, // Mental Health
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440106', tagId: '660e8400-e29b-41d4-a716-446655440201' }, // Anxiety
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440106', tagId: '660e8400-e29b-41d4-a716-446655440200' }, // Depression
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440106', tagId: '660e8400-e29b-41d4-a716-446655440203' }, // Trauma
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440106', tagId: '660e8400-e29b-41d4-a716-446655440204' }, // OCD
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440106', tagId: '660e8400-e29b-41d4-a716-446655440300' }, // LLM Evaluation
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440106', tagId: '660e8400-e29b-41d4-a716-446655440400' }, // Question Answering
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440106', tagId: '660e8400-e29b-41d4-a716-446655440503' }, // PubMed

  // MedQA tags
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440107', tagId: '660e8400-e29b-41d4-a716-446655440104' }, // General Medicine
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440107', tagId: '660e8400-e29b-41d4-a716-446655440102' }, // Psychiatry
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440107', tagId: '660e8400-e29b-41d4-a716-446655440300' }, // LLM Evaluation
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440107', tagId: '660e8400-e29b-41d4-a716-446655440504' }, // Standardized Exams
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440107', tagId: '660e8400-e29b-41d4-a716-446655440400' }, // Question Answering

  // CounselChat tags
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440108', tagId: '660e8400-e29b-41d4-a716-446655440100' }, // Mental Health
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440108', tagId: '660e8400-e29b-41d4-a716-446655440103' }, // Counseling
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440108', tagId: '660e8400-e29b-41d4-a716-446655440400' }, // Question Answering
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440108', tagId: '660e8400-e29b-41d4-a716-446655440302' }, // Expert Evaluation

  // MMLU tags
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440109', tagId: '660e8400-e29b-41d4-a716-446655440104' }, // General Medicine
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440109', tagId: '660e8400-e29b-41d4-a716-446655440101' }, // Clinical Psychology
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440109', tagId: '660e8400-e29b-41d4-a716-446655440300' }, // LLM Evaluation
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440109', tagId: '660e8400-e29b-41d4-a716-446655440504' }, // Standardized Exams
  { benchmarkId: '550e8400-e29b-41d4-a716-446655440109', tagId: '660e8400-e29b-41d4-a716-446655440400' }  // Question Answering
];

module.exports = { resourceBenchmarkTagLinks };
