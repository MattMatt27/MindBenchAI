import "../styles/NavBar.css"

export default function NavBar({ currentPage, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">MindBenchAI</div>
        <div className="navbar-menu">
          <button 
            className={`navbar-item ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          <button 
            className={`navbar-item ${currentPage === 'framework' ? 'active' : ''}`}
            onClick={() => onNavigate('framework')}
          >
            Framework
          </button>
          <button 
            className={`navbar-item ${currentPage === 'community' ? 'active' : ''}`}
            onClick={() => onNavigate('community')}
          >
            Community
          </button>
        </div>
      </div>
    </nav>
  )
}