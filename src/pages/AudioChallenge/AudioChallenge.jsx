/* eslint-disable no-param-reassign */

import React from 'react';
import './AudioChallenge.scss';
import Answers from './Answers';
import Word from './Word';
import { getRandomWords } from '../../services/getWords';
import audioImg from './img/audio.png';
import { uri } from '../../utils/constants';

const wordsPerGame = 10;

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
    };
    this.gameWords = [];
    this.handleClick = this.handleClick.bind(this);
    this.setWords();
  }

  setWords() {
    const words = JSON.parse(localStorage.words).sort(() => Math.random() - 0.5);
    this.gameWords.splice(0);

    words.slice(0, wordsPerGame).map((word) => this.gameWords.push({
      word: word.word,
      image: uri + word.image,
      audio: uri + word.audio,
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
    document.getElementById(currentLevel).className = 'white';
    know.push(this.gameWords[currentLevel]);
    this.setState((prevState) => ({
      currentLevel: prevState.currentLevel + 1,
      right: prevState.right + 1,
      active: true,
    }));
  }

  wrongAnswer() {
    const { mistakes, currentLevel } = this.state;
    document.getElementById(currentLevel).className = 'white';
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

  startGame() {
    const { difficulty } = this.props;
    this.setState({
      isGameStarted: true,
      currentLevel: 0,
      active: false,
      right: 0,
      wrong: 0,
      mistakes: [],
      know: [],
    });
    getRandomWords(difficulty, 3);
    this.setWords();
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
      const array = [];
      let i = 0;
      while (i < wordsPerGame) {
        array.push(i);
        i += 1;
      }

      return (
        <div className="audio-challenge" id={`level-${currentLevel}`}>
          <div className={isGameStarted ? 'progress' : 'hidden'}>
            {array.map((el) => (<div id={el} key={`progress-${el}`} />))}
          </div>
          <Word word={word} nameClass={active ? '' : 'hidden'} />
          <Answers
            wrongAnswer={() => this.wrongAnswer()}
            nextLevel={() => this.nextLevel()}
            active={active}
            word={word}
            handleClick={this.handleClick}
          >
            <input className={active ? 'button' : 'hidden'} type="submit" onClick={this.handleClick} value="Дальше" />
          </Answers>
        </div>
      );
    }
    return (
      <div className="audio-challenge" id="level-10">
        <h2>Результаты:</h2>
        <div className="results">
          <span style={{ color: '#e04f5f' }}>
            Ошибок:
            {` ${wrong}`}
          </span>
          {mistakes.map((item) => (
            <div className="flex-center" key={`wrong_${item.word}`}>
              <audio id={item.word} src={item.audio} />
              <img
                src={audioImg}
                alt="audio"
                role="button"
                tabIndex={0}
                onClick={() => document.getElementById(item.word).play()}
              />
              <p style={{ display: 'inline-block' }}>
                <span style={{ color: '#25b6d2' }}>{item.word}</span>
                {' '}
                &mdash;
                {' '}
                {item.translation}
              </p>
            </div>
          ))}
          <span style={{ color: '#82d243', display: 'block' }}>
            Знаю:
            {` ${right}`}
          </span>
          {know.map((item) => (
            <div className="flex-center" key={`correct_${item.word}`}>
              <audio id={item.word} src={item.audio} />
              <img
                src={audioImg}
                alt="audio"
                role="button"
                tabIndex={0}
                onClick={() => document.getElementById(item.word).play()}
              />
              <p style={{ display: 'inline-block' }}>
                <span style={{ color: '#25b6d2' }}>{item.word}</span>
                {' '}
                &mdash;
                {' '}
                {item.translation}
              </p>
            </div>
          ))}
        </div>
        <input
          className="return-button"
          type="button"
          value="Попробовать еще раз"
          onClick={() => {
            this.startGame();
          }}
        />
      </div>
    );
  }
}
