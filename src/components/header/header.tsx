import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames";

import { useSelector, useDispatch } from "react-redux";
import SignInModal from "@/components/user/signInModal";
import SignUpModal from "@/components/user/signUpModal";
import { RootState } from "@/redux/store";
import { signIn, signOut } from "@/redux/userSlice";
import { ROUTES } from "../../routes";
import * as styles from "./header.module.scss";

import "font-awesome/css/font-awesome.min.css";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((state: RootState) => state.auth.userName);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
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

  const handleSignOut = () => {
    dispatch(signOut());
    navigate(ROUTES.HOME);
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
              <button type="button" className={styles.dropdownItem} onClick={() => handleNavigation(ROUTES.PRODUCTSPAGE)}>
                All games
              </button>
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

        {userName ? (
          <>
            <NavLink to={ROUTES.PROFILE} className={({ isActive }) => classNames(styles.link, { [styles.activeLink]: isActive })}>
              <i className="fa fa-user" aria-hidden="true" />
              {userName}
            </NavLink>
            <button type="button" onClick={handleSignOut} className={classNames(styles.link, styles.signOutIcon)} aria-label="Sign Out">
              <i className="fa fa-sign-out" aria-hidden="true" />
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => setShowSignIn(true)} className={styles.link}>
              Sign In
            </button>
            <button type="button" onClick={() => setShowSignUp(true)} className={styles.link}>
              Sign Up
            </button>
          </>
        )}
      </nav>

      {showSignIn && (
        <SignInModal
          onClose={() => setShowSignIn(false)}
          // eslint-disable-next-line @typescript-eslint/no-shadow
          onSignIn={(userName) => {
            dispatch(signIn(userName));
            setShowSignIn(false);
          }}
        />
      )}

      {showSignUp && (
        <SignUpModal
          onClose={() => setShowSignUp(false)}
          // eslint-disable-next-line @typescript-eslint/no-shadow
          onSignUp={(userName) => {
            dispatch(signIn(userName));
            setShowSignUp(false);
            navigate(ROUTES.PROFILE);
          }}
        />
      )}
    </header>
  );
}

export default Header;
