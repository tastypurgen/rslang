import React from 'react';
import './SpeakIt.scss';
import Spinner from '../../components/Spinner/Spinner';
import StartScreen from './StartScreen/StartScreen';
import DifficultyControls from './DifficultyControls/DifficultyControls';
import ControllPanel from './controllPanel/ControllPanel';
import Image from './image/Image';
import WordsList from './wordsList/WordsList';
import Results from './Results/Results';
import getTheWordsData from './services/getTheWordsData';
import getTheRandomPage from './utils/getTheRandomPage';
import toShuffleArray from './utils/toShuffleArray';
import playAudioFunction from './utils/playAudioFunction';
import defaultImage from './defaultImage.jpg';
import './utils/isClickEnabled';

class SpeakIt extends React.Component {
    state = {
      isAppStarted: false,
      currentImage: defaultImage,
      wordActiveElement: null,
      currentImageCaption: '',
      currentDifficulty: 0,
      difficultyActiveElement: 0,
      isDataLoaded: false,
      isResultsOn: false,
      isSpeechRecognitionOn: false,
      rightWordsObject: {},
    }

    data = null;

    async componentDidMount() {
      const { isDataLoaded, currentDifficulty } = this.state;
      if (!isDataLoaded) {
        const response = await getTheWordsData(getTheRandomPage(), currentDifficulty);
        this.data = toShuffleArray(response);
        this.setState({
          isDataLoaded: true,
        });
      }
    }

    startTheGame = () => {
      this.setState({
        isAppStarted: true,
      });
    }

    ChangeRightWordsObject = (word) => {
      const { rightWordsObject } = this.state;
      const currentState = rightWordsObject;
      currentState[word] = true;
      this.setState({
        rightWordsObject: currentState,
      });
    }

    changeSpeechRecognitionState = () => {
      const { isSpeechRecognitionOn } = this.state;
      this.setState({
        isSpeechRecognitionOn: !isSpeechRecognitionOn,
        wordActiveElement: null,
        currentImage: defaultImage,
        currentImageCaption: '',
      });
    }

    changeWordActiveElement = (wordIndex) => {
      this.setState({
        wordActiveElement: wordIndex,
      });
    }

    changeActiveImage = (imagePath) => {
      this.setState({
        currentImage: `https://raw.githubusercontent.com/Koptohhka/rslang-data/master/${imagePath}`,
      });
    }

    changeActiveImageCaption = (wordTranslation) => {
      this.setState({
        currentImageCaption: wordTranslation,
      });
    }

    toHandleTheWord = async (wordData, wordIndex) => {
      playAudioFunction(`https://raw.githubusercontent.com/Koptohhka/rslang-data/master/${wordData.audio}`);
      this.changeWordActiveElement(wordIndex);
      this.changeActiveImage(wordData.image, wordIndex);
      this.changeActiveImageCaption(wordData.wordTranslate);
    }

    toHandeResults = () => {
      const { isResultsOn } = this.state;
      this.setState({
        isResultsOn: !isResultsOn,
      });
    }

    toStartNewGame = async () => {
      this.setState({
        currentDifficulty: 0,
        isDataLoaded: false,
        currentImage: defaultImage,
        currentImageCaption: '',
        isResultsOn: false,
        wordActiveElement: null,
        difficultyActiveElement: 0,
        isSpeechRecognitionOn: false,
        rightWordsObject: {},
      });
      const { currentDifficulty } = this.state;
      const response = await getTheWordsData(getTheRandomPage(), currentDifficulty);
      this.data = toShuffleArray(response);
      this.setState({
        isDataLoaded: true,
      });
    }

    toHandleDifficultyControls = async (value) => {
      this.setState({
        currentImage: defaultImage,
        isDataLoaded: false,
        currentDifficulty: value,
        difficultyActiveElement: value,
        wordActiveElement: null,
        currentImageCaption: '',
      });
      const { currentDifficulty } = this.state;
      const response = await getTheWordsData(getTheRandomPage(), currentDifficulty);
      this.data = toShuffleArray(response);
      this.setState({
        isDataLoaded: true,
      });
    }

    render() {
      const {
        toHandleDifficultyControls,
        toStartNewGame, toHandeResults,
        data, changeWordActiveElement,
        ChangeRightWordsObject,
        changeSpeechRecognitionState,
        changeActiveImage,
        toHandleTheWord,
        startTheGame,
      } = this;
      const {
        isResultsOn,
        isDataLoaded,
        rightWordsObject,
        isSpeechRecognitionOn,
        difficultyActiveElement, currentImage,
        currentImageCaption,
        wordActiveElement,
        isAppStarted,
      } = this.state;
      let component;
      if (!isAppStarted) {
        return <StartScreen startTheGame={startTheGame} />;
      } if (isResultsOn) {
        component = (
          <Results
            rightWordsObject={rightWordsObject}
            toStartNewGame={toStartNewGame}
            toShowResults={toHandeResults}
            data={data}
          />
        );
      } else if (isDataLoaded) {
        component = (
          <>
            <DifficultyControls
              isSpeechRecognitionOn={isSpeechRecognitionOn}
              activeElement={difficultyActiveElement}
              toHandleDifficultyControls={toHandleDifficultyControls}
            />
            <Image
              changeWordActiveElement={changeWordActiveElement}
              ChangeRightWordsObject={ChangeRightWordsObject}
              data={data}
              isSpeechRecognitionOn={isSpeechRecognitionOn}
              imagePath={currentImage}
              imageCaption={currentImageCaption}
            />
            <WordsList
              changeWordActiveElement={changeWordActiveElement}
              changeActiveImage={changeActiveImage}
              playModeState={isSpeechRecognitionOn}
              rightWords={rightWordsObject}
              wordActiveElement={wordActiveElement}
              isDataLoaded={isDataLoaded}
              toHandleTheWord={toHandleTheWord}
              data={data}
            />
            <ControllPanel
              isSpeechRecognitionOn={isSpeechRecognitionOn}
              startNewGame={toStartNewGame}
              changeSpeechRecognitionState={changeSpeechRecognitionState}
              toShowResults={toHandeResults}
            />
          </>
        );
      } else {
        component = (
          <Spinner />
        );
      }
      return (
        <div className="SpeakIt">
          <div className="wrapper">
            {component}
          </div>
        </div>
      );
    }
}

export default SpeakIt;
