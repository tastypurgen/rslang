/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import './MainGame.scss';
import pointIcon from './images/point.svg';
import deleteIcon from './images/delete.svg';
import speakerIcon from './images/speaker.svg';
import AssessmentButtons from './AssessmentButtons/AssessmentButtons';
import Input from './Input/Input';
import Indicator from '../../../components/Indicator/Indicator';
import Progressbar from '../../../components/Progressbar/ProgressBar';
import getUserAggregatedWords from '../../../services/userAggregatedWords';
import shuffleArray from '../../../utils/suffleArray';
import { getUserSettings } from '../../../services/settingsService';
import playAudioFunction from '../../../utils/playAudioFunction';
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
    indicatorNumber: 1,
    inputClasses: 'Input',
    inputReadOnlyFlag: false,
    difficultyBtnActive: false,
    inputValue: '',
  };

  clearInputValue = (newValue) => {
    this.setState({
      inputValue: newValue,
    });
  }

  setInputClassesAndReadState = (classes, readonly) => {
    this.setState({
      inputClasses: classes,
      inputReadOnlyFlag: readonly,
    });
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

  setIndicatorNumber = (userWord, number) => {
    let nextValue = 1;
    if (number) {
      nextValue = number;
    } else if (userWord) {
      nextValue = userWord.optional.indicator;
    }

    this.setState({
      indicatorNumber: nextValue,
    });
  }

  setShowRightAnswer = (value) => {
    this.setState({
      showRightAnswer: value,
    });
  };

  initCardComponent = (wordData) => {
    console.log(wordData);
    const { changeCardToLeft } = this;
    const {
      settingsData, showRightAnswer, wordsData, currentWordIndex, indicatorNumber, inputClasses,
      inputReadOnlyFlag, difficultyBtnActive, inputValue,
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
      audio,
    } = wordData;
    const {
      autoPronunciation,
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
            console.log(settingsData);
            if (autoPronunciation) {
              playAudioFunction(`https://raw.githubusercontent.com/Koptohhka/rslang-data/master/${audio}`);
            }
            const trainedValue = userWord?.optional?.trained + 1 || 1;
            const indicatorValue = userWord?.optional?.indicator || 2;
            const difficultValue = userWord?.optional?.difficult || false;
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const body = {
              difficulty: 'default',
              optional: {
                deleted: false,
                difficult: difficultValue,
                indicator: indicatorValue,
                lastTrained: today,
                nextTraining: tomorrow,
                trained: trainedValue,
              },
            };
            try {
              if (userWord.optional.indicator < 5) {
                updateUserWord(wordsData[currentWordIndex]._id, body);
              }
            } catch {
              createUserWord(wordsData[currentWordIndex]._id, body);
            }
            this.setInputClassesAndReadState('Input Input--default', true);
            this.setIndicatorNumber(userWord);
            this.setShowRightAnswer(true);
            this.setState({
              inputValue: word,
            });
          }}
        >
          Показать ответ
        </button>
      ));
    } else if (displayAssessmentBtns && showRightAnswer) {
      buttonComponent.push(( // showRightAnswer
        <AssessmentButtons
          clearInputValue={this.clearInputValue}
          setShowRightAnswer={this.setShowRightAnswer}
          setInputClassesAndReadState={this.setInputClassesAndReadState}
        />
      ));
    }
    component = (
      <div className={showRightAnswer ? 'MainGame__card MainGame__card--active' : 'MainGame__card'}>
        <div className="MainGame__indicator-container">
          {userWord ? <Indicator indicatorNumber={indicatorNumber} /> : <Indicator />}
        </div>
        <div className="MainGame__container">
          <div className="MainGame__flex-wrapper">
            <div className="MainGame__sentence-wrapper">
              <p className="MainGame__card-sentence">
                <Input
                  autoPronunciation={autoPronunciation}
                  clearInputValue={this.clearInputValue}
                  currentWordIndex={currentWordIndex}
                  inputValue={inputValue}
                  inputReadOnlyFlag={inputReadOnlyFlag}
                  inputClasses={inputClasses}
                  setInputClassesAndReadState={this.setInputClassesAndReadState}
                  setIndicatorNumber={this.setIndicatorNumber}
                  userWord={userWord}
                  exampleSentence={exampleSentence}
                  changeRightAnswerState={this.setShowRightAnswer}
                  wordData={wordData}
                  wordsData={wordsData}
                  textExample={textExample}
                />
              </p>
              {exampleSentence ? <p className="MainGame__card-sentence-translation">{textExampleTranslate}</p>
                : <p className="MainGame__card-sentence-translation">{wordData.wordTranslate}</p>}
            </div>
            <div className="Maingame__control-butttons">
              {displayDifficultBtn ? (
                <img
                  className={difficultyBtnActive ? 'MainGame__difficult-button--disabled' : 'MainGame__difficult-button'}
                  role="button"
                  onClick={() => {
                    if (!difficultyBtnActive) {
                      const indicatorValue = userWord?.optional?.indicator || 1;
                      const trainedValue = userWord?.optional?.trained + 1 || 1;
                      const today = new Date();
                      const tomorrow = new Date(today);
                      tomorrow.setDate(tomorrow.getDate() + 1);
                      const body = {
                        optional: {
                          deleted: false,
                          difficult: true,
                          indicator: indicatorValue,
                          lastTrained: today,
                          nextTraining: tomorrow,
                          trained: trainedValue,
                        },
                      };
                      if (!userWord) {
                        createUserWord(wordsData[currentWordIndex]._id, body);
                      } else {
                        updateUserWord(wordsData[currentWordIndex]._id, body);
                      }
                      this.setState({
                        difficultyBtnActive: true,
                      });
                    }
                  }}
                  title={difficultyBtnActive ? 'Добавлено в сложные' : 'Добавить в сложные'}
                  src={pointIcon}
                  alt="point-icon"
                />
              ) : null}
              {displayDeleteBtn ? (
                <img
                  title="Удалить слово"
                  role="button"
                  alt="delete-icon"
                  src={deleteIcon}
                  onClick={() => {
                    const indicatorValue = userWord?.optional?.indicator || 1;
                    const trainedValue = userWord?.optional?.trained || 1;
                    const body = {
                      optional: {
                        deleted: true,
                        difficult: false,
                        indicator: indicatorValue,
                        lastTrained: new Date(),
                        nextTraining: new Date(),
                        trained: trainedValue,
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
                    <img
                      title="Прослушать слово"
                      role="button"
                      onClick={() => {
                        if (window.isClickEnabled) {
                          playAudioFunction(`https://raw.githubusercontent.com/Koptohhka/rslang-data/master/${audio}`);
                        }
                      }}
                      className="MainGame__speaker-icon word-info__full-word--item"
                      src={speakerIcon}
                      alt="Динамик"
                    />
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
        {/* {showRightAnswer ? (
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
        ) : null} */}
        {showRightAnswer ? (

          <div
            tabIndex={0}
            role="button"
            onClick={() => {
              if (currentWordIndex < wordsData.length - 1) {
                // document.querySelector('.Input').value = '';
                this.clearInputValue('');
                this.setInputClassesAndReadState('Input', false);
                this.setIndicatorNumber(wordsData[currentWordIndex + 1].userWord);
                this.setState({
                  currentWordIndex: currentWordIndex + 1,
                  showRightAnswer: false,
                });
              }
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
    //
    // const date = new Date();
    // console.log(date.toLocaleDateString());
    //

    const wordsDataResponse = await getUserAggregatedWords(
      JSON.stringify(filter), setingsData.optional.maxCardsPerDay,
    );
    const todayWordData = shuffleArray(wordsDataResponse[0].paginatedResults);

    this.setIndicatorNumber(todayWordData[0].userWord);
    this.setState({
      wordsData: todayWordData,
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
      setCurrentWordIndex, changeRightAnswerState, initCardComponent, state,
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
          <p className="MainGame__progress-index">{currentWordIndex + 1}</p>
          <Progressbar
            progressPercent={(100 / wordsData.length) * (currentWordIndex + 1)}
          />
          <p className="MainGame__progress-length">{wordsData.length}</p>
        </div>
      </div>
    );
  }
}

export default MainGame;
