import React from 'react';

const ProgressBar = (props) => {
  const { currentLevel } = props;
  const progressBarWidth = (currentLevel + 1) * 10;
  const progressBarStyle = {
    width: `${progressBarWidth}%`,
  };

  return (
    <div className="word-constructor__progress-bar__wrapper">
      <div className="word-constructor__progress-bar" style={progressBarStyle} />
    </div>
  );
};

export default ProgressBar;