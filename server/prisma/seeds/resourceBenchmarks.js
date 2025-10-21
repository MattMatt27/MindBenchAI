/**
 * Seed data for ResourceBenchmark table
 * External mental health and medical benchmarks
 */

const resourceBenchmarks = [
  {
    id: '550e8400-e29b-41d4-a716-446655440100',
    name: 'CounselBench',
    description: 'Developed with 100 mental health professionals to evaluate and stress-test LLMs in realistic help-seeking scenarios. Focuses on single-turn counseling interactions and evaluates models across dimensions including factuality, comprehension, reasoning, possible harm, and bias. The adversarial component tests for systematic failure patterns in mental health QA.',
    benchmarkType: 'MIXED',
    format: 'CounselBench-EVAL: 2,000 expert evaluations of LLM responses and human therapist responses to real patient questions from CounselChat. CounselBench-ADV: 120 expert-authored adversarial questions designed to trigger specific model failure modes. Evaluation along 6 clinically grounded dimensions with written rationales and span-level annotations.',
    imageUrl: null, // TODO: Add when available
    imageStoragePath: null,
    links: {
      github: 'https://github.com/llm-eval-mental-health/CounselBench',
      paper: 'https://arxiv.org/abs/2506.08584'
    },
    firstReleased: new Date('2025-06-01'), // Based on arXiv date
    organization: 'LLM Eval Mental Health Research Group',
    language: 'en',
    questionCount: 2120, // 2000 EVAL + 120 ADV
    isActive: true,
    isFeatured: true,
    metadata: {
      evaluationDimensions: [
        'factuality',
        'comprehension',
        'reasoning',
        'possible harm',
        'bias',
        'empathy'
      ],
      professionalContributors: 100,
      components: ['CounselBench-EVAL', 'CounselBench-ADV']
    }
  },

  {
    id: '550e8400-e29b-41d4-a716-446655440101',
    name: 'DAIC-WOZ',
    description: 'One of the most widely used datasets for depression detection research. Consists of clinical interviews conducted by a human-controlled virtual agent (Ellie) designed to assess indicators of depression, anxiety, and PTSD. Each interview includes multi-modal data (audio, video, text) and clinical annotations. Extended version (E-DAIC) includes larger cohort with additional clinical annotations including PCL-C scores.',
    benchmarkType: 'CONVERSATION',
    format: 'Semi-structured clinical interviews with virtual agent. 189 participants in original version, 275 participants in E-DAIC extended version. Multi-modal data including audio, video, and text transcripts. PHQ-8 depression scores and anxiety/PTSD assessments included.',
    imageUrl: null,
    imageStoragePath: null,
    links: {
      website: 'https://dcapswoz.ict.usc.edu/'
    },
    firstReleased: new Date('2014-01-01'), // Approximate - DAIC-WOZ is from mid-2010s
    organization: 'USC Institute for Creative Technologies',
    language: 'en',
    questionCount: 275, // Number of participants/interviews in E-DAIC
    isActive: true,
    isFeatured: true,
    metadata: {
      modalities: ['audio', 'video', 'text'],
      clinicalAssessments: ['PHQ-8', 'PCL-C', 'Anxiety', 'PTSD'],
      versions: ['DAIC-WOZ (189 participants)', 'E-DAIC (275 participants)'],
      virtualAgent: 'Ellie',
      dataUseAgreementRequired: true
    }
  },

  {
    id: '550e8400-e29b-41d4-a716-446655440102',
    name: 'MentalChat16K',
    description: 'Benchmark dataset covering depression, anxiety, grief, and other conditions. Used for training and evaluating LLMs for mental health counseling. Includes 7 clinically grounded evaluation metrics. Conversations include both behavioral health coach-caregiver interactions and synthetic therapeutic dialogues.',
    benchmarkType: 'CONVERSATION',
    format: '16,113 question-answer pairs consisting of 9,775 synthetic conversations (GPT-3.5 generated) covering 33 mental health topics and 6,338 real anonymized interview transcripts from PISCES clinical trial.',
    imageUrl: null,
    imageStoragePath: null,
    links: {
      huggingface: 'https://huggingface.co/datasets/ShenLab/MentalChat16K',
      github: 'https://github.com/PennShenLab/MentalChat16K',
      paper: 'https://arxiv.org/abs/2503.13509'
    },
    firstReleased: new Date('2025-03-01'), // Based on arXiv date
    organization: 'Penn Shen Lab',
    language: 'en',
    questionCount: 16113,
    isActive: true,
    isFeatured: true,
    metadata: {
      topics: 33,
      syntheticConversations: 9775,
      realTranscripts: 6338,
      conditions: ['depression', 'anxiety', 'grief'],
      evaluationMetrics: 7,
      sourceClinicalTrial: 'PISCES'
    }
  },

  {
    id: '550e8400-e29b-41d4-a716-446655440103',
    name: 'SMHD (Self-reported Mental Health Diagnoses)',
    description: 'Large-scale dataset of Reddit posts from users who self-reported mental health diagnoses. Includes matched control users. Much larger text volume than Twitter datasets due to Reddit\'s long-form format. Used extensively for mental health condition classification and language analysis research.',
    benchmarkType: 'OPEN_ENDED',
    format: 'Long-form Reddit posts from diagnosed users and matched controls. Covers 9 mental health conditions: Depression, Anxiety, Bipolar Disorder, ADHD, PTSD, OCD, Autism, Schizophrenia, and Eating Disorders.',
    imageUrl: null,
    imageStoragePath: null,
    links: {
      website: 'https://ir.cs.georgetown.edu/resources/smhd.html'
    },
    firstReleased: new Date('2017-01-01'), // Approximate based on typical SMHD papers
    organization: 'Georgetown University IR Lab',
    language: 'en',
    questionCount: null, // Not applicable - posts rather than questions
    isActive: true,
    isFeatured: true,
    metadata: {
      platform: 'Reddit',
      conditions: [
        'Depression',
        'Anxiety',
        'Bipolar Disorder',
        'ADHD',
        'PTSD',
        'OCD',
        'Autism',
        'Schizophrenia',
        'Eating Disorders'
      ],
      includesControls: true,
      dataType: 'long-form social media posts'
    }
  },

  {
    id: '550e8400-e29b-41d4-a716-446655440104',
    name: 'PsychoBench (Counseling Competence)',
    description: 'Evaluates LLMs\' capability to perform psychological counseling tasks using exam-style questions that assess factual and applied psychological knowledge. First systematic benchmark for evaluating psychological counseling competence in LLMs. Based on U.S. NCE questions covering various counseling domains.',
    benchmarkType: 'MULTIPLE_CHOICE',
    format: 'Multiple-choice questions from U.S. National Counselor Examination (NCE) covering various counseling domains and competencies.',
    imageUrl: null,
    imageStoragePath: null,
    links: {
      paper: 'https://arxiv.org/abs/2510.01611'
    },
    firstReleased: new Date('2025-10-01'), // Based on arXiv date
    organization: null, // Not specified in source
    language: 'en',
    questionCount: null, // Not specified in excerpt
    isActive: true,
    isFeatured: true,
    metadata: {
      baseExam: 'U.S. National Counselor Examination (NCE)',
      focus: 'counseling competence',
      evaluationType: 'factual and applied psychological knowledge'
    }
  },

  {
    id: '550e8400-e29b-41d4-a716-446655440105',
    name: 'PsychoBench (Psychological Portrayal)',
    description: 'Evaluates psychological portrayal of LLMs across 4 categories: personality traits, interpersonal relationships, motivational tests, and emotional abilities. Uses standardized clinical psychology scales to assess whether LLMs can simulate human-like psychological characteristics. Not specifically designed for mental health counseling competency but rather for understanding AI\'s psychological representation.',
    benchmarkType: 'MULTIPLE_CHOICE',
    format: 'Multiple-choice questions from 13 standardized psychological scales across 4 psychological categories.',
    imageUrl: null,
    imageStoragePath: null,
    links: {
      github: 'https://github.com/CUHK-ARISE/PsychoBench',
      paper: 'https://arxiv.org/abs/2310.01386'
    },
    firstReleased: new Date('2023-10-01'), // Based on arXiv date
    organization: 'CUHK ARISE Lab',
    language: 'en',
    questionCount: null, // Not specified
    isActive: true,
    isFeatured: false,
    metadata: {
      psychologicalScales: 13,
      categories: [
        'personality traits',
        'interpersonal relationships',
        'motivational tests',
        'emotional abilities'
      ],
      focus: 'psychological representation in AI'
    }
  },

  {
    id: '550e8400-e29b-41d4-a716-446655440106',
    name: 'MHQA (Mental Health Question Answering)',
    description: 'Diverse, knowledge-intensive mental health QA challenge generated from PubMed abstracts. Includes both MHQA-Gold (human validated) and MHQA-B (pseudo-labeled) versions. More targeted and comprehensive than general medical QA datasets for mental health-specific assessment.',
    benchmarkType: 'MULTIPLE_CHOICE',
    format: 'Multiple-choice questions across 4 question types, covering topics including Anxiety, Depression, Trauma, and OCD. Generated from PubMed research abstracts.',
    imageUrl: null,
    imageStoragePath: null,
    links: {
      paper: 'https://arxiv.org/abs/2502.15418'
    },
    firstReleased: new Date('2025-02-01'), // Based on arXiv date
    organization: null,
    language: 'en',
    questionCount: null,
    isActive: true,
    isFeatured: true,
    metadata: {
      source: 'PubMed abstracts',
      topics: ['Anxiety', 'Depression', 'Trauma', 'OCD'],
      versions: ['MHQA-Gold (human validated)', 'MHQA-B (pseudo-labeled)'],
      questionTypes: 4,
      focus: 'knowledge-intensive mental health QA'
    }
  },

  {
    id: '550e8400-e29b-41d4-a716-446655440107',
    name: 'MedQA',
    description: 'General medical benchmark covering all medical specialties including psychiatry. Questions from USMLE exams covering broad range of medical topics. Estimated ~5-10% of questions relate to mental health/psychiatry topics (psychiatry is one clinical rotation in medical training). Primarily tests medical knowledge and clinical reasoning across medicine.',
    benchmarkType: 'MULTIPLE_CHOICE',
    format: 'Multiple-choice questions with 4-5 options. 12,723 questions in English from U.S. Medical Licensing Examination.',
    imageUrl: null,
    imageStoragePath: null,
    links: {
      github: 'https://github.com/jind11/MedQA',
      website: 'https://paperswithcode.com/dataset/medqa-usmle'
    },
    firstReleased: new Date('2020-01-01'), // Approximate
    organization: null,
    language: 'en',
    questionCount: 12723,
    isActive: true,
    isFeatured: false,
    metadata: {
      baseExam: 'USMLE',
      medicalSpecialties: 'all',
      mentalHealthPercentage: '5-10%',
      focus: 'general medical knowledge and clinical reasoning',
      multilingualVersions: ['Chinese', 'Traditional Chinese']
    }
  },

  {
    id: '550e8400-e29b-41d4-a716-446655440108',
    name: 'CounselChat',
    description: 'Questions from clients paired with responses from licensed therapists on online counseling platform. Covers wide range of mental health topics. Used as source for CounselBench evaluation and training data for counseling-focused LLMs.',
    benchmarkType: 'OPEN_ENDED',
    format: 'Approximately 3,600 question-answer pairs from licensed therapists responding to client questions on online counseling platform.',
    imageUrl: null,
    imageStoragePath: null,
    links: {
      website: 'https://counselchat.com'
    },
    firstReleased: null, // Platform date unknown
    organization: 'CounselChat',
    language: 'en',
    questionCount: 3600,
    isActive: true,
    isFeatured: false,
    metadata: {
      responseProvider: 'licensed therapists',
      platform: 'online counseling Q&A',
      usedIn: ['CounselBench', 'various counseling LLM training'],
      accessNotes: 'Publicly scraped data, referenced in research'
    }
  },

  {
    id: '550e8400-e29b-41d4-a716-446655440109',
    name: 'MMLU (Clinical & Psychology Subsets)',
    description: 'General benchmark with mental health content across medical and psychology subsets. Professional Psychology subset directly addresses psychological knowledge. Estimated ~10-15% of medical subset questions relate to mental health/psychiatry, primarily in Professional Psychology and Clinical Knowledge categories.',
    benchmarkType: 'MULTIPLE_CHOICE',
    format: '4-option multiple-choice questions across 57 subjects. Medical subsets include: Clinical Knowledge, Professional Medicine, Professional Psychology, College Medicine, Anatomy, Medical Genetics, Nutrition, Virology. Approximately 1,785 questions across medical subsets.',
    imageUrl: null,
    imageStoragePath: null,
    links: {
      website: 'https://paperswithcode.com/dataset/mmlu',
      github: 'https://github.com/hendrycks/test'
    },
    firstReleased: new Date('2020-01-01'), // MMLU original paper
    organization: 'UC Berkeley / University of Chicago',
    language: 'en',
    questionCount: 1785, // Medical subsets only
    isActive: true,
    isFeatured: false,
    metadata: {
      totalSubjects: 57,
      medicalSubsets: [
        'Clinical Knowledge',
        'Professional Medicine',
        'Professional Psychology',
        'College Medicine',
        'Anatomy',
        'Medical Genetics',
        'Nutrition',
        'Virology'
      ],
      mentalHealthPercentage: '10-15% of medical subsets',
      fullBenchmarkQuestions: 15908
    }
  }
];

module.exports = { resourceBenchmarks };
