import React from 'react';
import './DifficultyControl.scss';

const DifficultyControl = (props) => {
  const {
    isSpeechRecognitionOn, toHandleDifficultyControls, value, activeElement,
  } = props;
  const classesArray = ['DifficultyControl'];
  if (value === activeElement) {
    classesArray.push('DifficultyControl--active');
  }
  return (
    <li
      alt="control"
      role="button"
      onClick={() => {
        if (!isSpeechRecognitionOn) {
          toHandleDifficultyControls(value);
        }
      }}
      data-value={value}
      className={classesArray.join(' ')}
    />
  );
};

export default DifficultyControl;
