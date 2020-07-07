import React from 'react';
import { postUserData, getToken, getUserId } from '../../../../services/postUserData';
import { setUserSettings } from '../../../../services/settingsService';
import validateUserData from '../../../../utils/validateUserData';

import './SignUp.scss';

import eyeImg from '../../img/eye.png';

const classNames = require('classnames');

class SignUp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hiddenPassword: true,
      hiddenConfirm: true,
      hiddenError: true,
      hiddenCheckError: true,
      hiddenSignUpError: true,
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
      hiddenSignUpError: true,
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
      case 'sign-up-error':
        this.setState({ hiddenSignUpError: false });
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
      hiddenPassword, hiddenConfirm, hiddenError, hiddenCheckError, hiddenSignUpError,
    } = this.state;
    const { changeAuthenticatedState, toChangeSignInState } = this.props;

    const inputClass1 = classNames('sign-up__input', { 'error-input': !hiddenSignUpError });
    const inputClass2 = classNames('sign-up__input', { 'error-input': !hiddenError });
    const inputClass3 = classNames('sign-up__input', { 'error-input': !hiddenCheckError });

    return (
      <div className="sign-up">
        <div className="sign-up__container">
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
            <p className={`error ${hiddenError ? 'hidden' : ''}`}>
              <b>Проверьте e-mail и/или пароль.</b>
              <br />
              (Пароль должен содержать не менее 8 символов,
              прописные и заглавные буквы, цифры и спецсимвол)
            </p>
            <p className={`error ${hiddenCheckError ? 'hidden' : ''}`}>Пароли не совпадают, повторите попытку</p>
            <p className={`error ${hiddenSignUpError ? 'hidden' : ''}`}>Такой пользователь уже существует</p>
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
                          setUserSettings(getToken(), getUserId());
                          changeAuthenticatedState();
                        });
                      } else {
                        this.handleError('sign-up-error');
                      }
                    });
                  } else {
                    this.handleError('error');
                  }
                } else {
                  this.handleError('check-error');
                }
              }}
              className="sign-up__button"
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

export default SignUp;
