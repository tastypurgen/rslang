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
      <h1>signIn err</h1>
      <h2>Юзер даз нот экзист или пароль был введен неверно</h2>
    </div>
  );
};

export default ErrSignIn;
