import React from 'react';
import img from './img/audio.png';

export default class Word extends React.PureComponent {
  render() {
    const { nameClass, word } = this.props;
    return (
      <div>
        <img className={nameClass} src={word.img} alt={word.word} />
        <br />
        <audio id="play-word" src={word.audio} autoPlay />
        <img
          src={img}
          alt="audio"
          role="button"
          tabIndex={0}
          onClick={() => document.getElementById('play-word').play()}
        />
        <div>
          <h1 className={nameClass}>{word.word}</h1>
          <h2 className={nameClass}>{word.transcription}</h2>
        </div>
      </div>
    );
  }
}
