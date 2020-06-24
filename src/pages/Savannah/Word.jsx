/* eslint-disable no-use-before-define */
import React from 'react';

let wordEl;
let firstTimeot;
let pos = 0;
let id;

function myMove() {
  if (id) {
    clearInterval(id);
  }
  id = setInterval(frame, 12);
  pos = 0;
  function frame() {
    if (pos === 400) {
      clearInterval(id);
      wordEl.style.opacity = 0;
    } else {
      pos += 1;
      wordEl.style.opacity = 1;
      wordEl.style.top = `${pos}px`;
    }
  }
}
export default class Word extends React.Component {
  componentDidMount() {
    wordEl = document.querySelector('.game-word');
    const { removeLife } = this.props;
    myMove();
    firstTimeot = setTimeout(() => removeLife(), 5000);
  }

  componentDidUpdate() {
    const { removeLife } = this.props;
    clearTimeout(firstTimeot);
    myMove();
    firstTimeot = setTimeout(() => removeLife(), 5000);
  }

  componentWillUnmount() {
    clearTimeout(firstTimeot);
  }

  render() {
    const { word } = this.props;
    return (<div className="game-word"><h1>{word}</h1></div>);
  }
}
