import React from 'react';
import { NavLink } from 'react-router-dom';

import './GamesPanel.scss';
import GameCard from '../../components/GameCard/GameCard';

import speakImg from './img/speak.png';
import puzzleImg from './img/puzzle.png';
import savannahImg from './img/savannah.png';
import listenImg from './img/listen.png';
import sprintImg from './img/sprint.png';
import constructorImg from './img/constructor.png';
import { checkUserWordsForGames, getUserWordsForGames } from '../../utils/checkUserWords';

class GamesPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      difficulty: 0,
      checkUserWords: {},
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.setUserWords();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  setUserWords = async () => {
    const checkWords = await checkUserWordsForGames();
    if (this.mounted) {
      this.setState({ checkUserWords: checkWords });
      if (checkWords) {
        await getUserWordsForGames();
      } else {
        localStorage.userWords = '[]';
      }
    }
  };

  render() {
    const { difficulty, checkUserWords } = this.state;
    if (!checkUserWords && localStorage.difficulty === '6') {
      localStorage.setItem('difficulty', '0');
    }
    return (
      <div className="games-panel">
        <div className="container">
          <div className="mode">
            <span>Тренировки</span>
            <select
              name="difficulty"
              id="difficulty"
              value={difficulty || localStorage.difficulty}
              onChange={(e) => {
                this.setState({ difficulty: e.target.value });
                localStorage.difficulty = e.target.value;
              }}
            >
              <option value="0">Очень легко</option>
              <option value="1">Легко</option>
              <option value="2">Средне</option>
              <option value="3">Тяжело</option>
              <option value="4">Очень тяжело</option>
              <option value="5">I&apos;m from England</option>
              <option value="6" title={!checkUserWords ? 'Недостаточно слов для игры' : ''} disabled={!checkUserWords}>Изученные слова</option>
            </select>
          </div>
          <div className="cards-container">
            <NavLink to="/speakit">
              <GameCard
                name="Повторяйка"
                description="Слушай и повторяй"
                img={speakImg}
              />
            </NavLink>
            <NavLink to="/english-puzzle">
              <GameCard
                name="Мозаика"
                description="Собери предложение"
                img={puzzleImg}
              />
            </NavLink>
            <NavLink to="/savannah">
              <GameCard
                name="Саванна"
                description="Развивай словарный запас"
                img={savannahImg}
              />
            </NavLink>
            <NavLink to="/audio-challenge">
              <GameCard
                name="Аудиовызов"
                description="Слушай и угадывай"
                img={listenImg}
              />
            </NavLink>
            <NavLink to="/sprint">
              <GameCard
                name="Спринт"
                description="Угадывай на время"
                img={sprintImg}
              />
            </NavLink>
            <NavLink to="/word-constructor">
              <GameCard
                name="Конструктор слов"
                description="Собери слово"
                img={constructorImg}
              />
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default GamesPanel;
