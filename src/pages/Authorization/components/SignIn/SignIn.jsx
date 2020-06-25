import React from 'react';
import './SignIn.scss';
import { withRouter } from 'react-router-dom';
import postUserData from '../../../../services/postUserData';
import validateUserData from '../../../../utils/validateUserData';
import eyeImg from '../../img/eye.png';

class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
    };
    this.handleError = this.handleError.bind(this);
  }

  handleError(id) {
    this.inputs = document.querySelectorAll('.signin__input');
    document.getElementById(id).classList.remove('hidden');
    this.inputs.forEach((el) => el.classList.add('signin__input_error'));
    this.inputs[1].value = '';
    this.inputs[1].focus();
  }

  render() {
    const mailInputRef = React.createRef();
    const passwordInputRef = React.createRef();

    const { hidden } = this.state;
    const { changeAuthenticatedState, toChangeSignInState } = this.props;

    return (
      <div className="signin">
        <div className="signin__container">
          <h1>Войти в систему</h1>
          <form action="" method="post">
            <input minLength="6" maxLength="35" ref={mailInputRef} className="signin__input" type="email" placeholder="Email" />
            <input minLength="8" maxLength="16" ref={passwordInputRef} className="signin__input" type={hidden ? 'password' : 'text'} placeholder="Пароль" />
            <span className="eye">
              <div className="before">/</div>
              <img
                role="button"
                src={eyeImg}
                alt="visible"
                onClick={() => {
                  this.setState({ hidden: !hidden });
                  document.querySelector('.before').classList.toggle('hidden');
                }}
              />
            </span>
            <p className="error hidden" id="error">Неверное имя пользователя или пароль</p>
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
                      changeAuthenticatedState();
                    } else {
                      this.handleError('error');
                    }
                  });
                } else {
                  this.handleError('error');
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
