import React, { PureComponent } from 'react';
import './WordСonstructor.scss';
import { getRandomWords } from '../../services/getWords';
import Game from './components/Game';

export default class WordConstructor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isStarted: false,
      difficulty: document.getElementById('difficulty') ? document.getElementById('difficulty').value : 1,
    };
  }

  componentDidMount() {
    const { difficulty } = this.state;
    getRandomWords(difficulty, 2);
  }

  handleClick = () => {
    this.setState({ isStarted: true });
  }

  render() {
    const { isStarted } = this.state;

    if (!isStarted) {
      return (
        <div className="word-constructor word-constructor__start-page">
          <div className="word-constructor__start-panel">
            <h2>Конструктор слов</h2>
            <p>
              Игра-головоломка, в которой необходимо составить
              слова из перемешанных случайным образом букв.
            </p>
            <button className="word-constructor__btn word-constructor__btn_margin" type="button" onClick={this.handleClick}>Играть</button>
          </div>
        </div>
      );
    }
    return (
      <Game />
    );
  }
}
