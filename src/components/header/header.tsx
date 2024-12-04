import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes";
import "./header.scss";

function Header() {
  return (
    <header className="header">
      <h1 className="title">Games Market</h1>
      <nav className="nav">
        <NavLink to={ROUTES.HOME} className={({ isActive }) => (isActive ? "activeLink" : "link")}>
          Home
        </NavLink>
        <NavLink to={ROUTES.PRODUCTS} className={({ isActive }) => (isActive ? "activeLink" : "link")}>
          Products
        </NavLink>
        <NavLink to={ROUTES.ABOUT} className={({ isActive }) => (isActive ? "activeLink" : "link")}>
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
