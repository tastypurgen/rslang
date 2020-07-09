import React from 'react';
import './Input.scss';
import getSentenceByTags from '../../../../utils/getSentenceByTags';
import {
  createUserWord, deleteUserWord, getAllUserWords, updateUserWord,
} from '../../../../services/userWords';
import playAudioFunction from '../../../../utils/playAudioFunction';

const Input = (props) => {
  const {
    textExample, wordData, changeRightAnswerState, exampleSentence, userWord,
    setIndicatorNumber, autoPronunciation, inputValue, setInputClassesAndReadState, inputClasses, inputReadOnlyFlag, clearInputValue,
  } = props;
  const { word, _id, audio } = wordData;
  let leftAndRightPartsOfSentce;
  if (exampleSentence) {
    leftAndRightPartsOfSentce = getSentenceByTags(textExample);
  } else {
    leftAndRightPartsOfSentce = { leftpart: '', rightPart: '' };
  }
  const { leftpart, rightPart } = leftAndRightPartsOfSentce;

  let indicatorValue = 5;
  if (userWord) {
    indicatorValue = userWord.optional.indicator + 1;
  }

  const postUserWordData = (answerIndicatorValue, additionalIndicatorValue) => {
    const trainedValue = userWord?.optional?.trained + 1 || 1;
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const body = {
      difficulty: 'default',
      optional: {
        deleted: false,
        difficult: false,
        indicator: indicatorValue,
        lastTrained: today,
        nextTraining: tomorrow,
        trained: trainedValue,
      },
    };
    if (!userWord) {
      setIndicatorNumber(null, answerIndicatorValue);
      createUserWord(_id, body);
    } else {
      setIndicatorNumber(userWord, userWord.optional.indicator + additionalIndicatorValue);
      updateUserWord(_id, body);
    }
  };

  const checkInputWord = (inputValue) => {
    if (autoPronunciation) {
      playAudioFunction(`https://raw.githubusercontent.com/Koptohhka/rslang-data/master/${audio}`);
    }
    if (inputValue.toLowerCase() === word.toLowerCase()) {
      setInputClassesAndReadState('Input Input--right', true);
      postUserWordData(5, 1);
      changeRightAnswerState(true);
    } else {
      setInputClassesAndReadState('Input Input--wrong', true);
      postUserWordData(2, 0);
      changeRightAnswerState(true);
    }
  };

  return (
    <span>
      {leftpart}
      <input
        value={inputValue}
        readOnly={inputReadOnlyFlag}
        className={inputClasses}
        type="text"
        onKeyPress={(evt) => {
          if (evt.key === 'Enter') {
            checkInputWord(evt.target.value);
          }
        }}
        onChange={(evt) => {
          clearInputValue(evt.target.value);
        }}
        maxLength={word.length}
        size={word.length}
      />
      {rightPart}
    </span>
  );
};

export default Input;
