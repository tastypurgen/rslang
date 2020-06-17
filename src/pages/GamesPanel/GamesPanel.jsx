import React from 'react';

import './GamesPanel.scss';
import { NavLink } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import SpeakIt from '../SpeakIt/SpeakIt';
import Savannah from '../Savannah/Savannah';
import AudioChallenge from '../AudioChallenge/AudioChallenge';
import Sprint from '../Sprint/Sprint';
import Dictionary from '../Dictionary/Dictionary';
import EnglishPuzzle from '../EnglishPuzzle/EnglishPuzzle';

const GamesPanel = () => (
  <div className="games-panel">
    <h2>GamesPanel</h2>
    <div>
      <NavLink to="/dashboard" component={Dashboard} />
      <NavLink to="/speakit" component={SpeakIt} />
      <NavLink to="/savannah" component={Savannah} />
      <NavLink to="/audiochallenge" component={AudioChallenge} />
      <NavLink to="/sprint" component={Sprint} />
      <NavLink to="/dictionary" component={Dictionary} />
      <NavLink to="/englishpuzzle" component={EnglishPuzzle} />
    </div>
  </div>
);

export default GamesPanel;
