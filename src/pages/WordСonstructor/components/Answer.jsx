import React, { PureComponent } from 'react';
import Spinner from '../../../components/Spinner/Spinner';

export default class Answer extends PureComponent {
  render() {
    const { unpickLetter, answerLetters, isCurrentWordResolved } = this.props;

    if (answerLetters) {
      return (
        <div className={`word-constructor__shuffled-letters ${isCurrentWordResolved ? 'disabled' : ''}`}>
          {answerLetters.map((letter, index) => (
            <div key={letter.id} className="word-constructor__shuffled-letter__external-wrapper">
              <div className={`word-constructor__shuffled-letter__inner-wrapper ${letter.isEmpty ? 'rotated' : ''}`}>
                <button type="button" className="word-constructor__shuffled-letter front" data-position={index} onClick={unpickLetter}>{!letter.isEmpty ? letter.letter : ''}</button>
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
