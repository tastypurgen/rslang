import React from 'react';
import './Input.scss';
import getSentenceByTags from '../../../../utils/getSentenceByTags';
import {
  // removed deleteUserWord, getAllUserWords
  createUserWord, updateUserWord,
} from '../../../../services/userWords';
import playAudioFunction from '../../../../utils/playAudioFunction';

const Input = (props) => {
  const {
    textExample, wordData, changeRightAnswerState, exampleSentence, userWord,
    setIndicator, autoPronunciation, inputValue, setInputClassesAndReadState,
    inputClasses, inputReadOnlyFlag, updateInput, showNextCard,
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
    const difficultValue = userWord?.optional?.difficult || false;
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const body = {
      difficulty: 'default',
      optional: {
        deleted: false,
        difficult: difficultValue,
        indicator: indicatorValue,
        lastTrained: today,
        nextTraining: tomorrow,
        trained: trainedValue,
      },
    };
    if (!userWord) {
      setIndicator(null, answerIndicatorValue);
      createUserWord(_id, body);
    } else {
      setIndicator(userWord, userWord.optional.indicator + additionalIndicatorValue);
      updateUserWord(_id, body);
    }
  };

  const checkInputWord = (input) => {
    if (autoPronunciation) {
      playAudioFunction(`https://raw.githubusercontent.com/Koptohhka/rslang-data/master/${audio}`);
    }
    if (input.toLowerCase() === word.toLowerCase()) {
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
      <span className="game-input" data-word="night" data-audio-hash="93a04b066fd81a1017825f2dcda313b2">
        <span className="background">
          {word.split('').map((letter, index) => <span index={index} className="hidden">{letter}</span>)}
        </span>
        {/* <span className="word-container">
          <span index="0" className="hidden">n</span>
          <span index="1" className="hidden">i</span>
          <span index="2" className="hidden">g</span>
          <span index="3" className="hidden">h</span>
          <span index="4" className="hidden">t</span>
        </span>
        <span className="animate-typing-container">
        <span index="0" className="hidden">n</span>
        <span index="1" className="hidden">i</span>
        <span index="2" className="hidden">g</span>
        <span index="3" className="hidden">h</span>
        <span index="4" className="hidden">t</span>
      </span> */}
        <input
          className="answer-input"
          type="text"
          data-idx="0"
          maxLength="50"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              checkInputWord(e.target.value);
              console.log('e.target.value === word: ', e.target.value === word);
              if (e.target.value === word) {
                // showNextCard();
              }
            }
          }}
          onChange={(e) => {
            updateInput(e.target.value);
          }}
          value={inputValue}
        />
      </span>

      {/* <input
        value={word}
        readOnly={inputReadOnlyFlag}
        className="input-container"
        type="text"
        onKeyPress={(evt) => {
          if (evt.key === 'Enter') {
            checkInputWord(evt.target.value);
          }
        }}
        onChange={(evt) => {
          updateInput(evt.target.value);
        }}
        maxLength={word.length}
        size={word.length}
      /> */}
      {rightPart}
    </span>
  );
};

export default Input;
