import React from 'react';

import './GamesPanel.scss';
import { NavLink } from 'react-router-dom';
// import Dashboard from '../Dashboard/Dashboard';
// import SpeakIt from '../SpeakIt/SpeakIt';
// import Savannah from '../Savannah/Savannah';
// import AudioChallenge from '../AudioChallenge/AudioChallenge';
// import Sprint from '../Sprint/Sprint';
// import Dictionary from '../Dictionary/Dictionary';
// import EnglishPuzzle from '../EnglishPuzzle/EnglishPuzzle';
import GameCard from '../../components/GameCard/GameCard';

const GamesPanel = () => (
  <div className="games-panel">
    <h2>GamesPanel</h2>
    <div>
      <NavLink to="/speakit">
        <GameCard
          name="Speak It"
          description="Lorem ipsum ipsum lorem"
        />
      </NavLink>
      <NavLink to="/savannah">
        <GameCard
          name="Savannah"
          description="Lorem ipsum ipsum lorem"
        />
      </NavLink>
      <NavLink to="/audio-challenge">
        <GameCard
          name="Audio Challenge"
          description="Lorem ipsum ipsum lorem"
        />
      </NavLink>
      <NavLink to="/sprint">
        <GameCard
          name="Sprint"
          description="Lorem ipsum ipsum lorem"
        />
      </NavLink>
      <NavLink to="/english-puzzle">
        <GameCard
          name="English Puzzle"
          description="Lorem ipsum ipsum lorem"
        />
      </NavLink>
      <NavLink to="/word-constructor">
        <GameCard
          name="Word Constructor"
          description="Lorem ipsum ipsum lorem"
        />
      </NavLink>
    </div>
  </div>
);

export default GamesPanel;
