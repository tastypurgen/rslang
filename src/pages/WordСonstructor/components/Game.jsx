/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import { URI } from '../../../utils/constants';
import '../WordСonstructor.scss';

import AvailableSkips from './AvailableSkips';
import Word from './Word';
import Answer from './Answer';
import ControlButtons from './ControlButtons';

import successSound from '../sounds/success.mp3';

export default class Game extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      gameWords: [],
      isWordsLoaded: false,
      currentLevel: 0,
      availableSkips: 3,
      wrongAnswers: [],
      rightAnswers: [],
    };
  }

  componentDidMount() {
    this.setWords();
  }

  setWords = () => {
    const words = JSON.parse(localStorage.words).sort(() => Math.random() - 0.5);
    const wordsPerGame = 10;
    const { gameWords } = this.state;
    gameWords.splice(0);

    words.slice(0, wordsPerGame).map((word) => gameWords.push({
      id: word.id,
      word: word.word,
      translation: word.wordTranslate,
      audio: URI + word.audio,
      img: URI + word.image,
    }));

    this.setState({ isWordsLoaded: true });
  }

  nextLevel() {
    const { currentLevel } = this.state;
    new Audio(successSound).play();
    this.setState((prevState) => ({
      currentLevel: prevState.currentLevel + 1,
      rightAnswers: [...prevState.rightAnswers, prevState.gameWords[currentLevel]],
    }));
  }

  skipLevel() {
    const { currentLevel } = this.state;
    this.setState((prevState) => ({
      availableSkips: prevState.availableSkips - 1,
      currentLevel: prevState.currentLevel + 1,
      wrongAnswers: [...prevState.wrongAnswers, prevState.gameWords[currentLevel]],
    }));
  }

  render() {
    const {
      gameWords, isWordsLoaded, availableSkips, currentLevel,
    } = this.state;
    if (isWordsLoaded) {
      return (
        <div className="word-constructor">
          <div className="word-constructor__game">
            <AvailableSkips
              availableSkips={availableSkips}
            />
            <Word
              word={gameWords[currentLevel].word}
            />
            <Answer
              word={gameWords[currentLevel].word}
            />
            <ControlButtons
              skipLevel={() => this.skipLevel()}
              nextLevel={() => this.nextLevel()}
            />
          </div>
        </div>
      );
    }
    return (
      <Spinner />
    );
  }
}
