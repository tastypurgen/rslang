import React from 'react';
import { NavLink } from 'react-router-dom';
import './AlertPopup.scss';

const AlertPopup = (props) => {
  const { changeAlertPopupState, children } = props;
  return (
    <div className="AlertPopup">
      <div className="AlertPopup__shadow-decoration" />
      <div className="AlertPopup__modal">
        <p className="AlertPopup__second-title">{children}</p>
        <NavLink to="/">
          <button
            type="button"
            onClick={() => {
              changeAlertPopupState(false, '');
            }}
            className="AlertPopup__button"
          >
            ОК
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default AlertPopup;
