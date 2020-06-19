/* eslint-disable global-require */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import './AudioChallenge.scss';
import Answers from './Answers';
import Word from './Word';

const gameWords = [];

export default class AudioChallenge extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isGameStarted: true,
      currentLevel: 0,
      active: false,
      right: 0,
      wrong: 0,
      mistakes: [],
      know: [],
      // score: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.setWords();
  }

  setWords() {
    const address = 'https://raw.githubusercontent.com/irinainina/rslang-data/master/';
    const words = JSON.parse(localStorage.words).sort(() => Math.random() - 0.5);
    const wordsPerGame = 10;
    gameWords.splice(0);

    words.slice(0, wordsPerGame).map((word) => gameWords.push({
      word: word.word,
      image: address + word.image,
      audio: address + word.audio,
      translation: word.wordTranslate,
      transcription: word.transcription,
      answers: [word.wordTranslate],
    }));

    for (let i = wordsPerGame; i <= wordsPerGame * 4; i += wordsPerGame) {
      words.slice(i, i + wordsPerGame).map((word, index) => gameWords[index].answers
        .push(word.wordTranslate));
    }

    gameWords.map((word) => {
      word.answers = word.answers.sort(() => Math.random() - 0.5);
      word.rightAnswerIndex = word.answers.indexOf(word.translation);
      return word;
    });
    console.log(gameWords);
  }

  handleClick() {
    this.setState({ active: false });
    if (this.state.right + this.state.wrong === gameWords.length) {
      this.finishGame();
    }
  }

  nextLevel() {
    this.state.know.push(gameWords[this.state.currentLevel]);
    this.setState((prevState) => ({
      currentLevel: prevState.currentLevel + 1,
      right: prevState.right + 1,
      active: true,
    }));
  }

  wrongAnswer() {
    this.state.mistakes.push(gameWords[this.state.currentLevel]);
    this.setState((prevState) => ({
      currentLevel: prevState.currentLevel + 1,
      wrong: prevState.wrong + 1,
      active: true,
    }));
  }

  finishGame() {
    this.setState({ isGameStarted: false });
  }

  render() {
    if (this.state.isGameStarted) {
      const level = this.state.active || this.state.right + this.state.wrong === gameWords.length
        ? this.state.currentLevel - 1
        : this.state.currentLevel;
      const word = {
        word: gameWords[level].word,
        audio: gameWords[level].audio,
        img: gameWords[level].image,
        transcription: gameWords[level].transcription,
        translation: gameWords[level].translation,
        answers: gameWords[level].answers,
        rightAnswerIndex: gameWords[level].rightAnswerIndex,
      };

      return (
        <div className="audio-challenge">
          <div>
            Right answers:
            {this.state.right}
            <br />
            Wrong answers:
            {this.state.wrong}
          </div>
          <Word word={word} class={this.state.active ? '' : 'hidden'} />
          <Answers
            wrongAnswer={() => this.wrongAnswer()}
            nextLevel={() => this.nextLevel()}
            active={this.state.active}
            word={word}
            handleClick={this.handleClick}
          >
            <input className={this.state.active ? '' : 'hidden'} type="submit" onClick={this.handleClick} value="Next" />
          </Answers>
        </div>
      );
    }
    return (
      <div className="audio-challenge">
        <h2>Results:</h2>
        <span style={{ color: 'red' }}>
          Mistakes:
          {this.state.wrong}
        </span>
        {this.state.mistakes.map((item) => (
          <div key={`wrong_${item.word}`}>
            <audio id={item.word} src={item.audio} />
            <img
              src={require('./img/audio.png')}
              alt="audio"
              role="button"
              tabIndex={0}
              onClick={() => document.getElementById(item.word).play()}
            />
            <span>
              <b>{item.word}</b>
              {' '}
              &mdash;
              {' '}
              {item.translation}
            </span>
          </div>
        ))}
        <br />
        <span style={{ color: 'green' }}>
          I know:
          {this.state.right}
        </span>
        {this.state.know.map((item) => (
          <div key={`correct_${item.word}`}>
            <audio id={item.word} src={item.audio} />
            <img
              src={require('./img/audio.png')}
              alt="audio"
              role="button"
              tabIndex={0}
              onClick={() => document.getElementById(item.word).play()}
            />
            <span>
              <b>{item.word}</b>
              {' '}
              &mdash;
              {' '}
              {item.translation}
            </span>
          </div>
        ))}
      </div>
    );
  }
}
