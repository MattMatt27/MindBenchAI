import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";

export default function NavBar() {
  const itemClass = ({ isActive }) => `navbar-item${isActive ? " active" : ""}`;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">MindBenchAI</div>
        <div className="navbar-menu">
          <NavLink to="/" className={itemClass} end>
            Home
          </NavLink>
          <NavLink to="/framework" className={itemClass}>
            Framework
          </NavLink>
          <NavLink to="/community" className={itemClass}>
            Community
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
