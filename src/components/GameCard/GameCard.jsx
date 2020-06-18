import React from 'react';

import './GameCard.scss';

const GameCard = ({ name, description }) => (
  <div className="game-card">
    <h4>{name}</h4>
    <p>{description}</p>
    {/* <img src="/3.png" alt="" /> */}
  </div>
);

export default GameCard;
