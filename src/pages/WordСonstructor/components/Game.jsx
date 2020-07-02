import React, { PureComponent } from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import { URI } from '../../../utils/constants';
import '../WordСonstructor.scss';

export default class Game extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      gameWords: [],
      isWordsLoaded: false,
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

  render() {
    const { gameWords, isWordsLoaded } = this.state;
    if (isWordsLoaded) {
      return (
        <ul>
          {gameWords.map((word) => (
            <li key={word.id}>{`Слово: ${word.word} Перевод: ${word.translation}`}</li>
          ))}
        </ul>
      );
    }
    return (
      <Spinner />
    );
  }
}
