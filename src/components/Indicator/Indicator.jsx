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
      indicatorItems.push(<li key={i} className={indicatorItemClasses.join(' ')} />);
    }
  } else {
    indicatorItems.push(
      <>
        <li key={1} className="Indicator__item Indicator__item--active" />
        <li key={2} className="Indicator__item" />
        <li key={3} className="Indicator__item" />
        <li key={4} className="Indicator__item" />
        <li key={5} className="Indicator__item" />
      </>,
    );
  }
  return (
    <ul className="Indicator">
      {indicatorItems}
    </ul>
  );
};

export default Indicator;
