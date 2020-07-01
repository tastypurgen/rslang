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

  handleClick = () => {
    this.setState({ isStarted: true });
  }

  render() {
    const { isStarted, difficulty } = this.state;

    if (!isStarted) {
      getRandomWords(difficulty, 2);
      return (
        <div className="word-constructor">
          <div className="word-constructor__start-panel">
            <h2>Конструктор слов</h2>
            <p>
              Игра-головоломка, в которой необходимо составить
              слова из перемешанных случайным образом букв.
            </p>
            <button className="word-constructor__btn" type="button" onClick={this.handleClick}>Играть</button>
          </div>
        </div>
      );
    }
    return (
      <Game />
    );
  }
}
