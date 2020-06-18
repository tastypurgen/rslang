import React from 'react';
import { NavLink } from 'react-router-dom';

import './GamesPanel.scss';
import GameCard from '../../components/GameCard/GameCard';

import speakImg from './speak.png';
import puzzleImg from './puzzle.png';
import savannahImg from './savannah.png';

const GamesPanel = () => (
  <div className="games-panel">
    <div className="container">
      <div className="mode">
        <span>Тренировки</span>
        <select name="difficulty">
          <option value="0">Очень легко</option>
          <option value="1">Легко</option>
          <option value="2">Средне</option>
          <option value="3">Тяжело</option>
          <option value="4">Очень тяжело</option>
          <option value="5">I&apos;m from England</option>
        </select>
      </div>
      <div className="cards-container">
        <NavLink to="/speakit">
          <GameCard
            name="Speak It"
            description="Lorem ipsum ipsum lorem"
            img={speakImg}
          />
        </NavLink>
        <NavLink to="/english-puzzle">
          <GameCard
            name="English Puzzle"
            description="Lorem ipsum ipsum lorem"
            img={puzzleImg}
          />
        </NavLink>
        <NavLink to="/savannah">
          <GameCard
            name="Savannah"
            description="Lorem ipsum ipsum lorem"
            img={savannahImg}
          />
        </NavLink>
        <NavLink to="/audio-challenge">
          <GameCard
            name="Audio Challenge"
            description="Lorem ipsum ipsum lorem"
            img={savannahImg}
          />
        </NavLink>
        <NavLink to="/sprint">
          <GameCard
            name="Sprint"
            description="Lorem ipsum ipsum lorem"
            img={savannahImg}
          />
        </NavLink>
        <NavLink to="/word-constructor">
          <GameCard
            name="Word Constructor"
            description="Lorem ipsum ipsum lorem"
            img={savannahImg}
          />
        </NavLink>
      </div>
    </div>
  </div>
);

export default GamesPanel;
