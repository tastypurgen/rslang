import React from 'react';
import { withRouter } from 'react-router-dom';
import { getUserStatistics, upsertUserStatistics } from '../../../../services/userStatistics';

const ArrowButton = (props) => {
  const {
    currentStatistic,
    setInputValue,
    setInputClassesAndReadState,
    setIndicator,
    currentWordIndex,
    wordsData,
    changePopupShowState,
    setCurrentIndex,
    setShowRightAnswer,
    setDifficultyButtonState,
  } = props;
  return (
    <div
      tabIndex={0}
      role="button"
      onClick={() => {
        if (currentWordIndex < wordsData.length - 1) {
          setInputValue('');
          setInputClassesAndReadState('Input', false);
          setIndicator(wordsData[currentWordIndex + 1].userWord);
          // changePopupShowState();
          setCurrentIndex(currentWordIndex + 1);
          setShowRightAnswer(false);
          setDifficultyButtonState(false);
        } else if (!currentStatistic.optional.today.isFinished) {
          changePopupShowState(true);
          currentStatistic.optional.today.isFinished = true;
          upsertUserStatistics(currentStatistic);
          console.log(currentStatistic);
        } else {
          props.history.push('/');
        }
      }}
      className="MainGame__right-arrow"
    >
      <svg
        fill="#C4C4C4"
        width="31"
        height="31"
        viewBox="0 0 31 31"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10.4835 5.02314L17.6575 12.0596H0.345215V18.6234H17.6575L10.4835 25.6598L15.0532 30.3445L30.3488 15.3427L15.0532 0.33844L10.4835 5.02314Z" />
      </svg>
    </div>
  );
};

export default withRouter(ArrowButton);
