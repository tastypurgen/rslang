import React from 'react';
import { NavLink } from 'react-router-dom';

import './Footer.scss';

const Header = () => (
  <div className="footer">
    <div className="info">
      <NavLink className="promo" to="/promo-page">
        Промо
      </NavLink>
      <NavLink className="about" to="/about-team">
        О команде
      </NavLink>
    </div>
    <span>Copyright &#169; 2020 Все права защищены</span>
  </div>
);

export default Header;
