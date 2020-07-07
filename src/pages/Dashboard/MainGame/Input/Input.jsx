import React, { createRef } from 'react';
import './Input.scss';
import getSentenceByTags from '../../../../utils/getSentenceByTags';
import { createUserWord, deleteUserWord, getAllUserWords } from '../../../../services/userWords';

const Input = (props) => {
  const inputRef = createRef();
  const { textExample, wordData, changeRightAnswerState } = props;
  const { word, id } = wordData;
  const leftAndRightPartsOfSentce = getSentenceByTags(textExample);
  const { leftpart, rightPart } = leftAndRightPartsOfSentce;

  const checkInputWord = (inputValue) => {
    if (inputValue.toLowerCase() === word.toLowerCase()) {
      const body = {
        difficulty: 'default',
        optional: {
          indicator: 5,
          difficult: false,
          deleted: false,
        },
      };
      console.log(id);
      createUserWord(id, body).then((res) => {
        console.log(res);
      });
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
