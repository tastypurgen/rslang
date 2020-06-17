import React from 'react';
import './App.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/header/header';
import Dashboard from './components/dashboard/dashboard';
import AudioChallenge from './components/audio-challenge/audioChallenge';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Route exact path="/" component={Dashboard} />
        <Route path="/audio-challenge" component={AudioChallenge} />
      </div>
    </BrowserRouter>
  );
}

export default App;
