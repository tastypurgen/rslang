/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/prop-types */
import React from 'react';

export default class Word extends React.PureComponent {
  render() {
    const className = this.props.class;
    return (
      <div>
        <img className={className} src={this.props.word.img} alt={this.props.word.word} />
        <h1 className={className}>{this.props.word.word}</h1>
        <audio src={this.props.word.audio} autoPlay controls />
      </div>
    );
  }
}
