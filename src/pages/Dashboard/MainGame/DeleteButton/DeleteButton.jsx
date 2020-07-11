import React from 'react';
import deleteIcon from '../images/delete.svg';
import {
  createUserWord, updateUserWord, getAllUserWords,
} from '../../../../services/userWords';

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
              console.log(userWord.optional.indicator);
              updateUserWord(wordsData[currentWordIndex]._id, body);
            }
          } catch {
            createUserWord(wordsData[currentWordIndex]._id, body);
            console.log('Слова нит');
          }
          changeCardToLeft();
        }
      }}
      className="MainGame__delete-button"
    />
  );
};

export default DeleteButton;
