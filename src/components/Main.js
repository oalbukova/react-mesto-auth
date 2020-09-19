import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile main__profile">
        <img
          className="profile__img"
          src={currentUser.avatar}
          alt={currentUser.name}
          name="avatar"
        />
        <div onClick={props.onEditAvatar} className="profile__img-hover" />
        <div className="profile__container">
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            onClick={props.onEditProfile}
            className="profile__edit-button"
            type="button"
          />
        </div>
        <button
          onClick={props.onAddPlace}
          className="profile__add-button"
          type="button"
        />
      </section>

      <ul className="card-list main__card-list">
        {props.cards &&
          props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.clickImages}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
      </ul>
    </main>
  );
}

export default Main;
