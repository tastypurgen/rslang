import React from 'react';
import './SuccesLogin.css';

const SuccesLogin = (props) => {
  const closePopupEventFunction = () => {
    document.removeEventListener('click', closePopupEventFunction);
  };
  document.addEventListener('click', closePopupEventFunction);
  return (
    <div>
      {/* onClick={() => {
         // props.changeAuthenticatedState();
       }}
       className="SuccesLogin__container"
     > */}
      <h1>Login succesfull</h1>
      <h2>Вы успешно зарегистрировались!</h2>
    </div>
  );
};

export default SuccesLogin;
