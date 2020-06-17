import React from 'react';
import { withRouter } from 'react-router-dom';
import './SuccSignIn.css';

const SuccSignIn = (props) => {
  const closePopupEventFunction = (evt) => {
    props.history.push('/main-page');
    document.removeEventListener('click', closePopupEventFunction);
  };
  document.addEventListener('click', closePopupEventFunction);
  return (
    <div
      onClick={() => {
        props.setSuccesSignIn();
      }}
      className="SuccSignIn__container"
    >
      <h1>Auth succesfull</h1>
      <h2>Вы успешно вошли в систему!</h2>
    </div>
  );
};

export default withRouter(SuccSignIn);
