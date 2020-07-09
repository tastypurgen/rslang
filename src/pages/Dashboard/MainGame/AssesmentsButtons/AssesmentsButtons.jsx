import React from 'react';
import './AssesmentsButtons.scss';

const AssesmentsButtons = (props) => {
  const { setShowRightAnswer, setInputClassesAndReadState, clearInputValue } = props;
  return (
    <div className="AssesmentsButtons">
      <button
        key={1}
        className="AssesmentsButtons__button"
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
        className="AssesmentsButtons__button"
        onClick={() => {

        }}
        type="button"
      >
        Трудно
      </button>
      <button
        key={3}
        className="AssesmentsButtons__button"
        onClick={() => {

        }}
        type="button"
      >
        Хорошо
      </button>
      <button
        key={4}
        className="AssesmentsButtons__button"
        onClick={() => {

        }}
        type="button"
      >
        Легко
      </button>
    </div>
  );
};

export default AssesmentsButtons;
