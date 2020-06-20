/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import './Savannah.scss';
import getWords from '../../services/getWords';
import Game from './Game';

const wordsLevel = ['Очень легко', 'Легко', 'Средне', 'Тяжело', 'Очень тяжело', "I'm from England"];

export default class Savannah extends PureComponent {
  state = {
    play: false,
    value: 0,
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  handleClick = () => {
    this.setState({ play: true });
  }

  render() {
    const { play, value } = this.state;

    if (!play) {
      getWords(value, 2);
      return (
        <div>
          <div>
            <h2>Саванна</h2>
            <h2>Угадай правильное слово</h2>
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
          <input type="button" value="Play" onClick={this.handleClick} />
        </div>
      );
    }
    return (
      <Game />
    );
  }
}
