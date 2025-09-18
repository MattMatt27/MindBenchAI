// StandardizeTest.jsx
import "../styles/StandardizeTest.css";
import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";
import { stest } from "../data/models";

const TRAITS = ["O", "C", "E", "A", "N"];
const toRadarRows = (row) => TRAITS.map((t) => ({ trait: t, value: row?.[t] ?? 0 }));

export default function StandardizeTest() {
  const [activeTab, setActiveTab] = React.useState("models");
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [baseModelFilter, setBaseModelFilter] = React.useState("");
  const [picked, setPicked] = React.useState(null);
  const [displayModel, setDisplayModel] = React.useState(null);

  const baseModels = React.useMemo(
    () => Array.from(new Set((stest || []).map((r) => r.baseModel))).sort(),
    []
  );

  const rows = React.useMemo(() => {
    let out = Array.isArray(stest) ? [...stest] : [];
    if (baseModelFilter) out = out.filter((r) => r.baseModel === baseModelFilter);
    if (globalFilter) {
      const q = globalFilter.toLowerCase();
      out = out.filter(
        (r) =>
          String(r.model).toLowerCase().includes(q) ||
          String(r.baseModel).toLowerCase().includes(q) ||
          String(r.snapshot).toLowerCase().includes(q)
      );
    }
    return out;
  }, [globalFilter, baseModelFilter]);

  React.useEffect(() => {
    const stillVisible = picked && rows.some((r) => r.model === picked);
    if (!stillVisible) setPicked(null);
    const chartVisible = displayModel && rows.some((r) => r.model === displayModel);
    if (!chartVisible) setDisplayModel(null);
  }, [rows, picked, displayModel]);

  const chartRow = React.useMemo(
    () => rows.find((r) => r.model === displayModel) || null,
    [rows, displayModel]
  );

  const toggleRow = (model) => setPicked((prev) => (prev === model ? null : model));

  return (
    <div>
      <div className="st-tabs">
        <button
          className={`st-tab ${activeTab === "models" ? "active" : ""}`}
          onClick={() => setActiveTab("models")}
          type="button"
        >
          Big 5 Test
        </button>
        <button
          className={`st-tab ${activeTab === "snapshots" ? "active" : ""}`}
          onClick={() => setActiveTab("snapshots")}
          type="button"
        >
          Test
        </button>
      </div>

      {activeTab === "models" && (
        <div className="st-layout">
          <aside className="st-panel st-sidebar">
            <div className="st-search">
              <input
                className="st-search-input"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search model, base model, or snapshot"
              />
            </div>

            <div className="st-filter-group">
              <label className="st-filter-heading" htmlFor="baseModelFilter">
                Filter by Base Model
              </label>
              <select
                id="baseModelFilter"
                className="st-select"
                value={baseModelFilter}
                onChange={(e) => setBaseModelFilter(e.target.value)}
              >
                <option value="">All</option>
                {baseModels.map((bm) => (
                  <option key={bm} value={bm}>
                    {bm}
                  </option>
                ))}
              </select>
            </div>
          </aside>

          <div className="ui-table-wrap st-table">
            <table className="ui-table">
              <thead>
                <tr>
                  <th className="st-check-col">Keep</th>
                  <th>Model</th>
                  <th>Base Model</th>
                  <th>Openness (O)</th>
                  <th>Conscientiousness (C)</th>
                  <th>Extraversion (E)</th>
                  <th>Agreeableness (A)</th>
                  <th>Neuroticism (N)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const isOn = picked === r.model;
                  return (
                    <tr key={r.snapshot || r.model}>
                      <td className="st-check-col">
                        <input
                          type="checkbox"
                          className="st-row-check"
                          checked={isOn}
                          onChange={() => toggleRow(r.model)}
                          aria-label={`Select ${r.model}`}
                        />
                      </td>
                      <td>{r.model ?? "—"}</td>
                      <td>{r.baseModel ?? "—"}</td>
                      <td>{r.O ?? "—"}</td>
                      <td>{r.C ?? "—"}</td>
                      <td>{r.E ?? "—"}</td>
                      <td>{r.A ?? "—"}</td>
                      <td>{r.N ?? "—"}</td>
                    </tr>
                  );
                })}
                {!rows.length && (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", height: 64 }}>
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <aside className="st-panel st-right">
            <div className="st-actions">
              <button
                className="st-btn st-btn-primary"
                type="button"
                onClick={() => setDisplayModel(picked)}
                disabled={!picked}
              >
                Show chart
              </button>
              <button
                className="st-btn st-btn-ghost"
                type="button"
                onClick={() => {
                  setPicked(null);
                  setDisplayModel(null);
                }}
                disabled={!picked && !displayModel}
              >
                Clear all
              </button>
            </div>

            <div className="st-chart-title">
              {displayModel ? displayModel : "No model selected"}
            </div>

            <div className="st-chart-card">
              {chartRow ? (
                <div className="st-chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      cx="50%"
                      cy="50%"
                      outerRadius="85%"
                      data={toRadarRows(chartRow)}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <PolarGrid gridType="polygon" />
                      <PolarAngleAxis dataKey="trait" />
                      <PolarRadiusAxis domain={[0, 100]} />
                      <Radar
                        name="Personality"
                        dataKey="value"
                        stroke="#64748b"
                        fill="#64748b"
                        fillOpacity={0.35}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="st-empty">No model selected</div>
              )}
            </div>

            <div className="st-traits">
              {TRAITS.map((t) => (
                <div key={t} className="st-trait">
                  <div className="st-trait-key">{t}</div>
                  <div className="st-trait-val">
                    {chartRow?.[t] != null ? Math.round(chartRow[t]) : "—"}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      )}

      {activeTab === "snapshots" && <div className="st-layout st-layout-single" />}
    </div>
  );
}
