import React from "react";
import Popup from "./Popup";
// import UnionV from "../images/u ";

function InfoTooltip({
  name,
  isOpen,
  onClose,
  
  
  isSubmitted
}) {
  

  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      {/* <img className="header__logo" src={UnionV} alt="иконка" /> */}
      <h2 className="popup__text">{
      isSubmitted 
      ? "Вы успешно зарегистрировались!" 
      : "Что-то пошло не так! Попробуйте ещё раз."
      }</h2>
    </Popup>
  );
}

export default InfoTooltip;

