/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';

export default class Answers extends React.PureComponent {
  constructor(props) {
    super(props);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  checkAnswer(index) {
    if (index === this.props.rightAnswerIndex) {
      this.props.nextLevel();
    } else {
      this.props.wrongAnswer();
    }
  }

  render() {
    const { answers } = this.props;
    return (
      <div>
        <div style={{ border: '1px solid red' }}>
          <ol>
            {answers.map((item, index) => (
              <li
                style={{ border: '1px solid green', margin: '20px' }}
                onClick={!this.props.active ? (() => this.checkAnswer(index)) : undefined}
                role="button"
                tabIndex={0}
                key={(`${item}`)}
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
