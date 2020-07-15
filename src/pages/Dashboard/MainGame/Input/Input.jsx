import React from 'react';
import './Input.scss';
import getSentenceByTags from '../../../../utils/getSentenceByTags';
import { createUserWord, updateUserWord } from '../../../../services/userWords';
import playAudioFunction from '../../../../utils/playAudioFunction';
import { upsertUserStatistics } from '../../../../services/userStatistics';

let cachedValue;

let errors = false;
const checkFirstAnswer = (right) => {
  if (right && !errors) {
    return true;
  }
  if (right && errors) {
    errors = false;
  }
  if (!right) {
    errors = true;
  }
  return false;
};

const Input = (props) => {
  const {
    textExample, wordData, changeRightAnswerState, exampleSentence, userWord,
    setIndicator, autoPronunciation, inputValue, inputReadOnlyFlag, setInputClassesAndReadState,
    updateInput, changingMode, isChecking, currentStatistic, bestChainCounter, inputClasses, isWordFinished, setIsWordFinished,
  } = props;
  const { word, _id, audio } = wordData;

  let leftAndRightPartsOfSentce;
  if (exampleSentence) {
    leftAndRightPartsOfSentce = getSentenceByTags(textExample);
  } else {
    leftAndRightPartsOfSentce = { leftpart: '', rightPart: '' };
  }
  const { leftpart, rightPart } = leftAndRightPartsOfSentce;

  let indicatorValue;

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
        lastTrained: today.toLocaleDateString(),
        nextTraining: tomorrow.toLocaleDateString(),
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
    setIsWordFinished(true);
  };

  const getRightLettersArray = () => word.split('').reduce((acc, rightLetter, i) => {
    if (rightLetter === cachedValue[i]) {
      acc.push(i);
      return acc;
    } acc.push('');
    return acc;
  }, []);

  const checkInputWord = (input) => {
    if (autoPronunciation) {
      playAudioFunction(`https://raw.githubusercontent.com/tastypurgen/rslang-data/master/${audio}`);
    }
    if (input.toLowerCase() === word.toLowerCase()) {
      indicatorValue = userWord?.optional?.indicator || 2;
      if (!isWordFinished) {
        if (checkFirstAnswer(true)) {
          if (userWord) {
            indicatorValue = userWord.optional.indicator + 1;
          } else {
            indicatorValue = 5;
          }
          postUserWordData(5, 1);
        } else {
          postUserWordData(2, 0);
        }
      }
      changeRightAnswerState(true);
      bestChainCounter.count += 1;
      if (currentStatistic.optional.today.longestChain < bestChainCounter.count) {
        currentStatistic.optional.today.longestChain = bestChainCounter.count;
      }
      currentStatistic.optional.today.rightAnswers += 1;
      setInputClassesAndReadState('background--right', true);
    } else {
      setInputClassesAndReadState('background--false', false);
      checkFirstAnswer(false);
      cachedValue = inputValue;
      changingMode(true);
      updateInput('');
      bestChainCounter.count = 0;
    }
    if (!userWord) {
      currentStatistic.optional.today.newWords += 1;
    }
    currentStatistic.optional.today.cards += 1;
    currentStatistic.optional.today.finishWordsLeft -= 1;
    upsertUserStatistics(currentStatistic);
  };

  return (
    <span>
      {leftpart}
      <span className="game-input" data-word="night" data-audio-hash="93a04b066fd81a1017825f2dcda313b2">
        <span className={`background ${inputClasses}`}>
          {word.split('').map((letter, index) => <span index={index} key={letter + Math.random()} className="hidden">{letter}</span>)}
        </span>
        {isChecking && (
          <span className="word-checker">
            {word.split('').map((letter, index) => {
              if (index === getRightLettersArray()[index]) {
                return <span data-index={index} className="right" key={letter + Math.random()}>{letter}</span>;
              }
              return <span data-index={index} key={letter + Math.random()}>{letter}</span>;
            })}
          </span>
        )}
        <input
          readOnly={inputReadOnlyFlag}
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
            }
          }}
          onChange={(e) => {
            updateInput(e.target.value);

            changingMode(false);
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
