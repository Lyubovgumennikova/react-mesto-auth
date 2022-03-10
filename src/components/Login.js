import React, { useState } from "react";
import Form from "./Form";

function Login({
  onLogin,
  isSubmitted,
  setIsSubmitted,
  ...props
}) {
  const [state, setState] = useState( {
    email: '',
    password: '',
  })

  function handleChange(e) {
    const { name, value } = e.target;
    setState((old) => ({
      ...old,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { email, password } = state;

    if (!email || !password) {
      return;
    }
    onLogin({ 
      email,  
      password,  
    });

    // AuthApi
    //   .authorize(email, password)
    //   .then((data) => {
    //     if (!data.token) {
    //       setState((old) => ({
    //         ...old,
    //         message: "Что-то пошло не так!",
    //       }));
    //       return;
    //     }
    //     setState(initState);

    //     props.handleLogin(data.token);
    //   })
    //   .catch((err) => console.log(err));
  }

  return (
    <div className="popup__field">
      <h2 className="popup__text popup__text_auth">Вход</h2>
      <h2 className="popup__text popup__text_auth">{state.message} </h2>
      <Form
        name="Login"
        buttonText="Войти"
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          required
          name="email"
          className="popup__input popup__input_auth"
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
          className="popup__input popup__input_auth"
          placeholder="Пароль"
          onChange={handleChange} //={setPassword}
          value={state.password}
        />
        <span id="password-error" className="popup__input-error"></span>
      </Form>
    </div>
  );
}

export default Login;
