import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './GamesPanel.scss';
import GameCard from '../../components/GameCard/GameCard';

import speakImg from './img/speak.png';
import puzzleImg from './img/puzzle.png';
import savannahImg from './img/savannah.png';
import listenImg from './img/listen.png';
import sprintImg from './img/sprint.png';
import constructorImg from './img/constructor.png';

const GamesPanel = () => {
  const [difficulty, setDifficulty] = useState(0);
  return (
    <div className="games-panel">
      <div className="container">
        <div className="mode">
          <span>Тренировки</span>
          <select name="difficulty" id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
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
              name="Повторяйка"
              description="Слушай и повторяй"
              img={speakImg}
            />
          </NavLink>
          <NavLink to="/english-puzzle">
            <GameCard
              name="Мозаика"
              description="Собери предложение"
              img={puzzleImg}
            />
          </NavLink>
          <NavLink to="/savannah">
            <GameCard
              name="Саванна"
              description="Развивай словарный запас"
              img={savannahImg}
            />
          </NavLink>
          <NavLink to="/audio-challenge">
            <GameCard
              name="Аудиовызов"
              description="Слушай и угадывай"
              img={listenImg}
            />
          </NavLink>
          <NavLink to="/sprint">
            <GameCard
              name="Спринт"
              description="Угадывай на время"
              img={sprintImg}
            />
          </NavLink>
          <NavLink to="/word-constructor">
            <GameCard
              name="Конструктор слов"
              description="Собери слово"
              img={constructorImg}
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default GamesPanel;
