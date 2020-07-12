/* eslint-disable class-methods-use-this */
import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import capitalizeWord from '../../utils/capitalizeWord';
import { getRandomWords } from '../../services/getWords';
import './Savannah.scss';
import Word from './Word';
import Answers from './Answers';
import Lives from './Lives';
import { URI } from '../../utils/constants';

import audioImg from './img/audio.png';
import wrongSound from './sounds/wrong.mp3';
import rightSound from './sounds/right.mp3';

const gameWords = [];
const maxLevel = 10;

export default class Savannah extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isGameStarted: true,
      currentLevel: 0,
      lives: 3,
      wrongAnswers: [],
      rightAnswers: [],
    };
    this.setWords();
  }

  setWords = () => {
    const words = JSON.parse(localStorage.words).sort(() => Math.random() - 0.5);
    const userWords = JSON.parse(localStorage.userWords).sort(() => Math.random() - 0.5);
    let newWords = words;
    const wordsPerGame = 10;
    gameWords.splice(0);

    if (localStorage.difficulty === '6') {
      userWords.slice(0, wordsPerGame).map((word) => gameWords.push({
        word: word.word,
        translation: word.wordTranslate,
        audio: URI + word.audio,
        answers: [word.wordTranslate],
      }));
      newWords = words.filter((el) => this.filter(el, userWords));
    } else {
      words.slice(0, wordsPerGame).map((word) => gameWords.push({
        word: word.word,
        translation: word.wordTranslate,
        audio: URI + word.audio,
        answers: [word.wordTranslate],
      }));
    }

    for (let i = wordsPerGame; i <= wordsPerGame * 4; i += wordsPerGame) {
      newWords.slice(i, i + wordsPerGame).map((word, index) => gameWords[index].answers
        .push(word.wordTranslate));
    }

    gameWords.map((word) => {
      const newWord = { ...word };
      newWord.answers = newWord.answers.sort(() => Math.random() - 0.5);
      newWord.rightAnswerIndex = newWord.answers.indexOf(newWord.translation);
      return newWord;
    });
  }

  restartGame = () => {
    const { difficulty } = localStorage;
    this.setState({
      isGameStarted: true,
      currentLevel: 0,
      lives: 3,
      wrongAnswers: [],
      rightAnswers: [],
    });
    if (difficulty === '6') {
      getRandomWords(0, 2);
    } else {
      getRandomWords(difficulty, 2);
    }
    this.setWords();
  }

  nextLevel = () => {
    const { currentLevel } = this.state;
    new Audio(rightSound).play();
    this.setState((prevState) => ({
      currentLevel: prevState.currentLevel + 1,
      rightAnswers: [...prevState.rightAnswers, gameWords[currentLevel]],
    }));
  }

  removeLife = () => {
    const { currentLevel } = this.state;
    new Audio(wrongSound).play();
    this.setState((prevState) => ({
      lives: prevState.lives - 1,
      currentLevel: prevState.currentLevel + 1,
      wrongAnswers: [...prevState.wrongAnswers, gameWords[currentLevel]],
    }));
  }

  filter(el, userWords) {
    for (let i = 0; i < userWords.length; i += 1) {
      if (el.word === userWords[i].word) {
        return false;
      }
    }
    return true;
  }

  render() {
    const {
      isGameStarted, currentLevel, lives, rightAnswers, wrongAnswers,
    } = this.state;

    if (isGameStarted && currentLevel < maxLevel && lives > 0) {
      return (
        <div className="savannah-game">
          <Lives lives={lives} />

          <Word
            word={capitalizeWord(gameWords[currentLevel].word)}
            removeLife={this.removeLife}
          />

          <Answers
            answers={gameWords[currentLevel].answers}
            removeLife={() => this.removeLife()}
            nextLevel={() => this.nextLevel()}
            lives={lives}
            rightAnswerIndex={gameWords[currentLevel].answers
              .indexOf(gameWords[currentLevel].translation)}
          />
        </div>
      );
    }
    return (
      <div className="savannah-game">
        <div className="game-stats">
          <h2>Конец игры!</h2>
          <div>
            <div className="stats-section">Правильно:</div>
            {rightAnswers.map((word, index) => (
              <div key={Math.random()}>
                <audio id={word.word + index} src={word.audio} />
                <img
                  className="audio-img"
                  src={audioImg}
                  alt="audio"
                  role="button"
                  tabIndex={0}
                  onClick={() => document.getElementById(word.word + index).play()}
                />
                <span>{`${word.word} - ${word.translation}`}</span>
              </div>
            ))}
            <div className="stats-section">Неправильно:</div>
            {wrongAnswers.map((word, index) => (
              <div key={Math.random()}>
                <audio id={word.word + index} src={word.audio} />
                <img
                  className="audio-img"
                  src={audioImg}
                  alt="audio"
                  role="button"
                  tabIndex={0}
                  onClick={() => document.getElementById(word.word + index).play()}
                />
                <span>{`${word.word} - ${word.translation}`}</span>
              </div>
            ))}

            <div
              className="btn reload-btn"
              role="button"
              tabIndex="0"
              onClick={() => this.restartGame()}
            >
              Еще раз
            </div>
            <NavLink to="/games-panel">
              <div className="btn exit-btn">Выйти</div>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}
