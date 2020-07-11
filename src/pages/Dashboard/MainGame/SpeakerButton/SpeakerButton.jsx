import React from 'react';
import speakerIcon from '../images/speaker.svg';
import playAudioFunction from '../../../../utils/playAudioFunction';

const SpeakerButton = (props) => (
  <img
    title="Прослушать слово"
    role="button"
    onClick={() => {
      if (window.isClickEnabled) {
        playAudioFunction(`https://raw.githubusercontent.com/Koptohhka/rslang-data/master/${props.audio}`);
      }
    }}
    className="MainGame__speaker-icon word-info__full-word--item"
    src={speakerIcon}
    alt="Динамик"
  />
);

export default SpeakerButton;
