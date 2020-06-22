/* eslint-disable no-param-reassign */

import React from 'react';

export default class Answers extends React.PureComponent {
  constructor(props) {
    super(props);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress);
  }

  handleKeyPress(e) {
    const { active, word, handleClick } = this.props;
    if (e.key > 0 && e.key < 6 && !active) {
      const target = document.getElementById(word.answers[e.key - 1]);
      this.checkAnswer(target, e.key - 1);
    } else if (e.key === 'Enter' && active) {
      handleClick();
    }
  }

  checkAnswer(target, index) {
    const { word, nextLevel, wrongAnswer } = this.props;
    if (index === word.rightAnswerIndex) {
      document.querySelectorAll('.container li').forEach((li) => {
        if (li.id !== word.translation) {
          li.className = 'pale';
        } else {
          target.className = 'correct';
        }
      });
      nextLevel();
    } else {
      document.querySelectorAll('.container li').forEach((li) => {
        if (li.id !== word.translation) {
          li.className = 'pale';
        }
      });
      target.className += ' wrong';
      wrongAnswer();
    }
  }

  render() {
    const { word, active, children } = this.props;
    const { answers } = word;
    return (
      <div className="answers">
        <ol className="container">
          {answers.map((item, index) => (
            <li
              onClick={!active
                ? ((e) => this.checkAnswer(e.target, index))
                : undefined}
              role="button"
              tabIndex={0}
              key={item}
              id={item}
            >
              {item}
            </li>
          ))}
        </ol>
        {children}
      </div>
    );
  }
}
