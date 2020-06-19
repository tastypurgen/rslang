import React from 'react';

import './GameCard.scss';

const GameCard = ({ name, description }) => (
  <div className="game-card">
    <h4>{name}</h4>
    <p>{description}</p>
  </div>
);

export default GameCard;
