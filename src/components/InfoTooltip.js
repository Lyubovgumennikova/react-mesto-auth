import React from "react";
import Popup from "./Popup";
import UnionV from "../images/UnionV.svg";
import UnionX from "../images/UnionX.svg";

function InfoTooltip({
  name,
  isOpen,
  onClose,
  loggedIn,
  location,
  // UnionV,
  src,
  text,
  setIsRegister,
  response,
  ...props
}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <figure name={name} className="popup__register">
        <img
          className="popup__image-register"
          src={
            //src}
            props.status === 200 ? (src = UnionV) : (src = UnionX)
          }
          alt={name}
        />
        <figcaption className="popup__text">
           {text}
          {  response 
      ? "Вы успешно зарегистрировались!" 
      : "Что-то пошло не так! Попробуйте ещё раз."} 
        </figcaption>
      </figure>
      {/* <img className="header__logo" src={UnionV} alt="иконка" /> */}
    </Popup>
  );
}

export default InfoTooltip;



// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { CurrentUserContext } from "../contexts/CurrentUserContext";
// import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
// import logo from "../images/logo.svg";

// function Header( ) {
//   // {onSignOut }
//   const location = useLocation();
//   const  { email, isLoggedIn} = useContext(CurrentUserContext);

//   return (
//     <header className="header">
// <img className="header__logo" src={logo} alt="логотип" />
// <div className="header__link_conteiner">
//           <p className="header__link header__link_email">{email}</p>
//           <button type="button" className="header__link header__link_opacity"> Выйти </button>
//   </div>)

// {/* {isLoggedIn ? ( */}
//   {/* <div className="header__link_conteiner">
//           <p className="header__link header__link_email">{email}</p>
//           <button type="button" onClick={onSignOut}> Выйти </button>
//   </div>) */}
//   {/* : <Link to="/signin" className="header__link header__link_opacity">
//   Войти
// </Link> */}
//            {/* : ({
//             location.pathname === '/signin' 
//             ? (<Link to="/signup"  className="header__link" > Регистрация</Link>)
//             :(<Link to='/signin'>Войти</Link>)
           
//           }) */}
// {/* } */}


//     </header>
//   )
// }

// export default Header;

 /* {
         props.name === "register"  &&
            (<Link to="/signin" className="header__link">
              Войти
            </Link>)}
         { props.name === "login"  &&
            (<Link to="/signup" className="header__link">
              Регистрация
            </Link>)}
            { props.name === "main"  &&
            (<Link to="/signup" className="header__link">
              Выйти
            </Link>)} */



//             import { ReactComponent as Logo } from '../img/logo-white.svg';
// const Header = ( { onSignOut } ) => {
// const location = useLocation();
// const  { email, isLoggedIn }= useContext(currentUserContext);
// return (
//   <header>
//      <Logo />
//      { isLoggedIn ? (
//                                  <p>email</p>
//                                  <button type="button" onClick={onSingOut}>Выйти</button>
//                               ) : (
//                              { location.pathname === '/signin' ? (
//                                                                                        <Link to='/signup'>Регистрация</Link>
//                                                                                         ) : (
//                                                                                         <Link to='/signin'>Войти</Link>
//                                                                                         ) 
//                                     )}
// </header>
