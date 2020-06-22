import React from 'react';
import AudioChallenge from './AudioChallenge';
import getRandomWords from '../../services/getWords';

export default class MainPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      value: document.getElementById('difficulty') ? document.getElementById('difficulty').value : 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ play: true });
  }

  render() {
    const { play, value } = this.state;
    if (!play) {
      getRandomWords(value, 3);
      return (
        <div className="audio-challenge" id="level-0">
          <div>
            <h1>Аудиовызов</h1>
            <span>Тренировка улучшает восприятие английской речи на слух.</span>
          </div>
          <input className="button" type="button" value="Начать" onClick={this.handleClick} />
        </div>
      );
    }
    return (
      <AudioChallenge />
    );
  }
}
