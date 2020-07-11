import React, { useState } from 'react';
import './ControllPanel.scss';

const ControllPanel = (props) => {
  const { startNewGame, isSpeechRecognitionOn } = props;
  const [speechState, setSpeechState] = useState(isSpeechRecognitionOn);

  return (
    <div className="ControllPanel">
      <button
        type="button"
        onClick={() => {
          startNewGame();
        }}
        className="ControllPanel__restart ControllPanel__button"
      >
        restart
      </button>
      <button
        type="button"
        onClick={() => {
          // props.changePlayModeState();
          props.changeSpeechRecognitionState();
          setSpeechState(!speechState);
          if (speechState) {
            window.recognition.stop();
          }
        }}
        className="ControllPanel__speak ControllPanel__button"
      >
        {!speechState ? 'to speak'
          : 'stop speaking'}
      </button>
      <button
        type="button"
        onClick={() => {
          props.toShowResults();
        }}
        className="ControllPanel__finish ControllPanel__button"
      >
        Finish
      </button>
    </div>
  );
};

export default ControllPanel;
