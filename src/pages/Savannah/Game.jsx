/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import capitalizeWord from '../../utils/capitalizeWord';
import './Savannah.scss';
import Word from './Word';
import Answers from './Answers';
import Lives from './Lives';

const gameWords = [];

export default class Savannah extends PureComponent {
  state = {
    isGameStarted: true,
    currentLevel: 0,
    lives: 5,
  }

  setWords = () => {
    const words = JSON.parse(localStorage.words).sort(() => Math.random() - 0.5);
    const wordsPerGame = 10;
    gameWords.splice(0);

    words.slice(0, wordsPerGame).map((word) => gameWords.push({
      word: word.word,
      translation: word.wordTranslate,
      answers: [word.wordTranslate],
    }));

    for (let i = wordsPerGame; i <= wordsPerGame * 4; i += wordsPerGame) {
      words.slice(i, i + wordsPerGame).map((word, index) => gameWords[index].answers
        .push(word.wordTranslate));
    }

    const newWords = gameWords.map((word) => {
      const newWord = { ...word };
      console.log('word');
      console.log(newWord);
      newWord.answers = newWord.answers.sort(() => Math.random() - 0.5);
      newWord.rightAnswerIndex = newWord.answers.indexOf(newWord.translation);
      return newWord;
    });
    console.log('newWords');
    console.log(newWords);
  }

  nextLevel = () => {
    this.setState((prevState) => ({ currentLevel: prevState.currentLevel + 1 }));
  }

  removeLife = () => {
    this.setState((prevState) => ({ lives: prevState.lives - 1 }));
    this.setState((prevState) => ({ currentLevel: prevState.currentLevel + 1 }));
  }

  render() {
    const { isGameStarted, currentLevel, lives } = this.state;

    this.setWords();
    if (isGameStarted) {
      return (
        <div className="savannah">
          <NavLink to="/">Go to dashboard</NavLink>
          <div><b>Let&apos;s play Savannah! :)</b></div>

          <Lives lives={lives} />

          <Word word={capitalizeWord(gameWords[currentLevel].word)} />

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
      <h2>Game Over</h2>
    );
  }
}
