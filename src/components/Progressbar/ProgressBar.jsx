import React from 'react';

import './ProgressBar.scss';

const ProgressBar = (props) => {
  const { progressPercent, width } = props;
  const barLength = width || '100%';
  const progressStyle = { width: `${progressPercent}%`, backgroundColor: '#32BEA6' };

  return (
    <div className="progress-bar" style={{ width: barLength }}>
      <div className="bar" style={progressStyle} />
    </div>
  );
};

export default ProgressBar;
