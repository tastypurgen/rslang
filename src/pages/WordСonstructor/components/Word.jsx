import React, { PureComponent } from 'react';
import Spinner from '../../../components/Spinner/Spinner';

export default class Word extends PureComponent {
  shuffleLetters() {
    const { word } = this.props;
    const shuffledLetters = word.split('').sort(() => 0.5 - Math.random());
    return shuffledLetters;
  }

  render() {
    const shuffledLetters = this.shuffleLetters();
    if (shuffledLetters) {
      return (
        <div className="word-constructor__shuffled-letters">
          {shuffledLetters.map((letter, index) => (
            <div key={index} className="word-constructor__shuffled-letter">{letter}</div>
          ))}
        </div>
      );
    }
    return (
      <Spinner />
    );
  }
}
