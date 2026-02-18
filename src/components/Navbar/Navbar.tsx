import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function NavBar() {
  return (
    <nav className="nav">
      <div className="nav__brand">Dashboard</div>
      <div className="nav__links">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/game1"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Game1
        </NavLink>
        <NavLink
          to="/game2"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Game2
        </NavLink>
        <NavLink
          to="/game3"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Game3
        </NavLink>
      </div>
    </nav>
  );
}
