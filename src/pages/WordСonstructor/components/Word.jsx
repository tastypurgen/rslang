import React from 'react';
import classNames from 'classnames';
import Spinner from '../../../components/Spinner/Spinner';

const Word = (props) => {
  const { pickLetter, shuffledLetters, isCurrentWordResolved } = props;
  const blockClass = classNames('word-constructor__shuffled-letters', { disabled: isCurrentWordResolved });

  if (shuffledLetters) {
    return (
      <div className={blockClass}>
        {shuffledLetters.map((letter, index) => (
          <div key={letter.id} className="word-constructor__shuffled-letter__external-wrapper">
            <div className={classNames('word-constructor__shuffled-letter__inner-wrapper', { rotated: letter.isOpened })}>
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
};

export default Word;
