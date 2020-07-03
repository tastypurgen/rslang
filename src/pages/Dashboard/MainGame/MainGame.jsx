import React, { PureComponent } from 'react';
import './MainGame.scss';
import AssesmentsButtons from './AssesmentsButtons/AssesmentsButtons';
import Input from './Input/Input';
import getUserAggregatedWords from '../../../services/userAggregatedWords';
import { getUserSettings } from '../../../services/settingsService';
import { getWordByPageAndDifficultyNumber, getWordsByPageCount } from '../../../services/getWords';
import { createUserWord, deleteUserWord, getAllUserWords } from '../../../services/userWords';

class MainGame extends PureComponent {
  state = {
    settingsData: null,
    showRightAnswer: false,
    isDataEnabled: false,
    wordsData: [],
    currentWordIndex: 0,
  };

  setShowRightAnswer = () => {
    this.setState({
      showRightAnswer: true,
    });
  };

  getNecessaryWords = async (wordsPerDay) => {
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
        this.setState({
          wordsData: words,
          isDataEnabled: true,
        });
      }
    };
    recursionFecth();
  };

  initCardComponent = (wordData) => {
    console.log(wordData);
    const {
      settingsData, showRightAnswer, wordsData, currentWordIndex,
    } = this.state;

    let component;
    const {
      word,
      textMeaning,
      textMeaningTranslate,
      textExample,
      transcription,
      textExampleTranslate,
      image,
    } = wordData;
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
      explanationSentence,
    } = settingsData;
    const buttonComponent = [];
    if (displayShowAnswerBtn && !showRightAnswer) {
      buttonComponent.push((
        <button
          type="button"
          key={Math.random()}
          onClick={() => {
            const body = {
              difficulty: 'false',
              optional: {
                indicator: 2,
              },
            };
            getAllUserWords().then((res) => { // смотрим что у нас в юзерВордс
              console.log(res);
            });
            createUserWord(wordsData[currentWordIndex].id, body).then((res) => {
              console.log(res);
            });
            this.setShowRightAnswer(true);
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
            <button
              onClick={() => {
                deleteUserWord(wordsData[currentWordIndex].id);
              }}
              type="button"
              className="MainGame__delete"
            >
              удалить
            </button>
          ) : null}
          {displayDifficultBtn ? (
            <button type="button" className="MainGame__difficult-button">
              добавить в сложные
            </button>
          ) : null}
          <br />
          <Input
            changeRightAnswerState={this.setShowRightAnswer}
            word={word}
            textExample={textExample}
          />
        </p>
        {exampleSentence ? <p className="MainGame__card-sentence-translation">{textExampleTranslate}</p>
          : <p className="MainGame__card-sentence-translation">{wordData.wordTranslate}</p>}
        {showRightAnswer
          ? (
            <div className="MainGame__container">
              {associationImage ? <img src={`https://raw.githubusercontent.com/koptohhka/rslang-data/master/${image}`} alt="" className="MainGame__image" /> : null}
              <div className="MainGame__word-info">
                <p className="word-info__full-word">
                  <span className="word-info__icon" />
                  <span className="word-info__word" />
                  {word}
                  {wordTranscription ? <span className="word-info__transcription">{transcription}</span> : null}
                  {wordTranslation ? <span className="word-info__translation">{wordData.wordTranslate}</span> : null}
                </p>
                {explanationSentence ? <p className="word-info__second-sentence-example">{textMeaning}</p> : null}
                {showWordAndSentenceTranslation ? <p className="word-info__second-sentence-translation">{textMeaningTranslate}</p> : null}
              </div>
            </div>
          ) : null}
        {buttonComponent}
      </div>
    );
    return component;
  };

  componentDidMount = async () => {
    const responsee = await getUserAggregatedWords('{"userWord.optional.indicator": 2}');
    console.log(responsee);
    // console.log('componenDidMount');
    // const wordsResponse = await getWordsByPageCount(77); //озарение важно не трогать
    // console.log(wordsResponse);
    const userWordsRequest = await getAllUserWords();
    console.log(userWordsRequest);
    const response = await getUserSettings(localStorage.userToken, localStorage.userId);
    this.setState({
      settingsData: response.optional,
    });
    this.getNecessaryWords(response.optional.maxCardsPerDay);
  };

  render() {
    const {
      setCurrentWordIndex, changeRightAnswerState, initCardComponent, state, setShowRightAnswer,
    } = this;
    const {
      showRightAnswer, currentWordIndex, wordsData, isDataEnabled,
    } = state;
    return (
      <div className="MainGame">
        {showRightAnswer ? (
          <button
            onClick={() => {
              if (currentWordIndex !== 0) {
                this.setState({
                  currentWordIndex: currentWordIndex - 1,
                  showRightAnswer: false,
                });
              }
            }}
            type="button"
          >
            left arrow
          </button>
        ) : null}
        {
        isDataEnabled ? initCardComponent(wordsData[currentWordIndex]) : ''
      }
        {showRightAnswer ? (
          <button
            onClick={() => {
              this.setState({
                currentWordIndex: currentWordIndex + 1,
                showRightAnswer: false,
              });
            }}
            type="button"
          >
            right arrow
          </button>
        ) : null}
      </div>
    );
  }
}

export default MainGame;
