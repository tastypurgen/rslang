import React from 'react';
import pointIcon from '../images/point.svg';
import { createUserWord, updateUserWord } from '../../../../services/userWords';

const DifficultyButton = (props) => {
  const {
    difficultyBtnActive,
    userWord,
    wordsData,
    currentWordIndex,
    setDifficultyButtonState,
  } = props;
  return (
    <img
      className={difficultyBtnActive ? 'MainGame__difficult-button--disabled' : 'MainGame__difficult-button'}
      role="button"
      onClick={() => {
        if (!difficultyBtnActive) {
          const indicatorValue = userWord?.optional?.indicator || 1;
          const trainedValue = userWord?.optional?.trained + 1 || 1;
          const today = new Date();
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          const body = {
            optional: {
              deleted: false,
              difficult: true,
              indicator: indicatorValue,
              lastTrained: today.toLocaleDateString(),
              nextTraining: tomorrow.toLocaleDateString(),
              trained: trainedValue,
            },
          };
          if (!userWord) {
            createUserWord(wordsData[currentWordIndex]._id, body);
          } else {
            updateUserWord(wordsData[currentWordIndex]._id, body);
          }
          setDifficultyButtonState(true);
        }
      }}
      title={difficultyBtnActive ? 'Добавлено в сложные' : 'Добавить в сложные'}
      src={pointIcon}
      alt="point-icon"
    />
  );
};

export default DifficultyButton;
