import React from 'react';
import skip from '../img/skip.svg';

const AvailableSkips = (props) => {
  const { availableSkips } = props;
  return (
    <div className="word-constructor__available-skips" title="Пропусков хода">
      <img src={skip} alt="availableSkips" />
      <p>{availableSkips}</p>
    </div>
  );
};

export default AvailableSkips;
