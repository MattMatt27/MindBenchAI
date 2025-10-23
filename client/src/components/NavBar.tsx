import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/NavBar.css";

export default function NavBar() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const itemClass = ({ isActive }: { isActive: boolean }): string =>
    `navbar-item${isActive ? " active" : ""}`;

  const handleLogout = async (): Promise<void> => {
    await logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left side: Brand + Dropdowns */}
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            MindBench.ai
          </Link>

          {/* Profiles Dropdown */}
          <div className="navbar-dropdown">
            <span className="navbar-dropdown-trigger">Profiles</span>
            <div className="navbar-dropdown-menu">
              <NavLink to="/technical_profile" className="navbar-dropdown-item">
                Technical
              </NavLink>
              <NavLink to="/conversational_profile" className="navbar-dropdown-item">
                Conversational
              </NavLink>
            </div>
          </div>

          {/* Performance Dropdown */}
          <div className="navbar-dropdown">
            <span className="navbar-dropdown-trigger">Performance</span>
            <div className="navbar-dropdown-menu">
              <NavLink to="/leaderboard" className="navbar-dropdown-item">
                Leaderboard
              </NavLink>
              <NavLink to="/reasoning" className="navbar-dropdown-item navbar-dropdown-item-disabled">
                Reasoning
              </NavLink>
            </div>
          </div>
        </div>

        {/* Right side: Resources, Community, Auth */}
        <div className="navbar-right">
          <div className="navbar-menu">
            <NavLink to="/resources" className={itemClass}>
              Resources
            </NavLink>
            <NavLink to="/community" className={itemClass}>
              Community
            </NavLink>
          </div>

          <div className="navbar-auth">
            {loading ? (
              <div className="navbar-loading">Loading...</div>
            ) : isAuthenticated ? (
              <div className="navbar-user">
                <div className="user-info">
                  <span className="user-name">{user?.firstName} {user?.lastName}</span>
                  <span className="user-role">{user?.role?.toLowerCase()}</span>
                </div>
                <button onClick={handleLogout} className="logout-button">
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="navbar-guest">
                <NavLink to="/login" className="login-link">
                  Sign In
                </NavLink>
                <NavLink to="/register" className="register-link">
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
