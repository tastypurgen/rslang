import React from 'react';
import './ProgressBar.scss';

const ProgressBar = (props) => {
  const { width } = props;
  return (
    <div
      style={
        { width }
    }
      className="ProgressBar"
    >
      <div
        className="ProgressBar__item"
      />
    </div>
  );
};

export default ProgressBar;
