/* eslint-disable react/prop-types */
import React from 'react';

export default class Word extends React.Component {
  componentDidMount() {
    // setTimeout(() => this.props.fail(), 10000);
  }

  render() {
    const { word } = this.props;
    return (<div><h1>{word}</h1></div>);
  }
}
