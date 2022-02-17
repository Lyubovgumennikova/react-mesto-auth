import React from "react";
import Popup from "./Popup";
// import UnionV from "../images/u ";

function InfoTooltip({
  name,
  isOpen,
  onClose,
  UnionV,
  
  isSubmitted
}) {
  

  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <figure name="image" className="popup__content-image">
        <img className="popup__mask-group" src={
          isSubmitted
          ? {UnionV}
          : {UnionV}
          } alt={name} />
        <figcaption className="popup__text">
          { isSubmitted 
      ? "Вы успешно зарегистрировались!" 
      : "Что-то пошло не так! Попробуйте ещё раз."} 
          </figcaption>
      </figure>
      {/* <img className="header__logo" src={UnionV} alt="иконка" /> */}
     
    </Popup>
  );
}

export default InfoTooltip;

