import React, { PureComponent } from 'react';
import Spinner from '../../../components/Spinner/Spinner';

export default class Answer extends PureComponent {
  render() {
    const { word } = this.props;
    const initialWord = word.split('');
    if (initialWord) {
      return (
        <div className="word-constructor__shuffled-letters">
          {initialWord.map((letter, index) => (
            <div key={index} className="word-constructor__shuffled-letter"> </div>
          ))}
        </div>
      );
    }
    return (
      <Spinner />
    );
  }
}
