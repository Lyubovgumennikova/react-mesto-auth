import React, { useEffect, useState } from "react";
import Input from "./Input";
import PopupWithForm from "./PopupWithForm";
import * as duckAuth from "../utils/duckAuth.js";

import { Link, withRouter } from "react-router-dom";
import Form from "./Form";
// import Logo from "./Logo.js";
// import * as duckAuth from "../duckAuth.js";

function Login({
  onLogin,
  onClose,
  onRegister,
  isSubmitted,
  setIsSubmitted,
  ...props
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // setIsSubmitted(true);

    if (!email || !password) {
      return;
    }
    duckAuth
      .authorize(
        email,
        password
      )((data) => {
        if (data.jwt) {
          onLogin({ email: "", password: "" }, () => {
            props.handleLogin();
            props.history.push("/users/me");
          });
        }
      })
      .catch((err) => console.log(err));
    // onLogin({
    //   email,
    //   password,
    // });
  }

  // useEffect(() => {
  //   setEmail("");
  //   setPassword("");
  // }, [isOpen]);

  return (
    <div className="popup__field">
      <h2 className="popup__text">Вход</h2>
      <Form
        name="Login"
        // title="Вход"
        buttonText="Войти"
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        onSubmit={handleSubmit}
        // isOpen={isOpen}
        // onClose={onClose}
      >
        <Input
          type="email"
          required
          name="email"
          placeholder="Email"
          maxLength="30"
          handleChange={setEmail}
          value={email}
        />
        <span id="email-error" className="popup__input-error"></span>
        <Input
          type="password"
          required
          name="password"
          placeholder="Пароль"
          handleChange={setPassword}
          value={password}
        />
        <span id="password-error" className="popup__input-error"></span>
      </Form>
      <p className="popup__text ">Ещё не зарегистрированы?</p>
      <Link to="/signup" className="signup__link">
        Зарегистрироваться
      </Link>
    </div>
  );
}

export default withRouter(Login);
