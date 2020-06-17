import React from 'react';

import './dashboard.scss';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line arrow-body-style
const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <NavLink to="audio-challenge">Audio Challenge</NavLink>
    </div>
  );
};

export default Dashboard;
