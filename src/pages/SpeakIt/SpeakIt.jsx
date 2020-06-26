import React from 'react';
import './SpeakIt.scss';
import StartScreen from './StartScreen/StartScreen';
import DifficultyControls from './DifficultyControls/DifficultyControls';
import Loader from './Loader/Loader';
import ControllPanel from './controllPanel/ControllPanel';
import Image from './image/Image';
import WordsList from './wordsList/WordsList';
import Results from './Results/Results';
import getTheWordTranslation from './services/getTheWordTranslation';
import getTheWordsData from './services/getTheWordsData';
import getTheRandomPage from './utils/getTheRandomPage';
import toShuffleArray from './utils/toShuffleArray';
import playAudioFunction from './utils/playAudioFunction';
import './utils/isClickEnabled'

class SpeakIt extends React.Component {
    state = {
   isAppStarted: false,
   currentImage: 'https://i1.wp.com/ritajms.com/wp-content/uploads/2019/11/52351011-english-british-england-language-education-concept.jpg?resize=768%2C567&ssl=1',
   wordActiveElement: null,
   currentImageCaption: '',
   currentDifficulty: 0,
   difficultyActiveElement: 0,
   isDataLoaded: false,
   isResultsOn: false,
   isSpeechRecognitionOn: false,
   playModeOn: false,
   rightWordsObject: {},
    }
    data = null;

    startTheGame = () => {
        this.setState({
            isAppStarted: true
        })
    }

    ChangeRightWordsObject = (word) => {
        const currentState = this.state.rightWordsObject;
        currentState[word] = true;
        this.setState({
            rightWordsObject: currentState,
        })
    }

    changeSpeechRecognitionState = () => {
        const { isSpeechRecognitionOn } = this.state;
        this.setState({
            isSpeechRecognitionOn: !isSpeechRecognitionOn,
            wordActiveElement: null,
            currentImage: 'https://i1.wp.com/ritajms.com/wp-content/uploads/2019/11/52351011-english-british-england-language-education-concept.jpg?resize=768%2C567&ssl=1',
            currentImageCaption: '',
        })
    }

    changeWordActiveElement = (wordIndex) => {
        this.setState({
            wordActiveElement: wordIndex
        })
    }

    changeActiveImage = (imagePath, wordIndex) => {
        this.setState({
            currentImage: `https://raw.githubusercontent.com/Koptohhka/rslang-data/master/${imagePath}`,
            // wordActiveElement: wordIndex
        })
    }

    changeActiveImageCaption = async (word) => {
        const response = await getTheWordTranslation(word);
        this.setState({
            currentImageCaption: response.text[0]
        })
    }

    toHandleTheWord = async (wordData, wordIndex) => {
        playAudioFunction(`https://raw.githubusercontent.com/Koptohhka/rslang-data/master/${wordData.audio}`);
        this.changeWordActiveElement(wordIndex);
        this.changeActiveImage(wordData.image, wordIndex);
        this.changeActiveImageCaption(wordData.word);
    }

    toHandeResults = () => {
        const { isResultsOn } = this.state;
        this.setState({
            isResultsOn: !isResultsOn
        })
    }

    toStartNewGame = async () => {
        this.setState({
            currentDifficulty: 0,
            isDataLoaded: false,
            currentImage: 'https://i1.wp.com/ritajms.com/wp-content/uploads/2019/11/52351011-english-british-england-language-education-concept.jpg?resize=768%2C567&ssl=1', //временно
            currentImageCaption: '',
            isResultsOn: false,
            wordActiveElement: null,
            difficultyActiveElement: 0,
            isSpeechRecognitionOn: false,
            rightWordsObject: {},
        })
        const { currentDifficulty } = this.state;
        const response = await getTheWordsData(getTheRandomPage(), currentDifficulty);
        this.data = toShuffleArray(response);
        this.setState({
            isDataLoaded: true,
        })
    }

    toHandleDifficultyControls = async (value) => {
        this.setState({
            isDataLoaded: false,
            currentDifficulty: value,
            difficultyActiveElement: value,
            wordActiveElement: null,
            currentImageCaption: '',
            playModeOn: false
        })
        const { currentDifficulty } = this.state;
        const response = await getTheWordsData(getTheRandomPage(), currentDifficulty);
        this.data = toShuffleArray(response);
        this.setState({
            isDataLoaded: true,
        })
    }

    render() {
        const { toHandleDifficultyControls, toStartNewGame, toHandeResults, data, changeWordActiveElement, ChangeRightWordsObject, changeSpeechRecognitionState, changeActiveImage, toHandleTheWord, startTheGame } = this;
        const { isResultsOn, isDataLoaded, rightWordsObject, isSpeechRecognitionOn, difficultyActiveElement, currentImage, currentImageCaption, wordActiveElement, isAppStarted } = this.state;
        let component;
        if (!isAppStarted) {
            return <StartScreen startTheGame={startTheGame} />;
        } else if (isResultsOn)
        {
            component = (
                <Results
                    rightWordsObject={rightWordsObject}
                    toStartNewGame={toStartNewGame}
                    toShowResults={toHandeResults}
                    data={data}
                />
            );
        } else if (isDataLoaded)
        {
            component = (
                <React.Fragment>
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
                    {/* {isSpeechRecognitionOn ?
                        <SpeechInput
                            changeWordActiveElement={changeWordActiveElement}
                            ChangeRightWordsObject={ChangeRightWordsObject}
                            data={data} /> : null} */}
                    <WordsList
                        changeWordActiveElement={changeWordActiveElement}
                        changeActiveImage={changeActiveImage}
                        playModeState={isSpeechRecognitionOn}
                        rightWords={rightWordsObject}
                        wordActiveElement={wordActiveElement}
                        isDataLoaded={isDataLoaded}
                        toHandleTheWord={toHandleTheWord}
                        data={data} />
                    <ControllPanel
                        isSpeechRecognitionOn={isSpeechRecognitionOn}
                        startNewGame={toStartNewGame}
                        changeSpeechRecognitionState={changeSpeechRecognitionState}
                        toShowResults={toHandeResults}
                    />
                </React.Fragment>
            )
        } else
        {
            component = (
                <Loader />
            )
        }
        return (
            <div className="SpeakIt">
                <div className="wrapper">
                    {component}
                </div>
            </div>
        )
    }

    async componentDidMount() {
        const { isDataLoaded, currentDifficulty } = this.state;
        if (!isDataLoaded)
        {
            // const { currentDifficulty } = this.state;
            const response = await getTheWordsData(getTheRandomPage(), currentDifficulty);
            this.data = toShuffleArray(response);
            this.setState({
                isDataLoaded: true,
            })
        }
    }

}

export default SpeakIt;