import React, { PureComponent } from 'react';
import Spinner from '../../../components/Spinner/Spinner';

export default class Word extends PureComponent {
  render() {
    const { pickLetter, shuffledLetters, isCurrentWordResolved } = this.props;

    if (shuffledLetters) {
      return (
        <div className={`word-constructor__shuffled-letters ${isCurrentWordResolved ? 'disabled' : ''}`}>
          {shuffledLetters.map((letter, index) => (
            <div key={letter.id} className="word-constructor__shuffled-letter__external-wrapper">
              <div className={`word-constructor__shuffled-letter__inner-wrapper ${letter.isOpened ? 'rotated' : ''}`}>
                <button type="button" className="word-constructor__shuffled-letter front" data-position={index} onClick={pickLetter}>{letter.letter}</button>
                <div className="word-constructor__shuffled-letter back"> </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return (
      <Spinner />
    );
  }
}
