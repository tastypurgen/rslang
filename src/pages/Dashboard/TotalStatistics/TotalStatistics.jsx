import React from 'react';
import ProgressBar from '../../../components/Progressbar/ProgressBar';
import tablet from './tablet.svg';
import './TotalStatistics.scss';

const TotalStatistics = () => (
  <div className="TotalStatistics Dashboard__card">
    <div className="TotalStatistics__title-bar">
      <p className="TotalStatistics__title">
        Всего
      </p>
      <img className="TotalStatistics__image" src={tablet} alt="tablet" />
    </div>
    <div className="TotalStatistics__container">
      <p className="TotalStatistics__process-learning">
        В процессе изучения 112 из 3600 слов
      </p>
      <ProgressBar progressPercent={33} />
      <p className="TotalStatistics__learned">
        Выучено 5 из 3600 слов
      </p>
      <ProgressBar progressPercent={33} />
    </div>
  </div>
);

export default TotalStatistics;
