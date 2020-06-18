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

export default class App extends Component {
  state = {
    isAuthenticated: true,
  };

  changeAuthenticatedState = () => {
    this.setState({
      isAuthenticated: true,
    });
  }

  render() {
    const { isAuthenticated } = this.state;
    let component;

    if (isAuthenticated) {
      component = (
        <div>
          <Header />
          <Route exact path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/games-panel" component={GamesPanel} />
          <Route path="/dictionary" component={Dictionary} />
          <Route path="/speakit" component={SpeakIt} />
          <Route path="/savannah" component={Savannah} />
          <Route path="/audio-challenge" component={AudioChallenge} />
          <Route path="/sprint" component={Sprint} />
          <Route path="/english-puzzle" component={EnglishPuzzle} />
          <Redirect component={Dashboard} />
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
              <Authorization changeAuthenticatedState={this.changeAuthenticatedState} />
            )}
          />
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
