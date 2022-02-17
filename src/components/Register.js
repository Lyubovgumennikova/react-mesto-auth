import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Form from "./Form";
import Input from "./Input";
// import Popup from "./Popup";
// import PopupWithForm from "./PopupWithForm";
import * as duckAuth from "../utils/duckAuth.js";

function Register({
  isOpen,
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

    duckAuth.register(email, password).then((res) => {
      console.log(res)
      // if(res){
      //   // onRegister({
      //     console.log(res)
      //   // , () => {
      //   //   props.history.push('/signin');
      //   // }
      // } else {
      //   console.log(res)
      //   // onRegister({
      //               // message: 'Что-то пошло не так!'
      //   // })
      // }
    });
    // onRegister({
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
      <h2 className="popup__text">Регистрация</h2>
      <Form 
        name="register"
        // title="Регистрация"
        buttonText="Зарегистрироваться"
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        onSubmit={handleSubmit}
        isOpen={isOpen}
        // onClose={onClose}
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
      <p className="popup__text">
        Уже зарегистрированы?
        <Link to="/signin" className="signup__link">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default withRouter(Register);
