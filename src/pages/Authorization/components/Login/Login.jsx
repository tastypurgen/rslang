/* eslint-disable no-console */
import React, { useState } from 'react';
import './Login.css';

// import SuccesLogin from './SuccesLogin/SuccesLogin';
import ErrorLogin from './ErrorLogin/ErrorLogin';
import toPostUserData from '../../../../services/toPostUserData';
import toValidateUserData from '../../../../utils/toValidateUserData';
import toSaveUserData from '../../../../utils/toSaveUserData';

const Login = (props) => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const confirmPasswordRef = React.createRef();

  const [errorLogin, setErrorSignIn] = useState(false);
  // const [succesLogin, setSuccesLogin] = useState(false);

  let component;

  if (errorLogin) {
    component = (<ErrorLogin />);
  } else {
    component = (
      <div className="Login__container">
        <h1>Регистрация нового пользователя</h1>
        <form action="" method="post">
          <input minLength="6" maxLength="35" ref={emailRef} className="Login__input" type="email" placeholder="email" />
          <input minLength="8" maxLength="16" ref={passwordRef} className="Login__input" type="password" placeholder="Пароль" />
          <input ref={confirmPasswordRef} className="Login__input" type="password" placeholder="Подтвердите пароль" />
          <button
            type="button"
            onClick={() => {
              const userData = {
                email: emailRef.current.value,
                password: passwordRef.current.value,
              };
              if (userData.password === confirmPasswordRef.current.value) {
                if (toValidateUserData(userData)) {
                  toPostUserData(userData, 'users').then((response) => {
                    if (response) {
                      toPostUserData(userData, 'signin').then(() => {
                        toSaveUserData(userData);
                        props.changeAuthenticatedState();
                      });
                    } else {
                      console.log('Login false');
                      setErrorSignIn(true);
                    }
                  });
                }
              }
            }}
            className="Login__input"
          >
            Зарегистрироваться

          </button>
          <p>
            или
            <button
              type="button"
              onClick={() => {
                props.toChangeSignInState();
              }}
            >
              войти в систему

            </button>
          </p>
        </form>
      </div>
    );
  }

  return (
    component
  );
};

export default Login;
