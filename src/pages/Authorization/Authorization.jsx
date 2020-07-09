/* eslint-disable no-console */
import React, { PureComponent } from 'react';

import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';

class Authorization extends PureComponent {
  state = {
    signIn: true,
  };

  toChangeSignInState = () => {
    const { signIn } = this.state;
    this.setState({
      signIn: !signIn,
    });
  }

  render() {
    const { signIn } = this.state;
    const { changeAuthenticatedState } = this.props;
    const components = [];
    if (signIn) {
      components.push((<SignIn
        toChangeSignInState={this.toChangeSignInState}
        changeAuthenticatedState={changeAuthenticatedState}
      />));
    } else {
      components.push((<SignUp
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
