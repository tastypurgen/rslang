import React from 'react';
import classNames from 'classnames';
import Spinner from '../../../components/Spinner/Spinner';

const Answer = (props) => {
  const { unpickLetter, answerLetters, isCurrentWordResolved } = props;
  const blockClass = classNames('word-constructor__shuffled-letters', { disabled: isCurrentWordResolved });

  if (answerLetters) {
    return (
      <div className={blockClass}>
        {answerLetters.map((letter, index) => (
          <div key={letter.id} className="word-constructor__shuffled-letter__external-wrapper">
            <div className={classNames('word-constructor__shuffled-letter__inner-wrapper', { rotated: letter.isEmpty })}>
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
};

export default Answer;
