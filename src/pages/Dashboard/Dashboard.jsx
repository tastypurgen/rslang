import React from 'react';
import MainGame from './MainGame/MainGame';
import './Dashboard.scss';

class Dashboard extends React.PureComponent {
  render() {
    return (
      <div className="dashboard">
        <MainGame />
      </div>
    );
  }
}

export default Dashboard;
