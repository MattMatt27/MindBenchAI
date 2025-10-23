import { useState, ChangeEvent } from "react";
import "../styles/Resources.css";

interface BenchmarkStudy {
  id: string;
  name: string;
  fullName: string;
  year: string;
  authors: string;
  organization: string;
  summary: string;
  link: string;
  category: string;
}

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const benchmarkStudies: BenchmarkStudy[] = [
    {
      id: '1',
      name: 'CounselBench',
      fullName: 'Mental Health Counseling Evaluation Benchmark',
      year: '2025',
      authors: 'LLM Eval Mental Health Research Group',
      organization: 'LLM Eval Mental Health Research Group',
      summary: 'Developed with 100 mental health professionals to evaluate and stress-test LLMs in realistic help-seeking scenarios. Focuses on single-turn counseling interactions and evaluates models across dimensions including factuality, comprehension, reasoning, possible harm, and bias.',
      link: 'https://arxiv.org/abs/2506.08584',
      category: 'Mental Health',
    },
    {
      id: '2',
      name: 'DAIC-WOZ',
      fullName: 'Distress Analysis Interview Corpus - Wizard of Oz',
      year: '2014',
      authors: 'USC Institute for Creative Technologies',
      organization: 'USC Institute for Creative Technologies',
      summary: 'One of the most widely used datasets for depression detection research. Consists of clinical interviews conducted by a human-controlled virtual agent designed to assess indicators of depression, anxiety, and PTSD. Multi-modal data including audio, video, and text.',
      link: 'https://dcapswoz.ict.usc.edu/',
      category: 'Mental Health',
    },
    {
      id: '3',
      name: 'MentalChat16K',
      fullName: 'Mental Health Counseling Conversation Dataset',
      year: '2025',
      authors: 'Penn Shen Lab',
      organization: 'Penn Shen Lab',
      summary: 'Benchmark dataset covering depression, anxiety, grief, and other conditions. 16,113 question-answer pairs consisting of synthetic conversations and real anonymized interview transcripts from PISCES clinical trial.',
      link: 'https://arxiv.org/abs/2503.13509',
      category: 'Mental Health',
    },
    {
      id: '4',
      name: 'SMHD',
      fullName: 'Self-reported Mental Health Diagnoses',
      year: '2017',
      authors: 'Georgetown University IR Lab',
      organization: 'Georgetown University IR Lab',
      summary: 'Large-scale dataset of Reddit posts from users who self-reported mental health diagnoses. Covers 9 mental health conditions including Depression, Anxiety, Bipolar Disorder, ADHD, PTSD, OCD, Autism, Schizophrenia, and Eating Disorders.',
      link: 'https://ir.cs.georgetown.edu/resources/smhd.html',
      category: 'Mental Health',
    },
    {
      id: '5',
      name: 'PsychoBench',
      fullName: 'Counseling Competence Evaluation',
      year: '2025',
      authors: 'Various researchers',
      organization: 'Research Community',
      summary: 'Evaluates LLMs\' capability to perform psychological counseling tasks using exam-style questions that assess factual and applied psychological knowledge. Based on U.S. NCE questions covering various counseling domains.',
      link: 'https://arxiv.org/abs/2510.01611',
      category: 'Psychology',
    },
    {
      id: '6',
      name: 'MHQA',
      fullName: 'Mental Health Question Answering',
      year: '2025',
      authors: 'Research team',
      organization: 'Research Community',
      summary: 'Diverse, knowledge-intensive mental health QA challenge generated from PubMed abstracts. Covers topics including Anxiety, Depression, Trauma, and OCD. More targeted and comprehensive than general medical QA datasets.',
      link: 'https://arxiv.org/abs/2502.15418',
      category: 'Mental Health',
    },
    {
      id: '7',
      name: 'MedQA',
      fullName: 'Medical Question Answering Dataset',
      year: '2020',
      authors: 'Medical research community',
      organization: 'Research Community',
      summary: 'General medical benchmark covering all medical specialties including psychiatry. 12,723 questions from USMLE exams. Approximately 5-10% relate to mental health/psychiatry topics.',
      link: 'https://github.com/jind11/MedQA',
      category: 'Medical',
    },
    {
      id: '8',
      name: 'CounselChat',
      fullName: 'Online Counseling Q&A Dataset',
      year: 'N/A',
      authors: 'CounselChat',
      organization: 'CounselChat',
      summary: 'Questions from clients paired with responses from licensed therapists on online counseling platform. Approximately 3,600 question-answer pairs covering wide range of mental health topics.',
      link: 'https://counselchat.com',
      category: 'Mental Health',
    },
    {
      id: '9',
      name: 'MMLU',
      fullName: 'Massive Multitask Language Understanding (Clinical & Psychology)',
      year: '2020',
      authors: 'UC Berkeley / University of Chicago',
      organization: 'UC Berkeley / University of Chicago',
      summary: 'General benchmark with mental health content across medical and psychology subsets. Professional Psychology subset directly addresses psychological knowledge. Approximately 10-15% of medical questions relate to mental health.',
      link: 'https://paperswithcode.com/dataset/mmlu',
      category: 'Psychology',
    },
  ];

  const filteredStudies = benchmarkStudies.filter((study) => {
    const matchesSearch =
      searchQuery === "" ||
      study.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === "all" || study.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case "Mental Health":
        return "category-mental-health";
      case "Psychology":
        return "category-psychology";
      case "Medical":
        return "category-medical";
      default:
        return "";
    }
  };

  return (
    <div className="resources-page">
      {/* Header */}
      <div className="resources-header-section">
        <div className="resources-container">
          <div className="resources-header-content">
            <h1 className="resources-main-title">Benchmark Studies & Resources</h1>
            <p className="resources-main-subtitle">
              Explore the original research papers and documentation for various mental health and medical benchmarks.
              Each study provides detailed methodology, datasets, and evaluation criteria used to assess language model
              performance in mental health contexts.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="resources-container resources-content">
        {/* Filters */}
        <div className="resources-filters">
          <div className="resources-search-wrapper">
            <input
              type="text"
              placeholder="Search studies..."
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="resources-search-input"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategoryFilter(e.target.value)}
            className="resources-category-select"
          >
            <option value="all">All Categories</option>
            <option value="Mental Health">Mental Health</option>
            <option value="Psychology">Psychology</option>
            <option value="Medical">Medical</option>
          </select>
        </div>

        {/* Results Count */}
        <div className="resources-results-count">
          Showing {filteredStudies.length} {filteredStudies.length === 1 ? "study" : "studies"}
        </div>

        {/* Studies Grid */}
        <div className="resources-studies-grid">
          {filteredStudies.map((study) => (
            <div key={study.id} className="resources-study-card">
              <div className="resources-study-header">
                <div className="resources-study-header-content">
                  <div className="resources-study-title-row">
                    <h3 className="resources-study-name">{study.name}</h3>
                    <span className={`resources-category-badge ${getCategoryColor(study.category)}`}>
                      {study.category}
                    </span>
                  </div>
                  <p className="resources-study-fullname">{study.fullName}</p>
                  <div className="resources-study-meta">
                    <span>• {study.authors}</span>
                    <span>• {study.organization}</span>
                    <span>• {study.year}</span>
                  </div>
                </div>
                <a
                  href={study.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resources-view-paper-button"
                >
                  View Paper →
                </a>
              </div>
              <div className="resources-study-content">
                <p className="resources-study-summary">{study.summary}</p>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredStudies.length === 0 && (
          <div className="resources-no-results">
            <p>No studies found matching your criteria.</p>
          </div>
        )}

        {/* Footer CTA */}
        <div className="resources-footer-cta">
          <h3 className="resources-cta-title">Ready to Compare Models?</h3>
          <p className="resources-cta-description">
            View our comprehensive benchmark comparison across leading language models for mental health applications
          </p>
        </div>
      </div>
    </div>
  );
}
