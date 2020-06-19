import React from 'react';
import AudioChallenge from './AudioChallenge';
import getRandomWords from '../../services/getWords';

const difficulty = ['basic', 'easy', 'medium', 'hard', 'very hard', 'advanced'];

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
    if (!this.state.play) {
      getRandomWords(this.state.value, 3);
      return (
        <div>
          <div>
            <h1>Audio Challenge</h1>
            <h2>Listen and guess</h2>
          </div>
          <p><b>Choose difficulty:</b></p>
          <select value={this.state.value} onChange={this.handleChange}>
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
          <input type="button" value="Play" onClick={this.handleClick} />
        </div>
      );
    }
    return (
      <AudioChallenge />
    );
  }
}
