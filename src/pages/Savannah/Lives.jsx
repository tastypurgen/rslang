/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';

export default class Lives extends PureComponent {
  render() {
    return (
      <div>
        Lives:
        {this.props.lives}
      </div>
    );
  }
}
