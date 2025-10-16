import React from "react";
import "../styles/Resource.css"

export default function Resource() {
  const [activeTab, setActiveTab] = React.useState("Benchmark");
  return (
    <div>
      <div className = 'g-tabs'>
        <button
          className = {`g-tab-bttn ${activeTab === 'Benchmark' ? "active" : ""}`}
          onClick = {() => setActiveTab('Benchmark')}
        >
          Benchmark
        </button>
        <button
          className = {`g-tab-bttn ${activeTab === 'AI News' ? "active" : ""}`}
          onClick = {() => setActiveTab('AI News')}
        >
          AI News
        </button>
      </div>

      {activeTab == 'Benchmark' && (
        <div>
          <div className = 'res-benchmark-header'>
            Research Papers & Benchmark Documentation
          </div>
          <div className = 'res-benchmark-desc'>
            Explore the original research papers and documentation for various LLM benchmarks. 
            Each study provides detailed methodology, datasets, and evaluation criteria used to assess language model performance.
          </div>
        </div>
      )}

      
    </div>
  )
}