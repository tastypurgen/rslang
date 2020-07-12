import React from 'react';
import calendar from './calendar.svg';
import './TodayStatistics.scss';

const TodayStatistics = (props) => {
  const { todayStatisticsData } = props;
  const {
    cards, newWords, rightAnswers, longestChain,
  } = todayStatisticsData;
  return (
    <div className="TodayStatistics Dashboard__card">
      <div className="TodayStatistics__title-bar">
        <p className="TodayStatistics__title">
          Cегодня
        </p>
        <img src={calendar} alt="" className="TodayStatistics__icon" />
      </div>
      <ul className="TodayStatistics__list">
        <li className="TodayStatistics__list-item">
          <p>Пройдено слов</p>
          <p className="TodayStatistics__number--green">{cards}</p>
        </li>
        <li className="TodayStatistics__list-item">
          Новые слова
          <p className="TodayStatistics__number--red">{newWords}</p>
        </li>
        <li className="TodayStatistics__list-item">
          Правильные ответы
          <p className="TodayStatistics__number--green">{rightAnswers}</p>
        </li>
        <li className="TodayStatistics__list-item">
          Лучшая серия
          <p className="TodayStatistics__number--green">{longestChain}</p>
        </li>
      </ul>
    </div>
  );
};

export default TodayStatistics;
