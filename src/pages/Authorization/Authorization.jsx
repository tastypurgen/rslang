/* eslint-disable no-console */
import React, { PureComponent } from 'react';
// import '.Authorization.css';

import Login from './components/Login/Login';
import SignIn from './components/SignIn/SignIn';

class Authorization extends PureComponent {
  state = {
    signIn: true,
  };

  toPostUserData = async (userData, endPoint) => {
    try {
      const request = await fetch(`https://afternoon-falls-25894.herokuapp.com/${endPoint}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const response = await request.json();
      console.log(response);
    } catch (e) {
      return false;
    }
    return true;
  }

  toSaveUserData = (userData) => {
    localStorage.setItem('userData', userData);
  }

  toValidateUserData = (userData) => {
    console.log(userData);
    const reg = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/g;
    if ((/[A-Z]+/g.test(userData.password) && /[0-9]+/g.test(userData.password) && /[a-z]+/g.test(userData.password) && userData.password.length >= 8 && userData.password.length < 17) && reg.test(userData.email)) {
      console.log('toValidateUserData: succ');
      return true;
    }
    return false;
  }

  toChangeSignInState = () => {
    const { signIn } = this.state;
    this.setState({
      signIn: !signIn,
    });
  }

  render() {
    const { signIn } = this.state;
    const components = [];
    if (signIn) {
      components.push((<SignIn
        toPostUserData={this.toPostUserData}
        toValidateUserData={this.toValidateUserData}
        toChangeSignInState={this.toChangeSignInState}
      />));
    } else {
      components.push((<Login
        toPostUserData={this.toPostUserData}
        toValidateUserData={this.toValidateUserData}
        toChangeSignInState={this.toChangeSignInState}
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
