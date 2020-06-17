/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/destructuring-assignment */

import React from 'react';
import './audioChallenge.scss';
import { NavLink } from 'react-router-dom';
import Answers from './answers';
import Word from './word';

const testWords = [
  {
    word: 'school',
    image: 'files/09_0178.jpg',
    audio: 'files/09_0178.mp3',
    // transcription: '[skuːl]',
    answers: ['школа', 'алкоголь', 'работа', 'дом', 'магазин'],
    rightAnswerIndex: 0,
  },
  {
    word: 'door',
    image: 'files/09_0167.jpg',
    audio: 'files/09_0167.mp3',
    // transcription: '[dɔːr]',
    answers: ['окно', 'дверь', 'дорога', 'Тверь', 'коридор'],
    rightAnswerIndex: 1,
  },
  {
    word: 'friend',
    image: 'files/09_0168.jpg',
    audio: 'files/09_0168.mp3',
    // transcription: '[frend]',
    answers: ['мужчина', 'круг', 'друг', 'пруд', 'брат'],
    rightAnswerIndex: 2,
  },
];

export default class AudioChallenge extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isGameStarted: true,
      currentLevel: 0,
      active: false,
      right: 0,
      wrong: 0,
      // score: 0,
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.setState({ active: false });
  }

  nextLevel() {
    this.setState((prevState) => ({
      currentLevel: prevState.currentLevel + 1,
      right: prevState.right + 1,
      active: true,
    }));
    if (this.state.right + this.state.wrong === testWords.length - 1) {
      this.finishGame();
    }
  }

  wrongAnswer() {
    this.setState((prevState) => ({
      currentLevel: prevState.currentLevel + 1,
      wrong: prevState.wrong + 1,
      active: true,
    }));
    if (this.state.right + this.state.wrong === testWords.length - 1) {
      this.finishGame();
    }
  }

  finishGame() {
    this.setState({ isGameStarted: false });
  }

  render() {
    if (this.state.isGameStarted) {
      const address = 'https://raw.githubusercontent.com/irinainina/rslang-data/master/';
      const level = this.state.active ? this.state.currentLevel - 1 : this.state.currentLevel;
      const word = {
        word: testWords[level].word,
        audio: address + testWords[level].audio,
        img: address + testWords[level].image,
      };
      return (
        <div className="audio-challenge">
          <NavLink to="/">Go to dashboard</NavLink>
          <div>
            <b>Let&apos;s play Audio Challenge! :)</b>
          </div>
          <div>
            Right answers:
            {this.state.right}
            <br />
            Wrong answers:
            {this.state.wrong}
          </div>
          <Word word={word} class={this.state.active ? '' : 'hidden'} />
          <Answers
            answers={testWords[level].answers}
            wrongAnswer={() => this.wrongAnswer()}
            nextLevel={() => this.nextLevel()}
            rightAnswerIndex={testWords[level].rightAnswerIndex}
            active={this.state.active}
            word={word}
          >
            <button className={this.state.active ? '' : 'hidden'} type="button" onClick={this.clickHandler}>Next</button>
          </Answers>
        </div>
      );
    }
    return (
      <div>
        <NavLink to="/">Go to dashboard</NavLink>
        <h2>Results:</h2>
        Right answers:
        {this.state.right}
        <br />
        Wrong answers:
        {this.state.wrong}
      </div>
    );
  }
}
