/* eslint-disable no-param-reassign */

import React from 'react';
import './AudioChallenge.scss';
import Answers from './Answers';
import Word from './Word';
import img from './img/audio.png';

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
    this.gameWords = [];
    this.handleClick = this.handleClick.bind(this);
    this.setWords();
  }

  setWords() {
    const address = 'https://raw.githubusercontent.com/irinainina/rslang-data/master/';
    const words = JSON.parse(localStorage.words).sort(() => Math.random() - 0.5);
    const wordsPerGame = 10;
    this.gameWords.splice(0);

    words.slice(0, wordsPerGame).map((word) => this.gameWords.push({
      word: word.word,
      image: address + word.image,
      audio: address + word.audio,
      translation: word.wordTranslate,
      transcription: word.transcription,
      answers: [word.wordTranslate],
    }));

    for (let i = wordsPerGame; i <= wordsPerGame * 4; i += wordsPerGame) {
      words.slice(i, i + wordsPerGame).map((word, index) => this.gameWords[index].answers
        .push(word.wordTranslate));
    }

    this.gameWords.map((word) => {
      word.answers = word.answers.sort(() => Math.random() - 0.5);
      word.rightAnswerIndex = word.answers.indexOf(word.translation);
      return word;
    });
  }

  handleClick() {
    const { right, wrong } = this.state;
    this.setState({ active: false });
    if (right + wrong === this.gameWords.length) {
      this.finishGame();
    }
  }

  nextLevel() {
    const { know, currentLevel } = this.state;
    know.push(this.gameWords[currentLevel]);
    this.setState((prevState) => ({
      currentLevel: prevState.currentLevel + 1,
      right: prevState.right + 1,
      active: true,
    }));
  }

  wrongAnswer() {
    const { mistakes, currentLevel } = this.state;
    mistakes.push(this.gameWords[currentLevel]);
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
    const {
      isGameStarted,
      active,
      right,
      wrong,
      currentLevel,
      mistakes,
      know,
    } = this.state;

    if (isGameStarted) {
      const level = active || right + wrong === this.gameWords.length
        ? currentLevel - 1
        : currentLevel;
      const word = {
        word: this.gameWords[level].word,
        audio: this.gameWords[level].audio,
        img: this.gameWords[level].image,
        transcription: this.gameWords[level].transcription,
        translation: this.gameWords[level].translation,
        answers: this.gameWords[level].answers,
        rightAnswerIndex: this.gameWords[level].rightAnswerIndex,
      };

      return (
        <div className="audio-challenge">
          <div>
            Правильных ответов:
            {right}
            <br />
            Ошибок:
            {wrong}
          </div>
          <Word word={word} nameClass={active ? '' : 'hidden'} />
          <Answers
            wrongAnswer={() => this.wrongAnswer()}
            nextLevel={() => this.nextLevel()}
            active={active}
            word={word}
            handleClick={this.handleClick}
          >
            <input className={active ? '' : 'hidden'} type="submit" onClick={this.handleClick} value="Next" />
          </Answers>
        </div>
      );
    }
    return (
      <div className="audio-challenge">
        <h2>Результаты:</h2>
        <span style={{ color: 'red' }}>
          Ошибок:
          {wrong}
        </span>
        {mistakes.map((item) => (
          <div key={`wrong_${item.word}`}>
            <audio id={item.word} src={item.audio} />
            <img
              src={img}
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
          Знаю:
          {right}
        </span>
        {know.map((item) => (
          <div key={`correct_${item.word}`}>
            <audio id={item.word} src={item.audio} />
            <img
              src={img}
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
