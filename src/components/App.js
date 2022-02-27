import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/Api";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { Link, Redirect, Route, Switch } from "react-router-dom";
// import { register } from "../utils/duckAuth";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import * as duckAuth from "../utils/duckAuth.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [isDeleteCardPopup, setIsDeleteCardPopup] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  // const [inputValue, setInputValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [state, setState] = useState({isLoggedIn:false});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const history = useHistory();

  useEffect (() => {
    tokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const componentDidMount=()=> {
  //   // настало время проверить токен
  //     tokenCheck();
  //   };

  const handleLogin = (jwt) => {
    if (!jwt) return;
    
    localStorage.setItem("jwt", jwt);
    setIsLoggedIn(true);
    // setIsLoggedIn
    // setState(old => ({...old, isLoggedIn:true}) ) 
    history.push("/"); //"/users/me"
  };

  const tokenCheck = ()=> {
    if (!localStorage.getItem('jwt')) return;

    const jwt = localStorage.getItem('jwt');
    // if (jwt){
      // проверим токен
    duckAuth.getContent(jwt).then((res) => {
        if (!res) return;
        const userData = {
                email: res.email, // авторизуем пользователя
                password: res.password,};
                setIsLoggedIn({userData})
        // setState({
        //     isLoggedIn: true,
        //     userData
        // });
                      // обернём App.js в withRouter
                      // так, что теперь есть доступ к этому методу
          history.push("/users/me");
    }).catch((err) => console.log(err));
  }

  const handleRegister = () => {
    setIsRegister(true)
    history.push('/signin')
    // isSubmitted//isLoggedIn
    //  ? history.push('/signin')
    //  : history.push('/signup')
    //  : (src = UnionX)
    
    // isOpen=(true)
    // setIsRegister(!isRegister);
    // setIsRegister(true)
  }

  // const handleInfoToolti = () => {
  //   // setIsEditProfilePopupOpen(true);
  //   this.props.isOpen(true)
  //   // this.props.history.push('/signin');
    
  //   // setIsRegister(!isRegister);
  //   // setIsRegister(true)
  // }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    // setIsEditAvatarPopupOpen(true)
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setImagePopupOpen(true);
    setSelectedCard(card);
  };

  const handleDeleteCardPopupClick = (card) => {
    setIsDeleteCardPopup(true);
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setImagePopupOpen(false);
    setIsDeleteCardPopup(false);
    setIsRegister(false);
  };

  const handleUpdateUser = (userInfo) => {
    // setIsLoading(true);
    api
      .setUserInfo(userInfo)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsSubmitted(false);
        // setInputValue('')
        // renderLoading(false);
      });
  };

  const handleUpdateAvatar = (inputValue) => {
    // setIsLoading(true);
    api
      .setUserAvatar(inputValue)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsSubmitted(false);
      });
  };

  const handleAddPlaceSubmit = (inputValue) => {
    // setIsSubmitted(true);
    // handleSubmit: (onAddPlace) => {
    api
      .addNewCard(inputValue)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsSubmitted(false);
      });
    // }
  };

  function handleCardDelete(data) {
    // setIsLoading(true);
    api
      .deleteCard(data._id)
      .then(() => {
        const deleteCards = cards.filter((c) => c._id !== data._id);
        setCards(deleteCards);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSubmitted(false);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  // function NavBar () {
    // const history = useHistory();
    function onSignOut (){
      localStorage.removeItem('jwt');
      history.push('/login');
    }

  useEffect(() => {
    setIsLoggedIn(true)
    // if (isLoggedIn) {
    const userData = [api.getUserInfo(), api.getInitialCards()];
    Promise.all(userData)
      .then(([userData, items]) => {
        setCards(items);
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
    // }
  }, []);


  // setIsLoggedIn

  return (
    <div className="page__container">
      <Switch>
        <Route path="/signup"> 
          {/* <Header />  */}
          <Register handleRegister={handleRegister} />
          {/* onEditAvatar={handleLogin */}
          {/* {getContent()} */}
          {/* isOpen={true} */}
        </Route>
        <Route path="/signin"  >
        {/* onLogin */}
          {/* <Header />  */}
          <Login handleLogin={handleLogin}  /> 
          {/* tokenCheck={tokenCheck} */}
        </Route>
        {/* <ProtectedRoute path="/users/me" isLoggedIn={true} component={Main} /> */}
        <Route exact path="/users/me"> 
          {isLoggedIn ? <Redirect to="/users/me" /> : <Redirect to="/signin" />}
          <CurrentUserContext.Provider value={currentUser}>
      
        <Header  onSignOut={onSignOut} /> 
        {/* {isLoggedIn && <Main />}   email={email} */}
        <Main userData={isLoggedIn.userData}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCardPopupClick}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          setIsSubmitted={setIsSubmitted}
          isSubmitted={isSubmitted}
        />
        <DeleteCardPopup
          isOpen={isDeleteCardPopup}
          card={selectedCard}
          onCardDelete={handleCardDelete}
          onClose={closeAllPopups}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
        />
        <ImagePopup
          onCardClick={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
          name="image"
        />
      </CurrentUserContext.Provider>
      {/* </ProtectedRoute> */}
      {/* {/* <Route>
      {isLoggedIn ? <Redirect to="/users/me" /> : <Redirect to="/signin" />} */}
</Route> 
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />} 
          </Route>
      </Switch>

      
      <InfoTooltip
      // old={handleInfoToolti}
        //  onLogin={handleInfoToolti}
        // isOpen={true}
        isOpen={isRegister}
        onClose={closeAllPopups}
        name="register"
        // src={src}
        // isSubmitted={isSubmitted}
      />
    </div>
  );
}

export default App;
