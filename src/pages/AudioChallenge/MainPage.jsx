import React from 'react';
import AudioChallenge from './AudioChallenge';
import getRandomWords from '../../services/getWords';

// const difficulty = ['basic', 'easy', 'medium', 'hard', 'very hard', 'advanced'];
const difficulty = ['начальный', 'легко', 'средне', 'трудно', 'очень трудно', 'продвинутый'];

export default class MainPage extends React.PureComponent {
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
    const { play, value } = this.state;
    if (!play) {
      getRandomWords(value, 3);
      return (
        <div>
          <div>
            <h1>Аудиовызов</h1>
            <h2>Слушай и угадывай</h2>
          </div>
          <p><b>Выберите уровень сложности:</b></p>
          <select value={value} onChange={this.handleChange}>
            {difficulty.map((item, index) => (
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
          <input type="button" value="Играть" onClick={this.handleClick} />
        </div>
      );
    }
    return (
      <AudioChallenge />
    );
  }
}
