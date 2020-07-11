import React from 'react';
import { NavLink } from 'react-router-dom';
import ProgressBar from '../../../components/Progressbar/ProgressBar';
import enCard from './images/en-card.svg';
import './TodayGoal.scss';

const TodayGoal = (props) => {
  const { todayStatisticsData, cardsPerDay } = props;
  const {
    cards, newWords, rightAnswers, longestChain,
  } = todayStatisticsData;

  const makeGoalSentence = () => {
    let goalSentence = `Завершить ${cardsPerDay} карточек. Сегодня вы выполнили ${cards} карточек.
  Для достижения цели выучите ещё ${cardsPerDay - cards} карточек.`;
    if (cards >= cardsPerDay) {
      goalSentence = `Вы успешно завершили дневную норму - ${cards} карточек! Вы можете продолжить изучние английских слов.`;
    }
    return goalSentence;
  };

  const makeButtonCapture = () => {
    let buttonCapture = 'Начать';
    if (cards > 0) {
      buttonCapture = 'Продолжить';
    }
    return buttonCapture;
  };

  return (
    <div className="TodayGoal Dashboard__card">
      <div className="TodayGoal__title-bar">
        <p className="TodayGoal__title">
          Цель на сегодня
        </p>
        <select className="TodayGoal__select">
          <option>Все слова</option>
          <option>чето еще</option>
          <option>чето еще</option>
          <option>А зачем эти селекты нужны вообще?</option>
        </select>
      </div>
      <div className="TodayGoal__flex-wrapper">
        <p className="TodayGoal__description">
          {makeGoalSentence()}
        </p>
        <img className="TodayGoal__image" src={enCard} alt="английский язык" />
      </div>
      <div className="TodayGoal__progreess-container">
        <ProgressBar progressPercent={33} width="235px" />
        <button type="button" className="TodayGoal__button">
          <NavLink className="TodayGoal__nav-link" to="/main-game">{makeButtonCapture()}</NavLink>
        </button>
      </div>
    </div>
  );
};

export default TodayGoal;
