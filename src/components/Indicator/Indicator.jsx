import React from 'react';
import './Indicator.scss';

const Indicator = (props) => {
  const { indicatorNumber } = props;
  const indicatorItems = [];

  if (indicatorNumber) {
    for (let i = 0; i < 5; i += 1) {
      const indicatorItemClasses = ['Indicator__item'];
      if (i < indicatorNumber) {
        indicatorItemClasses.push('Indicator__item--active');
      }
      indicatorItems.push(<li key={i.toString()} className={indicatorItemClasses.join(' ')} />);
    }
  } else {
    for (let i = 0; i < 5; i += 1) {
      if (i === 0) {
        indicatorItems.push(<li key={i} className="Indicator__item Indicator__item--active" />);
      } else {
        indicatorItems.push(<li key={i} className="Indicator__item" />);
      }
    }
  }
  return (
    <ul className="Indicator">
      {indicatorItems}
    </ul>
  );
};

export default Indicator;
