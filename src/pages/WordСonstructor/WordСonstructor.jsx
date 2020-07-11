import React, { PureComponent } from 'react';
import './WordСonstructor.scss';
import { getRandomWords } from '../../services/getWords';
import Game from './components/Game';
import Statistics from './components/Statistics';

export default class WordConstructor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isStarted: false,
      isFinished: false,
      difficulty: document.getElementById('difficulty') ? document.getElementById('difficulty').value : 1,
    };
  }

  componentDidMount() {
    const { difficulty } = this.state;
    getRandomWords(difficulty, 2);
  }

  startGame = () => {
    this.setState({ isStarted: true });
  }

  finishGame = (rightAnswers, wrongAnswers) => {
    this.setState({
      isFinished: true,
      rightAnswers,
      wrongAnswers,
    });
  }

  restartGame = () => {
    const { difficulty } = localStorage;
    this.setState({
      isFinished: false,
    });
    if (difficulty !== '6') {
      getRandomWords(difficulty, 2);
    }
  }

  render() {
    const {
      isStarted, isFinished, rightAnswers, wrongAnswers,
    } = this.state;

    if (!isStarted) {
      return (
        <div className="word-constructor word-constructor__start-page">
          <div className="word-constructor__start-panel">
            <h2>Конструктор слов</h2>
            <p>
              Игра-головоломка, в которой необходимо составить
              слова из перемешанных случайным образом букв.
            </p>
            <button className="word-constructor__btn word-constructor__btn_margin" type="button" onClick={this.startGame}>Играть</button>
          </div>
        </div>
      );
    }

    if (isFinished) {
      return (
        <Statistics
          rightAnswers={rightAnswers}
          wrongAnswers={wrongAnswers}
          restartGame={this.restartGame}
        />
      );
    }

    return (
      <Game
        finishGame={this.finishGame}
      />
    );
  }
}
