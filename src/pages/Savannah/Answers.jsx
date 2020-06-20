/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';

export default class Answers extends React.PureComponent {
  checkAnswer = (index) => {
    const { rightAnswerIndex, nextLevel, removeLife } = this.props;
    if (index === rightAnswerIndex) {
      console.log('right');
      nextLevel();
    } else {
      console.log('wrong');
      removeLife();
    }
  }

  render() {
    const { answers } = this.props;
    return (
      <div style={{ border: '1px solid red' }}>
        {answers.map((item, index) => (
          <div
            style={{
              border: '1px solid green',
              margin: '10px',
            }}
            onClick={() => this.checkAnswer(index)}
            role="button"
            tabIndex={0}
            key={(`${item}`)}
          >
            {item}
          </div>
        ))}
      </div>
    );
  }
}
