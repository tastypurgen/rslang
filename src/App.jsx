import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Dashboard from './pages/Dashboard/Dashboard';
import Authorization from './pages/Authorization/Authorization';
import SpeakIt from './pages/SpeakIt/SpeakIt';
import Savannah from './pages/Savannah/Savannah';
import AudioChallenge from './pages/AudioChallenge/AudioChallenge';
import Sprint from './pages/Sprint/Sprint';
import Dictionary from './pages/Dictionary/Dictionary';
import EnglishPuzzle from './pages/EnglishPuzzle/EnglishPuzzle';
import GamesPanel from './pages/GamesPanel/GamesPanel';
import Spinner from './components/Spinner/Spinner';
import checkUserToken from './services/checkUserToken';

export default class App extends Component {
  state = {
    isAuthenticated: false,
    isSpinnerOn: true,
  };

  componentDidMount() {
    if (localStorage.userToken) {
      checkUserToken().then((response) => {
        if (response) {
          this.setState({
            isAuthenticated: true,
            isSpinnerOn: false,
          });
        } else {
          this.setState({
            isSpinnerOn: false,
          });
        }
      });
    } else {
      this.setState({
        isSpinnerOn: false,
      });
    }
  }

  changeAuthenticatedState = () => {
    const { isAuthenticated } = this.state;
    this.setState({
      isAuthenticated: !isAuthenticated,
    });
  }

  render() {
    const { isAuthenticated, isSpinnerOn } = this.state;
    let component;
    if (isSpinnerOn) {
      component = (<Spinner />);
    } else if (isAuthenticated) {
      component = (
        <div>
          <Header changeAuthenticatedState={this.changeAuthenticatedState} />
          <Route exact path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/games-panel" component={GamesPanel} />
          <Route path="/dictionary" component={Dictionary} />
          <Route path="/speakit" component={SpeakIt} />
          <Route path="/savannah" component={Savannah} />
          <Route path="/audio-challenge" component={AudioChallenge} />
          <Route path="/sprint" component={Sprint} />
          <Route path="/english-puzzle" component={EnglishPuzzle} />
          <Redirect to="/" component={Dashboard} />
          <Footer />
        </div>
      );
    } else {
      component = (
        <div>
          <Route
            exact
            to="/"
            render={() => (
              <Authorization
                changeAuthenticatedState={this.changeAuthenticatedState}
              />
            )}
          />
          <Redirect to="/" component={Authorization} />
        </div>
      );
    }

    return (
      <div>
        <Switch>
          {component}
        </Switch>
      </div>
    );
  }
}
