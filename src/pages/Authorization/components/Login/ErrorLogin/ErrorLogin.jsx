import React from 'react';
import './ErrorLogin.css';

const ErrorLogin = (props) => (
  <button
    type="button"
    onClick={() => {
      console.log(props);
    }}
    className="ErrorLogin__container"
  >
    <h1>Login failed</h1>
    <h2>Что-то пошло нахер... ой, то бишь не так...</h2>
  </button>
);

export default ErrorLogin;
