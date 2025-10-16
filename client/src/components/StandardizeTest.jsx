// src/components/StandardizeTest.jsx
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

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5001";

export default function StandardizeTest() {
  const [activeTab, setActiveTab] = React.useState("models");
  const [expandedModels, setExpandedModels] = React.useState(() => new Set());
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [selectedVersions, setSelectedVersions] = React.useState(() => new Set());
  const [modelFamilyFilter, setModelFamilyFilter] = React.useState([]);
  const [mfMenuOpen, setMfMenuOpen] = React.useState(false);
  const [mfMenuPos, setMfMenuPos] = React.useState({ left: 0, top: 0 });
  const mfBtnRef = React.useRef(null);
  const mfMenuRef = React.useRef(null);
  const [profiles, setProfiles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;

    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/current/big-five/profiles`);
        if (!res.ok) {
          throw new Error("Failed to load personality profiles");
        }
        const payload = await res.json();
        const normalized = (payload.data ?? []).map((item) => ({
          id: item.id,
          modelVersionId: item.model_version_id ?? item.id,
          modelId: item.model_id ?? null,
          modelFamily: item.model_family ?? "Unknown",
          model: item.model_name ?? "Unknown model",
          version: item.version ?? "—",
          isLatest: Boolean(item.is_latest),
          releaseDate: item.release_date ?? null,
          O: item.openness ?? 0,
          C: item.conscientiousness ?? 0,
          E: item.extraversion ?? 0,
          A: item.agreeableness ?? 0,
          N: item.neuroticism ?? 0,
        }));

        if (isMounted) {
          setProfiles(normalized);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message ?? "Unable to load data");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProfiles();
    return () => {
      isMounted = false;
    };
  }, []);

  const allRows = React.useMemo(() => [...profiles], [profiles]);
  const modelFamilies = React.useMemo(() => {
    return Array.from(
      new Set(allRows.map((row) => row.modelFamily).filter(Boolean)),
    ).sort((a, b) => a.localeCompare(b));
  }, [allRows]);

  const selectRow = (rowData) => {
    if (!rowData.isMainRow) {
      toggleVersion(rowData.id);
      return;
    }
    if (selectedRow && selectedRow.id === rowData.id) {
      setSelectedRow(null);
    } else {
      setSelectedRow(rowData);
    }
  };

  const toggleVersion = (versionId) => {
    setSelectedVersions((prev) => {
      const next = new Set(prev);
      next.has(versionId) ? next.delete(versionId) : next.add(versionId);
      return next;
    });
  };

  const clearSelection = () => {
    setSelectedRow(null);
    setSelectedVersions(new Set());
  };

  const sortedMainRows = React.useMemo(() => {
    let filtered = [...allRows];
    if (modelFamilyFilter.length > 0) {
      filtered = filtered.filter((r) => modelFamilyFilter.includes(r.modelFamily));
    }
    const modelMap = {};
    filtered.forEach((v) => {
      const family = v.modelFamily ?? "Unknown";
      const model = v.model ?? "Unknown model";
      const key = `${family}-${model}`;
      if (!modelMap[key]) {
        modelMap[key] = { latest: null, versions: [] };
      }
      modelMap[key].versions.push(v);
      const candidate = modelMap[key].latest;
      if (
        !candidate ||
        v.isLatest ||
        (!candidate.isLatest &&
          String(v.version).localeCompare(String(candidate.version)) > 0)
      ) {
        modelMap[key].latest = v;
      }
    });
    const mainRows = Object.entries(modelMap).map(([key, data]) => {
      const latest = data.latest ?? data.versions[0];
      const mainRowId = `main-${key}`;
      const actualVersion = latest?.version ?? "—";

      return {
        id: mainRowId,
        isMainRow: true,
        modelFamily: latest?.modelFamily ?? "Unknown",
        model: latest?.model ?? "Unknown model",
        versionLabel: actualVersion,
        displayVersion: latest?.isLatest ? "Latest" : actualVersion,
        actualVersion,
        modelVersionId: latest?.modelVersionId ?? latest?.id,
        isLatest: Boolean(latest?.isLatest),
        O: latest?.O ?? 0,
        C: latest?.C ?? 0,
        E: latest?.E ?? 0,
        A: latest?.A ?? 0,
        N: latest?.N ?? 0,
        hasVersions: data.versions.length > 1,
        versions: [...data.versions],
      };
    });
    return mainRows.sort((a, b) => {
      const famCompare = String(a.modelFamily).localeCompare(String(b.modelFamily));
      if (famCompare !== 0) return famCompare;
      return String(a.model).localeCompare(String(b.model));
    });
  }, [allRows, modelFamilyFilter]);

  const rows = React.useMemo(() => {
    const data = [];
    sortedMainRows.forEach((mainRow) => {
      data.push(mainRow);
      if (mainRow.hasVersions) {
        const versions = [...mainRow.versions].sort((a, b) =>
          String(b.version).localeCompare(String(a.version))
        );
        const isExpanded = expandedModels.has(mainRow.id);
        versions.forEach((v, idx) => {
          if (
            v.modelVersionId === mainRow.modelVersionId ||
            v.version === mainRow.actualVersion
          ) {
            return;
          }

          const versionId = v.modelVersionId ?? `${v.modelFamily}-${v.model}-${v.version}`;
          const isSelected = selectedVersions.has(versionId);
          if (isExpanded || isSelected) {
            const versionLabel = v.version ?? "—";
            data.push({
              id: versionId,
              isMainRow: false,
              parentId: mainRow.id,
              modelFamily: v.modelFamily,
              model: v.model,
              versionLabel,
              displayVersion: v.isLatest ? "Latest" : versionLabel,
              actualVersion: v.version,
              isLatest: Boolean(v.isLatest),
              O: v.O,
              C: v.C,
              E: v.E,
              A: v.A,
              N: v.N,
              vFirst: idx === 0,
              vLast: idx === versions.length - 1,
            });
          }
        });
      }
    });
    return data;
  }, [sortedMainRows, expandedModels, selectedVersions]);

  const chartRows = React.useMemo(() => {
    const selectedVersionRows = rows.filter((r) => !r.isMainRow && selectedVersions.has(r.id));
    if (selectedVersionRows.length > 0) return selectedVersionRows;
    if (selectedRow) return [selectedRow];
    return [];
  }, [rows, selectedVersions, selectedRow]);

  const chartColors = ["#64748b", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6", "#f97316", "#06b6d4", "#84cc16"];

  const radarData = React.useMemo(() => {
    if (chartRows.length === 0) return [];
    const allData = [];
    ["O", "C", "E", "A", "N"].forEach((trait) => {
      const d = { trait };
      chartRows.forEach((row) => {
        const key = `${row.model}-${row.actualVersion ?? row.versionLabel}`;
        d[key] = row[trait] ?? 0;
      });
      allData.push(d);
    });
    return allData;
  }, [chartRows]);

  React.useEffect(() => {
    if (selectedRow && !rows.some((r) => r.id === selectedRow.id)) {
      clearSelection();
    }
  }, [rows, selectedRow]);

  React.useEffect(() => {
    const onDocClick = (e) => {
      if (!mfMenuOpen) return;
      const withinBtn = mfBtnRef.current && mfBtnRef.current.contains(e.target);
      const withinMenu = mfMenuRef.current && mfMenuRef.current.contains(e.target);
      if (!withinBtn && !withinMenu) setMfMenuOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setMfMenuOpen(false);
    const onScroll = () => setMfMenuOpen(false);
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
  }, [mfMenuOpen]);

  const toggleRow = (id) => {
    setExpandedModels((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const openMfMenu = () => {
    const el = mfBtnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setMfMenuPos({ left: r.left, top: r.bottom });
    setMfMenuOpen((v) => !v);
  };

  if (loading) {
    return <div className="st-loading">Loading Big 5 profiles…</div>;
  }

  if (error) {
    return <div className="st-error">Failed to load Big 5 profiles: {error}</div>;
  }

  return (
    <div>
      <div className="g-tabs">
        <button
          className={`g-tab-bttn ${activeTab === "models" ? "active" : ""}`}
          onClick={() => setActiveTab("models")}
          type="button"
        >
          Big 5 Test
        </button>
        <button
          className={`g-tab-bttn ${activeTab === "snapshots" ? "active" : ""}`}
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
                  <th style={{ width: 30 }}></th>
                  <th className={`st-th-menu ${mfMenuOpen ? "open" : ""}`}>
                    <button
                      ref={mfBtnRef}
                      type="button"
                      className="st-th-trigger"
                      onClick={openMfMenu}
                      aria-haspopup="menu"
                      aria-expanded={mfMenuOpen}
                    >
                      Family
                      <span className="st-th-caret" aria-hidden="true">▾</span>
                    </button>
                  </th>
                  <th>Model</th>
                  <th>Version</th>
                  <th>Openness (O)</th>
                  <th>Conscientiousness (C)</th>
                  <th>Extraversion (E)</th>
                  <th>Agreeableness (A)</th>
                  <th>Neuroticism (N)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const isSelected = selectedRow && selectedRow.id === r.id;
                  const isMainRow = r.isMainRow;
                  const isVersionRow = !isMainRow;
                  const isVersionSelected = isVersionRow && selectedVersions.has(r.id);
                  const isOpen = !isVersionRow && expandedModels.has(r.id);
                  return (
                    <tr
                      key={r.id}
                      className={`st-row ${isVersionRow ? "st-row-version" : "st-row-main"} ${isOpen ? "open" : ""} ${isVersionRow && (isSelected || isVersionSelected) ? "selected" : ""} ${r.vFirst ? "st-vfirst" : ""} ${r.vLast ? "st-vlast" : ""}`}
                      onClick={() => {
                        if (isMainRow) {
                          if (r.hasVersions) {
                            toggleRow(r.id);
                          }
                        } else {
                          selectRow(r);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          if (isMainRow) {
                            if (r.hasVersions) {
                              toggleRow(r.id);
                            }
                          } else {
                            selectRow(r);
                          }
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={
                        isMainRow
                          ? r.hasVersions
                            ? `${expandedModels.has(r.id) ? "Collapse" : "Expand"} versions for ${r.model}`
                            : r.model
                          : `Show chart for ${r.model} ${r.displayVersion ?? r.versionLabel ?? ""}`
                      }
                    >
                      <td>
                        {isVersionRow ? (
                          <div className="st-checkbox-cell">
                            <input
                              type="checkbox"
                              checked={isVersionSelected}
                              onChange={() => toggleVersion(r.id)}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        ) : r.hasVersions ? (
                          <button
                            className={`st-expander ${expandedModels.has(r.id) ? "open" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRow(r.id);
                            }}
                            aria-label={`${expandedModels.has(r.id) ? "Collapse" : "Expand"} versions for ${r.model}`}
                            type="button"
                          >
                            ▸
                          </button>
                        ) : null}
                      </td>
                      <td>{r.modelFamily ?? "—"}</td>
                      <td>{r.model ?? "—"}</td>
                      <td>
                        {isVersionRow
                          ? `${r.versionLabel ?? "—"}${r.isLatest ? " (Latest)" : ""}`
                          : ""}
                      </td>
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
                    <td colSpan={9} style={{ textAlign: "center", height: 64 }}>No data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <aside className="st-panel st-right">
            <div className="st-actions">
              {modelFamilyFilter.length > 0 && (
                <button
                  className="st-btn st-btn-ghost"
                  onClick={() => setModelFamilyFilter([])}
                  type="button"
                >
                  Clear filter ({modelFamilyFilter.length})
                </button>
              )}
              <button
                className="st-btn st-btn-ghost"
                type="button"
                onClick={clearSelection}
                disabled={!selectedRow && selectedVersions.size === 0}
              >
                Clear selection
              </button>
            </div>

            <div className="st-chart-title">
              {chartRows.length > 0
                ? chartRows.length === 1
                  ? `${chartRows[0].model ?? "—"} ${chartRows[0].versionLabel ?? "—"}${chartRows[0].isLatest ? " (Latest)" : ""}`
                  : `${chartRows.length} Models Selected`
                : "No model selected"}
            </div>

            <div className="st-chart-card">
              {chartRows.length > 0 ? (
                <div className="st-chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData} startAngle={90} endAngle={-270}>
                      <PolarGrid gridType="polygon" />
                      <PolarAngleAxis dataKey="trait" />
                      <PolarRadiusAxis domain={[0, 50]} />
                      {chartRows.map((row, index) => {
                        const key = `${row.model}-${row.actualVersion ?? row.versionLabel}`;
                        return (
                          <Radar
                            key={key}
                            name={key}
                            dataKey={key}
                            stroke={chartColors[index % chartColors.length]}
                            fill={chartColors[index % chartColors.length]}
                            fillOpacity={0.1}
                            strokeWidth={2}
                          />
                        );
                      })}
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="st-empty">No model selected</div>
              )}
            </div>

            {chartRows.length > 0 && (
              <div className="st-legend">
                {chartRows.map((row, index) => {
                  const key = `${row.model}-${row.actualVersion ?? row.versionLabel}`;
                  return (
                    <div key={key} className="st-legend-item">
                      <div className="st-legend-color" style={{ backgroundColor: chartColors[index % chartColors.length] }}></div>
                      <span className="st-legend-text">
                        {row.model} {row.versionLabel ?? row.displayVersion ?? ""}
                        {row.isLatest ? " (Latest)" : ""}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </aside>

          {mfMenuOpen &&
            createPortal(
              <div
                ref={mfMenuRef}
                className="st-hmenu st-hmenu-fixed"
                style={{ left: mfMenuPos.left, top: mfMenuPos.top }}
                role="menu"
              >
                <div className="st-hmenu-header">{modelFamilyFilter.length > 0 ? `Selected: ${modelFamilyFilter.length}` : "Select families"}</div>
                <button
                  className="st-hmenu-item"
                  onClick={() => {
                    if (modelFamilyFilter.length === modelFamilies.length) {
                      setModelFamilyFilter([]);
                    } else {
                      setModelFamilyFilter([...modelFamilies]);
                    }
                  }}
                  role="menuitem"
                >
                  {modelFamilyFilter.length === modelFamilies.length ? "Deselect all" : "Select all"}
                </button>
                <div className="st-hmenu-sep" />
                {modelFamilies.map((mf) => (
                  <label key={mf} className={`st-hmenu-item st-hmenu-checkbox ${modelFamilyFilter.includes(mf) ? "active" : ""}`} role="menuitem">
                    <input
                      type="checkbox"
                      checked={modelFamilyFilter.includes(mf)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setModelFamilyFilter([...modelFamilyFilter, mf]);
                        } else {
                          setModelFamilyFilter(modelFamilyFilter.filter((f) => f !== mf));
                        }
                      }}
                    />
                    <span>{mf}</span>
                  </label>
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
