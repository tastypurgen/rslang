import React, { PureComponent } from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import '../WordСonstructor.scss';

export default class Game extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      gameWords: [],
    };
  }

  setWords = () => {
    const uri = 'https://raw.githubusercontent.com/tastypurgen/rslang-data/master/';
    const words = JSON.parse(localStorage.words).sort(() => Math.random() - 0.5);
    const wordsPerGame = 10;
    const { gameWords } = this.state;
    gameWords.splice(0);

    words.slice(0, wordsPerGame).map((word) => gameWords.push({
      id: word.id,
      word: word.word,
      translation: word.wordTranslate,
      audio: uri + word.audio,
      img: uri + word.image,
    }));
  }

  render() {
    this.setWords();
    const { gameWords } = this.state;
    if (gameWords.length) {
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
