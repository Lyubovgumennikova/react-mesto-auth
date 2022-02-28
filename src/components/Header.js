import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import { useLocation } from "react-router-dom"; //BrowserRouter as Router,  Switch,
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Header({ onSignOut, userData }) {
  const location = useLocation();
  const { email, isLoggedIn } = useContext(CurrentUserContext);
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      {/* {isLoggedIn ? ( */}
        <div className="header__link_conteiner">
          <p className="header__link header__link_email">{email}</p>
          <button type="button" onClick={onSignOut}>Выйти</button>
        </div> 
        {/* : ( {
          location.pathname === '/signin' ? (
            <Link to='/signup'>Регистрация</Link>)
            : ( <Link to='/signin'>Войти</Link>)
           
        })

      } */}
    </header>
  );
}

// ( { loggedIn, email, ...props }) {
//   return (
//     <header className="header">
//       <img className="header__logo" src={logo} alt="логотип" />
//       {/* {() => {
//         if (props.name === "register") {
//           console.log("123");
//           return (
//             <Link to="/signin" className="header__link">
//               Войти
//             </Link>
//           );
//         }
//         if (props.name === "login") {
//           return (
//             <Link to="/signup" className="header__link">
//               Регистрация
//             </Link>
//           );
//         }
//         return <p></p>;
//       }} */}
//       {loggedIn ? (
//         <div className="header__link_conteiner">
//         <p className="header__link header__link_email">
//           {email}</p>
//           <Link to="/signin" className="header__link header__link_opacity">
//             Выйти
//           </Link>
//           </div>
//       ) : (
//         <Link to="/signup" className="header__link">
//           Регистрация
//         </Link>
//       )}
//     </header>
//   );
// }

export default Header;
