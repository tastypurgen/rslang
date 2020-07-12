/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import './Sprint.scss';
import React, {
  useEffect, useState, useRef, useCallback,
} from 'react';
import { NavLink } from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import RenderTime from './timer';
import speaker from './image/speaker.png';
import Spinner from '../../components/Spinner/Spinner';
import errorSound from './sounds/error.mp3';
import correctSound from './sounds/correct.mp3';

function Sprint() {
  const [isGameOn, setIsGameOn] = useState(false);
  const sprintSection = useRef(null);
  const engGameSection = useRef(null);
  const source = 'https://raw.githubusercontent.com/tastypurgen/rslang-data/master/';
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [isSpinnerOn, setIsSpinnerOn] = useState(false);
  const difficultyLevel = {
    difficulty: document.getElementById('difficulty') ? document.getElementById('difficulty').value : 1,
  };
  const time = 60;
  const [word, setWord] = useState({
    enWord: '',
    ruWord: '',
    correct: true,
  });
  const [score, setScore] = useState(0);
  const [soundSrc, setSoundSrc] = useState({
    audioSrc: '',
  });
  // eslint-disable-next-line prefer-const
  let [pageNumber, setPageNumber] = useState(0);
  // eslint-disable-next-line prefer-const
  let [winStreak, setWinStreak] = useState(0);
  // eslint-disable-next-line prefer-const
  let [wordsPool, setWordsPool] = useState([]);

  const loadWord = useCallback(() => {
    setIsSpinnerOn(true);
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${pageNumber}&group=${difficultyLevel.difficulty}&wordsPerExampleSentenceLTE=46&wordsPerPage=46`;
    const wordsData = JSON.parse(localStorage.getItem('wordsPool'));
    if (wordsData) {
      setWordsPool(wordsData);
      return Promise.resolve(wordsData);
    }

    return fetch(url).then((resp) => resp.json()).then((wordsList) => {
      setIsSpinnerOn(false);
      setWordsPool(wordsList);
      localStorage.setItem('wordsPool', JSON.stringify(wordsList));
      return Promise.resolve(wordsList);
    });
  }, [difficultyLevel.difficulty, pageNumber]);

  function prepareToGame() {
    if (!wordsPool.length) {
      localStorage.removeItem('wordsPool');
      // eslint-disable-next-line no-plusplus
      setPageNumber(++pageNumber);
      if (pageNumber > 12) {
        pageNumber = 0;
        setPageNumber(pageNumber);
      }
    } else {
      // eslint-disable-next-line no-use-before-define
      startGame(wordsPool);
    }
  }

  function startGame(wordsList) {
    const wordsListTempo = wordsList.slice();
    const useCorrectWord = Math.random() >= 0.5;
    const randomIndex = Math.floor(Math.random() * wordsListTempo.length);
    const randomWord = wordsListTempo[randomIndex];
    const lastWord = wordsListTempo.pop();

    setWordsPool(wordsListTempo);

    setSoundSrc({
      audioSrc: source + lastWord.audio,
    });

    // eslint-disable-next-line no-unused-expressions
    useCorrectWord
      ? setWord({
        enWord: lastWord.word,
        ruWord: lastWord.wordTranslate,
        correct: true,
      })
      : setWord({
        enWord: lastWord.word,
        ruWord: randomWord.wordTranslate,
        correct: false,
      });
  }

  function updateScore(isAnswerCorrect) {
    if (isAnswerCorrect) {
      // eslint-disable-next-line no-use-before-define
      playSound(correctSound);
      setCorrectAnswers((prevAnswers) => prevAnswers.concat([word]));
      // eslint-disable-next-line no-plusplus
      setWinStreak(++winStreak);
      // eslint-disable-next-line no-unused-expressions
      winStreak >= 4 ? setScore(score + 20) : setScore(score + 10);
    } else {
      // eslint-disable-next-line no-use-before-define
      playSound(errorSound);
      setWrongAnswers((prevAnswers) => prevAnswers.concat([word]));
      setWinStreak(0);
      setScore(score);
    }
  }

  function playSound(e) {
    const sound = new Audio();

    sound.src = e;
    sound.play();
  }

  function answerWithKey(event) {
    if (wordsPool.length) {
      // eslint-disable-next-line default-case
      switch (event.key) {
        case 'ArrowLeft':
          updateScore(!word.correct);
          break;
        case 'ArrowRight':
          updateScore(word.correct);
          break;
      }
      prepareToGame();
    }
  }

  useEffect(() => {
    loadWord().then((words) => startGame(words));
  }, [loadWord]);
  return (
    <section ref={sprintSection} onKeyDown={answerWithKey} className="sprint-section" tabIndex="0">
      {isSpinnerOn && !wordsPool.length ? <Spinner className="spinner" /> : true}
      <div className={`start-page ${isGameOn ? 'invisible' : 'flex'}`}>
        <div className="start-page_section">
          <h1>Спринт</h1>
          <span>Игра на время, отгадывай слова и получай баллы!</span>
          <button
            type="submit"
            className="button correct start-btn"
            onClick={() => {
              sprintSection.current.focus();
              setIsGameOn(true);
            }}
          >
            Начать
          </button>
        </div>
      </div>
      <div ref={engGameSection} className={`end-game ${!wordsPool.length ? 'flex' : 'invisible'}`}>
        <div className="statistic-section">
          <h2>Конец игры!</h2>
          <div className="answer-container">
            <div>
              <h3>
                Правильно
                {' '}
                {correctAnswers.length}
                :
              </h3>
              <div className="answers">
                {correctAnswers.map((correctWord, index) => (
                  <div key={(index + 1).toString()}>
                    <span>{`${correctWord.enWord},`}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3>
                Неправильно
                {' '}
                {wrongAnswers.length}
                :
              </h3>
              <div className="answers">
                {wrongAnswers.map((wrongWord, index) => (
                  <div key={(index + 1).toString()}>
                    <span>{`${wrongWord.enWord},`}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="end-game_buttons">
            <button
              type="submit"
              className="button repeat"
              onClick={() => {
                engGameSection.current.className = 'invisible';
                sprintSection.current.focus();
                setScore(0);
                setCorrectAnswers([]);
                setWrongAnswers([]);
                prepareToGame();
                loadWord().then((words) => startGame(words));
              }}
            >
              Еще раз!
            </button>
            <NavLink to="/games-panel">
              <button type="submit" className="button exit">Выйти</button>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="level-section">
        Current Level:
        {pageNumber + 1}
      </div>
      <div className={`wrapper ${isGameOn ? 'flex' : 'invisible'}`}>
        <div className="score-container">{score}</div>
        <div className="game-container">
          <div className="game-words">
            <div key="1">{word.enWord}</div>
            <div>{word.ruWord}</div>
          </div>
          <div className="answer-section">
            <button
              type="submit"
              className="button wrong"
              onClick={() => {
                updateScore(!word.correct);
                prepareToGame();
              }}
            >
              Неверно
            </button>
            <button
              type="submit"
              className="button correct"
              onClick={() => {
                updateScore(word.correct);
                prepareToGame();
              }}
            >
              Верно
            </button>
          </div>
        </div>
        <div className="arrow-button">
          <div>
            <button type="button">&#8592;</button>
            <button type="button">&#8594;</button>
          </div>
          <img onClick={() => playSound(soundSrc.audioSrc)} src={speaker} alt="speaker" />
        </div>
      </div>
      <div className="app">
        <div className="timer-wrapper">
          {isGameOn && wordsPool.length ? (
            <CountdownCircleTimer
              isPlaying
              duration={time}
              colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
              size="120"
              strokeWidth="7"
              onComplete={() => {
                wordsPool = [];
                setWordsPool(wordsPool);
                prepareToGame();
                return [true, 1000];
              }}
            >
              {RenderTime}
            </CountdownCircleTimer>
          ) : true}
        </div>
      </div>
    </section>
  );
}
export default Sprint;
