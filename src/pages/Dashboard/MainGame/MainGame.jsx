import React, { useState, useEffect } from 'react';
import './MainGame.scss';
import AssesmentsButtons from './AssesmentsButtons/AssesmentsButtons';
import { getUserSettings } from '../../../services/settingsService';
import { getWordByPageAndDifficultyNumber } from '../../../services/getWords';

const MainGame = () => {
  const [settingsData, setSettingsData] = useState(null);
  const [showRightAnswer, setShowRightAnswer] = useState(false);
  const [wordsData, setWordsData] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDataEnabled, setIsDataEnabled] = useState(false);
  // let wordsData = [];

  const getNecessaryWords = async (wordsPerDay) => {
    const a = Math.ceil(wordsPerDay / 20);
    const valueToDelete = wordsPerDay - ((a - 1) * 20);
    let words = [];
    let i = 0;
    const recursionFecth = async () => {
      const response = await getWordByPageAndDifficultyNumber(i, 0);
      if (i < a && i !== (a - 1)) {
        i += 1;
        words = words.concat(response);
        recursionFecth();
      } else if (i === (a - 1)) {
        response.length = valueToDelete;
        words = words.concat(response);
        setWordsData(words);
        setIsDataEnabled(true);
      }
    };
    recursionFecth();
  };

  const initCardComponent = (wordData) => {
    console.log(wordData);
    const {
      textMeaningTranslate, textExample, transcription, textExampleTranslate, image,
    } = wordData;
    let component;
    const {
      displayShowAnswerBtn,
      displayAssessmentBtns,
      displayDeleteBtn,
      displayDifficultBtn,
      wordTranslation,
      wordTranscription,
      showWordAndSentenceTranslation,
      associationImage,
      exampleSentence,
    } = settingsData;
    const buttonComponent = [];
    if (displayShowAnswerBtn && !showRightAnswer) {
      buttonComponent.push((
        <button
          type="button"
          onClick={() => {
            setShowRightAnswer(true);
          }}
          className="MainGame__answer-button"
        >
          показать ответ
        </button>
      ));
    } else if (displayAssessmentBtns && showRightAnswer) {
      buttonComponent.push((
        <AssesmentsButtons />
      ));
    }
    component = (
      <div className="MainGame__card">
        <div className="MainGame__indicator">Индикатор</div>
        <p className="MainGame__card-sentence">
          {displayDeleteBtn ? (
            <button type="button" className="MainGame__delete">
              добавить в сложные
            </button>
          ) : null}
          {displayDifficultBtn ? (
            <button type="button" className="MainGame__difficult">
              добавить в сложные
            </button>
          ) : null}
          <br />
          The
          <span><input type="text" /></span>
          {' '}
          lasted for many days
        </p>
        <p className="MainGame__card-sentence-translation">{textExampleTranslate}</p>
        {showRightAnswer
          ? (
            <div className="MainGame__container">
              {associationImage ? <img src={`https://raw.githubusercontent.com/koptohhka/rslang-data/master/${image}`} alt="" className="MainGame__image" /> : null}
              <div className="MainGame__word-info">
                <p className="word-info__full-word">
                  <span className="word-info__icon" />
                  <span className="word-info__word" />
                  {wordTranscription ? <span className="word-info__transcription">{transcription}</span> : null}
                  {wordTranslation ? <span className="word-info__translation">{wordData.wordTranslation}</span> : null}
                </p>
                {exampleSentence ? <p className="word-info__second-sentence-example">A battle is a fight between two armies during a war.</p> : null}
                {showWordAndSentenceTranslation ? <p className="word-info__second-sentence-translation">{textMeaningTranslate}</p> : null}
              </div>
            </div>
          ) : null}
        {buttonComponent}
      </div>
    );
    return component;
  };

  useEffect(() => {
    getUserSettings(localStorage.userToken, localStorage.userId).then((response) => {
      setSettingsData(response.optional);
      getNecessaryWords(response.optional.maxCardsPerDay);
    });
  }, []);

  return (
    <div className="MainGame">
      {showRightAnswer ? (
        <button
          onClick={() => {
            if (currentWordIndex !== 0) {
              setCurrentWordIndex(currentWordIndex - 1);
              setShowRightAnswer(false);
            }
          }}
          type="button"
        >
          left arrow
        </button>
      ) : null}
      {
        isDataEnabled ? initCardComponent(wordsData[currentWordIndex]) : <h1>Loading...</h1>
      }
      {showRightAnswer ? (
        <button
          onClick={() => {
            if (currentWordIndex !== wordsData.length) {
              setCurrentWordIndex(currentWordIndex + 1);
              setShowRightAnswer(false);
            }
          }}
          type="button"
        >
          right arrow
        </button>
      ) : null}
    </div>
  );
};

export default MainGame;
