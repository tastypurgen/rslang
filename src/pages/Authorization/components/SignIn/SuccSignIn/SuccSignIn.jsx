import React from 'react';
import './SuccSignIn.css';

const SuccSignIn = (props) => {
  console.log(props);
  const closePopupEventFunction = () => {
    props.changeAuthenticatedState();
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

export default SuccSignIn;
