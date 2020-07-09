import React from 'react';
import { NavLink } from 'react-router-dom';
import './Popup.scss';

const Popup = (props) => {
  const { changePopupShowState } = props;
  return (
    <div className="Popup">
      <div className="Popup__shadow-decoration" />
      <div className="Popup__modal">
        <div className="Popup__checkmark">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        <b className="Popup__title">Хорошая работа!</b>
        <p className="Popup__second-title">Вы успешно завершили дневную норму!</p>

        <NavLink to="/">
          <button
            type="button"
            onClick={() => {
              changePopupShowState(false);
            }}
            className="Popup__button"
          >
            ОК
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Popup;
