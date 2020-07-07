/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import './MainGame.scss';
import AssesmentsButtons from './AssesmentsButtons/AssesmentsButtons';
import Input from './Input/Input';
import getUserAggregatedWords from '../../../services/userAggregatedWords';
import shuffleArray from '../../../utils/suffleArray';
import { getUserSettings } from '../../../services/settingsService';
import { getWordByPageAndDifficultyNumber, getWordsByPageCount } from '../../../services/getWords';
import {
  createUserWord, deleteUserWord, updateUserWord, getAllUserWords,
} from '../../../services/userWords';

class MainGame extends PureComponent {
  state = {
    settingsData: null,
    showRightAnswer: false,
    isDataEnabled: false,
    wordsData: [],
    currentWordIndex: 0,
  };

  changeCardToLeft = () => {
    const { currentWordIndex, wordsData } = this.state;
    const changeWordsData = wordsData.slice();
    changeWordsData.splice(currentWordIndex, 1);
    this.setState({
      // currentWordIndex: this.state.currentWordIndex,
      wordsData: changeWordsData,
    });
  }

  setShowRightAnswer = () => {
    this.setState({
      showRightAnswer: true,
    });
  };

  initCardComponent = (wordData) => {
    console.log(wordData);
    const { changeCardToLeft } = this;
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
      userWord,
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
              difficulty: 'default',
              optional: {
                indicator: 2,
                difficult: false,
                deleted: false,
              },
            };
            console.log(userWord);
            try {
              if (userWord.optional.indicator < 5) {
                console.log(userWord.optional.indicator);
                updateUserWord(wordsData[currentWordIndex]._id, body);
              }
            } catch {
              createUserWord(wordsData[currentWordIndex]._id, body);
              console.log('Слова нит');
            }
            this.setShowRightAnswer(true);
          }}
          className="MainGame__answer-button"
        >
          Показать ответ
        </button>
      ));
    } else if (displayAssessmentBtns && showRightAnswer) {
      buttonComponent.push((
        <AssesmentsButtons />
      ));
    }
    component = (
      <div className="MainGame__card">
        <div className="MainGame__indicator">1</div>
        <p className="MainGame__card-sentence">
          {displayDeleteBtn ? (
            <button
              onClick={() => {
                const body = {
                  optional: {
                    indicator: 5,
                    deleted: true,
                  },
                };
                try {
                  if (userWord.optional.indicator < 5) {
                    console.log(userWord.optional.indicator);
                    updateUserWord(wordsData[currentWordIndex]._id, body);
                  }
                } catch {
                  createUserWord(wordsData[currentWordIndex]._id, body);
                  console.log('Слова нит');
                }
                changeCardToLeft();
              }}
              type="button"
              className="MainGame__delete"
            >
              Удалить
            </button>
          ) : null}
          {displayDifficultBtn ? (
            <button type="button" className="MainGame__difficult-button">
              Добавить в сложные
            </button>
          ) : null}
          <br />
          <Input
            changeRightAnswerState={this.setShowRightAnswer}
            wordData={wordData}
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
    const setingsData = await getUserSettings(localStorage.userToken, localStorage.userId);
    this.setState({
      settingsData: setingsData.optional,
    });
    const filter = {
      $or: [
        {
          $and: [
            { 'userWord.optional.indicator': 2 },
            { 'userWord.optional.deleted': false },
          ],
        },
        {
          $and: [
            { 'userWord.optional.indicator': 3 },
            { 'userWord.optional.deleted': false },
          ],
        },
        {
          $and: [
            { 'userWord.optional.indicator': 4 },
            { 'userWord.optional.deleted': false },
          ],
        },
        { userWord: null },
      ],
    };
    const wordsDataResponse = await getUserAggregatedWords(
      JSON.stringify(filter), setingsData.optional.maxCardsPerDay,
      );
      console.log('wordsDataResponse: ', wordsDataResponse);
    this.setState({
      wordsData: shuffleArray(wordsDataResponse[0].paginatedResults),
      isDataEnabled: true,
    });

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    getAllUserWords().then((res) => {
      console.log('Мои слова');
      console.log(res);
    });
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
        <div className="MainGame__progress-bar">
          {currentWordIndex}
          {' '}
          из
          {' '}
          {wordsData.length}
        </div>
      </div>
    );
  }
}

export default MainGame;
