/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';

export default class Answers extends React.PureComponent {
  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    if (e.key > 0 && e.key < 4) {
      this.checkAnswer(e.key - 1);
    }
  }

  checkAnswer = (index) => {
    const { rightAnswerIndex, nextLevel, removeLife } = this.props;
    if (index === rightAnswerIndex) {
      nextLevel();
    } else {
      removeLife();
    }
  }

  render() {
    const { answers } = this.props;
    return (
      <div className="answers">
        {answers.map((item, index) => (
          <div
            className="answer-btn"
            onClick={() => this.checkAnswer(index)}
            role="button"
            tabIndex={0}
            key={(`${item}`)}
          >
            {index + 1}
            {'. '}
            {item}
          </div>
        ))}
      </div>
    );
  }
}
