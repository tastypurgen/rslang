/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */

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
    if (e.key > 0 && e.key < 6 && !this.props.active) {
      const target = document.getElementById(this.props.word.answers[e.key - 1]);
      this.checkAnswer(target, e.key - 1);
    } else if (e.key === 'Enter' && this.props.active) {
      this.props.handleClick();
    }
  }

  checkAnswer(target, index) {
    if (index === this.props.word.rightAnswerIndex) {
      target.className = 'correct';
      this.props.nextLevel();
    } else {
      target.className = 'wrong';
      document.getElementById(this.props.word.translation).className = 'correct';
      this.props.wrongAnswer();
    }
  }

  render() {
    const { answers } = this.props.word;
    return (
      <div>
        <div style={{ border: '1px solid red' }}>
          <ol>
            {answers.map((item, index) => (
              <li
                style={{ border: '1px solid black', margin: '20px' }}
                onClick={!this.props.active
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
        </div>
        {this.props.children}
      </div>
    );
  }
}
