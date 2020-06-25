import React from 'react';
import './Login.scss';

import postUserData from '../../../../services/postUserData';
import validateUserData from '../../../../utils/validateUserData';
import eyeImg from '../../img/eye.png';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hiddenPassword: true,
      hiddenConfirm: true,
    };
    this.handleError = this.handleError.bind(this);
  }

  handleError(id) {
    this.inputs = document.querySelectorAll('.login__input');
    document.getElementById(id).classList.remove('hidden');
    this.inputs.forEach((el) => el.classList.remove('login__input_error'));

    switch (id) {
      case 'error':
        document.getElementById('check-error').classList.add('hidden');
        document.getElementById('login-error').classList.add('hidden');
        this.inputs[1].classList.add('login__input_error');
        this.inputs[1].focus();
        break;
      case 'check-error':
        document.getElementById('error').classList.add('hidden');
        document.getElementById('login-error').classList.add('hidden');
        this.inputs[2].value = '';
        this.inputs[2].focus();
        this.inputs[2].classList.add('login__input_error');
        break;
      case 'login-error':
        document.getElementById('error').classList.add('hidden');
        document.getElementById('check-error').classList.add('hidden');
        this.inputs[0].focus();
        this.inputs[0].classList.add('login__input_error');
        this.inputs[1].value = '';
        this.inputs[2].value = '';
        break;
      default:
        break;
    }
  }

  render() {
    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    const confirmPasswordRef = React.createRef();

    const { hiddenPassword, hiddenConfirm } = this.state;
    const { changeAuthenticatedState, toChangeSignInState } = this.props;

    return (
      <div className="login">
        <div className="login__container">
          <h1>Регистрация нового пользователя</h1>
          <form action="" method="post">
            <input minLength="6" maxLength="35" ref={emailRef} className="login__input" type="email" placeholder="Email" />
            <input
              minLength="8"
              maxLength="16"
              ref={passwordRef}
              className="login__input"
              type={hiddenPassword ? 'password' : 'text'}
              placeholder="Пароль"
              title="Пароль должен содержать минимум одну большую и маленькую букву, цифру и спецсимвол"
            />
            <input ref={confirmPasswordRef} className="login__input" id="confirm" type={hiddenConfirm ? 'password' : 'text'} placeholder="Подтвердите пароль" />
            <span className="eye">
              <img
                role="button"
                src={eyeImg}
                alt="visible"
                onClick={() => {
                  this.setState({ hiddenPassword: !hiddenPassword });
                  document.querySelectorAll('.before')[0].classList.toggle('hidden');
                }}
              />
              <img
                role="button"
                src={eyeImg}
                alt="visible"
                onClick={() => {
                  this.setState({ hiddenPassword: !hiddenPassword });
                  document.querySelectorAll('.before')[1].classList.toggle('hidden');
                }}
              />
              <div className="before">/</div>
              <div className="before">/</div>
            </span>
            <p className="error hidden" id="error">Пароль должен содержать минимум одну большую и маленькую букву, цифру и спецсимвол</p>
            <p className="error hidden" id="check-error">Пароли не совпадают, повторите попытку</p>
            <p className="error hidden" id="login-error">Такой пользователь уже существует</p>
            <button
              type="button"
              onClick={() => {
                const userData = {
                  email: emailRef.current.value,
                  password: passwordRef.current.value,
                };
                if (userData.password === confirmPasswordRef.current.value) {
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
