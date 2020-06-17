import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.scss';
import Header from './components/Header/Header';
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

  render() {
    const { isAuthenticated } = this.state;
    let component;

    if (isAuthenticated) {
      component = (
        <div>
          <Header />
          <Route to="/dashboard" component={Dashboard} />
          <Route to="/gamespanel" component={GamesPanel} />
          <Route to="/dictionary" component={Dictionary} />
          <Route to="/speakit" component={SpeakIt} />
          <Route to="/savannah" component={Savannah} />
          <Route to="/audiochallenge" component={AudioChallenge} />
          <Route to="/sprint" component={Sprint} />
          <Route to="/dictionary" component={Dictionary} />
          <Route to="/englishpuzzle" component={EnglishPuzzle} />
        </div>
      );
    } else {
      component = (
        <div>
          <Route exact to="/" component={Authorization} />
        </div>
      );
    }

    return (
      <div>
        {component}
      </div>
    );
  }
}
