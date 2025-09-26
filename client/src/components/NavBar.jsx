import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/NavBar.css";

export default function NavBar() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const itemClass = ({ isActive }) => `navbar-item${isActive ? " active" : ""}`;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">MindBenchAI</div>

        <div className="navbar-menu">
          <NavLink to="/" className={itemClass} end>
            Home
          </NavLink>
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
    </nav>
  );
}
