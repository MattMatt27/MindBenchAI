import { useState, useEffect, ChangeEvent, useMemo, useCallback } from "react";
import { Github, FileText, Globe, Link, ExternalLink } from "lucide-react";
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
  metadata: unknown;
  tags: ResourceTag[];
  created_at: string;
  updated_at: string | null;
}

interface ResourceArticleAPI {
  id: string;
  title: string;
  author: string | null;
  publication_date: string | null;
  publisher: string | null;
  url: string;
  summary: string | null;
  image_url: string | null;
  image_storage_path: string | null;
  article_type: string | null;
  language: string | null;
  read_time_minutes: number | null;
  is_published: boolean;
  is_featured: boolean;
  published_at: string | null;
  metadata: unknown;
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

interface Article {
  id: string;
  title: string;
  author: string;
  year: string;
  publisher: string;
  summary: string;
  articleType: string;
  readTime: number;
  url: string;
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

// Helper function to map article data to frontend display format
const mapArticleToDisplay = (article: ResourceArticleAPI): Article => {
  const year = article.publication_date
    ? new Date(article.publication_date).getFullYear().toString()
    : 'N/A';

  return {
    id: article.id,
    title: article.title,
    author: article.author || 'Unknown',
    year,
    publisher: article.publisher || 'Unknown Publisher',
    summary: article.summary || '',
    articleType: article.article_type || 'general',
    readTime: article.read_time_minutes || 5,
    url: article.url,
  };
};

export default function Resources() {
  const [activeTab, setActiveTab] = useState<'studies' | 'articles'>('studies');
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [benchmarkStudies, setBenchmarkStudies] = useState<BenchmarkStudy[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch benchmarks from API
  const fetchBenchmarks = useCallback(async () => {
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
  }, []);

  // Fetch articles from API
  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_ENDPOINTS.articles);

      if (!response.ok) {
        throw new Error(`Failed to fetch articles: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        const mappedArticles = data.data.map(mapArticleToDisplay);
        setArticles(mappedArticles);
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError(err instanceof Error ? err.message : 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount based on active tab
  useEffect(() => {
    if (activeTab === 'studies') {
      fetchBenchmarks();
    } else {
      fetchArticles();
    }
  }, [activeTab, fetchBenchmarks, fetchArticles]);

  // Extract unique categories dynamically from fetched data
  const availableCategories = useMemo(() => {
    const categories = new Set(benchmarkStudies.map(study => study.category));
    return Array.from(categories).sort();
  }, [benchmarkStudies]);

  // Memoize filtered studies for performance
  const filteredStudies = useMemo(() => {
    return benchmarkStudies.filter((study) => {
      const matchesSearch =
        searchQuery === "" ||
        study.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.summary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === "all" || study.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [benchmarkStudies, searchQuery, categoryFilter]);

  // Memoize filtered articles for performance
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.publisher.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === "all" || article.articleType === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [articles, searchQuery, categoryFilter]);

  // Extract unique article types dynamically from fetched data
  const availableArticleTypes = useMemo(() => {
    const types = new Set(articles.map(article => article.articleType));
    return Array.from(types).sort();
  }, [articles]);

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

  const getArticleTypeColor = (type: string): string => {
    switch (type) {
      case "research_summary":
        return "category-mental-health";
      case "news":
        return "category-medical";
      case "opinion":
        return "category-psychology";
      case "interview":
        return "category-interview";
      default:
        return "";
    }
  };

  const formatArticleType = (type: string): string => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="resources-page">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-8 pb-0">
        <div className="mb-4">
          <h1 className="text-gray-900 text-3xl font-semibold mb-2">Benchmark Studies & Resources</h1>
          <p className="text-gray-600">
            Explore the original research papers and documentation for various mental health and medical benchmarks
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: '#ececf0',
            borderRadius: '0.75rem',
            padding: '3px',
            marginBottom: '0.75rem',
            height: '2.25rem'
          }}>
            <button
              onClick={() => setActiveTab('studies')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                borderRadius: '0.75rem',
                padding: '0.25rem 0.5rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                border: '1px solid transparent',
                background: activeTab === 'studies' ? '#fff' : 'transparent',
                color: activeTab === 'studies' ? '#111827' : '#374151',
                cursor: 'pointer',
                transition: 'all 0.15s',
                height: 'calc(100% - 1px)'
              }}
            >
              Benchmark Studies
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                borderRadius: '0.75rem',
                padding: '0.25rem 0.5rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                border: '1px solid transparent',
                background: activeTab === 'articles' ? '#fff' : 'transparent',
                color: activeTab === 'articles' ? '#111827' : '#374151',
                cursor: 'pointer',
                transition: 'all 0.15s',
                height: 'calc(100% - 1px)'
              }}
            >
              AI/ML Articles
            </button>
          </div>
        </div>

        {activeTab === 'studies' && (
          <div>
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
            <button onClick={fetchBenchmarks} className="resources-retry-button">
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
                        <Link className="resources-link-icon" />
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
      </div>
          </div>
        )}

        {activeTab === 'articles' && (
          <div>
            <div className="resources-container resources-content">
              {/* Filters */}
              <div className="resources-filters">
                <div className="resources-search-wrapper">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    className="resources-search-input"
                    aria-label="Search articles"
                  />
                </div>
                <select
                  value={categoryFilter}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategoryFilter(e.target.value)}
                  className="resources-category-select"
                  aria-label="Filter by article type"
                >
                  <option value="all">All Types</option>
                  {availableArticleTypes.map((type) => (
                    <option key={type} value={type}>
                      {formatArticleType(type)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="resources-loading">
                  <p>Loading articles...</p>
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="resources-error">
                  <p>Error: {error}</p>
                  <button onClick={fetchArticles} className="resources-retry-button">
                    Retry
                  </button>
                </div>
              )}

              {/* Results Count */}
              {!loading && !error && (
                <div className="resources-results-count">
                  Showing {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
                </div>
              )}

              {/* Articles Grid */}
              {!loading && !error && (
                <div className="resources-studies-grid">
                  {filteredArticles.map((article) => (
                    <a
                      key={article.id}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resources-study-card resources-article-card"
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <div className="resources-study-header">
                        <div className="resources-study-title-row">
                          <h3 className="resources-study-name">{article.title}</h3>
                          <span className={`resources-category-badge ${getArticleTypeColor(article.articleType)}`}>
                            {formatArticleType(article.articleType)}
                          </span>
                        </div>
                        <div className="resources-study-meta">
                          <span>{article.author}</span>
                          <span>• {article.publisher}</span>
                          <span>• {article.year}</span>
                          <span>• {article.readTime} min read</span>
                        </div>
                      </div>

                      <div className="resources-study-content">
                        <p className="resources-study-summary">{article.summary}</p>
                      </div>

                      <div className="resources-additional-links">
                        <div className="resources-links-container">
                          <div className="resources-link">
                            <ExternalLink className="resources-link-icon" />
                            <span>Read Article</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}

                  {/* No Results */}
                  {filteredArticles.length === 0 && (
                    <div className="resources-no-results">
                      <p>No articles found matching your criteria.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="max-w-7xl mx-auto px-6">
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
