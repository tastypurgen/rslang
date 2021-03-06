import React from 'react';
import './AssessmentButtons.scss';

const AssessmentButtons = (props) => {
  const {
    setShowRightAnswer,
    setInputClassesAndReadState,
    updateInput,
    assessUserWord,
    changingMode,
  } = props;

  return (
    <div className="AssessmentButtons">
      <button
        key="1"
        className="AssessmentButtons__button"
        onClick={() => {
          changingMode(false);
          setInputClassesAndReadState('Input', false);
          updateInput('');
          setShowRightAnswer(false);
        }}
        type="button"
      >
        Снова
      </button>
      <button
        key="2"
        className="AssessmentButtons__button"
        onClick={() => {
          assessUserWord(-1);
        }}
        type="button"
      >
        Трудно
      </button>
      <button
        key="3"
        className="AssessmentButtons__button"
        onClick={() => {
          assessUserWord(0);
        }}
        type="button"
      >
        Хорошо
      </button>
      <button
        key="4"
        className="AssessmentButtons__button"
        onClick={() => {
          assessUserWord(1);
        }}
        type="button"
      >
        Легко
      </button>
    </div>
  );
};

export default AssessmentButtons;
