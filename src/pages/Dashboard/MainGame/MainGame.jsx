import React, { useState, useEffect } from 'react';
import { getUserSettings } from '../../../services/settingsService';
import './MainGame.scss';
import AssesmentsButtons from './AssesmentsButtons/AssesmentsButtons';

const MainGame = () => {
  const [settingsData, setSettingsData] = useState(null);
  const [showRightAnswer, setShowRightAnswer] = useState(false);

  let component = <h1>Loading</h1>;
  useEffect(() => {
    getUserSettings(localStorage.userToken, localStorage.userId).then((response) => {
      setSettingsData(response.optional);
    });
  }, []);

  if (settingsData) {
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
        <p className="MainGame__card-sentence-translation">Юитва длилась много дней</p>
        {showRightAnswer
          ? (
            <div className="MainGame__container">
              {associationImage ? <img src="https://via.placeholder.com/190" alt="" className="MainGame__image" /> : null}
              <div className="MainGame__word-info">
                <p className="word-info__full-word">
                  <span className="word-info__icon" />
                  <span className="word-info__word" />
                  {wordTranscription ? <span className="word-info__transcription">[bitwa biitch]</span> : null}
                  {wordTranslation ? <span className="word-info__translation">Битва</span> : null}
                </p>
                {exampleSentence ? <p className="word-info__second-sentence-example">A battle is a fight between two armies during a war.</p> : null}
                {showWordAndSentenceTranslation ? <p className="word-info__second-sentence-translation">Битва - это битва между двумя армиями во время войны.</p> : null}
              </div>
            </div>
          ) : null}
        {buttonComponent}
      </div>
    );
  }
  return (
    <div className="MainGame">
      {showRightAnswer ? (
        <button
          onClick={() => {

          }}
          type="button"
        >
          left arrow
        </button>
      ) : null}
      {component}
      {showRightAnswer ? (
        <button
          onClick={() => {

          }}
          type="button"
        >
          left arrow
        </button>
      ) : null}
    </div>
  );
};

export default MainGame;