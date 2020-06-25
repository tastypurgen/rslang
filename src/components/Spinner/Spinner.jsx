import React from 'react';

import './Spinner.scss';
import planeImg from './img/plane.png';

const Spinner = () => (
  <div className="spinner">
    <img src={planeImg} alt="spinner" />
    Загрузка...
  </div>
);

export default Spinner;
