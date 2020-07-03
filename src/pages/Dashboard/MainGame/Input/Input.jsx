import React, { createRef } from 'react';
import './Input.scss';
import getSentenceByTags from '../../../../utils/getSentenceByTags';

const Input = (props) => {
  const inputRef = createRef();
  const { textExample, word, changeRightAnswerState } = props;
  const leftAndRightPartsOfSentce = getSentenceByTags(textExample);
  const { leftpart, rightPart } = leftAndRightPartsOfSentce;

  const checkInputWord = (inputValue) => {
    if (inputValue.toLowerCase() === word.toLowerCase()) {
      console.log(true);
      changeRightAnswerState();
    } else {
      console.log('false: ', false);
    }
  };

  return (
    <span>
      {leftpart}
      <input
        ref={inputRef}
        type="text"
        onKeyPress={(evt) => {
          if (evt.key === 'Enter') {
            checkInputWord(inputRef.current.value);
          }
        }}
        maxLength={word.length}
        size={word.length}
      />
      {rightPart}
    </span>
  );
};

export default Input;
