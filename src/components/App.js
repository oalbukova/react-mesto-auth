import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ConfirmationPopup from "./ConfirmationPopup";
import Register from "./Register";
import Login from "./Login";
import api from "../utils/Api";
import * as auth from "../utils/auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute"; // импортируем HOC
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [
    isDeleteConfirmationPopupOpen,
    setIsDeleteConfirmationPopupOpen,
  ] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [cardDelete, setCardDelete] = React.useState([]);
  const [dataImage, setDataImage] = React.useState({});
  const setImage = (card) => {
    setDataImage(card);
    handleCardClick();
  };
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loginState, setLoginState] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [successToolTip, setSuccessToolTip] = React.useState(false);
  const [isEmpty, setIsEmpty] = React.useState(false);
  const history = useHistory();
  const emptyClassName = `${isEmpty ? "empty" : "empty_type_inactive"}`;

  function handleChangeEmpty() {
    setIsEmpty(!isEmpty);
  }

  function handleLoginState(state) {
    setLoginState(state);
  }

  function handleSuccessToolTip() {
    setSuccessToolTip(true);
  }

  function handleTooltipOpen() {
    setIsTooltipOpen(true);
  }

  function handleRegister({ email, password }) {
    setIsLoading(true);
    return auth.register(email, password).then((res) => {
      setIsLoading(false);
      if (res) {
        return true;
      } else {
        throw new Error("Некорректно заполнено одно из полей");
      }
    });
  }

  function handleLogin({ email, password }) {
    setIsLoading(true);
    return auth
      .authorize(email, password)
      .then((res) => {
        if (res && res.token) {
          setLoggedIn(true);
          tokenCheck();
        } else {
          handleTooltipOpen();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        if (res) {
          setUserData({
            id: res.data._id,
            email: res.data.email,
          });
          setLoggedIn(true);
          history.push("/");
        } else {
          localStorage.removeItem("jwt");
        }
      });
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  React.useEffect(() => {
    Promise.all([api.getInfoUser(), api.getInitialCards()]) //загрузка данных профиля и карточек
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick() {
    setSelectedCard(true);
  }

  function handleDeleteClick() {
    setIsDeleteConfirmationPopupOpen(true);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
      // Обновляем стейт
      setCards(newCards);
    });
  }

  function handleCardDelete(card) {
    setCardDelete(card);
    handleDeleteClick();
  }

  function handleConfirmDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(cardDelete._id)
      .then(() => {
        // Формируем новый массив на основе имеющегося, убирая из него карточку
        const newCards = cards.filter((c) => c._id !== cardDelete._id);
        // Обновляем стейт
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(user) {
    setIsLoading(true);
    api
      .update(user.name, user.about)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .addNewCard(card.name, card.link)
      .then((newCard) => {
        setCards([...cards, newCard]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(user) {
    setIsLoading(true);
    api
      .updateAvatar(user.avatar)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setIsDeleteConfirmationPopupOpen(false);
    setDataImage({});
    setIsTooltipOpen(false);
    setTimeout(setSuccessToolTip, 2000, false);
  }

  function handleEscClose(e) {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  }

  function handlerOverlayClick(e) {
    if (e.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    window.addEventListener("keydown", handleEscClose);
    window.addEventListener("mousedown", handlerOverlayClick);

    return () => {
      window.removeEventListener("mousedown", handlerOverlayClick);
      window.removeEventListener("keydown", handleEscClose);
    };
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className={emptyClassName} />
      <div className="page">
        <Header
          loggedIn={loggedIn}
          onSignOut={signOut}
          userData={userData}
          loginState={loginState}
          emptyClick={handleChangeEmpty}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            clickImages={setImage}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-in">
            <Login
              name="login"
              successToolTip={handleSuccessToolTip}
              onLogin={handleLogin}
              onLoginState={handleLoginState}
              isLoading={isLoading}
            />
          </Route>
          <Route path="/sign-up">
            <Register
              name="register"
              onRegister={handleRegister}
              openToolTip={handleTooltipOpen}
              successToolTip={handleSuccessToolTip}
              onLoginState={handleLoginState}
              isLoading={isLoading}
            />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <ConfirmationPopup
          isOpen={isDeleteConfirmationPopupOpen}
          onClose={closeAllPopups}
          onDelete={handleConfirmDelete}
          isLoading={isLoading}
        />
        <ImagePopup
          isOpen={selectedCard}
          onClose={closeAllPopups}
          card={dataImage}
        />
        <InfoTooltip
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
          successStyle={successToolTip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
