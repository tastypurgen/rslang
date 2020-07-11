/* eslint-disable no-console */
import React, { PureComponent } from 'react';
import './MainGame.scss';
import pointIcon from './images/point.svg';
import deleteIcon from './images/delete.svg';
import speakerIcon from './images/speaker.svg';
import AssessmentButtons from './AssessmentButtons/AssessmentButtons';
import Popup from './Popup/Popup';
import Input from './Input/Input';
import Indicator from '../../../components/Indicator/Indicator';
import Progressbar from '../../../components/Progressbar/ProgressBar';
import getUserAggregatedWords from '../../../services/userAggregatedWords';
import shuffleArray from '../../../utils/suffleArray';
import { getUserSettings } from '../../../services/settingsService';
import playAudioFunction from '../../../utils/playAudioFunction';
// import { getWordByPageAndDifficultyNumber, getWordsByPa
// geCount } from '../../../services/getWords';
import {
  createUserWord, updateUserWord, getAllUserWords,
} from '../../../services/userWords';

class MainGame extends PureComponent {
  state = {
    showPopup: false,
    settingsData: null,
    showRightAnswer: false,
    isDataEnabled: false,
    wordsData: [],
    currentWordIndex: 0,
    indicator: 1,
    inputClasses: 'input',
    inputReadOnlyFlag: false,
    difficultyBtnActive: false,
    inputValue: '',
    isChecking: false,
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
    const todayWordData = shuffleArray(wordsDataResponse[0].paginatedResults);

    this.setIndicator(todayWordData[0].userWord);
    this.setState({
      wordsData: todayWordData,
      isDataEnabled: true,
    });

    document.querySelector('.answer-input').focus();

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    getAllUserWords().then((res) => {
      console.log('Мои слова');
      console.log(res);
    });
  };

  changingMode = (bool) => {
    this.setState({ isChecking: bool });
  }

  changePopupShowState = (value) => {
    this.setState({
      showPopup: value,
    });
  }

  updateInput = (newValue) => {
    this.setState({
      inputValue: newValue,
    });
    document.querySelector('.answer-input').focus();
  }

  setInputClassesAndReadState = (classes, readonly) => {
    this.setState({
      inputClasses: classes,
      inputReadOnlyFlag: readonly,
    });
  };

  showNextCard = () => {
    const { currentWordIndex } = this.state;
    this.setState({
      currentWordIndex: currentWordIndex + 1,
      showRightAnswer: false,
    });
  }

  changeCardToLeft = () => {
    const { currentWordIndex, wordsData } = this.state;
    const changeWordsData = wordsData.slice();
    changeWordsData.splice(currentWordIndex, 1);
    this.setState({
      // currentWordIndex: this.state.currentWordIndex,
      wordsData: changeWordsData,
    });
  }

  setIndicator = (userWord, number) => {
    let nextValue = 1;
    if (number) {
      nextValue = number;
    } else if (userWord) {
      nextValue = userWord.optional.indicator;
    }

    this.setState({
      indicator: nextValue,
    });
  }

  setShowRightAnswer = (value) => {
    this.setState({
      showRightAnswer: value,
    });
    document.querySelector('.answer-input').blur();
  };

  initCardComponent = (wordData) => {
    const { changeCardToLeft } = this;
    const {
      settingsData, showRightAnswer, wordsData, currentWordIndex, indicator, inputClasses,
      inputReadOnlyFlag, difficultyBtnActive, inputValue, isChecking,
    } = this.state;

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
              playAudioFunction(`https://raw.githubusercontent.com/tastypurgen/rslang-data/master/${audio}`);
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
            this.setIndicator(userWord);
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
          key={Math.random()}
          updateInput={this.updateInput}
          setShowRightAnswer={this.setShowRightAnswer}
          setInputClassesAndReadState={this.setInputClassesAndReadState}
        />
      ));
    }
    return (
      <div className={showRightAnswer ? 'MainGame__card MainGame__card--active' : 'MainGame__card'}>
        <div className="MainGame__indicator-container">
          {userWord
            ? <Indicator indicator={indicator} />
            : <Indicator indicator={1} />}
        </div>
        <div className="MainGame__container">
          <div className="MainGame__flex-wrapper">
            <div className="MainGame__sentence-wrapper">
              <p className="MainGame__card-sentence">
                <Input
                  autoPronunciation={autoPronunciation}
                  updateInput={this.updateInput}
                  currentWordIndex={currentWordIndex}
                  inputValue={inputValue}
                  inputReadOnlyFlag={inputReadOnlyFlag}
                  inputClasses={inputClasses}
                  setInputClassesAndReadState={this.setInputClassesAndReadState}
                  setIndicator={this.setIndicator}
                  userWord={userWord}
                  exampleSentence={exampleSentence}
                  changeRightAnswerState={this.setShowRightAnswer}
                  wordData={wordData}
                  wordsData={wordsData}
                  textExample={textExample}
                  showNextCard={this.showNextCard}
                  isChecking={isChecking}
                  changingMode={this.changingMode}
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
                    this.setInputClassesAndReadState('Input', false);
                    this.setIndicator(userWord);
                    this.setShowRightAnswer(false);
                    this.setState({
                      inputValue: '',
                    });
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
                          playAudioFunction(`https://raw.githubusercontent.com/tastypurgen/rslang-data/master/${audio}`);
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
        {showRightAnswer ? (

          <div
            tabIndex={0}
            role="button"
            onClick={() => {
              if (currentWordIndex < wordsData.length - 1) {
                this.updateInput('');
                this.setInputClassesAndReadState('Input', false);
                this.setIndicator(wordsData[currentWordIndex + 1].userWord);
                this.showNextCard();
                this.updateInput('');
              } else {
                this.changePopupShowState(true);
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
  };

  render() {
    const {
      changePopupShowState, initCardComponent, state,
    } = this;
    // state.showRightAnswer
    const {
      currentWordIndex, wordsData, isDataEnabled, showPopup,
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
        {showPopup ? <Popup changePopupShowState={changePopupShowState} /> : null}
      </div>
    );
  }
}

export default MainGame;
