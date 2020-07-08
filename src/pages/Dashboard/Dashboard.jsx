import React from 'react';
import MainGame from './MainGame/MainGame';
import TodayGoal from './TodayGoal/TodayGoal';
import TodayStatistics from './TodayStatistics/TodayStatistics';
import TotalStatistics from './TotalStatistics/TotalStatistics';
import './Dashboard.scss';

class Dashboard extends React.PureComponent {
  render() {
    return (
      <div className="Dashboard">
        <div className="Dashboard__container">
          <TodayGoal />
          <TodayStatistics />
          <TotalStatistics />
        </div>
      </div>
    );
  }
}

export default Dashboard;
