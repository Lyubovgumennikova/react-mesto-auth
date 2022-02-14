// Login.js

import React from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from "./Logo.js";
import * as duckAuth from "../duckAuth.js";
import "./styles/Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.username || !this.state.password) {
      return;
    }
    // здесь авторизуем пользователя
    // далее проверяем токен
    // наконец, перенаправляем пользователя на страницу `/ducks`
  }
  render() {
    return (
      <div className="login">
        <Logo title={"CryptoDucks"} />
        <p className="login__welcome">
          Это приложение содержит конфиденциальную информацию. Пожалуйста,
          войдите или зарегистрируйтесь, чтобы получить доступ к CryptoDucks.
        </p>
        <form onSubmit={this.handleSubmit} className="login__form">
          <label htmlFor="username">Логин:</label>
          <input
            id="username"
            required
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label htmlFor="password">Пароль:</label>
          <input
            id="password"
            required
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <div className="login__button-container">
            <button type="submit" className="login__link">
              Войти
            </button>
          </div>
        </form>

        <div className="login__signup">
          <p>Ещё не зарегистрированы?</p>
          <Link to="/register" className="signup__link">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
