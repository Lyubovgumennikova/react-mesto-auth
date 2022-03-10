import React from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import logo from "../images/logo.svg";

function Header({ onSignOut, loggedIn, location, userData, email }) {
  const value = React.useContext(CurrentUserContext);
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      {loggedIn ? (
        <div className="header__link_conteiner">
          <p className="header__link header__link_email">{value.email}</p>
          <Link className="header__link" to="/signin" onClick={onSignOut}>
            Выйти
          </Link>
        </div>
      ) 
      : location.pathname === "/signin" ? (
        <Link className="header__link" to="/signup">
          Регистрация
        </Link>
      ) : (
        <Link className="header__link" to="/signin">
          Войти
        </Link>
      )
      }
    </header>
  );
}

export default Header;
