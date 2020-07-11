import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import capitalizeWord from '../../utils/capitalizeWord';
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
  state = {
    isGameStarted: true,
    currentLevel: 0,
    lives: 3,
    wrongAnswers: [],
    rightAnswers: [],
  }

  setWords = () => {
    const words = JSON.parse(localStorage.words).sort(() => Math.random() - 0.5);
    const wordsPerGame = 10;
    gameWords.splice(0);

    words.slice(0, wordsPerGame).map((word) => gameWords.push({
      word: word.word,
      translation: word.wordTranslate,
      audio: URI + word.audio,
      answers: [word.wordTranslate],
    }));

    for (let i = wordsPerGame; i <= wordsPerGame * 4; i += wordsPerGame) {
      words.slice(i, i + wordsPerGame).map((word, index) => gameWords[index].answers
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
    this.setState({
      isGameStarted: true,
      currentLevel: 0,
      lives: 3,
      wrongAnswers: [],
      rightAnswers: [],
    });
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

  render() {
    const {
      isGameStarted, currentLevel, lives, rightAnswers, wrongAnswers,
    } = this.state;

    this.setWords();
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
