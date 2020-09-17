import React from "react";

function NavBar(props) {
  const { signOut, email } = props;
  return (
    <nav className="header__nav">
      <ul className="header__list header__list_main">
        <li className="header__list-item header__list-item_main">{email}</li>
        <li onClick={signOut} className="header__list-link">
          Выйти
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
