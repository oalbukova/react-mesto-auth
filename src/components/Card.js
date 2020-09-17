import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const cardImgStyle = {
    backgroundImage: 'url(' + props.card.link + ')',
  };
  const isOwn = props.card.owner._id === currentUser._id;// Определяем, являемся ли мы владельцем текущей карточки
  const cardDeleteButtonClassName = (
    `card__delete ${isOwn ? '' : 'card__delete_hidden'}`
  );// Создаём переменную, которую после зададим в `className` для кнопки удаления

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const cardLikeButtonClassName = (
    `like__button ${isLiked ? 'like__button_type_active' : ''}`
  );// Создаём переменную, которую после зададим в `className` для кнопки лайка

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li key={props.card._id} className="card card-list__card">
      <div onClick={handleClick} className="card__img" style={cardImgStyle} />
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
      <div className="card__caption">
        <h2 className="card__text">{props.card.name}</h2>
        <div className="like">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          {props.card.likes.length > 0 &&
          <p className="like__sum">
            {props.card.likes.length}
          </p>
          }
        </div>
      </div>
    </li>
  );
}

export default Card;