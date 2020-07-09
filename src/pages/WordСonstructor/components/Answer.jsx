import React from 'react';
import classNames from 'classnames';
import Spinner from '../../../components/Spinner/Spinner';

const Answer = (props) => {
  const {
    unpickLetter, answerLetters, isCurrentWordResolved, isCurrentWordFilled,
  } = props;
  const blockClass = classNames('word-constructor__shuffled-letters', { disabled: isCurrentWordResolved });
  const wrapperClass = classNames('word-constructor__game-answers', { resolved: isCurrentWordResolved }, { resolved_wrong: (!isCurrentWordResolved && isCurrentWordFilled) });

  if (answerLetters) {
    return (
      <div className={wrapperClass}>
        <h2>Ваш ответ:</h2>
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
      </div>
    );
  }
  return (
    <Spinner />
  );
};

export default Answer;
