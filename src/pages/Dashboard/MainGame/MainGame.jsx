/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import './MainGame.scss';
import pointIcon from './images/point.svg';
import deleteIcon from './images/delete.svg';
import speakerIcon from './images/speaker.svg';
import AssesmentsButtons from './AssesmentsButtons/AssesmentsButtons';
import Input from './Input/Input';
import Indicator from '../../../components/Indicator/Indicator';
import Progressbar from '../../../components/Progressbar/ProgressBar';
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
    indicatorNumber: null,
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
          className="MainGame__answer-button"
          type="button"
          key={2}
          onClick={() => {
            const body = {
              difficulty: 'default',
              optional: {
                indicator: 2,
                difficult: false,
                deleted: false,
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
            this.setShowRightAnswer(true);
          }}
        >
          Показать ответ
        </button>
      ));
    } else if (displayAssessmentBtns && showRightAnswer) {
      buttonComponent.push(( // showRightAnswer
        <AssesmentsButtons />
      ));
    }

    component = (
      <div className={showRightAnswer ? 'MainGame__card MainGame__card--active' : 'MainGame__card'}>
        {userWord ? <Indicator indicatorNumber={userWord.optional.indicator} /> : <Indicator />}
        <div className="MainGame__container">
          <div className="MainGame__flex-wrapper">
            <div className="MainGame__sentence-wrapper">
              <p className="MainGame__card-sentence">
                <Input
                  userWord={userWord}
                  exampleSentence={exampleSentence}
                  changeRightAnswerState={this.setShowRightAnswer}
                  wordData={wordData}
                  textExample={textExample}
                />
              </p>
              {exampleSentence ? <p className="MainGame__card-sentence-translation">{textExampleTranslate}</p>
                : <p className="MainGame__card-sentence-translation">{wordData.wordTranslate}</p>}
            </div>
            <div className="Maingame__control-butttons">
              {displayDifficultBtn ? (
                <img
                  className="MainGame__difficult-button"
                  role="button"
                  onClick={() => {

                  }}
                  src={pointIcon}
                  alt="point-icon"
                />
              ) : null}
              {displayDeleteBtn ? (
                <img
                  role="button"
                  alt="delete-icon"
                  src={deleteIcon}
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
                  className="MainGame__delete-button"
                />
              ) : null}
            </div>
          </div>
          {showRightAnswer
            ? (
              <div className="MainGame__word-info-container">
                {associationImage ? <img src={`https://raw.githubusercontent.com/koptohhka/rslang-data/master/${image}`} alt="" className="MainGame__image" /> : null}
                <div className="MainGame__word-info">
                  <div className="word-info__full-word">
                    <img className="MainGame__speaker-icon word-info__full-word--item" src={speakerIcon} alt="" />
                    <p className="word-info__word word-info__full-word--item">{word}</p>
                    {wordTranscription ? <p className="word-info__transcription">{transcription}</p> : null}
                    {wordTranslation ? <p className="word-info__translation word-info__full-word--item">{wordData.wordTranslate}</p> : null}
                  </div>
                  {explanationSentence ? <p className="word-info__second-sentence-example">{textMeaning}</p> : null}
                  {showWordAndSentenceTranslation ? <p className="word-info__second-sentence-translation">{textMeaningTranslate}</p> : null}
                </div>
              </div>
            ) : null}
          {buttonComponent}
        </div>
        {showRightAnswer ? (
          <div
            role="button"
            tabIndex={-1}
            onClick={() => {
              if (currentWordIndex !== 0) {
                this.setState({
                  currentWordIndex: currentWordIndex - 1,
                  showRightAnswer: false,
                });
              }
            }}
            className="MainGame__left-arrow"
          >
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="#C4C4C4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.5165 25.9769L13.3425 18.9404H30.6548L30.6548 12.3766L13.3425 12.3766L20.5165 5.34016L15.9468 0.65546L0.651184 15.6573L15.9468 30.6616L20.5165 25.9769Z" />
            </svg>
          </div>
        ) : null}
        {showRightAnswer ? (
          <div
            tabIndex={0}
            role="button"
            onClick={() => {
              this.setState({
                currentWordIndex: currentWordIndex + 1,
                showRightAnswer: false,
              });
            }}
            className="MainGame__right-arrow"
          >
            <svg
              fill="#C4C4C4"
              width="31"
              height="31"
              viewBox="0 0 31 31"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.4835 5.02314L17.6575 12.0596H0.345215V18.6234H17.6575L10.4835 25.6598L15.0532 30.3445L30.3488 15.3427L15.0532 0.33844L10.4835 5.02314Z" />
            </svg>
          </div>
        ) : null}
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
        {
          isDataEnabled ? initCardComponent(wordsData[currentWordIndex]) : ''
        }
        <div className="MainGame__progress-bar">
          {currentWordIndex}
          <div>
            <Progressbar
              progressPercent={(100 / wordsData.length) * currentWordIndex}
            />
          </div>
          {wordsData.length}
        </div>
      </div>
    );
  }
}

export default MainGame;
