import React, { useState } from 'react';
import './SignIn.css';
import { withRouter } from 'react-router-dom';
import ErrSignIn from './ErrSignIn/ErrSignIn';
import { postUserData } from '../../../../services/postUserData';
import validateUserData from '../../../../utils/validateUserData';

const SignIn = (props) => {
  const mailInputRef = React.createRef();
  const passwordInputRef = React.createRef();

  const [errorSignIn, setErrorSignIn] = useState(false);

  let component;
  if (errorSignIn) {
    component = (<ErrSignIn setErrorSignIn={setErrorSignIn} />);
  } else {
    component = (
      <div className="SignIn__container">
        <h1>Войти в систему</h1>
        <form action="" method="post">
          <input minLength="6" maxLength="35" ref={mailInputRef} className="SignIn__input" type="email" placeholder="email" />
          <input minLength="8" maxLength="16" ref={passwordInputRef} className="SignIn__input" type="text" placeholder="Пароль" />
          <button
            type="button"
            onClick={() => {
              const userData = {
                email: mailInputRef.current.value,
                password: passwordInputRef.current.value,
              };
              const validateResult = validateUserData(userData);
              if (validateResult) {
                postUserData(userData, 'signin').then((response) => {
                  if (response) {
                    props.changeAuthenticatedState();
                  } else {
                    setErrorSignIn(true);
                  }
                });
              }
            }}
            className="SignIn__button"
          >
            Войти

          </button>
          <p>
            или
            <button
              type="button"
              onClick={() => {
                props.toChangeSignInState();
              }}
            >
              зарегистрироваться

            </button>
          </p>
        </form>
      </div>
    );
  }

  return (component);
};

export default withRouter(SignIn);
