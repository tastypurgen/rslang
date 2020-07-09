import React from 'react';
import classNames from 'classnames';
import audioImg from '../img/audio-hint.svg';

const Hints = (props) => {
  const { availableHints, playAudioHint } = props;
  const btnClass = classNames('word-constructor__available-hints', { disabled: !availableHints });
  return (
    <button type="button" className={btnClass} title="Аудиоподсказка" onClick={playAudioHint}>
      <img src={audioImg} alt="availableHints" />
      <p>{availableHints}</p>
    </button>
  );
};

export default Hints;
