// src/components/StandardizeTest.tsx
import "../styles/StandardizeTest.css";
import React, { useState, useEffect, useMemo, useRef, MouseEvent, KeyboardEvent, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import type { ApiResponse, ConversationalTest } from "../types/api";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5001/api";
const HEXACO_TRAITS = ["H", "E", "X", "A", "C", "O"] as const;
const IRI_TRAITS = ["PT", "FS", "EC", "PD"] as const;
const CSI_TRAITS = ["EXP", "PRE", "VAG", "QUE", "EMO", "IMP"] as const;

type HEXACOTrait = typeof HEXACO_TRAITS[number];
type IRITrait = typeof IRI_TRAITS[number];
type CSITrait = typeof CSI_TRAITS[number];
type Trait = HEXACOTrait | IRITrait | CSITrait;

const TRAIT_LABELS: Record<string, string> = {
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

interface ProfileResponse {
  id: string;
  model_version_id?: string;
  model_id?: string | null;
  model_family?: string | null;
  model_name?: string | null;
  version?: string | null;
  is_latest?: boolean;
  release_date?: string | null;
  // HEXACO traits
  honesty_humility?: number | null;
  emotionality?: number | null;
  extraversion?: number | null;
  agreeableness?: number | null;
  conscientiousness?: number | null;
  openness?: number | null;
  // IRI traits
  perspective_taking?: number | null;
  fantasy?: number | null;
  empathic_concern?: number | null;
  personal_distress?: number | null;
  // CSI traits
  expressiveness?: number | null;
  preciseness?: number | null;
  verbal_aggressiveness?: number | null;
  questioningness?: number | null;
  impression_manipulativeness?: number | null;
}

interface NormalizedProfile {
  id: string;
  modelVersionId: string;
  modelId: string | null;
  modelFamily: string;
  model: string;
  version: string;
  isLatest: boolean;
  releaseDate: string | null;
  [key: string]: string | number | boolean | null;
}

interface MainRow extends NormalizedProfile {
  isMainRow: true;
  versionLabel: string;
  displayVersion: string;
  actualVersion: string;
  hasVersions: boolean;
  versions: NormalizedProfile[];
}

interface VersionRow extends NormalizedProfile {
  isMainRow: false;
  parentId: string;
  versionLabel: string;
  displayVersion: string;
  actualVersion: string;
  vFirst: boolean;
  vLast: boolean;
}

type TableRow = MainRow | VersionRow;

interface RadarDataPoint {
  trait: string;
  [key: string]: string | number;
}

interface MenuPosition {
  left: number;
  top: number;
}

export default function ConversationalProfile() {
  const [activeTab, setActiveTab] = useState<string>("models");
  const [activeTest, setActiveTest] = useState<string>("hexaco");
  const [expandedModels, setExpandedModels] = useState<Set<string>>(() => new Set());
  const [selectedRow, setSelectedRow] = useState<TableRow | null>(null);
  const [selectedVersions, setSelectedVersions] = useState<Set<string>>(() => new Set());
  const [modelFamilyFilter, setModelFamilyFilter] = useState<string[]>([]);
  const [mfMenuOpen, setMfMenuOpen] = useState<boolean>(false);
  const [mfMenuPos, setMfMenuPos] = useState<MenuPosition>({ left: 0, top: 0 });
  const mfBtnRef = useRef<HTMLButtonElement | null>(null);
  const mfMenuRef = useRef<HTMLDivElement | null>(null);
  const [profiles, setProfiles] = useState<NormalizedProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [availableTests, setAvailableTests] = useState<ConversationalTest[]>([]);
  const [testsLoading, setTestsLoading] = useState<boolean>(true);

  // Fetch available tests on mount
  useEffect(() => {
    let isMounted = true;

    const fetchTests = async (): Promise<void> => {
      try {
        setTestsLoading(true);
        const res = await fetch(`${API_BASE}/current/conversational-profiles/tests`);
        if (!res.ok) {
          throw new Error("Failed to load tests");
        }
        const payload: ApiResponse<ConversationalTest[]> = await res.json();

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

  useEffect(() => {
    let isMounted = true;

    const fetchProfiles = async (): Promise<void> => {
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
        const payload: ApiResponse<ProfileResponse[]> = await res.json();

        const normalized: NormalizedProfile[] = (payload.data ?? []).map((item) => {
          const base: NormalizedProfile = {
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
          setError(err instanceof Error ? err.message : "Unable to load data");
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

  const allRows = useMemo(() => [...profiles], [profiles]);
  const modelFamilies = useMemo(() => {
    return Array.from(
      new Set(allRows.map((row) => row.modelFamily).filter(Boolean)),
    ).sort((a, b) => String(a).localeCompare(String(b)));
  }, [allRows]);

  const selectRow = (rowData: TableRow): void => {
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

  const toggleVersion = (versionId: string): void => {
    setSelectedVersions((prev) => {
      const next = new Set(prev);
      next.has(versionId) ? next.delete(versionId) : next.add(versionId);
      return next;
    });
  };

  const clearSelection = (): void => {
    setSelectedRow(null);
    setSelectedVersions(new Set());
  };

  const currentTraits = useMemo<readonly string[]>(() => {
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

  const sortedMainRows = useMemo<MainRow[]>(() => {
    let filtered = [...allRows];
    if (modelFamilyFilter.length > 0) {
      filtered = filtered.filter((r) => modelFamilyFilter.includes(String(r.modelFamily)));
    }
    const modelMap: Record<string, { latest: NormalizedProfile | null; versions: NormalizedProfile[] }> = {};
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
    const mainRows: MainRow[] = Object.entries(modelMap).map(([key, data]) => {
      const latest = data.latest ?? data.versions[0];
      const mainRowId = `main-${key}`;
      const actualVersion = latest?.version ?? "—";

      const baseRow: MainRow = {
        id: mainRowId,
        isMainRow: true,
        modelFamily: latest?.modelFamily ?? "Unknown",
        model: latest?.model ?? "Unknown model",
        versionLabel: String(actualVersion),
        displayVersion: latest?.isLatest ? "Latest" : String(actualVersion),
        actualVersion: String(actualVersion),
        modelVersionId: latest?.modelVersionId ?? latest?.id ?? "",
        modelId: latest?.modelId ?? null,
        version: latest?.version ?? "—",
        isLatest: Boolean(latest?.isLatest),
        releaseDate: latest?.releaseDate ?? null,
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
  }, [allRows, modelFamilyFilter, currentTraits]);

  const rows = useMemo<TableRow[]>(() => {
    const data: TableRow[] = [];
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
            const versionRow: VersionRow = {
              id: versionId,
              isMainRow: false,
              parentId: mainRow.id,
              modelFamily: String(v.modelFamily),
              model: String(v.model),
              modelId: v.modelId,
              modelVersionId: v.modelVersionId,
              version: String(v.version),
              versionLabel: String(versionLabel),
              displayVersion: v.isLatest ? "Latest" : String(versionLabel),
              actualVersion: String(v.version),
              isLatest: Boolean(v.isLatest),
              releaseDate: v.releaseDate,
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

  const chartRows = useMemo(() => {
    const selectedVersionRows = rows.filter((r): r is VersionRow => !r.isMainRow && selectedVersions.has(r.id));
    if (selectedVersionRows.length > 0) return selectedVersionRows;
    if (selectedRow) return [selectedRow];
    return [];
  }, [rows, selectedVersions, selectedRow]);

  const chartColors = ["#64748b", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6", "#f97316", "#06b6d4", "#84cc16"];

  const radarData = useMemo<RadarDataPoint[]>(() => {
    if (chartRows.length === 0) return [];

    // Sort traits by label length
    const traitsWithLabels = currentTraits.map(trait => ({
      trait,
      label: TRAIT_LABELS[trait] || trait,
      length: (TRAIT_LABELS[trait] || trait).length
    }));
    traitsWithLabels.sort((a, b) => b.length - a.length);

    // Distribute labels optimally based on radar position
    const optimizedOrder: string[] = new Array(currentTraits.length);

    // Place longest labels at top and bottom
    optimizedOrder[0] = traitsWithLabels[0].trait;
    if (traitsWithLabels.length > 1) {
      const bottomIndex = Math.floor(traitsWithLabels.length / 2);
      optimizedOrder[bottomIndex] = traitsWithLabels[1].trait;
    }

    // Fill remaining positions with remaining labels
    let remainingIdx = 2;
    for (let i = 1; i < optimizedOrder.length; i++) {
      if (!optimizedOrder[i]) {
        optimizedOrder[i] = traitsWithLabels[remainingIdx].trait;
        remainingIdx++;
      }
    }

    const allData: RadarDataPoint[] = [];
    optimizedOrder.forEach((trait) => {
      const d: RadarDataPoint = { trait: TRAIT_LABELS[trait] || trait };
      chartRows.forEach((row) => {
        const key = `${row.model}-${row.actualVersion ?? row.versionLabel}`;
        d[key] = Number(row[trait] ?? 0);
      });
      allData.push(d);
    });
    return allData;
  }, [chartRows, currentTraits]);

  const maxDomain = useMemo(() => {
    const currentTest = availableTests.find(
      (test) => test.name.toLowerCase().replace(/\s+/g, '-') === activeTest || test.name === activeTest
    );
    return currentTest?.scaleMax ?? 5;
  }, [activeTest, availableTests]);

  const minDomain = useMemo(() => {
    const currentTest = availableTests.find(
      (test) => test.name.toLowerCase().replace(/\s+/g, '-') === activeTest || test.name === activeTest
    );
    return currentTest?.scaleMin ?? 0;
  }, [activeTest, availableTests]);

  useEffect(() => {
    if (selectedRow && !rows.some((r) => r.id === selectedRow.id)) {
      clearSelection();
    }
  }, [rows, selectedRow]);

  useEffect(() => {
    const onDocClick = (e: Event): void => {
      if (!mfMenuOpen) return;
      const withinBtn = mfBtnRef.current && mfBtnRef.current.contains(e.target as Node);
      const withinMenu = mfMenuRef.current && mfMenuRef.current.contains(e.target as Node);
      if (!withinBtn && !withinMenu) setMfMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setMfMenuOpen(false);
    };
    const onScroll = (): void => setMfMenuOpen(false);
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey as any);
    window.addEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions);
    window.addEventListener("resize", onScroll);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey as any);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [mfMenuOpen]);

  const toggleRow = (id: string): void => {
    setExpandedModels((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const openMfMenu = (): void => {
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
        const currentTest = availableTests.find(
          (test) => test.name.toLowerCase().replace(/\s+/g, '-') === activeTest || test.name === activeTest
        );
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
                      className={`st-row ${isVersionRow ? "st-row-version" : "st-row-main"} ${isOpen ? "open" : ""} ${isVersionRow && (isSelected || isVersionSelected) ? "selected" : ""} ${!isMainRow && r.vFirst ? "st-vfirst" : ""} ${!isMainRow && r.vLast ? "st-vlast" : ""}`}
                      onClick={() => {
                        if (isMainRow) {
                          if (r.hasVersions) {
                            toggleRow(r.id);
                          }
                        } else {
                          selectRow(r);
                        }
                      }}
                      onKeyDown={(e: React.KeyboardEvent) => {
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
                            : String(r.model)
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
                        tickFormatter={(value: string) => {
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
                  <label key={mf} className={`st-hmenu-item st-hmenu-checkbox ${modelFamilyFilter.includes(String(mf)) ? "active" : ""}`} role="menuitem">
                    <input
                      type="checkbox"
                      checked={modelFamilyFilter.includes(String(mf))}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (e.target.checked) {
                          setModelFamilyFilter([...modelFamilyFilter, String(mf)]);
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
        const currentTest = availableTests.find(
          (test) => test.name.toLowerCase().replace(/\s+/g, '-') === activeTest || test.name === activeTest
        );
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
