import React from 'react';
import './AnswerButton.scss';
import playAudioFunction from '../../../../utils/playAudioFunction';
import { createUserWord, updateUserWord } from '../../../../services/userWords';
import { upsertUserStatistics } from '../../../../services/userStatistics';

const AnswerButton = (props) => {
  const {
    currentStatistic,
    wordData,
    wordsData,
    userWord,
    currentWordIndex,
    audio,
    autoPronunciation,
    setInputClassesAndReadState,
    setIndicator,
    setShowRightAnswer,
    setInputValue,
    bestChainCounter,
  } = props;
  const { word } = wordData;
  return (
    <button
      className="MainGame__answer-button"
      type="button"
      key={2}
      onClick={() => {
        if (autoPronunciation) {
          playAudioFunction(`https://raw.githubusercontent.com/Koptohhka/rslang-data/master/${audio}`);
        }
        const trainedValue = userWord?.optional?.trained + 1 || 1;
        const indicatorValue = userWord?.optional?.indicator || 2;
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
        try {
          if (userWord.optional.indicator < 5) {
            updateUserWord(wordsData[currentWordIndex]._id, body);
          }
        } catch {
          createUserWord(wordsData[currentWordIndex]._id, body);
        }
        setInputClassesAndReadState('background--default', true);
        setIndicator(userWord, indicatorValue);
        setShowRightAnswer(true);
        setInputValue(word);
        if (!userWord) {
          currentStatistic.optional.today.newWords += 1;
        }
        bestChainCounter.count = 0;
        currentStatistic.optional.today.cards += 1;
        currentStatistic.optional.today.finishWordsLeft -= 1;
        upsertUserStatistics(currentStatistic);
      }}
    >
      Показать ответ
    </button>
  );
};

export default AnswerButton;
