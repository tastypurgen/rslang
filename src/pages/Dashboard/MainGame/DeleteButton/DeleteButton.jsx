import React from 'react';
import deleteIcon from '../images/delete.svg';
import { createUserWord, updateUserWord } from '../../../../services/userWords';

const DeleteButton = (props) => {
  const {
    setInputClassesAndReadState,
    setIndicator,
    setShowRightAnswer,
    setInputValue,
    userWord,
    currentWordIndex,
    wordsData,
    changeCardToLeft,
    changingMode,
    changeAlertPopupState,
  } = props;
  return (
    <img
      title="Удалить слово"
      role="button"
      alt="delete-icon"
      src={deleteIcon}
      onClick={() => {
        if (currentWordIndex !== wordsData.length - 1) {
          setInputClassesAndReadState('Input', false);
          setIndicator(userWord);
          changingMode(false);
          setShowRightAnswer(false);
          setInputValue('');
          const indicatorValue = userWord?.optional?.indicator || 1;
          const trainedValue = userWord?.optional?.trained || 1;
          const body = {
            optional: {
              deleted: true,
              difficult: false,
              indicator: indicatorValue,
              lastTrained: new Date().toLocaleDateString(),
              nextTraining: new Date().toLocaleDateString(),
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
          changeCardToLeft();
        } else {
          changeAlertPopupState(true, 'Вы удалили все слова из текущей сессии.');
        }
      }}
      className="MainGame__delete-button"
    />
  );
};

export default DeleteButton;
