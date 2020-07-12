import React from 'react';
import { NavLink } from 'react-router-dom';
import audioImg from '../img/audio.png';

const Statistics = (props) => {
  const { rightAnswers, wrongAnswers, restartGame } = props;
  return (
    <div className="word-constructor word-constructor__start-page">
      <div className="word-constructor__start-panel">
        <h2>Конец игры!</h2>
        <div className="word-constructor__answers">
          <h3>Решено:</h3>
          {rightAnswers.map((word) => (
            <div key={word.id} className="word-constructor__answers__item">
              <audio id={word.id} src={word.audio} />
              <img
                className="word-constructor__answers__icon"
                src={audioImg}
                alt="audio"
                role="button"
                tabIndex={0}
                onClick={() => document.getElementById(word.id).play()}
              />
              <span>{`${word.word} - ${word.translation}`}</span>
            </div>
          ))}
          <h3>Пропущено:</h3>
          {wrongAnswers.map((word) => (
            <div key={word.id} className="word-constructor__answers__item">
              <audio id={word.id} src={word.audio} />
              <img
                className="word-constructor__answers__icon"
                src={audioImg}
                alt="audio"
                role="button"
                tabIndex={0}
                onClick={() => document.getElementById(word.id).play()}
              />
              <span>{`${word.word} - ${word.translation}`}</span>
            </div>
          ))}
        </div>
        <div className="word-constructor__buttons word-constructor__buttons_statistics">
          <button className="word-constructor__btn word-constructor__btn_green" type="button" onClick={restartGame}>Ещё раз</button>
          <NavLink to="/games-panel">
            <button className="word-constructor__btn word-constructor__btn_blue" type="button">Выйти</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
