import { useEffect, useMemo, useState, useRef, ChangeEvent, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import type { ApiResponse, TechProfile, TechProfileAnswer } from '../types/api';
import type { FilterState, QuestionDefinition } from '../types/components';
import '../styles/TechnicalProfile.css';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5001/api';

interface DotProps {
  on: boolean;
}

function Dot({ on }: DotProps) {
  return <span className={`dot ${on ? 'on' : 'off'}`} aria-label={on ? 'yes' : 'no'} />;
}

interface ValueDisplayProps {
  answer: TechProfileAnswer | undefined;
}

function ValueDisplay({ answer }: ValueDisplayProps) {
  if (!answer) return <span>—</span>;

  const type = (answer.type ?? '').toLowerCase();
  const value = answer.value;

  if (type === 'boolean') {
    return <Dot on={Boolean(value)} />;
  }

  if (type === 'list' && Array.isArray(value)) {
    return <div className="list-value">{value.join(', ')}</div>;
  }

  return <span>{value ?? '—'}</span>;
}

interface ProfilesByType {
  tools: TechProfile[];
  modelVersions: TechProfile[];
}

interface MenuPosition {
  left: number;
  top: number;
}

interface GroupedModelVersion {
  id: string;
  isMainRow: true;
  modelFamily: string;
  model: string;
  version: string;
  displayVersion: string;
  isLatest: boolean;
  hasVersions: boolean;
  versions: TechProfile[];
  answers: Record<string, TechProfileAnswer>;
  originalProfile: TechProfile;
}

interface VersionRow {
  id: string;
  isMainRow: false;
  isVersionRow: true;
  parentId: string;
  modelFamily: string;
  model: string;
  version: string;
  displayVersion: string;
  isLatest: boolean;
  answers: Record<string, TechProfileAnswer>;
  originalProfile: TechProfile;
  vFirst: boolean;
  vLast: boolean;
}

type FlattenedRow = GroupedModelVersion | VersionRow;

export default function TechnicalProfile() {
  const [activeTab, setActiveTab] = useState<'tools' | 'modelVersions'>('tools');
  const [query, setQuery] = useState<string>('');
  const [filters, setFilters] = useState<FilterState>({
    android_support: false,
    ios_support: false,
    web_support: false,
    free_tier: false,
    crisis_detection: false,
    mood_tracking: false,
    hipaa_compliant: false,
    multimodal: false,
    open_source: false,
    function_calling: false,
    code_generation: false,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [profilesByType, setProfilesByType] = useState<ProfilesByType>({ tools: [], modelVersions: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [expandedModels, setExpandedModels] = useState<Set<string>>(() => new Set());
  const [modelFamilyFilter, setModelFamilyFilter] = useState<string[]>([]);
  const [mfMenuOpen, setMfMenuOpen] = useState<boolean>(false);
  const [mfMenuPos, setMfMenuPos] = useState<MenuPosition>({ left: 0, top: 0 });
  const mfBtnRef = useRef<HTMLButtonElement | null>(null);
  const mfMenuRef = useRef<HTMLDivElement | null>(null);

  const tabKey = activeTab;

  useEffect(() => {
    let isMounted = true;

    async function fetchProfiles(): Promise<void> {
      try {
        setLoading(true);

        const [toolsRes, modelsRes] = await Promise.all([
          fetch(`${API_BASE}/current/tech-profiles/display?entityType=tool_configuration`),
          fetch(`${API_BASE}/current/tech-profiles/display?entityType=model_version`),
        ]);

        if (!toolsRes.ok || !modelsRes.ok) {
          throw new Error('Failed to load technical profiles');
        }

        const toolsData: ApiResponse<TechProfile[]> = await toolsRes.json();
        const modelsData: ApiResponse<TechProfile[]> = await modelsRes.json();

        if (isMounted) {
          setProfilesByType({
            tools: toolsData.data ?? [],
            modelVersions: modelsData.data ?? [],
          });
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unable to load technical profiles');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchProfiles();
    return () => {
      isMounted = false;
    };
  }, []);

  const rawProfiles = useMemo<TechProfile[]>(() => {
    const source = profilesByType[tabKey] ?? [];
    if (tabKey === 'modelVersions') {
      return [...source].sort((a, b) => {
        const aDate = a.release_date ? new Date(a.release_date) : null;
        const bDate = b.release_date ? new Date(b.release_date) : null;
        if (aDate && bDate) return bDate.getTime() - aDate.getTime();
        if (aDate) return -1;
        if (bDate) return 1;
        return (b.version ?? '').localeCompare(a.version ?? '');
      });
    }
    return source;
  }, [profilesByType, tabKey]);

  const modelFamilies = useMemo<string[]>(() => {
    if (tabKey !== 'modelVersions') return [];
    const families = rawProfiles.map(p => p.model_family ?? p.developer ?? 'Unknown');
    return Array.from(new Set(families)).filter(Boolean).sort((a, b) => a.localeCompare(b));
  }, [rawProfiles, tabKey]);

  const groupedModelVersions = useMemo<GroupedModelVersion[]>(() => {
    if (tabKey !== 'modelVersions') return [];

    let filtered = [...rawProfiles];

    if (modelFamilyFilter.length > 0) {
      filtered = filtered.filter(p => {
        const family = p.model_family ?? p.developer ?? 'Unknown';
        return modelFamilyFilter.includes(family);
      });
    }

    const term = query.toLowerCase();
    if (term) {
      filtered = filtered.filter(p => {
        return (p.name ?? '').toLowerCase().includes(term) ||
               (p.developer ?? '').toLowerCase().includes(term) ||
               (p.version ?? '').toLowerCase().includes(term) ||
               (p.model_family ?? '').toLowerCase().includes(term);
      });
    }

    if (filters.multimodal) {
      filtered = filtered.filter(p => p.answers?.multimodal?.value);
    }
    if (filters.open_source) {
      filtered = filtered.filter(p => p.answers?.open_source?.value);
    }
    if (filters.function_calling) {
      filtered = filtered.filter(p => p.answers?.function_calling?.value);
    }
    if (filters.code_generation) {
      filtered = filtered.filter(p => p.answers?.code_generation?.value);
    }

    const modelMap: Record<string, { latest: TechProfile | null; versions: TechProfile[] }> = {};
    filtered.forEach(v => {
      const family = v.model_family ?? v.developer ?? 'Unknown';
      const modelName = v.name ?? 'Unknown';
      const key = `${family}-${modelName}`;

      if (!modelMap[key]) {
        modelMap[key] = { latest: null, versions: [] };
      }

      modelMap[key].versions.push(v);

      const candidate = modelMap[key].latest;
      if (!candidate || v.is_latest ||
          (!candidate.is_latest && String(v.version ?? '').localeCompare(String(candidate.version ?? '')) > 0)) {
        modelMap[key].latest = v;
      }
    });

    const mainRows: GroupedModelVersion[] = Object.entries(modelMap).map(([key, data]) => {
      const latest = data.latest ?? data.versions[0];
      const mainRowId = `main-${key}`;

      return {
        id: mainRowId,
        isMainRow: true,
        modelFamily: latest?.model_family ?? latest?.developer ?? 'Unknown',
        model: latest?.name ?? 'Unknown',
        version: latest?.version ?? '—',
        displayVersion: latest?.is_latest ? 'Latest' : (latest?.version ?? '—'),
        isLatest: Boolean(latest?.is_latest),
        hasVersions: data.versions.length > 1,
        versions: [...data.versions].sort((a, b) =>
          String(b.version ?? '').localeCompare(String(a.version ?? ''))
        ),
        answers: latest?.answers ?? {},
        originalProfile: latest
      };
    });

    return mainRows.sort((a, b) => {
      const famCompare = String(a.modelFamily).localeCompare(String(b.modelFamily));
      if (famCompare !== 0) return famCompare;
      return String(a.model).localeCompare(String(b.model));
    });
  }, [rawProfiles, tabKey, modelFamilyFilter, query, filters]);

  const questionCatalogByTab = useMemo<Record<string, QuestionDefinition[]>>(() => {
    const catalogMaps: Record<string, Map<string, QuestionDefinition>> = {
      tools: new Map(),
      modelVersions: new Map(),
    };

    const registerQuestion = (targetTab: string, key: string, answer: TechProfileAnswer): void => {
      if (!key || !answer) return;

      const map = catalogMaps[targetTab];
      if (!map) return;

      const existing = map.get(key);
      const displayOrder = answer.display_order ?? Number.MAX_SAFE_INTEGER;

      if (!existing || displayOrder < existing.displayOrder) {
        map.set(key, {
          key,
          category: answer.category ?? 'Other',
          questionText: answer.question_text ?? key,
          questionLabel: answer.question_label ?? answer.question_text ?? key,
          questionType: (answer.question_type ?? answer.type ?? 'text').toLowerCase(),
          displayOrder,
        });
      }
    };

    const processProfiles = (profiles: TechProfile[], defaultTab: string): void => {
      (profiles ?? []).forEach((profile) => {
        Object.entries(profile.answers ?? {}).forEach(([key, answer]) => {
          if (!answer) return;

          const entityType = answer.entity_type ?? defaultTab;
          const targets =
            entityType === 'both'
              ? ['tools', 'modelVersions']
              : entityType === 'tool_configuration'
              ? ['tools']
              : entityType === 'model_version'
              ? ['modelVersions']
              : [defaultTab];

          targets.forEach((tab) => registerQuestion(tab, key, answer));
        });
      });
    };

    processProfiles(profilesByType.tools, 'tools');
    processProfiles(profilesByType.modelVersions, 'modelVersions');

    return {
      tools: Array.from(catalogMaps.tools.values()).sort((a, b) => a.displayOrder - b.displayOrder),
      modelVersions: Array.from(catalogMaps.modelVersions.values()).sort(
        (a, b) => a.displayOrder - b.displayOrder,
      ),
    };
  }, [profilesByType]);

  const questionCatalog = questionCatalogByTab[tabKey] ?? [];

  const categories = useMemo<string[]>(() => {
    const unique = new Set(questionCatalog.map((q) => q.category));
    return ['all', ...unique];
  }, [questionCatalog]);

  const filteredProfiles = useMemo<TechProfile[]>(() => {
    const term = query.toLowerCase();

    return rawProfiles
      .filter((profile) => {
        const nameMatch =
          (profile.name ?? '').toLowerCase().includes(term) ||
          (profile.tool_name ?? '').toLowerCase().includes(term) ||
          (profile.base_model_name ?? '').toLowerCase().includes(term) ||
          (profile.developer ?? '').toLowerCase().includes(term) ||
          (profile.version ?? '').toLowerCase().includes(term);

        if (!nameMatch) return false;

        if (tabKey === 'tools') {
          if (filters.android_support && !profile.answers?.android_support?.value) return false;
          if (filters.ios_support && !profile.answers?.ios_support?.value) return false;
          if (filters.web_support && !profile.answers?.web_support?.value) return false;
          if (filters.free_tier && !profile.answers?.free_tier?.value) return false;
          if (filters.crisis_detection && !profile.answers?.crisis_detection?.value) return false;
          if (filters.mood_tracking && !profile.answers?.mood_tracking?.value) return false;
          if (filters.hipaa_compliant && !profile.answers?.hipaa_compliant?.value) return false;
        } else {
          if (filters.multimodal && !profile.answers?.multimodal?.value) return false;
          if (filters.open_source && !profile.answers?.open_source?.value) return false;
          if (filters.function_calling && !profile.answers?.function_calling?.value) return false;
          if (filters.code_generation && !profile.answers?.code_generation?.value) return false;
        }

        return true;
      });
  }, [rawProfiles, query, filters, tabKey]);

  const displayQuestions = useMemo<QuestionDefinition[]>(() => {
    return questionCatalog.filter((q) => selectedCategory === 'all' || q.category === selectedCategory);
  }, [questionCatalog, selectedCategory]);

  const flattenedModelVersionRows = useMemo<FlattenedRow[]>(() => {
    if (tabKey !== 'modelVersions') return [];

    const rows: FlattenedRow[] = [];
    groupedModelVersions.forEach(mainRow => {
      rows.push(mainRow);

      if (mainRow.hasVersions && expandedModels.has(mainRow.id)) {
        mainRow.versions.forEach((v, idx) => {
          rows.push({
            id: `${mainRow.id}-v-${v.id ?? idx}`,
            isMainRow: false,
            isVersionRow: true,
            parentId: mainRow.id,
            modelFamily: v.model_family ?? v.developer ?? 'Unknown',
            model: v.name ?? 'Unknown',
            version: v.version ?? '—',
            displayVersion: v.version ?? '—',
            isLatest: Boolean(v.is_latest),
            answers: v.answers ?? {},
            originalProfile: v,
            vFirst: idx === 0,
            vLast: idx === mainRow.versions.length - 1
          });
        });
      }
    });

    return rows;
  }, [groupedModelVersions, expandedModels, tabKey]);

  const toggleFilter = (key: keyof FilterState): void => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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

  useEffect(() => {
    if (!mfMenuOpen) return;

    const onDocClick = (e: Event): void => {
      const withinBtn = mfBtnRef.current && mfBtnRef.current.contains(e.target as Node);
      const withinMenu = mfMenuRef.current && mfMenuRef.current.contains(e.target as Node);
      if (!withinBtn && !withinMenu) setMfMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setMfMenuOpen(false);
    };
    const onScroll = (): void => setMfMenuOpen(false);

    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey as any);
    window.addEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions);
    window.addEventListener('resize', onScroll);

    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey as any);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [mfMenuOpen]);

  if (loading) {
    return <div className="technical-profiles-loading">Loading technical profiles…</div>;
  }

  if (error) {
    return <div className="technical-profiles-error">Failed to load profiles: {error}</div>;
  }

  return (
    <>
      <div className="g-tabs">
        <button
          className={`g-tab-bttn ${tabKey === 'tools' ? 'active' : ''}`}
          onClick={() => setActiveTab('tools')}
        >
          Tools
        </button>
        <button
          className={`g-tab-bttn ${tabKey === 'modelVersions' ? 'active' : ''}`}
          onClick={() => setActiveTab('modelVersions')}
        >
          Model Versions
        </button>
      </div>

      <div className="layout">
        <aside className="sidebar island">
          <div className="search-island">
            <input
              value={query}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              placeholder={
                tabKey === 'tools'
                  ? 'Search by tool, model, or configuration name'
                  : 'Search by model name, developer, or version'
              }
              className="search-input"
            />
          </div>

          <h3 className="sidebar-title">Search Filters</h3>

          {tabKey === 'tools' ? (
            <>
              <div className="filter-group">
                <div className="filter-heading">Platforms</div>
                {[
                  { key: 'android_support' as keyof FilterState, label: 'Android' },
                  { key: 'ios_support' as keyof FilterState, label: 'iOS' },
                  { key: 'web_support' as keyof FilterState, label: 'Web' },
                ].map(({ key, label }) => (
                  <label key={key} className="filter-item">
                    <input
                      type="checkbox"
                      checked={filters[key]}
                      onChange={() => toggleFilter(key)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>

              <div className="filter-group">
                <div className="filter-heading">Cost</div>
                <label className="filter-item">
                  <input
                    type="checkbox"
                    checked={filters.free_tier}
                    onChange={() => toggleFilter('free_tier')}
                  />
                  <span>Free tier</span>
                </label>
              </div>

              <div className="filter-group">
                <div className="filter-heading">Mental Health</div>
                {[
                  { key: 'crisis_detection' as keyof FilterState, label: 'Crisis detection' },
                  { key: 'mood_tracking' as keyof FilterState, label: 'Mood tracking' },
                ].map(({ key, label }) => (
                  <label key={key} className="filter-item">
                    <input
                      type="checkbox"
                      checked={filters[key]}
                      onChange={() => toggleFilter(key)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>

              <div className="filter-group">
                <div className="filter-heading">Compliance</div>
                <label className="filter-item">
                  <input
                    type="checkbox"
                    checked={filters.hipaa_compliant}
                    onChange={() => toggleFilter('hipaa_compliant')}
                  />
                  <span>HIPAA compliant</span>
                </label>
              </div>
            </>
          ) : (
            <>
              <div className="filter-group">
                <div className="filter-heading">Architecture</div>
                <label className="filter-item">
                  <input
                    type="checkbox"
                    checked={filters.multimodal}
                    onChange={() => toggleFilter('multimodal')}
                  />
                  <span>Multimodal</span>
                </label>
              </div>

              <div className="filter-group">
                <div className="filter-heading">Capabilities</div>
                {[
                  { key: 'function_calling' as keyof FilterState, label: 'Function calling' },
                  { key: 'code_generation' as keyof FilterState, label: 'Code generation' },
                ].map(({ key, label }) => (
                  <label key={key} className="filter-item">
                    <input
                      type="checkbox"
                      checked={filters[key]}
                      onChange={() => toggleFilter(key)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>

              <div className="filter-group">
                <div className="filter-heading">Licensing</div>
                <label className="filter-item">
                  <input
                    type="checkbox"
                    checked={filters.open_source}
                    onChange={() => toggleFilter('open_source')}
                  />
                  <span>Open Source</span>
                </label>
              </div>
            </>
          )}

          <div className="filter-group">
            <div className="filter-heading">Category View</div>
            <select
              className="category-select"
              value={selectedCategory}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </aside>

        <main className="content">
          <div className="island table-wrap">
            <table className="technical-profiles-table">
              <thead>
                <tr>
                  {tabKey === 'modelVersions' && <th rowSpan={2} style={{ width: 30 }}></th>}
                  <th rowSpan={2} className={tabKey === 'modelVersions' ? 'st-th-menu' : 'sticky-column'}>
                    {tabKey === 'modelVersions' ? (
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
                    ) : (
                      'Configuration'
                    )}
                  </th>
                  <th rowSpan={2} className={tabKey === 'modelVersions' ? '' : ''}>
                    {tabKey === 'tools' ? 'Base Model' : 'Model'}
                  </th>
                  {tabKey === 'modelVersions' && <th rowSpan={2}>Version</th>}
                  {displayQuestions.map((question, index) => {
                    const colSpan = displayQuestions.filter(
                      (dq) => dq.category === question.category,
                    ).length;
                    const firstInCategory =
                      displayQuestions.findIndex((dq) => dq.category === question.category) ===
                      index;

                    if (firstInCategory && colSpan > 1) {
                      return (
                        <th
                          key={`cat-${question.category}`}
                          colSpan={colSpan}
                          className="category-header"
                        >
                          {question.category}
                        </th>
                      );
                    }

                    if (!firstInCategory) return null;

                    return (
                      <th key={question.key} rowSpan={2} className="question-header">
                        {question.questionLabel}
                      </th>
                    );
                  })}
                </tr>
                <tr>
                  {displayQuestions.map((question) => {
                    const colSpan = displayQuestions.filter(
                      (dq) => dq.category === question.category,
                    ).length;

                    if (colSpan > 1) {
                      return (
                      <th key={`${question.key}-child`} className="question-header">
                        {question.questionLabel}
                        </th>
                      );
                    }

                    return null;
                  })}
                </tr>
              </thead>
              <tbody>
                {tabKey === 'tools' && filteredProfiles.map((profile) => {
                  const configTitle = profile.name ?? profile.tool_name;
                  const configSubtitle = (profile.developer || profile.tool_name)
                    ? `by ${profile.developer ?? profile.tool_name}`
                    : '';

                  return (
                    <tr key={profile.id}>
                      <td className="sticky-column">
                        <div className="app-cell">
                          <div className="app-title">{configTitle}</div>
                          {configSubtitle && <div className="app-desc">{configSubtitle}</div>}
                        </div>
                      </td>
                      <td>{profile.base_model_name}</td>
                      {displayQuestions.map((question) => {
                        const answer = profile.answers?.[question.key];
                        return (
                          <td
                            key={`${profile.id}-${question.key}`}
                            className={`answer-cell ${question.questionType}`}
                          >
                            <ValueDisplay answer={answer} />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}

                {tabKey === 'modelVersions' && flattenedModelVersionRows.map((row) => {
                  const isMainRow = row.isMainRow;
                  const isVersionRow = !isMainRow;
                  const isOpen = isMainRow && expandedModels.has(row.id);

                  return (
                    <tr
                      key={row.id}
                      className={`${isVersionRow ? 'st-row-version' : 'st-row-main'} ${isOpen ? 'open' : ''} ${!isMainRow && row.vFirst ? 'st-vfirst' : ''} ${!isMainRow && row.vLast ? 'st-vlast' : ''}`}
                      onClick={() => {
                        if (isMainRow && row.hasVersions) {
                          toggleRow(row.id);
                        }
                      }}
                      style={{ cursor: isMainRow && row.hasVersions ? 'pointer' : 'default' }}
                    >
                      <td>
                        {isMainRow && row.hasVersions ? (
                          <button
                            className={`st-expander ${expandedModels.has(row.id) ? 'open' : ''}`}
                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                              e.stopPropagation();
                              toggleRow(row.id);
                            }}
                            aria-label={`${expandedModels.has(row.id) ? 'Collapse' : 'Expand'} versions for ${row.model}`}
                            type="button"
                          >
                            ▸
                          </button>
                        ) : null}
                      </td>
                      <td>{row.modelFamily ?? '—'}</td>
                      <td>
                        <div className="app-cell">
                          <div className="app-title">{row.model ?? '—'}</div>
                        </div>
                      </td>
                      <td>{row.displayVersion ?? row.version ?? '—'}</td>
                      {displayQuestions.map((question) => {
                        const answer = row.answers?.[question.key];
                        return (
                          <td
                            key={`${row.id}-${question.key}`}
                            className={`answer-cell ${question.questionType}`}
                          >
                            <ValueDisplay answer={answer} />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {tabKey === 'tools' && filteredProfiles.length === 0 && (
              <div className="no-results">No configurations match your search criteria.</div>
            )}
            {tabKey === 'modelVersions' && flattenedModelVersionRows.length === 0 && (
              <div className="no-results">No model versions match your search criteria.</div>
            )}
          </div>

          {tabKey === 'modelVersions' && modelFamilyFilter.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              <button
                className="st-btn st-btn-ghost"
                onClick={() => setModelFamilyFilter([])}
                type="button"
              >
                Clear family filter ({modelFamilyFilter.length})
              </button>
            </div>
          )}
        </main>
      </div>

      {tabKey === 'modelVersions' && mfMenuOpen && createPortal(
        <div
          ref={mfMenuRef}
          className="st-hmenu st-hmenu-fixed"
          style={{ left: mfMenuPos.left, top: mfMenuPos.top }}
          role="menu"
        >
          <div className="st-hmenu-header">
            {modelFamilyFilter.length > 0 ? `Selected: ${modelFamilyFilter.length}` : 'Select families'}
          </div>
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
            {modelFamilyFilter.length === modelFamilies.length ? 'Deselect all' : 'Select all'}
          </button>
          <div className="st-hmenu-sep" />
          {modelFamilies.map((mf) => (
            <label
              key={mf}
              className={`st-hmenu-item st-hmenu-checkbox ${modelFamilyFilter.includes(mf) ? 'active' : ''}`}
              role="menuitem"
            >
              <input
                type="checkbox"
                checked={modelFamilyFilter.includes(mf)}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
    </>
  );
}
