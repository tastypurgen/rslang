import React from 'react';
import './SignIn.scss';
import { withRouter } from 'react-router-dom';
import postUserData from '../../../../services/postUserData';
import validateUserData from '../../../../utils/validateUserData';
import eyeImg from '../../img/eye.png';

const className = require('classnames');

class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      hiddenError: true,
    };
    this.mailInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
    this.handleError = this.handleError.bind(this);
  }

  handleError() {
    this.setState({ hiddenError: false });
    this.passwordInputRef.current.value = '';
    this.passwordInputRef.current.focus();
  }

  render() {
    const { hidden, hiddenError } = this.state;
    const { changeAuthenticatedState, toChangeSignInState } = this.props;

    const inputClasses = className('signin__input', { 'error-input': !hiddenError });

    return (
      <div className="signin">
        <div className="signin__container">
          <h1>Войти в систему</h1>
          <form action="" method="post">
            <input minLength="6" maxLength="35" ref={this.mailInputRef} className={inputClasses} type="email" placeholder="Email" />
            <input minLength="8" maxLength="16" ref={this.passwordInputRef} className={inputClasses} type={hidden ? 'password' : 'text'} placeholder="Пароль" />
            <span className="eye">
              <div className={`before ${!hidden ? 'hidden' : ''}`}>/</div>
              <img
                role="button"
                src={eyeImg}
                alt="visible"
                onClick={() => {
                  this.setState({ hidden: !hidden });
                }}
              />
            </span>
            <p className={`error ${hiddenError ? 'hidden' : ''}`}>Неверное имя пользователя или пароль</p>
            <button
              type="button"
              onClick={() => {
                const userData = {
                  email: this.mailInputRef.current.value,
                  password: this.passwordInputRef.current.value,
                };
                const validateResult = validateUserData(userData);

                if (validateResult) {
                  postUserData(userData, 'signin').then((response) => {
                    if (response) {
                      changeAuthenticatedState();
                    } else {
                      this.handleError();
                    }
                  });
                } else {
                  this.handleError();
                }
              }}
              className="signin__button"
            >
              Войти

            </button>
          </form>
          <p className="to-login">
            У вас нет учетной записи?
            <span
              role="button"
              tabIndex={0}
              onClick={() => {
                toChangeSignInState();
              }}
            >
              Зарегистрироваться
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
