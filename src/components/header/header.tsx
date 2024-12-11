import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import classNames from "classnames";
import { ROUTES } from "../../routes";
import * as styles from "./header.module.scss";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const [key, setKey] = useState(0);

  const handleDropdownToggle = (isOpen: boolean) => {
    setShowDropdown(isOpen);
  };

  const handleNavigation = (path: string) => {
    setShowDropdown(false);
    navigate(path);
    setKey((prev) => prev + 1);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Games Market</h1>
      <nav className={styles.nav}>
        <NavLink to={ROUTES.HOME} className={({ isActive }) => classNames(styles.link, { [styles.activeLink]: isActive })}>
          Home
        </NavLink>

        <Dropdown show={showDropdown} onToggle={handleDropdownToggle}>
          <Dropdown.Toggle id="products-dropdown" className={classNames(styles.link, styles.dropdownToggle)}>
            Products
          </Dropdown.Toggle>
          <Dropdown.Menu key={key} className={styles.dropdownMenu}>
            <Dropdown.Item
              as="span"
              className={styles.dropdownItem}
              onClick={() => {
                handleNavigation(`${ROUTES.PRODUCTS}/pc`);
              }}
            >
              PC
            </Dropdown.Item>
            <Dropdown.Item
              as="span"
              className={styles.dropdownItem}
              onClick={() => {
                handleNavigation(`${ROUTES.PRODUCTS}/playstation`);
              }}
            >
              PlayStation
            </Dropdown.Item>
            <Dropdown.Item
              as="span"
              className={styles.dropdownItem}
              onClick={() => {
                handleNavigation(`${ROUTES.PRODUCTS}/xbox`);
              }}
            >
              Xbox
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <NavLink to={ROUTES.ABOUT} className={({ isActive }) => classNames(styles.link, { [styles.activeLink]: isActive })}>
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
