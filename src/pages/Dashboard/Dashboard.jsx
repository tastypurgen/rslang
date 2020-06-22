import React from 'react';
import { NavLink } from 'react-router-dom';

import './Dashboard.scss';

class Dashboard extends React.PureComponent {
  render() {
    return (
      <div className="dashboard">
        <h2>Dashboard</h2>
        <div className="info">
          <NavLink className="promo" to="/promo-page">
            Промо
          </NavLink>
          <NavLink className="about" to="/about-team">
            О команде
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Dashboard;
