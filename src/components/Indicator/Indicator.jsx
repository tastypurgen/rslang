import React from 'react';
import './Indicator.scss';

const colors = ['#e04f5f', '#ff934d', '#ffd07d', '#82d243', '#32bea6'];

export default class Indicator extends React.PureComponent {
  render() {
    const { indicator } = this.props;
    return (
      <div className="indicators">
        {colors.map((color, i) => (
          <div
            style={{ background: `${i < indicator ? color : ''}` }}
            className="indicator"
            key={color}
          />
        ))}
      </div>
    );
  }
}
