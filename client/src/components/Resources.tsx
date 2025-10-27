import { useState, useEffect, ChangeEvent, useMemo } from "react";
import { Github, FileText, Globe } from "lucide-react";
import "../styles/Resources.css";
import { API_ENDPOINTS } from "../config/api";

// Backend API response types
interface ResourceTag {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  color: string | null;
  icon: string | null;
}

interface ResourceBenchmarkAPI {
  id: string;
  name: string;
  description: string | null;
  benchmark_type: string;
  format: string | null;
  image_url: string | null;
  image_storage_path: string | null;
  links: {
    github?: string;
    paper?: string;
    website?: string;
    huggingface?: string;
    paperswithcode?: string;
    pubmed?: string;
  } | null;
  first_released: string | null;
  organization: string | null;
  language: string | null;
  question_count: number | null;
  is_active: boolean;
  is_featured: boolean;
  metadata: any;
  tags: ResourceTag[];
  created_at: string;
  updated_at: string | null;
}

// Frontend display type
interface BenchmarkStudy {
  id: string;
  name: string;
  fullName: string;
  year: string;
  organization: string;
  summary: string;
  category: string;
  links?: {
    paper?: string;
    github?: string;
    pubmed?: string;
    website?: string;
    huggingface?: string;
    paperswithcode?: string;
  };
}

// Helper function to map backend data to frontend display format
const mapBenchmarkToStudy = (benchmark: ResourceBenchmarkAPI): BenchmarkStudy => {
  // Extract year from first_released
  const year = benchmark.first_released
    ? new Date(benchmark.first_released).getFullYear().toString()
    : 'N/A';

  // Get primary category from tags (prefer "Mental Health", "Psychology", "Medical")
  const primaryCategory = benchmark.tags.find(
    tag => ['Mental Health', 'Psychology', 'Medical', 'Clinical Psychology', 'Psychiatry'].includes(tag.name)
  )?.name || 'Other';

  // Map category names
  let displayCategory = primaryCategory;
  if (primaryCategory === 'Clinical Psychology' || primaryCategory === 'Psychiatry') {
    displayCategory = 'Psychology';
  }

  return {
    id: benchmark.id,
    name: benchmark.name,
    fullName: benchmark.format || benchmark.name, // Use format as fullName fallback
    year,
    organization: benchmark.organization || 'Research Community',
    summary: benchmark.description || '',
    category: displayCategory,
    links: benchmark.links || undefined,
  };
};

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [benchmarkStudies, setBenchmarkStudies] = useState<BenchmarkStudy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch benchmarks from API
  useEffect(() => {
    const fetchBenchmarks = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_ENDPOINTS.benchmarks);

        if (!response.ok) {
          throw new Error(`Failed to fetch benchmarks: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          const mappedStudies = data.data.map(mapBenchmarkToStudy);
          setBenchmarkStudies(mappedStudies);
        } else {
          throw new Error('Invalid response format from API');
        }
      } catch (err) {
        console.error('Error fetching benchmarks:', err);
        setError(err instanceof Error ? err.message : 'Failed to load benchmarks');
      } finally {
        setLoading(false);
      }
    };

    fetchBenchmarks();
  }, []);

  // Extract unique categories dynamically from fetched data
  const availableCategories = useMemo(() => {
    const categories = new Set(benchmarkStudies.map(study => study.category));
    return Array.from(categories).sort();
  }, [benchmarkStudies]);

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
              aria-label="Search benchmark studies"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategoryFilter(e.target.value)}
            className="resources-category-select"
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            {availableCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="resources-loading">
            <p>Loading benchmarks...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="resources-error">
            <p>Error: {error}</p>
            <button onClick={() => window.location.reload()} className="resources-retry-button">
              Retry
            </button>
          </div>
        )}

        {/* Results Count */}
        {!loading && !error && (
          <div className="resources-results-count">
            Showing {filteredStudies.length} {filteredStudies.length === 1 ? "study" : "studies"}
          </div>
        )}

        {/* Studies Grid */}
        {!loading && !error && (
          <div className="resources-studies-grid">
          {filteredStudies.map((study) => (
            <div key={study.id} className="resources-study-card">
              <div className="resources-study-header">
                <div className="resources-study-title-row">
                  <h3 className="resources-study-name">{study.name}</h3>
                  <span className={`resources-category-badge ${getCategoryColor(study.category)}`}>
                    {study.category}
                  </span>
                </div>
                <p className="resources-study-fullname">{study.fullName}</p>
                <div className="resources-study-meta">
                  <span>{study.organization}</span>
                  <span>• {study.year}</span>
                </div>
              </div>

              <div className="resources-study-content">
                <p className="resources-study-summary">{study.summary}</p>
              </div>

              {/* All Links Section */}
              {study.links && Object.values(study.links).some(link => link) && (
                <div className="resources-additional-links">
                  <div className="resources-links-container">
                    {study.links.paper && (
                      <a
                        href={study.links.paper}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resources-link"
                        aria-label="View paper"
                      >
                        <FileText className="resources-link-icon" />
                        <span>Paper</span>
                      </a>
                    )}
                    {study.links.github && (
                      <a
                        href={study.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resources-link"
                        aria-label="View GitHub repository"
                      >
                        <Github className="resources-link-icon" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {study.links.website && (
                      <a
                        href={study.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resources-link"
                        aria-label="Visit website"
                      >
                        <Globe className="resources-link-icon" />
                        <span>Website</span>
                      </a>
                    )}
                    {study.links.huggingface && (
                      <a
                        href={study.links.huggingface}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resources-link"
                        aria-label="View on HuggingFace"
                      >
                        <svg className="resources-link-icon" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                        </svg>
                        <span>HuggingFace</span>
                      </a>
                    )}
                    {study.links.pubmed && (
                      <a
                        href={study.links.pubmed}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resources-link"
                        aria-label="View on PubMed"
                      >
                        <FileText className="resources-link-icon" />
                        <span>PubMed</span>
                      </a>
                    )}
                    {study.links.paperswithcode && (
                      <a
                        href={study.links.paperswithcode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resources-link"
                        aria-label="View on Papers with Code"
                      >
                        <FileText className="resources-link-icon" />
                        <span>Papers with Code</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* No Results */}
          {filteredStudies.length === 0 && (
            <div className="resources-no-results">
              <p>No studies found matching your criteria.</p>
            </div>
          )}
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
