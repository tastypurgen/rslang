import React, { PureComponent } from 'react';
import skip from '../img/skip.svg';

export default class AvailableSkips extends PureComponent {
  render() {
    const { availableSkips } = this.props;
    return (
      <div className="word-constructor__available-skips" title="Пропусков хода">
        <img src={skip} alt="availableSkips" />
        <p>{availableSkips}</p>
      </div>
    );
  }
}
