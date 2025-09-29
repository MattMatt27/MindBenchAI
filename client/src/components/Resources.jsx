import React from "react";
import "../styles/Resources.css";

function ArticleCard({ article }) {
  const { url, title, summary, image, siteName, tags = [] } = article;
  const host = (() => { try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return siteName || ""; } })();

  return (
    <a className="rs-article-card island" href={url} target="_blank" rel="noreferrer">
      <div className="rs-article-thumb">
        {image ? <img src={image} alt={title || "Article thumbnail"} /> : <div className="rs-article-thumb__placeholder">📰</div>}
      </div>
      <div className="rs-article-body">
        <div className="rs-article-meta">{siteName || host}</div>
        <header className="rs-article-header">
          <h3 className="rs-article-title">{title}</h3>
          <div className="rs-tags">
            {tags.map((t) => (
              <span className="rs-badge" key={t}>{t}</span>
            ))}
          </div>
        </header>
        {summary && <p className="rs-article-summary">{summary}</p>}
      </div>
    </a>
  );
}

export default function Resources() {
  const [activeTab, setActiveTab] = React.useState("Publication");

  const articles = [
    {
      url: "https://pubmed.ncbi.nlm.nih.gov/10169714/",
      siteName: "PubMed",
      title: "The Suicide Intervention Response Inventory: a revision and validation",
      summary:
        "The SIRI was developed to evaluate suicide intervention skills. Psychometric issues with the original motivated revisions; the SIRI-2 shows promise as an index of suicide counseling effectiveness.",
      image: "https://picsum.photos/seed/a/1200/800",
      type: "Research paper",
      tags: ["Research paper"]
    },
    {
      url: "https://example.com/rag-playbook",
      siteName: "Tech Blog",
      title: "The RAG Playbook: Patterns, Anti-Patterns, and Metrics",
      summary:
        "From naive retrieval to multi-step planning: picking chunking, embeddings, and evaluation metrics that matter.",
      image: "https://picsum.photos/seed/b/1200/800",
      type: "News",
      tags: ["News"]
    },
    {
      url: "https://example.com/multimodal",
      siteName: "Research Lab",
      title: "Multimodal Models in the Wild",
      summary:
        "Field notes on latency, tool use, and reliability when vision-language models power real apps.",
      image: "https://picsum.photos/seed/c/1200/800",
      type: "News",
      tags: ["News"]
    }
  ];

  const FILTERS = ["All", "Research paper", "News"];
  const [activeFilter, setActiveFilter] = React.useState("All");

  const shown = React.useMemo(
    () => articles.filter(a => activeFilter === "All" || a.type === activeFilter),
    [articles, activeFilter]
  );

  return (
    <div>
      <div className="g-tabs">
        <button
          className={`g-tab-bttn ${activeTab === "Publication" ? "active" : ""}`}
          onClick={() => setActiveTab("Publication")}
        >
          Publication
        </button>
        <button
          className={`g-tab-bttn ${activeTab === "Articles" ? "active" : ""}`}
          onClick={() => setActiveTab("Articles")}
        >
          AI/ML Articles
        </button>
      </div>

      {activeTab === "Publication" && (
        <div className="rs-content">
          <div className="rs-tagsbar">
            {FILTERS.map((t) => (
              <button
                key={t}
                className={`rs-tag ${activeFilter === t ? "active" : ""}`}
                onClick={() => setActiveFilter(t)}
                type="button"
                aria-pressed={activeFilter === t}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="rs-articles-grid">
            {shown.map((a) => (
              <ArticleCard key={a.url} article={a} />
            ))}
          </div>
        </div>
      )}

      {activeTab === "Articles" && (
        <div className="rs-content">
          <div className="island"><p className="rs-muted">Coming soon.</p></div>
        </div>
      )}
    </div>
  );
}
