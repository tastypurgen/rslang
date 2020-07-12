import React from 'react';

import './ProgressBar.scss';

const ProgressBar = (props) => {
  const { width } = props;
  let { progressPercent } = props;
  if (progressPercent > 100) progressPercent = 100;
  const barLength = width || '100%';
  const progressStyle = { width: `${progressPercent}%`, backgroundColor: '#32BEA6' };
  return (
    <div className="progress-bar" style={{ width: barLength }}>
      <div className="bar" style={progressStyle} />
    </div>
  );
};

export default ProgressBar;
