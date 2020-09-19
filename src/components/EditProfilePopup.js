import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const nameRef = React.useRef();
  const descriptionRef = React.useRef();
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");
  const [nameValid, setNameValid] = React.useState(false);
  const [descriptionValid, setDescriptionValid] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  function handleChangeName(e) {
    setName(e.target.value);
    validate();
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
    validate();
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    props.onUpdateUser({
      // Передаём значения управляемых компонентов во внешний обработчик
      name,
      about: description,
    });
  }

  function validate() {
    setNameError(nameRef.current.validationMessage);
    setDescriptionError(descriptionRef.current.validationMessage);

    !nameRef.current.validity.valid ? setNameValid(false) : setNameValid(true);
    !descriptionRef.current.validity.valid
      ? setDescriptionValid(false)
      : setDescriptionValid(true);
  }

  React.useEffect(() => {
    //После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  React.useEffect(() => {
    setDisabled(false);
    setNameError("");
    setDescriptionError("");
  }, [props.isOpen]);

  React.useEffect(() => {
    nameValid && descriptionValid ? setDisabled(false) : setDisabled(true);
  }, [nameValid, descriptionValid, name, description]);

  return (
    <PopupWithForm
      name="form_profile"
      title="Редактировать профиль"
      submit="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      disabled={disabled}
    >
      <input
        className="popup__input popup__input_type_name"
        id="name-input"
        type="text"
        required
        placeholder="Имя"
        value={name || ""}
        ref={nameRef}
        name="name"
        pattern="[A-Za-zА-Яа-яЁё -]*"
        minLength="2"
        maxLength="40"
        onChange={handleChangeName}
      />
      <span
        className={`popup__span-error ${
          !nameValid && "popup__span-error_type_active"
        }`}
        id="name-input-error"
      >
        {nameError}
      </span>
      <input
        className="popup__input popup__input_type_job"
        id="job-input"
        type="text"
        required
        placeholder="О себе"
        value={description || ""}
        ref={descriptionRef}
        name="about"
        minLength="2"
        maxLength="200"
        onChange={handleChangeDescription}
      />
      <span
        className={`popup__span-error ${
          !descriptionValid && "popup__span-error_type_active"
        }`}
        id="job-input-error"
      >
        {descriptionError}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
