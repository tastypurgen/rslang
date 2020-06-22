import React from 'react';

import './GameCard.scss';

const GameCard = ({ name, description, img }) => (
  <div className="game-card">
    <div className="title">{name}</div>
    <p className="subtitle">{description}</p>
    <div className="img">
      <img src={img} alt="" />
    </div>
  </div>
);

export default GameCard;
