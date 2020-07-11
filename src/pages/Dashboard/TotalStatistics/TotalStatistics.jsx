import React from 'react';
import ProgressBar from '../../../components/Progressbar/ProgressBar';
import tablet from './tablet.svg';
import './TotalStatistics.scss';

const TotalStatistics = (props) => {
  const { totalStatistics } = props;
  const { inProgressWordsCount, learnedWordsCount } = totalStatistics;
  console.log(totalStatistics);
  return (
    <div className="TotalStatistics Dashboard__card">
      <div className="TotalStatistics__title-bar">
        <p className="TotalStatistics__title">
          Всего
        </p>
        <img className="TotalStatistics__image" src={tablet} alt="tablet" />
      </div>
      <div className="TotalStatistics__container">
        <p className="TotalStatistics__process-learning">
          {`В процессе изучения ${inProgressWordsCount} из 3600 слов`}
        </p>
        <ProgressBar progressPercent={(100 / 3600) * (inProgressWordsCount)} />
        <p className="TotalStatistics__learned">
          {`Выучено ${learnedWordsCount} из 3600 слов`}
        </p>
        <ProgressBar progressPercent={(100 / 3600) * (learnedWordsCount)} />
      </div>
    </div>
  );
};

export default TotalStatistics;
