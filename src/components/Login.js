import React, { useEffect, useState } from "react";
import Input from "./Input";
import PopupWithForm from "./PopupWithForm";

import { Link, withRouter } from "react-router-dom";
import Form from "./Form";
// import Logo from "./Logo.js";
// import * as duckAuth from "../duckAuth.js";

function Login({ isOpen, onClose, onRegister, isSubmitted, setIsSubmitted }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setIsSubmitted(true);

  //   if (!email || !password) {
  //     return;
  //   }
  //   onRegister({
  //     email,
  //     password,
  //   });
  // }

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [isOpen]);

  return (
    <>
    <Form
      name="Login"
      title="Вход"
      buttonText="Войти"
      isSubmitted={isSubmitted}
      setIsSubmitted={setIsSubmitted}
      // onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Input
        type="email"
        name="email"
        placeholder="Email"
        maxLength="30"
        handleChange={setEmail}
        value={email}
      />
      <span id="email-error" className="popup__input-error"></span>
      <Input
        type="password"
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
      </>
  )
}

export default withRouter(Login);
