import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => (
  <div className="header">
    <h1>RSLang Header</h1>
    <ul>
      <li>
        <NavLink to="/dashboard">Главная</NavLink>
      </li>
      <li>
        <NavLink to="/games-panel">Мини-игры</NavLink>
      </li>
      <li>
        <NavLink to="/dictionary">Словарь</NavLink>
      </li>
    </ul>
  </div>
);

export default Header;
