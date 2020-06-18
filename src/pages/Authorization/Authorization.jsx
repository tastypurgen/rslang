/* eslint-disable no-console */
import React, { PureComponent } from 'react';
// import '.Authorization.css';

import Login from './components/Login/Login';
import SignIn from './components/SignIn/SignIn';

class Authorization extends PureComponent {
  state = {
    signIn: true,
  };

  // сохранение данных о юзере
  toSaveUserData = (userData) => {
    localStorage.setItem('userData', userData);
  }

  toChangeSignInState = () => {
    const { signIn } = this.state;
    this.setState({
      signIn: !signIn,
    });
  }

  render() {
    console.log(this.props);
    const { signIn } = this.state;
    const { changeAuthenticatedState } = this.props;
    const components = [];
    if (signIn) {
      components.push((<SignIn
        toChangeSignInState={this.toChangeSignInState}
        changeAuthenticatedState={changeAuthenticatedState}
      />));
    } else {
      components.push((<Login
        toChangeSignInState={this.toChangeSignInState}
        changeAuthenticatedState={changeAuthenticatedState}
      />));
    }
    return (
      <>
        {components}
      </>
    );
  }
}
export default Authorization;
