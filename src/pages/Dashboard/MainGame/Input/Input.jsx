import React, { createRef } from 'react';
import './Input.scss';
import getSentenceByTags from '../../../../utils/getSentenceByTags';
import {
  createUserWord, deleteUserWord, getAllUserWords, updateUserWord,
} from '../../../../services/userWords';

const Input = (props) => {
  const inputRef = createRef();
  const {
    textExample, wordData, changeRightAnswerState, exampleSentence, userWord,
  } = props;
  const { word, _id } = wordData;
  let leftAndRightPartsOfSentce;
  if (exampleSentence) {
    leftAndRightPartsOfSentce = getSentenceByTags(textExample);
  } else {
    leftAndRightPartsOfSentce = { leftpart: '', rightPart: '' };
  }
  const { leftpart, rightPart } = leftAndRightPartsOfSentce;
  const inputSize = Math.ceil(word.length / 2);

  let indicatorValue = 5;
  if (userWord) {
    indicatorValue = userWord.optional.indicator + 1;
  }

  const postUserWordData = () => {
    const body = {
      difficulty: 'default',
      optional: {
        indicator: indicatorValue,
        deleted: false,
      },
    };
    if (!userWord) {
      createUserWord(_id, body);
    } else {
      updateUserWord(_id, body);
    }
  };

  const checkInputWord = (inputValue) => {
    if (inputValue.toLowerCase() === word.toLowerCase()) {
      postUserWordData();
      changeRightAnswerState();
    }
  };

  return (
    <span>
      {leftpart}
      <input
        className="Input"
        ref={inputRef}
        type="text"
        onKeyPress={(evt) => {
          if (evt.key === 'Enter') {
            checkInputWord(inputRef.current.value);
          }
        }}
        maxLength={word.length}
        size={inputSize}
      />
      {rightPart}
    </span>
  );
};

export default Input;
