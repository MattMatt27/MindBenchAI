// StandardizeTest.jsx
import "../styles/StandardizeTest.css";
import React from "react";
import { createPortal } from "react-dom";
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
  const [displayModel, setDisplayModel] = React.useState(null);
  const [baseModelFilter, setBaseModelFilter] = React.useState("");
  const [bmMenuOpen, setBmMenuOpen] = React.useState(false);
  const [bmMenuPos, setBmMenuPos] = React.useState({ left: 0, top: 0 });
  const bmBtnRef = React.useRef(null);
  const bmMenuRef = React.useRef(null);

  const allRows = React.useMemo(() => (Array.isArray(stest) ? [...stest] : []), []);
  const baseModels = React.useMemo(
    () => Array.from(new Set(allRows.map((r) => r.baseModel).filter(Boolean))).sort(),
    [allRows]
  );

  const rows = React.useMemo(() => {
    let out = [...allRows];
    if (baseModelFilter) out = out.filter((r) => r.baseModel === baseModelFilter);
    return out;
  }, [allRows, baseModelFilter]);

  const chartRow = React.useMemo(
    () => rows.find((r) => r.model === displayModel) || null,
    [rows, displayModel]
  );

  React.useEffect(() => {
    if (displayModel && !rows.some((r) => r.model === displayModel)) {
      setDisplayModel(null);
    }
  }, [rows, displayModel]);

  React.useEffect(() => {
    const onDocClick = (e) => {
      if (!bmMenuOpen) return;
      const withinBtn = bmBtnRef.current && bmBtnRef.current.contains(e.target);
      const withinMenu = bmMenuRef.current && bmMenuRef.current.contains(e.target);
      if (!withinBtn && !withinMenu) setBmMenuOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setBmMenuOpen(false);
    const onScroll = () => setBmMenuOpen(false);
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [bmMenuOpen]);

  const handleRowActivate = (model) => setDisplayModel(model);

  const openBmMenu = () => {
    const el = bmBtnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setBmMenuPos({ left: r.left + r.width / 2, top: r.bottom });
    setBmMenuOpen((v) => !v);
  };

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
        <div className="st-layout st-layout-no-sidebar">
          <div className="ui-table-wrap st-table">
            <table className="ui-table">
              <thead>
                <tr>
                  <th>Model</th>
                  <th className={`st-th-menu ${bmMenuOpen ? "open" : ""}`}>
                    <button
                      ref={bmBtnRef}
                      type="button"
                      className="st-th-trigger"
                      onClick={openBmMenu}
                      aria-haspopup="menu"
                      aria-expanded={bmMenuOpen}
                    >
                      Base Model
                      <span className="st-th-caret" aria-hidden="true">▾</span>
                    </button>
                  </th>
                  <th>Openness (O)</th>
                  <th>Conscientiousness (C)</th>
                  <th>Extraversion (E)</th>
                  <th>Agreeableness (A)</th>
                  <th>Neuroticism (N)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const isSelected = r.model === displayModel;
                  return (
                    <tr
                      key={r.snapshot || r.model}
                      className={`st-row ${isSelected ? "selected" : ""}`}
                      onClick={() => handleRowActivate(r.model)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleRowActivate(r.model);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Show chart for ${r.model}`}
                    >
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
                    <td colSpan={7} style={{ textAlign: "center", height: 64 }}>
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <aside className="st-panel st-right">
            <div className="st-actions">
              {baseModelFilter && (
                <button
                  className="st-btn st-btn-ghost"
                  onClick={() => setBaseModelFilter("")}
                  type="button"
                >
                  Clear base model filter ({baseModelFilter})
                </button>
              )}
              <button
                className="st-btn st-btn-ghost"
                type="button"
                onClick={() => setDisplayModel(null)}
                disabled={!displayModel}
              >
                Clear selection
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

          {bmMenuOpen &&
            createPortal(
              <div
                ref={bmMenuRef}
                className="st-hmenu st-hmenu-fixed"
                style={{ left: bmMenuPos.left, top: bmMenuPos.top }}
                role="menu"
              >
                <div className="st-hmenu-header">
                  {baseModelFilter ? `Filtering: ${baseModelFilter}` : "All base models"}
                </div>
                <button
                  className="st-hmenu-item"
                  onClick={() => {
                    setBaseModelFilter("");
                    setBmMenuOpen(false);
                  }}
                  role="menuitem"
                >
                  All base models
                </button>
                <div className="st-hmenu-sep" />
                {baseModels.map((bm) => (
                  <button
                    key={bm}
                    className={`st-hmenu-item ${bm === baseModelFilter ? "active" : ""}`}
                    onClick={() => {
                      setBaseModelFilter(bm);
                      setBmMenuOpen(false);
                    }}
                    role="menuitem"
                  >
                    {bm}
                  </button>
                ))}
              </div>,
              document.body
            )}
        </div>
      )}

      {activeTab === "snapshots" && <div className="st-layout st-layout-single" />}
    </div>
  );
}
