import React, { PureComponent } from 'react';
import './Savannah.scss';
import getWords from '../../services/getWords';
import Game from './Game';

const wordsLevel = ['Очень легко', 'Легко', 'Средне', 'Тяжело', 'Очень тяжело', "I'm from England"];

export default class Savannah extends PureComponent {
  state = {
    isStarted: false,
    value: 0,
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  handleClick = () => {
    this.setState({ isStarted: true });
  }

  render() {
    const { isStarted, value } = this.state;

    if (!isStarted) {
      getWords(value, 2);
      return (
        <div className="savannah">
          <div className="start-board">
            <div>
              <h2>Саванна</h2>
              <h3>Тренировка слов на время</h3>
            </div>
            <p><b>Уровень сложности:</b></p>
            <select value={value} onChange={this.handleChange}>
              {wordsLevel.map((item, index) => (
                <option
                  tabIndex={0}
                  key={(`${item}`)}
                  value={index}
                >
                  {item}
                </option>
              ))}
            </select>
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
