import React from 'react';
import './AssessmentButtons.scss';

const AssessmentButtons = (props) => {
  const { setShowRightAnswer, setInputClassesAndReadState, clearInputValue } = props;
  return (
    <div className="AssessmentButtons">
      <button
        key={1}
        className="AssessmentButtons__button"
        onClick={() => {
          setInputClassesAndReadState('Input', false);
          clearInputValue('');
          setShowRightAnswer(false);
        }}
        type="button"
      >
        Снова
      </button>
      <button
        key={2}
        className="AssessmentButtons__button"
        onClick={() => {

        }}
        type="button"
      >
        Трудно
      </button>
      <button
        key={3}
        className="AssessmentButtons__button"
        onClick={() => {

        }}
        type="button"
      >
        Хорошо
      </button>
      <button
        key={4}
        className="AssessmentButtons__button"
        onClick={() => {

        }}
        type="button"
      >
        Легко
      </button>
    </div>
  );
};

export default AssessmentButtons;
