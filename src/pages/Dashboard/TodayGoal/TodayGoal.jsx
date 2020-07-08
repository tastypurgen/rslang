import React from 'react';
import { NavLink } from 'react-router-dom';
import ProgressBar from '../../../components/Progressbar/ProgressBar';
import enCard from './images/en-card.svg';
import './TodayGoal.scss';

const TodayGoal = () => (
  <div className="TodayGoal">
    <div className="TodayGoal__title-bar">
      <p className="TodayGoal__title">
        Цель на сегодня
      </p>
      <select className="TodayGoal__select">
        <option>Все слова</option>
        <option>чето еще</option>
        <option>чето еще</option>
      </select>
    </div>
    <p className="TodayGoal__description">
      Завершить 20 карточек. Сегодня вы выполнили 5 карточек.
      Для достижения цели выучите ещё 15 карточек.
    </p>
    <img className="TodayGoal__image" src={enCard} alt="английский язык" />
    <div className="TodayGoal__progreess-container">
      <ProgressBar progressPercent={33} width="235px" />
      <button type="button" className="TodayGoal__button">
        <NavLink className="TodayGoal__nav-link" to="/main-game">Продолжить</NavLink>
      </button>
    </div>
  </div>
);

export default TodayGoal;
