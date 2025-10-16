import "../styles/HomePage.css";

const stats = [
  { value: "10+", label: "Models Tracked" },
  { value: "5", label: "Benchmarks" },
  { value: "3", label: "Categories" },
  { value: "100%", label: "Transparent" },
];

const features = [
  {
    title: "Comprehensive Data",
    description:
      "Access performance metrics across multiple industry-standard benchmarks.",
    bullets: [
      "MMLU for general knowledge",
      "HumanEval for code generation",
      "GSM8K for mathematical reasoning",
      "TruthfulQA and more",
    ],
  },
  {
    title: "Advanced Filtering",
    description:
      "Filter and search models by organization, category, and performance.",
    bullets: [
      "Search by model name",
      "Filter by category",
      "Group by organization",
      "Compare side-by-side",
    ],
  },
  {
    title: "Visual Analytics",
    description:
      "Interactive charts and tables to visualize model performance.",
    bullets: [
      "Radar charts for comparison",
      "Sortable data tables",
      "Performance indicators",
      "Export capabilities",
    ],
  },
  {
    title: "Open Source & Proprietary",
    description: "Compare open-source and proprietary models in one place.",
    bullets: [
      "Llama models from Meta",
      "GPT series from OpenAI",
      "Claude from Anthropic",
      "Gemini from Google",
    ],
  },
  {
    title: "Real-Time Updates",
    description:
      "Stay current with the latest benchmark results and model releases.",
    bullets: [
      "Latest model versions",
      "Updated performance data",
      "New benchmark additions",
      "Release tracking",
    ],
  },
  {
    title: "Industry Standards",
    description: "Based on widely recognized and peer-reviewed benchmarks.",
    bullets: [
      "Standardized metrics",
      "Academic validation",
      "Reproducible results",
      "Community verified",
    ],
  },
];

export default function HomePage() {
  return (
    <div className="dashboard-home-page">
      <section className="hero">
        <div className="hero-pill">MindBenchAI</div>
        <h1>
          Benchmark Leading <span>Language Models</span>
        </h1>
        <p>
          A comprehensive framework for evaluating and comparing AI models and tools in mental health applications. 
          Discover technical capabilities, performance metrics, and communication dynamics across the AI landscape.
        </p>
        <div className="hero-actions">
          <button className="primary-button">View Benchmarks</button>
          <button className="secondary-button">Learn More</button>
        </div>
        <div className="hero-stats">
          {stats.map((item) => (
            <div key={item.label}>
              <div className="stat-value">{item.value}</div>
              <div className="stat-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="feature-section">
        <header>
          <h2>Why Use Our Platform?</h2>
          <p>
            Get the insights you need to choose the right language model for your
            use case.
          </p>
        </header>
        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <ul>
                {feature.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Explore?</h2>
        <p>
          Start comparing language models and find the perfect fit for your needs.
        </p>
        <button className="primary-button">View All Benchmarks</button>
      </section>
    </div>
  );
}
