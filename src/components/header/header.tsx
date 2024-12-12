import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { ROUTES } from "../../routes";
import * as styles from "./header.module.scss";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleNavigation = (path: string) => {
    setShowDropdown(false);
    navigate(path);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Games Market</h1>
      <nav className={styles.nav}>
        <NavLink to={ROUTES.HOME} className={({ isActive }) => classNames(styles.link, { [styles.activeLink]: isActive })}>
          Home
        </NavLink>

        <div ref={dropdownRef} className={styles.dropdownWrapper}>
          <button type="button" onClick={toggleDropdown} className={classNames(styles.link, styles.dropdownToggle)}>
            Products
          </button>
          {showDropdown && (
            <div className={styles.dropdownMenu}>
              <button type="button" className={styles.dropdownItem} onClick={() => handleNavigation(`${ROUTES.PRODUCTS}/pc`)}>
                PC
              </button>
              <button type="button" className={styles.dropdownItem} onClick={() => handleNavigation(`${ROUTES.PRODUCTS}/playstation`)}>
                PlayStation
              </button>
              <button type="button" className={styles.dropdownItem} onClick={() => handleNavigation(`${ROUTES.PRODUCTS}/xbox`)}>
                Xbox
              </button>
            </div>
          )}
        </div>

        <NavLink to={ROUTES.ABOUT} className={({ isActive }) => classNames(styles.link, { [styles.activeLink]: isActive })}>
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
