import { NavLink, useLocation } from "react-router-dom";
import "./NavBar.scss";

export default function NavBar() {
  const location = useLocation();
  const isLibraryRoute =
    location.pathname === "/" || location.pathname.startsWith("/book");

  return (
    <div className="nav-bar-container">
      <nav className="nav-bar">
        <NavLink
          className={({ isActive }) =>
            isLibraryRoute ? "nav-link active" : "nav-link"
          }
          to="/">
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
