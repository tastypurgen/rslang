/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React from 'react';

import './NameCard.scss';

import ghImg from '../img/gh.svg';

const NameCard = ({
  name, img, description, ghLink,
}) => (
    <div className="about-card">
      <div className="photo">
        <img src={img} alt="" />
      </div>
      <div className="info">
        <div className="name">{name}</div>
        <div className="description">
          <p>{description}</p>
          <div className="links">
            <a href={ghLink} target="_blank" rel="noopener noreferrer">
              <img src={ghImg} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

export default NameCard;
