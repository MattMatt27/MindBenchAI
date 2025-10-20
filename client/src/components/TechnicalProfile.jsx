import { useEffect, useMemo, useState } from 'react';
import '../styles/TechnicalProfile.css';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5001';

function Dot({ on }) {
  return <span className={`dot ${on ? 'on' : 'off'}`} aria-label={on ? 'yes' : 'no'} />;
}

function ValueDisplay({ answer }) {
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

export default function TechnicalProfile() {
  const [activeTab, setActiveTab] = useState('tools');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    android_support: false,
    ios_support: false,
    web_support: false,
    free_tier: false,
    crisis_detection: false,
    mood_tracking: false,
    hipaa_compliant: false,
    // placeholders for future base-model filters
    multimodal: false,
    open_source: false,
    function_calling: false,
    code_generation: false,
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [profilesByType, setProfilesByType] = useState({ tools: [], modelVersions: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabKey = activeTab;

  useEffect(() => {
    let isMounted = true;

    async function fetchProfiles() {
      try {
        setLoading(true);

        const [toolsRes, modelsRes] = await Promise.all([
          fetch(`${API_BASE}/api/current/tech-profiles/display?entityType=tool_configuration`),
          fetch(`${API_BASE}/api/current/tech-profiles/display?entityType=model_version`),
        ]);

        if (!toolsRes.ok || !modelsRes.ok) {
          throw new Error('Failed to load technical profiles');
        }

        const toolsData = await toolsRes.json();
        const modelsData = await modelsRes.json();

        if (isMounted) {
          setProfilesByType({
            tools: toolsData.data ?? [],
            modelVersions: modelsData.data ?? [],
          });
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message ?? 'Unable to load technical profiles');
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

  const rawProfiles = useMemo(() => {
    const source = profilesByType[tabKey] ?? [];
    if (tabKey === 'modelVersions') {
      return [...source].sort((a, b) => {
        const aDate = a.release_date ? new Date(a.release_date) : null;
        const bDate = b.release_date ? new Date(b.release_date) : null;
        if (aDate && bDate) return bDate - aDate;
        if (aDate) return -1;
        if (bDate) return 1;
        return (b.version ?? '').localeCompare(a.version ?? '');
      });
    }
    return source;
  }, [profilesByType, tabKey]);

  const questionCatalogByTab = useMemo(() => {
    const catalogMaps = {
      tools: new Map(),
      modelVersions: new Map(),
    };

    const registerQuestion = (targetTab, key, answer) => {
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

    const processProfiles = (profiles, defaultTab) => {
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

  const categories = useMemo(() => {
    const unique = new Set(questionCatalog.map((q) => q.category));
    return ['all', ...unique];
  }, [questionCatalog]);

  const filteredProfiles = useMemo(() => {
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

  const displayQuestions = useMemo(() => {
    return questionCatalog.filter((q) => selectedCategory === 'all' || q.category === selectedCategory);
  }, [questionCatalog, selectedCategory]);

  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
              onChange={(e) => setQuery(e.target.value)}
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
                  { key: 'android_support', label: 'Android' },
                  { key: 'ios_support', label: 'iOS' },
                  { key: 'web_support', label: 'Web' },
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
                  { key: 'crisis_detection', label: 'Crisis detection' },
                  { key: 'mood_tracking', label: 'Mood tracking' },
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
                  { key: 'function_calling', label: 'Function calling' },
                  { key: 'code_generation', label: 'Code generation' },
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
              onChange={(e) => setSelectedCategory(e.target.value)}
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
                  <th rowSpan="2" className="sticky-column">
                    {tabKey === 'tools' ? 'Configuration' : 'Model'}
                  </th>
                  <th rowSpan="2">
                    {tabKey === 'tools' ? 'Base Model' : 'Developer'}
                  </th>
                  {tabKey === 'modelVersions' && <th rowSpan="2">Latest Version</th>}
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
                      <th key={question.key} rowSpan="2" className="question-header">
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
                {filteredProfiles.map((profile) => {
                  const isToolsTab = tabKey === 'tools';
                  const configTitle = isToolsTab ? (profile.name ?? profile.tool_name) : profile.name;
                  const configSubtitle =
                    isToolsTab && (profile.developer || profile.tool_name)
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
                      <td>
                        {tabKey === 'tools' ? profile.base_model_name : profile.developer}
                      </td>
                      {tabKey === 'modelVersions' && <td>{profile.version ?? '—'}</td>}
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
              </tbody>
            </table>

            {filteredProfiles.length === 0 && (
              <div className="no-results">No configurations match your search criteria.</div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
