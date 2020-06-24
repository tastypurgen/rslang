import React, { PureComponent } from 'react';
import './Savannah.scss';
import getWords from '../../services/getWords';
import Game from './Game';

export default class Savannah extends PureComponent {
  state = {
    isStarted: false,
    difficulty: document.getElementById('difficulty') ? document.getElementById('difficulty').value : 1,
  }

  handleClick = () => {
    this.setState({ isStarted: true });
  }

  render() {
    const { isStarted, difficulty } = this.state;

    if (!isStarted) {
      getWords(difficulty, 2);
      return (
        <div className="savannah">
          <div className="start-board">
            <div>
              <h2>Саванна</h2>
              <h3>Тренировка слов на время</h3>
            </div>
            <br />
            <input className="btn" type="button" value="Play" onClick={this.handleClick} />
          </div>
        </div>
      );
    }
    return (
      <Game />
    );
  }
}
