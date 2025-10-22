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

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5001/api";
const HEXACO_TRAITS = ["H", "E", "X", "A", "C", "O"];
const IRI_TRAITS = ["PT", "FS", "EC", "PD"];
const CSI_TRAITS = ["EXP", "PRE", "VAG", "QUE", "EMO", "IMP"];

const TRAIT_LABELS = {
  // HEXACO
  H: "Honesty-Humility",
  E: "Emotionality",
  X: "Extraversion",
  A: "Agreeableness",
  C: "Conscientiousness",
  O: "Openness",
  // IRI
  PT: "Perspective Taking",
  FS: "Fantasy",
  EC: "Empathic Concern",
  PD: "Personal Distress",
  // CSI
  EXP: "Expressiveness",
  PRE: "Preciseness",
  VAG: "Verbal Aggressiveness",
  QUE: "Questioningness",
  EMO: "Emotionality",
  IMP: "Impression Manipulativeness",
};

export default function ConversationalProfile() {
  const [activeTab, setActiveTab] = React.useState("models");
  const [activeTest, setActiveTest] = React.useState("hexaco");
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
  const [availableTests, setAvailableTests] = React.useState([]);
  const [testsLoading, setTestsLoading] = React.useState(true);

  // Fetch available tests on mount
  React.useEffect(() => {
    let isMounted = true;

    const fetchTests = async () => {
      try {
        setTestsLoading(true);
        const res = await fetch(`${API_BASE}/current/conversational-profiles/tests`);
        if (!res.ok) {
          throw new Error("Failed to load tests");
        }
        const payload = await res.json();

        if (isMounted) {
          setAvailableTests(payload.data ?? []);
          // Set the first test as active by default if no test is selected
          if (payload.data && payload.data.length > 0 && activeTest === "hexaco") {
            const firstTest = payload.data[0];
            const testId = firstTest.name.toLowerCase().replace(/\s+/g, '-');
            setActiveTest(testId);
          }
        }
      } catch (err) {
        console.error("Error loading available tests:", err);
        // If tests fail to load, fall back to showing no buttons
        if (isMounted) {
          setAvailableTests([]);
        }
      } finally {
        if (isMounted) setTestsLoading(false);
      }
    };

    fetchTests();
    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    let isMounted = true;

    const fetchProfiles = async () => {
      try {
        setLoading(true);

        // Find the matching test from availableTests
        const currentTest = availableTests.find(
          (test) => test.name.toLowerCase().replace(/\s+/g, '-') === activeTest || test.name === activeTest
        );

        if (!currentTest) {
          // If test not found, skip loading
          if (isMounted) {
            setProfiles([]);
            setLoading(false);
          }
          return;
        }

        // Use the actual test name for the API endpoint
        const testName = encodeURIComponent(currentTest.name);
        const endpoint = `${API_BASE}/current/conversational-profiles/${testName}`;

        const res = await fetch(endpoint);
        if (!res.ok) {
          throw new Error("Failed to load profiles");
        }
        const payload = await res.json();

        const normalized = (payload.data ?? []).map((item) => {
          const base = {
            id: item.id,
            modelVersionId: item.model_version_id ?? item.id,
            modelId: item.model_id ?? null,
            modelFamily: item.model_family ?? "Unknown",
            model: item.model_name ?? "Unknown model",
            version: item.version ?? "—",
            isLatest: Boolean(item.is_latest),
            releaseDate: item.release_date ?? null,
          };

          // Map test-specific fields based on test name
          if (currentTest.name.includes("HEXACO")) {
            return {
              ...base,
              H: item.honesty_humility ?? 0,
              E: item.emotionality ?? 0,
              X: item.extraversion ?? 0,
              A: item.agreeableness ?? 0,
              C: item.conscientiousness ?? 0,
              O: item.openness ?? 0,
            };
          } else if (currentTest.name.includes("IRI") || currentTest.name.includes("Interpersonal Reactivity")) {
            return {
              ...base,
              PT: item.perspective_taking ?? 0,
              FS: item.fantasy ?? 0,
              EC: item.empathic_concern ?? 0,
              PD: item.personal_distress ?? 0,
            };
          } else if (currentTest.name.includes("CSI") || currentTest.name.includes("Communication Styles")) {
            return {
              ...base,
              EXP: item.expressiveness ?? 0,
              PRE: item.preciseness ?? 0,
              VAG: item.verbal_aggressiveness ?? 0,
              QUE: item.questioningness ?? 0,
              EMO: item.emotionality ?? 0,
              IMP: item.impression_manipulativeness ?? 0,
            };
          }
          return base;
        });

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

    if (availableTests.length > 0) {
      fetchProfiles();
    }
    return () => {
      isMounted = false;
    };
  }, [activeTest, availableTests]);

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

  const currentTraits = React.useMemo(() => {
    const currentTest = availableTests.find(
      (test) => test.name.toLowerCase().replace(/\s+/g, '-') === activeTest || test.name === activeTest
    );
    if (currentTest?.name.includes("HEXACO")) {
      return HEXACO_TRAITS;
    } else if (currentTest?.name.includes("IRI") || currentTest?.name.includes("Interpersonal Reactivity")) {
      return IRI_TRAITS;
    } else if (currentTest?.name.includes("CSI") || currentTest?.name.includes("Communication Styles")) {
      return CSI_TRAITS;
    }
    return HEXACO_TRAITS; // Default fallback
  }, [activeTest, availableTests]);

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

      const baseRow = {
        id: mainRowId,
        isMainRow: true,
        modelFamily: latest?.modelFamily ?? "Unknown",
        model: latest?.model ?? "Unknown model",
        versionLabel: actualVersion,
        displayVersion: latest?.isLatest ? "Latest" : actualVersion,
        actualVersion,
        modelVersionId: latest?.modelVersionId ?? latest?.id,
        isLatest: Boolean(latest?.isLatest),
        hasVersions: data.versions.length >= 1,
        versions: [...data.versions],
      };

      // Add trait values based on active test
      currentTraits.forEach(trait => {
        baseRow[trait] = latest?.[trait] ?? 0;
      });

      return baseRow;
    });
    return mainRows.sort((a, b) => {
      const famCompare = String(a.modelFamily).localeCompare(String(b.modelFamily));
      if (famCompare !== 0) return famCompare;
      return String(a.model).localeCompare(String(b.model));
    });
  }, [allRows, modelFamilyFilter, activeTest, currentTraits]);

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
          const versionId = v.modelVersionId ?? `${v.modelFamily}-${v.model}-${v.version}`;
          const isSelected = selectedVersions.has(versionId);
          if (isExpanded || isSelected) {
            const versionLabel = v.version ?? "—";
            const versionRow = {
              id: versionId,
              isMainRow: false,
              parentId: mainRow.id,
              modelFamily: v.modelFamily,
              model: v.model,
              versionLabel,
              displayVersion: v.isLatest ? "Latest" : versionLabel,
              actualVersion: v.version,
              isLatest: Boolean(v.isLatest),
              vFirst: idx === 0,
              vLast: idx === versions.length - 1,
            };

            // Add trait values
            currentTraits.forEach(trait => {
              versionRow[trait] = v[trait];
            });

            data.push(versionRow);
          }
        });
      }
    });
    return data;
  }, [sortedMainRows, expandedModels, selectedVersions, currentTraits]);

  const chartRows = React.useMemo(() => {
    const selectedVersionRows = rows.filter((r) => !r.isMainRow && selectedVersions.has(r.id));
    if (selectedVersionRows.length > 0) return selectedVersionRows;
    if (selectedRow) return [selectedRow];
    return [];
  }, [rows, selectedVersions, selectedRow]);

  const chartColors = ["#64748b", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6", "#f97316", "#06b6d4", "#84cc16"];

  const radarData = React.useMemo(() => {
    if (chartRows.length === 0) return [];

    // Sort traits by label length
    const traitsWithLabels = currentTraits.map(trait => ({
      trait,
      label: TRAIT_LABELS[trait] || trait,
      length: (TRAIT_LABELS[trait] || trait).length
    }));
    traitsWithLabels.sort((a, b) => b.length - a.length);

    // Distribute labels optimally based on radar position
    // With startAngle=90: index 0 = top (12 o'clock), index n/2 = bottom (6 o'clock)
    // Top and bottom have the most vertical space for long labels
    const optimizedOrder = new Array(currentTraits.length);

    // Place longest labels at top and bottom
    optimizedOrder[0] = traitsWithLabels[0].trait; // Top - longest
    if (traitsWithLabels.length > 1) {
      const bottomIndex = Math.floor(traitsWithLabels.length / 2);
      optimizedOrder[bottomIndex] = traitsWithLabels[1].trait; // Bottom - 2nd longest
    }

    // Fill remaining positions with remaining labels (alternating pattern)
    let remainingIdx = 2;
    for (let i = 1; i < optimizedOrder.length; i++) {
      if (!optimizedOrder[i]) {
        optimizedOrder[i] = traitsWithLabels[remainingIdx].trait;
        remainingIdx++;
      }
    }

    const allData = [];
    optimizedOrder.forEach((trait) => {
      const d = { trait: TRAIT_LABELS[trait] || trait };
      chartRows.forEach((row) => {
        const key = `${row.model}-${row.actualVersion ?? row.versionLabel}`;
        d[key] = row[trait] ?? 0;
      });
      allData.push(d);
    });
    return allData;
  }, [chartRows, currentTraits]);

  const maxDomain = React.useMemo(() => {
    const currentTest = availableTests.find(
      (test) => test.name.toLowerCase().replace(/\s+/g, '-') === activeTest || test.name === activeTest
    );
    return currentTest?.scaleMax ?? 5; // Default to 5 if not found
  }, [activeTest, availableTests]);

  const minDomain = React.useMemo(() => {
    const currentTest = availableTests.find(
      (test) => test.name.toLowerCase().replace(/\s+/g, '-') === activeTest || test.name === activeTest
    );
    return currentTest?.scaleMin ?? 0; // Default to 0 if not found
  }, [activeTest, availableTests]);

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
    return <div className="st-loading">Loading profiles…</div>;
  }

  if (error) {
    return <div className="st-error">Failed to load profiles: {error}</div>;
  }

  return (
    <div>
      {/* Page-level tabs for Models (Tools hidden for now) */}
      <div className="g-tabs">
        <button
          className={`g-tab-bttn ${activeTab === "models" ? "active" : ""}`}
          onClick={() => setActiveTab("models")}
          type="button"
        >
          Models
        </button>
      </div>

      {/* Test selection buttons */}
      {activeTab === "models" && (
        <div style={{ paddingTop: "16px", paddingLeft: "16px", paddingRight: "16px", display: "flex", gap: "12px", background: "var(--bg)", flexWrap: "wrap" }}>
          {testsLoading ? (
            <div style={{ color: "var(--muted)" }}>Loading tests...</div>
          ) : availableTests.length === 0 ? (
            <div style={{ color: "var(--muted)" }}>No tests available</div>
          ) : (
            availableTests.map((test) => {
              // Create a short ID from the test name for comparison
              const testId = test.name.toLowerCase().replace(/\s+/g, '-');
              const isActive = activeTest === testId || activeTest === test.name;

              return (
                <button
                  key={test.id}
                  className={`st-btn ${isActive ? "st-btn-active" : ""}`}
                  onClick={() => setActiveTest(testId)}
                  type="button"
                  title={test.description || test.name}
                >
                  {test.name}
                </button>
              );
            })
          )}
        </div>
      )}

      {activeTab === "models" && (() => {
        // Find the current test to determine if it has data
        const currentTest = availableTests.find(
          (test) => test.name.toLowerCase().replace(/\s+/g, '-') === activeTest || test.name === activeTest
        );
        // Show table if we have a test with HEXACO, IRI, or CSI data
        return currentTest && (currentTest.name.includes("HEXACO") || currentTest.name.includes("IRI") || currentTest.name.includes("Interpersonal Reactivity") || currentTest.name.includes("CSI") || currentTest.name.includes("Communication Styles"));
      })() && (
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
                  {currentTraits.map(trait => (
                    <th key={trait}>{TRAIT_LABELS[trait]} ({trait})</th>
                  ))}
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
                        {isMainRow
                          ? r.displayVersion ?? r.versionLabel ?? "—"
                          : r.versionLabel ?? "—"}
                      </td>
                      {currentTraits.map(trait => (
                        <td key={trait}>{r[trait] ?? "—"}</td>
                      ))}
                    </tr>
                  );
                })}
                {!rows.length && (
                  <tr>
                    <td colSpan={4 + currentTraits.length} style={{ textAlign: "center", height: 64 }}>No data</td>
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
                    <RadarChart cx="50%" cy="50%" outerRadius="60%" data={radarData} startAngle={90} endAngle={-270}>
                      <PolarGrid gridType="polygon" />
                      <PolarAngleAxis
                        dataKey="trait"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => {
                          // Wrap long labels if needed
                          if (value.length > 15) {
                            const words = value.split(' ');
                            if (words.length > 1) {
                              const mid = Math.ceil(words.length / 2);
                              return words.slice(0, mid).join(' ') + '\n' + words.slice(mid).join(' ');
                            }
                          }
                          return value;
                        }}
                      />
                      <PolarRadiusAxis domain={[minDomain, maxDomain]} />
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

      {activeTab === "models" && (() => {
        // Find the current test to determine if it has data
        const currentTest = availableTests.find(
          (test) => test.name.toLowerCase().replace(/\s+/g, '-') === activeTest || test.name === activeTest
        );
        // Show "coming soon" for tests without data structure implemented
        return currentTest && !(currentTest.name.includes("HEXACO") || currentTest.name.includes("IRI") || currentTest.name.includes("Interpersonal Reactivity") || currentTest.name.includes("CSI") || currentTest.name.includes("Communication Styles"));
      })() && (
        <div className="st-layout st-layout-no-sidebar" style={{ padding: "40px", textAlign: "center", color: "var(--muted)" }}>
          <h3>{(() => {
            const currentTest = availableTests.find(
              (test) => test.name.toLowerCase().replace(/\s+/g, '-') === activeTest || test.name === activeTest
            );
            return currentTest?.name || "Test";
          })()}</h3>
          <p>Data coming soon...</p>
        </div>
      )}
    </div>
  );
}
