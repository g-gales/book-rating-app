import { NavLink } from "react-router-dom";
import "./NavBar.scss";

export default function NavBar() {
  return (
    <div className="nav-bar-container">
      <nav className="nav-bar">
        <NavLink className="nav-link" to="/">
          Library
        </NavLink>
        <NavLink className="nav-link" to="/add">
          Add
        </NavLink>
        <NavLink className="nav-link" to="/rate">
          Rate
        </NavLink>
      </nav>
    </div>
  );
}
