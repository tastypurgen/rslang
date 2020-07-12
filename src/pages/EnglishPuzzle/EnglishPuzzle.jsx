import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import './EnglishPuzzle.scss';

export default class EnglishPuzzle extends PureComponent {
  render() {
    return (
      <div className="puzzle">
        <div className="wrapper">
          <h1 className="title">Мозаика</h1>
          <p className="description">Помогает комплексно тренировать навык письма на английском.</p>
          <a href="../../puzzle" className="btn play-btn">Начать</a>
          <NavLink to="/games-panel" className=" btn close-btn">
            К списку тренировок
          </NavLink>
        </div>
      </div>
    );
  }
}
