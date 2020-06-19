/* eslint-disable global-require */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/media-has-caption */

import React from 'react';

export default class Word extends React.PureComponent {
  render() {
    const className = this.props.class;
    return (
      <div>
        <img className={className} src={this.props.word.img} alt={this.props.word.word} />
        <br />
        <audio id="play-word" src={this.props.word.audio} autoPlay />
        <img
          src={require('./img/audio.png')}
          alt="audio"
          role="button"
          tabIndex={0}
          onClick={() => document.getElementById('play-word').play()}
        />
        <div>
          <h1 className={className}>{this.props.word.word}</h1>
          <h2 className={className}>{this.props.word.transcription}</h2>
        </div>
      </div>
    );
  }
}
