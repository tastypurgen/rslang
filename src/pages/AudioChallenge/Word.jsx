import React from 'react';
import img from './img/audio.png';

export default class Word extends React.PureComponent {
  render() {
    const { nameClass, word } = this.props;
    const play = nameClass === '' ? '' : 'play';
    return (
      <div className="word-wrapper">
        <div className="word-image">
          <img className={nameClass} src={word.img} alt={word.word} />
        </div>
        <audio id="play-word" src={word.audio} autoPlay />
        <div
          className={`audio ${play}`}
          role="button"
          tabIndex={0}
          onClick={() => document.getElementById('play-word').play()}
        >
          <img
            src={img}
            alt="audio"
          />
        </div>
        <div className="word">
          <span className={nameClass}>{word.word}</span>
          <span className={nameClass}>{word.transcription}</span>
        </div>
      </div>
    );
  }
}
