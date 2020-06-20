/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';

export default class Answers extends React.PureComponent {
  checkAnswer = (index) => {
    if (index === this.props.rightAnswerIndex) {
      console.log('right');
      this.props.nextLevel();
    } else {
      console.log('wrong');
      this.props.removeLife();
    }
  }

  render() {
    console.log(this.props);
    console.log(this.props.rightAnswerIndex);
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
