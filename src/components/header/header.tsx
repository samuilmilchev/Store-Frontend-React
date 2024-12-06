import { NavLink } from "react-router-dom";
// eslint-disable-next-line import/no-extraneous-dependencies
import classNames from "classnames";
import { ROUTES } from "../../routes";
import * as styles from "./header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Games Market</h1>
      <nav className={styles.nav}>
        <NavLink to={ROUTES.HOME} className={({ isActive }) => classNames(styles.link, { [styles.activeLink]: isActive })}>
          Home
        </NavLink>
        <NavLink to={ROUTES.PRODUCTS} className={({ isActive }) => classNames(styles.link, { [styles.activeLink]: isActive })}>
          Products
        </NavLink>
        <NavLink to={ROUTES.ABOUT} className={({ isActive }) => classNames(styles.link, { [styles.activeLink]: isActive })}>
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
