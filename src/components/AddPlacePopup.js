import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const nameRef = useRef();
  const linkRef = useRef();
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [linkError, setLinkError] = React.useState("");
  const [nameValid, setNameValid] = React.useState(false);
  const [linkValid, setLinkValid] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  React.useEffect(() => {
    setDisabled(true);
    setNameError("");
    setLinkError("");
    setName("");
    setLink("");
  }, [props.isOpen]);

  React.useEffect(() => {
    nameValid && linkValid ? setDisabled(false) : setDisabled(true);
  }, [nameValid, linkValid, name, link]);

  function handleChangeName(e) {
    setName(e.target.value);
    validate();
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
    validate();
  }

  function validate() {
    setNameError(nameRef.current.validationMessage);
    setLinkError(linkRef.current.validationMessage);

    !nameRef.current.validity.valid ? setNameValid(false) : setNameValid(true);
    !linkRef.current.validity.valid ? setLinkValid(false) : setLinkValid(true);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    props.onAddPlace({
      // Передаём значения управляемых компонентов во внешний обработчик
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="form_card"
      title="Новое место"
      submit="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      disabled={disabled}
    >
      <input
        className="popup__input popup__input_type_place"
        id="name"
        type="text"
        value={name || ""}
        required
        placeholder="Название"
        name="name"
        minLength="1"
        maxLength="30"
        onChange={handleChangeName}
        ref={nameRef}
      />
      <span
        className={`popup__span-error ${
          !nameValid && "popup__span-error_type_active"
        }`}
        id="name-error"
      >
        {nameError}
      </span>
      <input
        className="popup__input popup__input_type_link"
        id="link"
        type="url"
        required
        placeholder="Ссылка на картинку"
        name="link"
        ref={linkRef}
        value={link || ""}
        onChange={handleChangeLink}
      />
      <span
        className={`popup__span-error ${
          !linkValid && "popup__span-error_type_active"
        }`}
        id="link-error"
      >
        {linkError}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
