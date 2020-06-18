import React from 'react';
import './ErrSignIn.css';

const ErrSignIn = (props) => {
  const closePopupEventFunction = (evt) => {
    props.setErrorSignIn();
    document.removeEventListener('click', closePopupEventFunction);
  };
  document.addEventListener('click', closePopupEventFunction);
  return (
    <div className="ErrSignIn__container">
      <h2>Неверный логин или пароль</h2>
    </div>
  );
};

export default ErrSignIn;
