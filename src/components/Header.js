import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../images/logo.svg";
import NavBar from "./NavBar";

function Header(props) {
  const {
    loggedIn,
    onSignOut,
    userData,
    //   loggedInEmail,
    //email,
    loginState,
    //  handleLoginState,
    //  setEmail,
    //   setLoggedInEmail,
  } = props; /*
            >/*
              {loginState ? "Регистрация" : "Войти"}
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );*/
  /*
  return (
    <header className="header page__header">
      <img className="logo" src={headerLogo} alt="logo" lang="en" />
      <nav className="header__nav">
        <ul className="header__list header__list_main">
          {loggedIn ? (
            <>
              <li className="header__list-item header__list-item_main">
                {email}
              </li>
              <Link
                className="header__list-link"
                to="signin"
                onClick={onSignOut}
              >
                Выйти
              </Link>
            </>
          ) : (
            <Link
              className="header__list-link"
              to={loginState ? "/sign-up" : "/sign-in"}
            >
              {loginState ? "Войти" : "Регистрация"}
            </Link>
            /*return (
                <header className="header page__header">
                  <img className="logo" src={headerLogo} alt="logo" lang="en" />
                  {loggedIn ? (
                    <NavBar signOut={signOut} email={userData ? userData.email : ""} />
                  ) : (
                    <Link
                      to={loginState ? "/sign-in" : "/sign-up"}
                      className="header__list-link"
                    >
                      {loginState ? "Войти" : "Регистрация"}
                    </Link>
                          )}
          )}/*
        </ul>
      </nav>
    </header>
  );
}*/

  return (
    <header className="header page__header">
      <img className="logo" src={headerLogo} alt="logo" lang="en" />
      {loggedIn ? (
        <NavBar signOut={onSignOut} email={userData ? userData.email : ""} />
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
