import './Sprint.scss';
import React, {useEffect, useState} from 'react';
import RenderTime from './timer';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import speaker from './image/speaker.png';


function Sprint () {
    const source = 'https://raw.githubusercontent.com/tastypurgen/rslang-data/master/';

    let [pageNumber, setPageNumber] = useState(0);
    let time = 60;
    let [winStreak, setWinStreak] = useState(0);
    let [word, setWord] = useState({
        enWord: '', 
        ruWord:'',
        correct: true
    });
    
    let [wordsPool, setWordsPool] = useState();
    let [score, setScore] =  useState(0); 
    let [soundSrc, setSoundSrc] = useState({
        audioSrc: ''
    })

   
    function loadWord() {
        const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${pageNumber}&group=0`;
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

    function startGame(wordsList) {
        const useCorrectWord =  Math.random() >= 0.5;
        const lastWord = wordsList.pop();
        const randomIndex = Math.floor(Math.random() * wordsList.length - 1);
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
                ruWord  : wordsList[randomIndex].wordTranslate,
                correct : false
            })

    }

    function playSound() {
        const sound = new Audio();
  
        sound.src = soundSrc.audioSrc;
        sound.play();
    }

    function updateScore(isAnswerCorrect) {
        if (isAnswerCorrect) {
            setWinStreak(++winStreak)
            winStreak >= 4 ? setScore(score + 20) : setScore(score + 10);
        } else {
            setWinStreak(0);
            setScore(score);
        }
    }
    
    function arrowEvent(event) {
        if (event.key === 'ArrowLeft') {
            updateScore(!word.correct)
            startGame(wordsPool)
        } else if(event.key === 'ArrowRight') {
            updateScore(word.correct)
            startGame(wordsPool)
        }
    }

    useEffect(() => {
        loadWord().then(words => startGame(words));
        
    }, [])
  
    return (
        <section  onKeyDown={arrowEvent}  className='mainSection' tabIndex="0">
            <div className='wrapper'>
                <div>{score}</div>
                <div className='gameContainer'>
                    <div key='1'>{word.enWord}</div>
                    <div>{word.ruWord}</div>
                    <div>
                        <button onClick={() =>  {
                            updateScore(!word.correct);
                            if (!wordsPool.length) {
                                localStorage.removeItem("wordsPool")
                                setPageNumber(++pageNumber);
                                debugger
                                loadWord().then(words => startGame(words));
                            } else {
                                startGame(wordsPool)
                            }
                            }}>Неверно</button>
                        <button onClick={() =>  {
                            updateScore(word.correct);
                            if (!wordsPool.length) {
                                localStorage.removeItem("wordsPool")
                                setPageNumber(++pageNumber);
                                loadWord().then(words => startGame(words));
                            } else {
                                startGame(wordsPool);
                            }
                            }}>Верно</button>
                    </div>
                </div>
                <div>
                    <div>
                        <button>&#8592;</button>
                        <button>&#8594;</button>
                    </div>
                    <img onClick={() => playSound()} src={speaker} alt="speaker"/>
                </div>
                <div className="App">
                    <div className="timer-wrapper">
                      <CountdownCircleTimer
                        isPlaying
                        duration={time}
                        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                        size='120'
                        strokeWidth='7'
                        onComplete={() => [true, 1000]}
                      >
                        {RenderTime}
                      </CountdownCircleTimer>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Sprint;