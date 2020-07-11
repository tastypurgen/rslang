import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Dashboard from './pages/Dashboard/Dashboard';
import Authorization from './pages/Authorization/Authorization';
import SpeakIt from './pages/SpeakIt/SpeakIt';
import Savannah from './pages/Savannah/Savannah';
import AudioChallenge from './pages/AudioChallenge/MainPage';
import Sprint from './pages/Sprint/Sprint';
import Dictionary from './pages/Dictionary/Dictionary';
import EnglishPuzzle from './pages/EnglishPuzzle/EnglishPuzzle';
import GamesPanel from './pages/GamesPanel/GamesPanel';
import MainGame from './pages/Dashboard/MainGame/MainGame';
import Spinner from './components/Spinner/Spinner';
import checkUserToken from './services/checkUserToken';
import WordConstructor from './pages/WordСonstructor/WordСonstructor';
import AboutTeam from './pages/AboutTeam/AboutTeam';
import Promo from './pages/Promo/Promo';
import Statistic from './pages/Statistic/Statistic';
import Settings from './pages/Settings/Settings';

export default class App extends Component {
  state = {
    isAuthenticated: false,
    isSpinnerOn: true,
  };

  componentDidMount = async () => {
    // check if token valid
    if (localStorage.userToken) {
      const response = await checkUserToken();
      if (response) {
        this.setState({
          isAuthenticated: true,
        });
      }
    }
    this.setState({
      isSpinnerOn: false,
    });
  }

  changeAuthenticatedState = () => {
    const { isAuthenticated } = this.state;
    this.setState({
      isAuthenticated: !isAuthenticated,
    });
  }

  render() {
    const { isAuthenticated, isSpinnerOn } = this.state;
    if (isSpinnerOn) {
      return (<Spinner />);
    }
    if (isAuthenticated) {
      return (
        <div>
          <Header changeAuthenticatedState={this.changeAuthenticatedState} />
          <Route exact path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/games-panel" component={GamesPanel} />
          <Route path="/dictionary" component={Dictionary} />
          <Route path="/speakit" component={SpeakIt} />
          <Route path="/english-puzzle" component={EnglishPuzzle} />
          <Route path="/savannah" component={Savannah} />
          <Route path="/audio-challenge" component={AudioChallenge} />
          <Route path="/sprint" component={Sprint} />
          <Route path="/main-game" component={MainGame} />
          <Route path="/word-constructor" component={WordConstructor} />
          <Route path="/promo-page" component={Promo} />
          <Route path="/about-team" component={AboutTeam} />
          <Route path="/statistic" component={Statistic} />
          <Route path="/settings" component={Settings} />
          <Footer />
        </div>
      );
    }
    return (
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
}
