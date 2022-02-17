import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ loggedIn, email }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      {loggedIn ? (
        <div className="header__link_conteiner">
        <p className="header__link header__link_email">
          {email}</p>
          <Link to="/signin" className="header__link header__link_opacity">
            Выйти
          </Link>
          </div>
      ) : (
        <Link to="/signup" className="header__link">
          Регистрация
        </Link>
      )}
    </header>
  );
}

export default Header;
