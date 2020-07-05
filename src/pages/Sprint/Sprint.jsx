import './Sprint.scss';
import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import RenderTime from './timer';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import speaker from './image/speaker.png';



function Sprint () {
    const source = 'https://raw.githubusercontent.com/tastypurgen/rslang-data/master/';
    const [correctAnswers, setCorrectAnswers]   = useState([]);
    const [wrongAnswers, setWrongAnswers]       = useState([]);
    const difficultyLevel = {
        difficulty: document.getElementById('difficulty') ? document.getElementById('difficulty').value : 1,
    }

    let [pageNumber, setPageNumber] = useState(0);
    let [winStreak, setWinStreak] = useState(0);
    let [word, setWord] = useState({
        enWord: '', 
        ruWord:'',
        correct: true
    });
    
    let [wordsPool, setWordsPool] = useState([]);
    let [score, setScore] =  useState(0); 
    let [soundSrc, setSoundSrc] = useState({
        audioSrc: ''
    })
    let [randomKey, setRandomKey] = useState(0);
    let time = 5;
   
    function loadWord() {
        const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${pageNumber}&group=${difficultyLevel.difficulty}`;
        let wordsData = JSON.parse(localStorage.getItem("wordsPool"));
        if (wordsData) {
            setWordsPool(wordsData);
            return Promise.resolve(wordsData); 
        }

        return fetch(url).then(resp => resp.json()).then(wordsList => {
            setWordsPool(wordsList);
            localStorage.setItem("wordsPool", JSON.stringify(wordsList));
            return Promise.resolve(wordsList);
        });
    }

    function prepareToGame () {
        if (!wordsPool.length) {
            localStorage.removeItem("wordsPool");
            setPageNumber(++pageNumber);
            if (pageNumber > 29) {
                pageNumber = 0;
            }
        } else {
            startGame(wordsPool);
        }
    }

    function startGame(wordsList) {
        const wordsListTempo    = wordsList.slice();
        const useCorrectWord    = Math.random() >= 0.5;
        const randomIndex       = Math.floor(Math.random() * wordsListTempo.length);
        const randomWord        = wordsListTempo[randomIndex];
        const lastWord          = wordsListTempo.pop();

        setWordsPool(wordsListTempo);

        setSoundSrc({
            audioSrc: source + lastWord.audio
        })

        useCorrectWord ? 
            setWord({
                enWord  : lastWord.word,
                ruWord  : lastWord.wordTranslate,
                correct : true
            })
            :
            setWord({
                enWord  : lastWord.word,
                ruWord  : randomWord.wordTranslate,
                correct : false
            })

    }

    function updateScore(isAnswerCorrect) {
        if (isAnswerCorrect) {
            setCorrectAnswers((prevAnswers) => prevAnswers.concat([word]));
            setWinStreak(++winStreak);
            winStreak >= 4 ? setScore(score + 20) : setScore(score + 10);
        } else {
            setWrongAnswers((prevAnswers) => prevAnswers.concat([word]));
            setWinStreak(0);
            setScore(score);
        }
    }

    function playSound() {
        const sound = new Audio();
  
        sound.src = soundSrc.audioSrc;
        sound.play();
    }
    
    function answerWithKey(event) {
        if (event.key === 'ArrowLeft') {
            updateScore(!word.correct);
            prepareToGame();
            setRandomKey(Math.random());
        } else if(event.key === 'ArrowRight') {
            updateScore(word.correct);
            prepareToGame();
            setRandomKey(Math.random());
        }
    }
    

    useEffect(() => {
        loadWord().then(words => startGame(words));
    }, [])

    return (
        <section  onKeyDown={answerWithKey} className='main-section' tabIndex="0">
            <div className='level-section'>Current Level: {pageNumber + 1}</div>
            <div className='wrapper'>
                <div className='score-container'>{score}</div>
                <div className='game-container'>
                    <div className='game-words'>
                        <div key='1'>{word.enWord}</div>
                        <div>{word.ruWord}</div>
                    </div>
                    <div className='answer-section'>
                        <button className='button wrong' onClick={() =>  {
                            updateScore(!word.correct);
                            prepareToGame();
                            setRandomKey(Math.random());
                            }}>Неверно</button>
                        <button className='button correct' onClick={() =>  {
                            updateScore(word.correct);
                            prepareToGame();
                            setRandomKey(Math.random());
                            }}>Верно</button>
                    </div>
                </div>
                <div className='arrow-button'>
                    <div>
                        <button>&#8592;</button>
                        <button>&#8594;</button>
                    </div>
                    <img onClick={() => playSound()} src={speaker} alt="speaker"/>
                </div>
            </div>
            <div className="app">
                    <div className="timer-wrapper">
                      {wordsPool.length ? <CountdownCircleTimer
                        key={randomKey}
                        isPlaying
                        duration={time}
                        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                        size='120'
                        strokeWidth='7'
                        onComplete={() => {
                            if (word.enWord) {
                                updateScore(false);
                            }
                            prepareToGame();
                            return [true, 1000];
                        }}
                      >
                        {RenderTime}
                      </CountdownCircleTimer> : true } 
                    </div>
            </div>
            <div className={`end-game ${!wordsPool.length ? 'flex' : 'hidden'}`}>
                <div className='statistic-section'>
                <h2>Конец игры!</h2>
                    <div className='answers'>
                        <h3>Правильно:</h3>
                        {correctAnswers.map((word, index) => (
                            <div key={index + 1}>
                                <span>{`${word.enWord}`}</span>
                            </div>
                        ))}
                    </div>
                    <div className='answers'>
                        <h3>Неправильно:</h3>
                        {wrongAnswers.map((word, index) => (
                            <div key={index + 1}>
                                <span>{`${word.enWord}`}</span>
                            </div>
                        ))}
                    </div>
                    <div className='end-game_buttons'>
                        <button className='button repeat' onClick={() => {
                              setScore(0);
                              setCorrectAnswers([]);
                              setWrongAnswers([]);
                              prepareToGame();
                              loadWord().then(words => startGame(words));
                        }}>Еще раз!</button>
                         <NavLink to="/games-panel">
                            <button className='button exit'>Выйти</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Sprint;
