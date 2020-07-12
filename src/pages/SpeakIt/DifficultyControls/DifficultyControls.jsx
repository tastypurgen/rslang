import React from 'react';
import './DifficultyControls.scss';
import DifficultyControl from './DifficultyControl/DifficultyControl';

const DifficultyControls = (props) => {
  const { isSpeechRecognitionOn, toHandleDifficultyControls } = props;
  const components = [];
  for (let i = 0; i < 6; i += 1) {
    components.push((
      <DifficultyControl
        isSpeechRecognitionOn={isSpeechRecognitionOn}
        activeElement={props.activeElement}
        value={i}
        toHandleDifficultyControls={toHandleDifficultyControls}
        key={i}
      />
    ));
  }
  return (
    <ul className="DifficultyControls__list">
      {components}
    </ul>
  );
};

export default DifficultyControls;
