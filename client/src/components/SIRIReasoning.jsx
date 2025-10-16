import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { siriQuestions, models, questionScores, cotConsistency, scoreConsistency } from '../data/siriReasoningData';
import '../styles/SIRIReasoning.css';

export default function SIRIReasoning() {
  const [temperatureFilter, setTemperatureFilter] = useState('0');
  const [topPFilter, setTopPFilter] = useState('1');
  const [minRunsFilter, setMinRunsFilter] = useState('10+');
  const [systemPromptFilter, setSystemPromptFilter] = useState('all');
  const [messagePromptFilter, setMessagePromptFilter] = useState('all');

  // Prepare data for question-by-question bar chart
  const questionChartData = useMemo(() => {
    return siriQuestions.map(q => {
      const dataPoint = { question: q.label };
      models.forEach(model => {
        dataPoint[model.id] = questionScores[q.id][model.id];
      });
      return dataPoint;
    });
  }, []);

  // Create model color map for consistency
  const modelColorMap = useMemo(() => {
    const map = {};
    models.forEach(model => {
      map[model.name] = model.color;
    });
    return map;
  }, []);

  // Prepare data for COT consistency chart
  const cotChartData = useMemo(() => {
    return cotConsistency.map(item => ({
      model: item.model,
      value: item.consistency,
      color: modelColorMap[item.model]
    }));
  }, [modelColorMap]);

  // Prepare data for score consistency chart
  const scoreChartData = useMemo(() => {
    return scoreConsistency.map(item => ({
      model: item.model,
      value: item.sd,
      color: modelColorMap[item.model]
    }));
  }, [modelColorMap]);

  return (
    <div className="siri-reasoning-container">
      {/* Compact Header with Description */}
      <div className="siri-header">
        <h1 className="siri-title">SIRI-2</h1>
        <p className="siri-subtitle">
          The SIRI-2 is a validated clinical scale for assessing crisis responders' capabilities at identifying appropriate and inappropriate
          responses to someone presenting with suicidal ideation. These results are adapted for administration to language models where crisis
          prompt and response option pairs were provided to models and compared to expert ratings (on a -3 to 3 scale).
        </p>
      </div>

      {/* Filters */}
      <div className="siri-filters">
        <div className="siri-filter-group">
          <label className="siri-filter-label">Temperature</label>
          <select
            className="siri-select"
            value={temperatureFilter}
            onChange={(e) => setTemperatureFilter(e.target.value)}
          >
            <option value="0">0</option>
            <option value="0.7">0.7</option>
            <option value="1.0">1.0</option>
          </select>
        </div>

        <div className="siri-filter-group">
          <label className="siri-filter-label">Top-p</label>
          <select
            className="siri-select"
            value={topPFilter}
            onChange={(e) => setTopPFilter(e.target.value)}
          >
            <option value="1">1</option>
            <option value="0.9">0.9</option>
            <option value="0.95">0.95</option>
          </select>
        </div>

        <div className="siri-filter-group">
          <label className="siri-filter-label">Min Runs</label>
          <select
            className="siri-select"
            value={minRunsFilter}
            onChange={(e) => setMinRunsFilter(e.target.value)}
          >
            <option value="10+">10+</option>
            <option value="20+">20+</option>
            <option value="50+">50+</option>
          </select>
        </div>

        <div className="siri-filter-group">
          <label className="siri-filter-label">System Prompt</label>
          <select
            className="siri-select"
            value={systemPromptFilter}
            onChange={(e) => setSystemPromptFilter(e.target.value)}
          >
            <option value="all">All System Prompts</option>
            <option value="default">Default</option>
            <option value="therapeutic">Therapeutic</option>
            <option value="clinical">Clinical</option>
          </select>
        </div>

        <div className="siri-filter-group">
          <label className="siri-filter-label">Message Prompt</label>
          <select
            className="siri-select"
            value={messagePromptFilter}
            onChange={(e) => setMessagePromptFilter(e.target.value)}
          >
            <option value="all">All Message Prompts</option>
            <option value="direct">Direct</option>
            <option value="contextual">Contextual</option>
          </select>
        </div>
      </div>

      {/* Question-by-Question Breakdown */}
      <div className="siri-content">
        <section className="siri-section">
          <h3 className="siri-chart-title">All Questions</h3>
          <div className="siri-chart-scroll">
            <ResponsiveContainer width={siriQuestions.length * 120} height={300}>
              <BarChart data={questionChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="question"
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                />
                <YAxis
                  domain={[-4, 4]}
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    background: '#ffffff',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    padding: '6px'
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '10px' }}
                  iconType="rect"
                  iconSize={10}
                />
                {models.map(model => (
                  <Bar
                    key={model.id}
                    dataKey={model.id}
                    name={model.name}
                    fill={model.color}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Consistency Metrics Side by Side */}
        <div className="siri-consistency-grid">
          <section className="siri-section">
            <h3 className="siri-chart-title">Chain-of-Thought Embedding Consistency</h3>
            <p className="siri-chart-desc">
              Measures variance in reasoning embeddings across runs. Lower values indicate more consistent reasoning patterns when evaluating similar crisis scenarios.
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={cotChartData} layout="vertical" margin={{ left: 100, right: 20, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  type="number"
                  domain={[0, 0.35]}
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                />
                <YAxis
                  type="category"
                  dataKey="model"
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                  width={90}
                />
                <Tooltip
                  contentStyle={{
                    background: '#ffffff',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    padding: '6px'
                  }}
                  formatter={(value) => value.toFixed(3)}
                />
                <Bar dataKey="value">
                  {cotChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </section>

          <section className="siri-section">
            <h3 className="siri-chart-title">Appropriateness Rating Standard Deviation</h3>
            <p className="siri-chart-desc">
              Standard deviation of appropriateness ratings across all items. Lower values indicate more consistent scoring behavior and stable evaluation criteria.
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={scoreChartData} layout="vertical" margin={{ left: 100, right: 20, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  type="number"
                  domain={[0, 2.5]}
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                />
                <YAxis
                  type="category"
                  dataKey="model"
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                  width={90}
                />
                <Tooltip
                  contentStyle={{
                    background: '#ffffff',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    padding: '6px'
                  }}
                  formatter={(value) => value.toFixed(2)}
                />
                <Bar dataKey="value">
                  {scoreChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </section>
        </div>
      </div>
    </div>
  );
}
