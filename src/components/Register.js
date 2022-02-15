import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";
import Input from "./Input";
import Popup from "./Popup";
import PopupWithForm from "./PopupWithForm";

function Register({
  isOpen,
  onClose,
  onRegister,
  isSubmitted,
  setIsSubmitted,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setIsSubmitted(true);

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
        name="register"
        title="Регистрация"
        buttonText="Зарегистрироваться"
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        // onSubmit={handleSubmit}
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
        <Link to="/" className="signup__link">
          Войти
        </Link>
      </p>
    </>
  );
}

export default Register;
