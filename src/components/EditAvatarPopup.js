import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  const currentUser = React.useContext(CurrentUserContext);
  const [avatar, setAvatar] = React.useState("");
  const [avatarError, setAvatarError] = React.useState("");
  const [avatarValid, setAvatarValid] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  function handleChangeAvatar(e) {
    setAvatar(e.target.value);
    validate();
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    props.onUpdateAvatar({
      // Передаём значения управляемых компонентов во внешний обработчик
      avatar: avatar,
    });
  }

  function validate() {
    setAvatarError(avatarRef.current.validationMessage);
    !avatarRef.current.validity.valid
      ? setAvatarValid(false)
      : setAvatarValid(true);
  }

  React.useEffect(() => {
    //После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
    setAvatar("");
  }, [currentUser, props.isOpen]);

  React.useEffect(() => {
    setDisabled(true);
    setAvatarError("");
  }, [props.isOpen]);

  React.useEffect(() => {
    avatarValid ? setDisabled(false) : setDisabled(true);
  }, [avatarValid, avatar]);

  return (
    <PopupWithForm
      name="form_avatar"
      formName="avatar"
      title="Обновить аватар"
      submit="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      disabled={disabled}
    >
      <input
        onChange={handleChangeAvatar}
        ref={avatarRef}
        value={avatar || ""}
        minLength="2"
        maxLength="200"
        className="popup__input popup__input_type_avatar"
        id="avatar-input"
        type="url"
        required
        placeholder="Ссылка на картинку"
        name="link"
      />
      <span
        className={`popup__span-error ${
          !avatarValid && "popup__span-error_type_active"
        }`}
        id="avatar-input-error"
      >
        {avatarError}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
