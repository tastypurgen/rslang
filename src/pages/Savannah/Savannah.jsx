/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import './Savannah.scss';
import getWords from '../../services/getWords';
import Game from './Game';

const wordsLevel = ['Очень легко', 'Легко', 'Средне', 'Тяжело', 'Очень тяжело', "I'm from England"];

export default class Savannah extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      value: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleClick() {
    this.setState({ play: true });
  }

  render() {
    if (!this.state.play) {
      getWords(this.state.value, 2);
      return (
        <div>
          <div>
            <h2>Саванна</h2>
            <h2>Угадай правильное слово</h2>
          </div>
          <p><b>Уровень сложности:</b></p>
          <select value={this.state.value} onChange={this.handleChange}>
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
