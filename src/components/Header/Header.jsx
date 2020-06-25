import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

import userImg from './img/user.png';
import statisticImg from './img/statistic.png';

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.showMenu = this.showMenu.bind(this);
  }

  componentDidMount() {
    document.getElementById('root').addEventListener('click', (e) => {
      if (e.target.className !== 'user') {
        this.setState({ show: false });
      }
    });
  }

  showMenu() {
    this.setState((prevState) => ({
      show: !prevState.show,
    }));
  }

  render() {
    const { changeAuthenticatedState } = this.props;
    const { show } = this.state;
    return (
      <div className="header">
        <img className="user" src={userImg} alt="user" role="button" onClick={this.showMenu} />
        <div className={`user-links ${show ? '' : 'hidden'}`}>
          <NavLink className="settings" to="/settings">
            Настройки
          </NavLink>
          <span
            className="exit"
            role="button"
            onClick={() => {
              localStorage.clear();
              changeAuthenticatedState();
            }}
            tabIndex={0}
          >
            Выйти
          </span>
        </div>
        <ul className="navigation">
          <li>
            <NavLink exact to="/">Главная</NavLink>
          </li>
          <li>
            <NavLink to="/games-panel">Мини-игры</NavLink>
          </li>
          <li>
            <NavLink to="/dictionary">Словарь</NavLink>
          </li>
        </ul>
        <NavLink className="statistic" to="/statistic">
          <img src={statisticImg} alt="statistic" />
        </NavLink>
      </div>
    );
  }
}

export default Header;
