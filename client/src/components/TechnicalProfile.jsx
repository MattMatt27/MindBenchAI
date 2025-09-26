import { useState, useMemo } from 'react'
import { getEntityProfiles, techProfileQuestions } from '../data/technicalProfiles'
import "../styles/TechnicalProfile.css"

function Dot({ on }) {
  return <span className={`dot ${on ? 'on' : 'off'}`} aria-label={on ? 'yes' : 'no'} />
}

function ValueDisplay({ answer }) {
  if (answer.type === 'boolean') {
    return <Dot on={answer.value} />
  }
  if (answer.type === 'list' && Array.isArray(answer.value)) {
    return (
      <div className="list-value">
        {answer.value.join(', ')}
      </div>
    )
  }
  return <span>{answer.value || '—'}</span>
}

export default function TechnicalProfile() {
  const [activeTab, setActiveTab] = useState('tools')
  const [q, setQ] = useState('')
  const [filters, setFilters] = useState({
    // Tool configuration filters
    android: false,
    ios: false,
    web: false,
    free: false,
    crisis_detection: false,
    mood_tracking: false,
    hipaa_compliant: false,
    // Base model filters
    multimodal: false,
    open_source: false,
    function_calling: false,
    code_generation: false
  })
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Get profiles based on active tab
  const profiles = useMemo(() => {
    return getEntityProfiles(activeTab === 'tools' ? 'tool_configuration' : 'base_model')
  }, [activeTab])

  // Get unique categories based on active tab
  const categories = useMemo(() => {
    const cats = new Set()
    techProfileQuestions
      .filter(q => q.entity_type === (activeTab === 'tools' ? 'tool_configuration' : 'base_model'))
      .forEach(q => cats.add(q.category))
    return ['all', ...Array.from(cats)]
  }, [activeTab])

  // Filter profiles based on search and filters
  const filteredProfiles = useMemo(() => {
    return profiles
      .filter(p => {
        const searchTerm = q.toLowerCase()
        if (activeTab === 'tools') {
          return p.name.toLowerCase().includes(searchTerm) ||
                 p.tool_name?.toLowerCase().includes(searchTerm) ||
                 p.base_model_name?.toLowerCase().includes(searchTerm)
        } else {
          return p.name.toLowerCase().includes(searchTerm) ||
                 p.developer?.toLowerCase().includes(searchTerm) ||
                 p.version?.toLowerCase().includes(searchTerm)
        }
      })
      .filter(p => {
        if (activeTab === 'tools') {
          // Tool configuration filters
          if (filters.android && !p.answers.platform_android?.value) return false
          if (filters.ios && !p.answers.platform_ios?.value) return false
          if (filters.web && !p.answers.platform_web?.value) return false
          if (filters.free && !p.answers.has_free_tier?.value) return false
          if (filters.crisis_detection && !p.answers.crisis_detection?.value) return false
          if (filters.mood_tracking && !p.answers.mood_tracking?.value) return false
          if (filters.hipaa_compliant && !p.answers.hipaa_compliant?.value) return false
        } else {
          // Base model filters
          if (filters.multimodal && !p.answers.multimodal?.value) return false
          if (filters.open_source && !p.answers.open_source?.value) return false
          if (filters.function_calling && !p.answers.function_calling?.value) return false
          if (filters.code_generation && !p.answers.code_generation?.value) return false
        }
        return true
      })
  }, [q, filters, profiles, activeTab])

  // Get questions to display based on category and active tab
  const displayQuestions = useMemo(() => {
    return techProfileQuestions
      .filter(q => {
        const entityType = activeTab === 'tools' ? 'tool_configuration' : 'base_model'
        return q.entity_type === entityType && 
               q.is_displayed && 
               (selectedCategory === 'all' || q.category === selectedCategory)
      })
      .sort((a, b) => a.display_order - b.display_order)
  }, [selectedCategory, activeTab])

  const toggle = key => setFilters(f => ({ ...f, [key]: !f[key] }))

  return (
    <>
      {/* Page-level tabs */}
      <div className="g-tabs">
        <button 
          className={`g-tab-bttn ${activeTab === 'tools' ? 'active' : ''}`}
          onClick={() => setActiveTab('tools')}
        >
          Tools
        </button>
        <button 
          className={`g-tab-bttn ${activeTab === 'models' ? 'active' : ''}`}
          onClick={() => setActiveTab('models')}
        >
          Base Models
        </button>
      </div>

      <div className="layout">
        {/* sidebar (vertical filters) */}
        <aside className="sidebar island">
          {/* Search moved to top of sidebar */}
          <div className="search-island">
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder={activeTab === 'tools' ? 
                "Search by tool, model, or configuration name" : 
                "Search by model name, developer, or version"
              }
              className="search-input"
            />
          </div>
          
          <h3 className="sidebar-title">Search Filters</h3>

        {activeTab === 'tools' ? (
          <>
            <div className="filter-group">
              <div className="filter-heading">Platforms</div>
              {['android', 'ios', 'web'].map(key => (
                <label key={key} className="filter-item">
                  <input
                    type="checkbox"
                    checked={filters[key]}
                    onChange={() => toggle(key)}
                  />
                  <span>{key === 'ios' ? 'iOS' : key[0].toUpperCase() + key.slice(1)}</span>
                </label>
              ))}
            </div>

            <div className="filter-group">
              <div className="filter-heading">Cost</div>
              <label className="filter-item">
                <input
                  type="checkbox"
                  checked={filters.free}
                  onChange={() => toggle('free')}
                />
                <span>Free tier</span>
              </label>
            </div>

            <div className="filter-group">
              <div className="filter-heading">Mental Health</div>
              {['crisis_detection', 'mood_tracking'].map(key => (
                <label key={key} className="filter-item">
                  <input
                    type="checkbox"
                    checked={filters[key]}
                    onChange={() => toggle(key)}
                  />
                  <span>{key.split('_').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}</span>
                </label>
              ))}
            </div>

            <div className="filter-group">
              <div className="filter-heading">Compliance</div>
              <label className="filter-item">
                <input
                  type="checkbox"
                  checked={filters.hipaa_compliant}
                  onChange={() => toggle('hipaa_compliant')}
                />
                <span>HIPAA Compliant</span>
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
                  onChange={() => toggle('multimodal')}
                />
                <span>Multimodal</span>
              </label>
            </div>

            <div className="filter-group">
              <div className="filter-heading">Capabilities</div>
              {['function_calling', 'code_generation'].map(key => (
                <label key={key} className="filter-item">
                  <input
                    type="checkbox"
                    checked={filters[key]}
                    onChange={() => toggle(key)}
                  />
                  <span>{key.split('_').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}</span>
                </label>
              ))}
            </div>

            <div className="filter-group">
              <div className="filter-heading">Licensing</div>
              <label className="filter-item">
                <input
                  type="checkbox"
                  checked={filters.open_source}
                  onChange={() => toggle('open_source')}
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
            onChange={e => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </aside>

      {/* main content */}
      <main className="content">

        <div className="island table-wrap">
          <table className="technical-profiles-table">
            <thead>
              <tr>
                <th rowSpan="2" className="sticky-column">{activeTab === 'tools' ? 'Configuration' : 'Model'}</th>
                <th rowSpan="2">{activeTab === 'tools' ? 'Base Model' : 'Developer'}</th>
                {activeTab === 'models' && <th rowSpan="2">Version</th>}
                {displayQuestions.map(q => {
                  const colSpan = displayQuestions.filter(dq => dq.category === q.category).length
                  const isFirstInCategory = displayQuestions.findIndex(dq => dq.category === q.category) === displayQuestions.indexOf(q)
                  
                  if (isFirstInCategory && colSpan > 1) {
                    return (
                      <th key={`cat-${q.category}`} colSpan={colSpan} className="category-header">
                        {q.category}
                      </th>
                    )
                  } else if (!isFirstInCategory) {
                    return null
                  } else {
                    return (
                      <th key={q.id} rowSpan="2" className="question-header">
                        {q.question_text}
                      </th>
                    )
                  }
                })}
              </tr>
              <tr>
                {displayQuestions.map(q => {
                  const colSpan = displayQuestions.filter(dq => dq.category === q.category).length
                  if (colSpan > 1) {
                    return (
                      <th key={q.id} className="question-header">
                        {q.question_text}
                      </th>
                    )
                  }
                  return null
                })}
              </tr>
            </thead>
            <tbody>
              {filteredProfiles.map(profile => (
                <tr key={profile.id}>
                  <td className="sticky-column">
                    <div className="app-cell">
                      <div className="app-title">{activeTab === 'tools' ? profile.tool_name : profile.name}</div>
                      <div className="app-desc">{activeTab === 'tools' ? profile.name : ''}</div>
                    </div>
                  </td>
                  <td>{activeTab === 'tools' ? profile.base_model_name : profile.developer}</td>
                  {activeTab === 'models' && <td>{profile.version || '—'}</td>}
                  {displayQuestions.map(q => {
                    const answer = profile.answers[q.question_key]
                    return (
                      <td key={q.id} className={`answer-cell ${q.question_type}`}>
                        {answer ? <ValueDisplay answer={answer} /> : '—'}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProfiles.length === 0 && (
            <div className="no-results">
              No configurations match your search criteria
            </div>
          )}
        </div>
      </main>
      </div>
    </>
  )
}