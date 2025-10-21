/**
 * Seed data for ResourcePaper table
 * General research papers on mental health AI (NOT benchmark papers)
 */

const resourcePapers = [
  {
    id: '880e8400-e29b-41d4-a716-446655440100',
    title: 'Can AI Help in Therapeutic Conversations? Evidence from Large Language Model Applications',
    authors: [
      { name: 'Maria Garcia', affiliation: 'Stanford University', order: 1 },
      { name: 'David Kim', affiliation: 'Stanford University', order: 2 },
      { name: 'Robert Johnson', affiliation: 'Harvard Medical School', order: 3 }
    ],
    publicationDate: new Date('2024-08-20'),
    publication: 'Nature Medicine',
    venue: 'Nature Medicine',
    arxivId: null,
    doi: '10.1038/s41591-024-example',
    url: 'https://doi.org/10.1038/s41591-024-example',
    pdfUrl: null,
    abstract: 'This study systematically evaluates the therapeutic potential of large language models in mental health conversations. We analyze conversational quality, empathetic responses, and safety considerations across multiple clinical scenarios, finding both promising applications and significant limitations that require human oversight.',
    imageUrl: null,
    imageStoragePath: null,
    citationCount: 312,
    paperType: 'empirical',
    isPreprint: false,
    isPeerReviewed: true,
    isPublished: true,
    isFeatured: true,
    citation: {
      bibtex: `@article{garcia2024therapeutic,
  title={Can AI Help in Therapeutic Conversations? Evidence from Large Language Model Applications},
  author={Garcia, Maria and Kim, David and Johnson, Robert},
  journal={Nature Medicine},
  year={2024},
  doi={10.1038/s41591-024-example}
}`,
      apa: 'Garcia, M., Kim, D., & Johnson, R. (2024). Can AI Help in Therapeutic Conversations? Evidence from Large Language Model Applications. Nature Medicine.',
      mla: 'Garcia, Maria, David Kim, and Robert Johnson. "Can AI Help in Therapeutic Conversations? Evidence from Large Language Model Applications." Nature Medicine (2024).'
    },
    metadata: {
      impactFactor: 82.9,
      openAccess: false
    }
  },

  {
    id: '880e8400-e29b-41d4-a716-446655440101',
    title: 'A Framework for Evaluating Empathy in AI-Driven Mental Health Interventions',
    authors: [
      { name: 'Jennifer Wu', affiliation: 'MIT', order: 1 },
      { name: 'Alexander Brown', affiliation: 'MIT', order: 2 }
    ],
    publicationDate: new Date('2024-10-05'),
    publication: 'Proceedings of EMNLP',
    venue: 'EMNLP 2024',
    arxivId: '2410.12345',
    doi: null,
    url: 'https://arxiv.org/abs/2410.12345',
    pdfUrl: 'https://arxiv.org/pdf/2410.12345.pdf',
    abstract: 'We propose a novel framework for evaluating empathetic responses in AI mental health systems. Our approach combines computational linguistics, affective computing, and clinical psychology to assess emotional validation, perspective-taking, and therapeutic rapport, demonstrating superiority over existing evaluation methods.',
    imageUrl: null,
    imageStoragePath: null,
    citationCount: 156,
    paperType: 'methodology',
    isPreprint: false,
    isPeerReviewed: true,
    isPublished: true,
    isFeatured: true,
    citation: {
      bibtex: `@inproceedings{wu2024empathy,
  title={A Framework for Evaluating Empathy in AI-Driven Mental Health Interventions},
  author={Wu, Jennifer and Brown, Alexander},
  booktitle={Proceedings of EMNLP 2024},
  year={2024}
}`,
      apa: 'Wu, J., & Brown, A. (2024). A Framework for Evaluating Empathy in AI-Driven Mental Health Interventions. Proceedings of EMNLP 2024.',
      mla: 'Wu, Jennifer, and Alexander Brown. "A Framework for Evaluating Empathy in AI-Driven Mental Health Interventions." Proceedings of EMNLP 2024. 2024.'
    },
    metadata: {
      acceptanceRate: '22.4%',
      bestPaperNominee: true
    }
  },

  {
    id: '880e8400-e29b-41d4-a716-446655440102',
    title: 'Risks and Benefits of Large Language Models in Mental Health: A Systematic Review',
    authors: [
      { name: 'Sarah Ahmed', affiliation: 'University of Toronto', order: 1 },
      { name: 'Michael Chen', affiliation: 'University of Toronto', order: 2 },
      { name: 'Lisa Thompson', affiliation: 'Centre for Addiction and Mental Health', order: 3 }
    ],
    publicationDate: new Date('2024-05-12'),
    publication: 'The Lancet Psychiatry',
    venue: 'The Lancet Psychiatry',
    arxivId: null,
    doi: '10.1016/S2215-0366(24)example',
    url: 'https://doi.org/10.1016/S2215-0366(24)example',
    pdfUrl: null,
    abstract: 'This systematic review examines 147 studies on LLM applications in mental health care. We identify key benefits including improved access and 24/7 availability, alongside critical risks such as hallucinations, privacy concerns, and lack of human connection. We provide evidence-based recommendations for responsible deployment.',
    imageUrl: null,
    imageStoragePath: null,
    citationCount: 523,
    paperType: 'survey',
    isPreprint: false,
    isPeerReviewed: true,
    isPublished: true,
    isFeatured: true,
    citation: {
      bibtex: `@article{ahmed2024risks,
  title={Risks and Benefits of Large Language Models in Mental Health: A Systematic Review},
  author={Ahmed, Sarah and Chen, Michael and Thompson, Lisa},
  journal={The Lancet Psychiatry},
  year={2024},
  doi={10.1016/S2215-0366(24)example}
}`,
      apa: 'Ahmed, S., Chen, M., & Thompson, L. (2024). Risks and Benefits of Large Language Models in Mental Health: A Systematic Review. The Lancet Psychiatry.',
      mla: 'Ahmed, Sarah, Michael Chen, and Lisa Thompson. "Risks and Benefits of Large Language Models in Mental Health: A Systematic Review." The Lancet Psychiatry (2024).'
    },
    metadata: {
      impactFactor: 48.7,
      studiesReviewed: 147,
      openAccess: true
    }
  }
];

module.exports = { resourcePapers };
