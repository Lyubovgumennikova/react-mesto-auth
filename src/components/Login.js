import React, { useEffect, useState } from "react";
import Input from "./Input";
import PopupWithForm from "./PopupWithForm";
import * as duckAuth from "../utils/duckAuth.js";
import UnionV from "../images/UnionV.svg";
import UnionX from "../images/UnionX.svg";
import { Link, withRouter } from "react-router-dom";
import Form from "./Form";
// import Logo from "./Logo.js";
// import * as duckAuth from "../duckAuth.js";

const initState = {
  email: '',
  password: '',
  message: '',
}

function Login({
  onLogin,
  onClose,
  onRegister,
  isSubmitted,
  setIsSubmitted,
  ...props
}) {
  const [state, setState] = useState(initState)
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  function handleChange(e) {
    const {name, value} = e.target;
    setState(old => ({
      ...old,
      [name]: value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    // setIsSubmitted(true);
    const {email, password} = state;

    if (!email || !password) {
      return;
    }

    duckAuth.authorize(email, password)
    .then((data) => {
      if (!data.token) {
        setState(old => ({
          ...old,
          message: 'Что-то пошло не так!'
        }));
        return;
        }
        setState(initState);    
          // onLogin({ email: "", password: "" }, () => {
            props.handleLogin(data.token);
            // props.history.push("/users/me");
          // });
        
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
      <h2 className="popup__text popup__text_auth">Вход</h2>
      <h2 className="popup__text popup__text_auth">{state.message} </h2>
      <Form
        name="Login"
        // title="Вход"
        buttonText="Войти"
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        onSubmit={handleSubmit}
        className = {'button ' + 'popup__submit-button_auth'}
        // className = {'button ' + (this.props.isRed ? 'button--red' : '')}
        // className={`${"popup__submit-button_auth"}`}
        // isOpen={isOpen}
        // onClose={onClose}
        
      >
        <input
          type="email"
          required
          name="email"
          className= 'popup__input popup__input_auth'
          placeholder="Email"
          maxLength="30"
          onChange={handleChange} //={setEmail}
          value={state.email}
        />
        <span id="email-error" className="popup__input-error"></span>
        <input
          type="password"
          required
          name="password"
          className= 'popup__input popup__input_auth'
          placeholder="Пароль"
          onChange={handleChange} //={setPassword}
          value={state.password}
          
        />
        <span id="password-error" className="popup__input-error"></span>
      </Form>
      {/* <p className="popup__text popup__text_auth">Ещё не зарегистрированы?</p>
      <Link to="/signup" className="signup__link">
        Зарегистрироваться
      </Link> */}
    </div>
  );
}

export default Login;
