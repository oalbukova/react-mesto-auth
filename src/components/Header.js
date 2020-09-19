import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../images/logo.svg";
import NavBar from "./NavBar";

function Header(props) {
  const { loggedIn, onSignOut, userData, loginState, emptyClick } = props;
  return (
    <header className="header page__header">
      <img className="logo" src={headerLogo} alt="logo" lang="en" />
      {loggedIn ? (
        <>
          <input
            type="checkbox"
            className="header__menu-toggle"
            id="header__menu-toggle"
          />
          <label
            htmlFor="header__menu-toggle"
            className="header__menu-button"
            onClick={emptyClick}
          >
            <span className="header__menu-span" onClick={emptyClick} />
          </label>
          <NavBar signOut={onSignOut} email={userData ? userData.email : ""} />
        </>
      ) : (
        <Link
          to={loginState ? "/sign-in" : "/sign-up"}
          className="header__list-link"
        >
          {loginState ? "Войти" : "Регистрация"}
        </Link>
      )}
    </header>
  );
}

export default Header;
