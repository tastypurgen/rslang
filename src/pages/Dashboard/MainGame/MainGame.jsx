import React, { PureComponent } from 'react';
import ReactHtmlParser from 'react-html-parser';
import './MainGame.scss';
import AssessmentButtons from './AssessmentButtons/AssessmentButtons';
import AnswerButton from './AnswerButton/AnswerButton';
import DifficultyButton from './DifficultyButton/DifficultyButton';
import DeleteButton from './DeleteButton/DeleteButton';
import SpeakerButton from './SpeakerButton/SpeakerButton';
import ArrowButton from './ArrowButton/ArrowButton';
import Popup from './Popup/Popup';
import Input from './Input/Input';
import Indicator from '../../../components/Indicator/Indicator';
import Progressbar from '../../../components/Progressbar/ProgressBar';
import Spinner from '../../../components/Spinner/Spinner';
import getUserAggregatedWords from '../../../services/userAggregatedWords';
import shuffleArray from '../../../utils/suffleArray';
import { getUserSettings } from '../../../services/settingsService';
import { updateUserWord, getUserWordById } from '../../../services/userWords';
import { getUserStatistics, upsertUserStatistics } from '../../../services/userStatistics';

const filterMainGame = {
  $and: [
    {
      $and: [
        {
          $or: [
            {
              $and: [
                { 'userWord.optional.nextTraining': new Date().toLocaleDateString() },
              ],
            },
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
        },
      ],
    },
    {
      $and: [
        {
          'userWord.optional.lastTrained': { $ne: new Date().toLocaleDateString() },
        },
      ],
    },
  ],
};

class MainGame extends PureComponent {
  state = {
    showPopup: false,
    settingsData: null,
    showRightAnswer: false,
    isDataEnabled: false,
    wordsData: [],
    currentWordIndex: 0,
    indicator: 1,
    inputClasses: '',
    inputReadOnlyFlag: false,
    difficultyBtnActive: false,
    inputValue: '',
    isChecking: false,
  };

  currentStatistic = null;

  bestChainCounter = { count: 0 };

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
      wordsData: changeWordsData,
    });
  }

  setCurrentIndex = (value) => {
    this.setState({
      currentWordIndex: value,
    });
  }

  setDifficultyButtonState = (value) => {
    this.setState({
      difficultyBtnActive: value,
    });
  }

  setInputValue = (value) => {
    this.setState({
      inputValue: value,
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
    const {
      changeCardToLeft,
      setCurrentIndex,
      changePopupShowState,
      bestChainCounter,
      setInputClassesAndReadState,
      setIndicator,
      setShowRightAnswer,
      setInputValue,
      setDifficultyButtonState,
      currentStatistic,
    } = this;
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
        <AnswerButton
          settingsData={settingsData}
          autoPronunciation={autoPronunciation}
          userWord={userWord}
          audio={audio}
          currentWordIndex={currentWordIndex}
          wordData={wordData}
          wordsData={wordsData}
          setInputClassesAndReadState={setInputClassesAndReadState}
          setIndicator={setIndicator}
          setShowRightAnswer={setShowRightAnswer}
          setInputValue={setInputValue}
          bestChainCounter={bestChainCounter}
          currentStatistic={currentStatistic}
        />
      ));
    } else if (displayAssessmentBtns && showRightAnswer) {
      buttonComponent.push(( // showRightAnswer
        <AssessmentButtons
          key={Math.random()}
          updateInput={this.updateInput}
          setShowRightAnswer={this.setShowRightAnswer}
          setInputClassesAndReadState={this.setInputClassesAndReadState}
          assessUserWord={this.assessUserWord}
        />
      ));
    }
    return (
      <div className={showRightAnswer ? 'MainGame__card MainGame__card--active' : 'MainGame__card'}>
        <div className="MainGame__indicator-container">
          <Indicator indicator={indicator} />
        </div>
        <div className="MainGame__container">
          <div className="MainGame__flex-wrapper">
            <div className="MainGame__sentence-wrapper">
              <p className="MainGame__card-sentence">
                <Input
                  bestChainCounter={this.bestChainCounter}
                  currentStatistic={this.currentStatistic}
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
                <DifficultyButton
                  difficultyBtnActive={difficultyBtnActive}
                  userWord={userWord}
                  wordsData={wordsData}
                  currentWordIndex={currentWordIndex}
                  setDifficultyButtonState={setDifficultyButtonState}
                />
              ) : null}
              {displayDeleteBtn ? (
                <DeleteButton
                  isChecking={isChecking}
                  changingMode={this.changingMode}
                  wordsData={wordsData}
                  currentWordIndex={currentWordIndex}
                  userWord={userWord}
                  setInputClassesAndReadState={setInputClassesAndReadState}
                  setIndicator={setIndicator}
                  setShowRightAnswer={setShowRightAnswer}
                  setInputValue={setInputValue}
                  changeCardToLeft={changeCardToLeft}
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
                    <SpeakerButton audio={audio} />
                    <p className="word-info__word word-info__full-word--item">{word}</p>
                    {wordTranscription ? <p className="word-info__transcription">{transcription}</p> : null}
                    {wordTranslation ? <p className="word-info__translation word-info__full-word--item">{wordData.wordTranslate}</p> : null}
                  </div>
                  {explanationSentence ? <p className="word-info__second-sentence-example">{ReactHtmlParser(textMeaning)}</p> : null}
                  {showWordAndSentenceTranslation ? <p className="word-info__second-sentence-translation">{textMeaningTranslate}</p> : null}
                </div>
              </div>
            ) : null}
          {buttonComponent}
        </div>
        {showRightAnswer ? (
          <ArrowButton
            currentStatistic={currentStatistic}
            changePopupShowState={changePopupShowState}
            currentWordIndex={currentWordIndex}
            wordsData={wordsData}
            setIndicator={setIndicator}
            setInputClassesAndReadState={setInputClassesAndReadState}
            setInputValue={setInputValue}
            setCurrentIndex={setCurrentIndex}
            setShowRightAnswer={setShowRightAnswer}
            setDifficultyButtonState={setDifficultyButtonState}
          />
        ) : null}
      </div>
    );
  };

  assessUserWord = async (valueChange) => {
    const { wordsData, currentWordIndex } = this.state;
    const userWordId = wordsData[currentWordIndex]._id;
    const userWord = await getUserWordById(userWordId);
    let wordIndicator = userWord.optional.indicator + valueChange;

    if (wordIndicator > 5) wordIndicator = 5;
    if (wordIndicator < 1) wordIndicator = 1;

    await this.setState({
      indicator: wordIndicator,
    });

    userWord.optional.indicator = wordIndicator;
    delete userWord.id;
    delete userWord.wordId;

    await updateUserWord(userWordId, userWord);

    this.goToNextCard();
  };

  goToNextCard = () => {
    const { wordsData, currentWordIndex } = this.state;
    if (currentWordIndex < wordsData.length - 1) {
      this.clearInputValue('');
      this.setInputClassesAndReadState('Input', false);
      this.setIndicator(wordsData[currentWordIndex + 1].userWord);
      this.setState({
        currentWordIndex: currentWordIndex + 1,
        showRightAnswer: false,
      });
    } else {
      this.changePopupShowState(true);
    }
  };

  componentDidMount = async () => {
    const setingsData = await getUserSettings(localStorage.userToken, localStorage.userId);
    this.setState({
      settingsData: setingsData.optional,
    });

    const statisticsData = await getUserStatistics();
    const { optional } = statisticsData;

    if (optional.today.date !== new Date().toLocaleDateString()) {
      const todayStatistic = {
        learnedWords: 0,
        optional: {
          today: {
            date: new Date().toLocaleDateString(),
            cards: 0,
            newWords: 0,
            rightAnswers: 0,
            longestChain: 0,
            finishWordsLeft: setingsData.optional.maxCardsPerDay,
          },
        },
      };
      this.currentStatistic = todayStatistic;
      upsertUserStatistics(todayStatistic);
    } else {
      const userStatistics = await getUserStatistics();
      delete userStatistics.id;
      this.currentStatistic = userStatistics;
    }

    let wordsdataLengthValue = this.currentStatistic.optional.today.finishWordsLeft;
    if (this.currentStatistic.optional.today.isFinished) {
      wordsdataLengthValue = setingsData.optional.maxCardsPerDay;
    } else if (this.currentStatistic.optional.today.finishWordsLeft < 1) {
      this.currentStatistic.optional.today.finishWordsLeft = setingsData.optional.maxCardsPerDay;
      wordsdataLengthValue = setingsData.optional.maxCardsPerDay;
    }

    const wordsDataResponse = await getUserAggregatedWords(
      JSON.stringify(filterMainGame), wordsdataLengthValue,
    );
    const todayWordData = shuffleArray(wordsDataResponse[0].paginatedResults);
    this.setIndicator(todayWordData[0].userWord);
    this.setState({
      wordsData: todayWordData,
      isDataEnabled: true,
    });
  };

  render() {
    const {
      changePopupShowState, initCardComponent, state,
    } = this;
    const {
      currentWordIndex, wordsData, isDataEnabled, showPopup,
    } = state;
    return (
      <div className="MainGame">
        {showPopup ? <Popup changePopupShowState={changePopupShowState} /> : null}
        {isDataEnabled
          ? (
            <>
              {initCardComponent(wordsData[currentWordIndex])}
              <div className="MainGame__progress-bar">
                <p className="MainGame__progress-index">{currentWordIndex + 1}</p>
                <Progressbar
                  progressPercent={(100 / wordsData.length) * currentWordIndex}
                />
                <p className="MainGame__progress-length">{wordsData.length}</p>
              </div>
            </>
          )
          : <Spinner />}
      </div>
    );
  }
}

export default MainGame;
