import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Form from "./Form";
import Input from "./Input";
// import Popup from "./Popup";
// import PopupWithForm from "./PopupWithForm";
import * as duckAuth from "../utils/duckAuth.js";

function Register(onLogin, onRegister, setIsRegister, handleInfoToolti, ...props) {
  const [state, setState] = useState({
    email: '',
    password: '',
  })

  function handleChange(e) {
    const {name, value} = e.target;
    setState(old => ({
      ...old,
      [name]: value
    }))
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    const {email, password} = state;

    duckAuth.register(email, password)
      .then (() => {
        onLogin.setIsRegister(true)
        onLogin.handleRegister() 
      })
      .catch(() => onLogin.setIsRegister(true))
}

  // useEffect(() => {
  //   setIsRegister(false)
  //   // setEmail("");
  //   // setPassword("");
  // }, [props.isOpen]);

  return (
    <div className="popup__field">
      <h2 className="popup__text popup__text_auth">Регистрация</h2>
      <h2 className="popup__text popup__text_auth">{state.message} </h2>
      <Form 
        name="register"
        // title="Регистрация"
        buttonText="Зарегистрироваться"
        isSubmitted={props.isSubmitted}
        setIsSubmitted={props.setIsSubmitted}
        onSubmit={handleSubmit}
        // isOpen={isOpen}
        // onClose={onClose}
      >
        <input
          type="email"
          name="email"
          className= 'popup__input popup__input_auth'
          placeholder="Email"
          // maxLength="30"
          onChange={handleChange}
          // handleChange={setState.email}
          // value={state.email}
        />
        <span id="email-error" className="popup__input-error"></span>
        <input
          type="password"
          name="password"
          className= 'popup__input popup__input_auth'
          placeholder="Пароль"
          onChange={handleChange}
          // handleChange={setState.password}
          // value={state.password}
        />
        <span id="password-error" className="popup__input-error"></span>
      </Form>
      <p className="popup__text popup__text_auth">
        Уже зарегистрированы?
        <Link to="/signin" className="signup__link">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
