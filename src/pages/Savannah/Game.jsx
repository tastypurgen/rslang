import React, { PureComponent } from 'react';
import capitalizeWord from '../../utils/capitalizeWord';
import './Savannah.scss';
import Word from './Word';
import Answers from './Answers';
import Lives from './Lives';

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
    const uri = 'https://raw.githubusercontent.com/irinainina/rslang-data/master/';
    const words = JSON.parse(localStorage.words).sort(() => Math.random() - 0.5);
    const wordsPerGame = 10;
    gameWords.splice(0);

    words.slice(0, wordsPerGame).map((word) => gameWords.push({
      word: word.word,
      translation: word.wordTranslate,
      audio: uri + word.audio,
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
        <div className="savannah">
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
      <div>
        <h2>Конец игры!</h2>
        <h3>результаты</h3>
        <div>
          <div>Правильно:</div>
          {rightAnswers.map((word, index) => (
            <div>
              {console.log(word)}
              <audio id={word.word + index} src={word.audio} />
              <img
                src={audioImg}
                alt="audio"
                role="button"
                tabIndex={0}
                onClick={() => document.getElementById(word.word + index).play()}
              />
              <span>{`${word.word} - ${word.translation}`}</span>
            </div>
          ))}
          <div>Неправильно:</div>
          {wrongAnswers.map((word, index) => (
            <div>
              {console.log(word)}
              <audio id={word.word + index} src={word.audio} />
              <img
                src={audioImg}
                alt="audio"
                role="button"
                tabIndex={0}
                onClick={() => document.getElementById(word.word + index).play()}
              />
              <span>{`${word.word} - ${word.translation}`}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
