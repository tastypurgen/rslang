import React from 'react';
import './Login.scss';

import { postUserData } from '../../../../services/postUserData';
import validateUserData from '../../../../utils/validateUserData';
import eyeImg from '../../img/eye.png';

const classNames = require('classnames');

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hiddenPassword: true,
      hiddenConfirm: true,
      hiddenError: true,
      hiddenCheckError: true,
      hiddenLoginError: true,
    };
    this.mailInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
    this.confirmPasswordRef = React.createRef();
    this.handleError = this.handleError.bind(this);
  }

  handleError(id) {
    this.setState({
      hiddenError: true,
      hiddenCheckError: true,
      hiddenLoginError: true,
    });

    switch (id) {
      case 'error':
        this.setState({ hiddenError: false });
        this.passwordInputRef.current.focus();
        break;
      case 'check-error':
        this.setState({ hiddenCheckError: false });
        this.confirmPasswordRef.current.value = '';
        this.confirmPasswordRef.current.focus();
        break;
      case 'login-error':
        this.setState({ hiddenLoginError: false });
        this.passwordInputRef.current.value = '';
        this.confirmPasswordRef.current.value = '';
        this.mailInputRef.current.focus();
        break;
      default:
        break;
    }
  }

  render() {
    const {
      hiddenPassword, hiddenConfirm, hiddenError, hiddenCheckError, hiddenLoginError,
    } = this.state;
    const { changeAuthenticatedState, toChangeSignInState } = this.props;

    const inputClass1 = classNames('login__input', { 'error-input': !hiddenLoginError });
    const inputClass2 = classNames('login__input', { 'error-input': !hiddenError });
    const inputClass3 = classNames('login__input', { 'error-input': !hiddenCheckError });

    return (
      <div className="login">
        <div className="login__container">
          <h1>Регистрация нового пользователя</h1>
          <form action="" method="post">
            <input minLength="6" maxLength="35" ref={this.mailInputRef} className={inputClass1} type="email" placeholder="Email" />
            <input
              minLength="8"
              maxLength="16"
              ref={this.passwordInputRef}
              className={inputClass2}
              type={hiddenPassword ? 'password' : 'text'}
              placeholder="Пароль"
              title="Пароль должен содержать минимум одну большую и маленькую букву, цифру и спецсимвол"
            />
            <input ref={this.confirmPasswordRef} className={inputClass3} id="confirm" type={hiddenConfirm ? 'password' : 'text'} placeholder="Подтвердите пароль" />
            <span className="eye">
              <img
                role="button"
                src={eyeImg}
                alt="visible"
                onClick={() => {
                  this.setState({ hiddenPassword: !hiddenPassword });
                }}
              />
              <img
                role="button"
                src={eyeImg}
                alt="visible"
                onClick={() => {
                  this.setState({ hiddenConfirm: !hiddenConfirm });
                }}
              />
              <div className={`before ${!hiddenPassword ? 'hidden' : ''}`}>/</div>
              <div className={`before ${!hiddenConfirm ? 'hidden' : ''}`}>/</div>
            </span>
            <p className={`error ${hiddenError ? 'hidden' : ''}`}>Пароль должен содержать минимум одну большую и маленькую букву, цифру и спецсимвол</p>
            <p className={`error ${hiddenCheckError ? 'hidden' : ''}`}>Пароли не совпадают, повторите попытку</p>
            <p className={`error ${hiddenLoginError ? 'hidden' : ''}`}>Такой пользователь уже существует</p>
            <button
              type="button"
              onClick={() => {
                const userData = {
                  email: this.mailInputRef.current.value,
                  password: this.passwordInputRef.current.value,
                };
                if (userData.password === this.confirmPasswordRef.current.value) {
                  if (validateUserData(userData)) {
                    postUserData(userData, 'users').then((response) => {
                      if (response) {
                        postUserData(userData, 'signin').then(() => {
                          changeAuthenticatedState();
                        });
                      } else {
                        this.handleError('login-error');
                      }
                    });
                  } else {
                    this.handleError('error');
                  }
                } else {
                  this.handleError('check-error');
                }
              }}
              className="login__button"
            >
              Зарегистрироваться

            </button>
          </form>
          <p className="to-signin">
            У вас уже есть учетная запись?
            <span
              role="button"
              tabIndex={0}
              onClick={() => {
                toChangeSignInState();
              }}
            >
              Войти
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
