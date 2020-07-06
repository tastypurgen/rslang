import React, { PureComponent } from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import { URI } from '../../../utils/constants';
import shuffleLetters from '../utils/shuffleLetters';
import createAnswerLetters from '../utils/createAnswerLetters';
import findEmptyIndex from '../utils/findEmptyIndex';
import checkWordCorrectness from '../utils/checkWordCorrectness';
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
      isCurrentWordResolved: false,
      availableSkips: 3,
      wrongAnswers: [],
      rightAnswers: [],
    };
    this.pickLetter = this.pickLetter.bind(this);
    this.unpickLetter = this.unpickLetter.bind(this);
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
      shuffledLetters: shuffleLetters(word.word, word.id),
      answerLetters: createAnswerLetters(word.word.length, word.id),
    }));

    this.setState({ isWordsLoaded: true });
  }

  async nextLevel() {
    const { currentLevel } = this.state;
    const { finishGame } = this.props;

    if (currentLevel === 9) {
      await this.setState((prevState) => ({
        rightAnswers: [...prevState.rightAnswers, prevState.gameWords[currentLevel]],
      }));
      const { rightAnswers, wrongAnswers } = this.state;
      finishGame(rightAnswers, wrongAnswers);
    } else {
      this.setState((prevState) => ({
        currentLevel: prevState.currentLevel + 1,
        rightAnswers: [...prevState.rightAnswers, prevState.gameWords[currentLevel]],
        isCurrentWordResolved: false,
      }));
    }
  }

  async skipLevel() {
    const { currentLevel, availableSkips } = this.state;
    const { finishGame } = this.props;

    if (currentLevel === 9) {
      await this.setState((prevState) => ({
        availableSkips: availableSkips ? availableSkips - 1 : availableSkips,
        wrongAnswers: [...prevState.wrongAnswers, prevState.gameWords[currentLevel]],
      }));
      const { rightAnswers, wrongAnswers } = this.state;
      finishGame(rightAnswers, wrongAnswers);
    } else if (availableSkips) {
      this.setState((prevState) => ({
        availableSkips: availableSkips - 1,
        currentLevel: prevState.currentLevel + 1,
        wrongAnswers: [...prevState.wrongAnswers, prevState.gameWords[currentLevel]],
      }));
    } else {
      await this.setState((prevState) => ({
        wrongAnswers: [...prevState.wrongAnswers, ...prevState.gameWords.slice(currentLevel)],
      }));
      const { rightAnswers, wrongAnswers } = this.state;
      finishGame(rightAnswers, wrongAnswers);
    }
  }

  pickLetter(event) {
    const pickedElement = event.target;
    const pickedLetter = pickedElement.innerHTML;
    const pickedPosition = pickedElement.dataset.position;
    const { gameWords, currentLevel } = this.state;
    const newGameWords = gameWords.slice();
    const newShuffledLetters = newGameWords[currentLevel].shuffledLetters.slice();
    const newAnswerLetters = newGameWords[currentLevel].answerLetters.slice();
    const newAnswerLettersEmptyPosition = findEmptyIndex(newAnswerLetters).answerPosition;

    let isUserAnswerCorrect = false;

    newShuffledLetters[pickedPosition].isOpened = true;

    newAnswerLetters[newAnswerLettersEmptyPosition].isEmpty = false;
    newAnswerLetters[newAnswerLettersEmptyPosition].letter = pickedLetter;
    newAnswerLetters[newAnswerLettersEmptyPosition].initialPosition = pickedPosition;

    newGameWords[currentLevel].shuffledLetters = newShuffledLetters;
    newGameWords[currentLevel].answerLetters = newAnswerLetters;

    isUserAnswerCorrect = checkWordCorrectness(newGameWords, currentLevel);

    if (isUserAnswerCorrect) {
      new Audio(successSound).play();
    }

    this.setState({
      gameWords: newGameWords,
      isCurrentWordResolved: isUserAnswerCorrect,
    });
  }

  unpickLetter(event) {
    const unPickedElement = event.target;
    const unPickedPosition = unPickedElement.dataset.position;
    const { gameWords, currentLevel } = this.state;
    const newGameWords = gameWords.slice();
    const newShuffledLetters = newGameWords[currentLevel].shuffledLetters.slice();
    const newAnswerLetters = newGameWords[currentLevel].answerLetters.slice();
    const newShuffledLettersEmptyPosition = newAnswerLetters[unPickedPosition].initialPosition;

    newShuffledLetters[newShuffledLettersEmptyPosition].isOpened = false;

    newAnswerLetters[unPickedPosition].isEmpty = true;
    newAnswerLetters[unPickedPosition].letter = null;
    newAnswerLetters[unPickedPosition].initialPosition = null;

    newGameWords[currentLevel].shuffledLetters = newShuffledLetters;
    newGameWords[currentLevel].answerLetters = newAnswerLetters;

    this.setState({ gameWords: newGameWords });
  }

  render() {
    const {
      gameWords,
      isWordsLoaded,
      availableSkips,
      currentLevel,
      isCurrentWordResolved,
    } = this.state;
    if (isWordsLoaded) {
      return (
        <div className="word-constructor">
          <div className="word-constructor__game">
            <AvailableSkips
              availableSkips={availableSkips}
            />
            <Word
              shuffledLetters={gameWords[currentLevel].shuffledLetters}
              pickLetter={this.pickLetter}
              isCurrentWordResolved={isCurrentWordResolved}
            />
            <Answer
              answerLetters={gameWords[currentLevel].answerLetters}
              unpickLetter={this.unpickLetter}
              isCurrentWordResolved={isCurrentWordResolved}
            />
            <ControlButtons
              skipLevel={() => this.skipLevel()}
              nextLevel={() => this.nextLevel()}
              availableSkips={availableSkips}
              isCurrentWordResolved={isCurrentWordResolved}
              currentLevel={currentLevel}
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
