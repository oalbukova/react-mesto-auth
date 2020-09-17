import React from 'react';

function ImagePopup(props) {

  return (
    <section className={(props.isOpen ? "popup popup_opened" : "popup")} id="popupBig">
      <div className="popup-view">
        <button onClick={props.onClose} className="button-close" id="view-close" type="reset"></button>
        <figure className="popup-view__item">
          <img src={props.card.link} className="popup-view__img" alt={props.card.name}/>
          <figcaption className="popup-view__caption">{props.card.name}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;