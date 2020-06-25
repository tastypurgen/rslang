import React, { PureComponent } from 'react';
import hearth from './img/heart.svg';

export default class Lives extends PureComponent {
  render() {
    const { lives } = this.props;
    return (
      <div className="lives">
        <img className="heart-img" src={hearth} alt="lives" />
        {' '}
        {lives}
      </div>
    );
  }
}
