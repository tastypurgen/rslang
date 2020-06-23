import React from 'react';

let firstTimeot;
export default class Word extends React.Component {
  // componentDidMount() {
  //   const { removeLife } = this.props;
  //   firstTimeot = setTimeout(() => removeLife(), 5000);
  // }

  // componentDidUpdate() {
  //   const { removeLife } = this.props;
  //   clearTimeout(firstTimeot);
  //   firstTimeot = setTimeout(() => removeLife(), 5000);
  // }

  // componentWillUnmount() {
  //   clearTimeout(firstTimeot);
  // }

  render() {
    const { word } = this.props;
    return (<div className="game-word"><h1>{word}</h1></div>);
  }
}
