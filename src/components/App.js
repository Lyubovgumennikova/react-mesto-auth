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
  const [loggedIn, setLoggedIn] = useState(false);
  // const [isRegiste, setIsRegiste] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  // const handleRegister = () => {
  //   setIsRegiste(!isRegiste);
  //   // setIsRegiste(true)
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
    // setIsRegiste(false);
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

  useEffect(() => {
    setLoggedIn(true)
    // if (loggedIn) {
    const userData = [api.getUserInfo(), api.getInitialCards()];
    Promise.all(userData)
      .then(([userData, items]) => {
        setCards(items);
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
    // }
  }, []);


  // setLoggedIn

  return (
    <div className="page__container">
      <Switch>
        <Route path="/signup"> 
        {/* onRegister={handleRegister} */}
        <Header /> 
        {/* <Link to="/" className="signup__link"> Войти</Link> */}
          <Register  />
          {/* isOpen={true} */}
        </Route>
        <Route path="/signin" onEditAvatar={handleLogin} >
        <Header /> 
          <Login />
        </Route>
        {/* <ProtectedRoute path="/users/me" loggedIn={true} component={Main} />  */}
        <Route exact path="/users/me">
          {/* {loggedIn ? <Redirect to="/users/me" /> : <Redirect to="/signin" />} */}
          <CurrentUserContext.Provider value={currentUser}>
      
        <Header  /> 
        {/* {loggedIn && <Main />}   email={email} */}
        <Main
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
        </Route>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />} 
          </Route>
      </Switch>

      
      {/* <InfoTooltip
        //  onCardClick={handleRegister}
        onClose={closeAllPopups}
        name="register"
      /> */}
    </div>
  );
}

export default App;
