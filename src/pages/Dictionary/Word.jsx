import React, { PureComponent } from 'react';
import ReactHtmlParser from 'react-html-parser';
import './Dictionary.scss';
import getUserAggregatedWords from '../../services/userAggregatedWords';
import { updateUserWord } from '../../services/userWords';
import Spinner from '../../components/Spinner/Spinner';

import audioImg from './img/audio.png';
import returnImg from './img/return.png';
import { URI } from '../../utils/constants';

export default class Word extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      isSpinnerOn: true,
    };
  }

  componentDidMount() {
    this.getSectionWords();
    setTimeout(() => this.setState({ isSpinnerOn: false }), 1000);
  }

  getSectionWords = async () => {
    const { filter } = this.props;
    const content = await getUserAggregatedWords(filter, 100);
    const contentWords = content[0].paginatedResults;
    const stateWords = [];

    contentWords.map((el) => stateWords.push({
      wordId: el._id,
      word: el.word,
      translation: el.wordTranslate,
      audio: URI + el.audio,
      meaning: el.textMeaning,
      meaningTranslate: el.textMeaningTranslate,
      example: el.textExample,
      exampleTranslate: el.textExampleTranslate,
      transcription: el.transcription,
      image: URI + el.image,
    }));

    this.setState({ words: stateWords });
  }

  returnToLearning(id) {
    const body = {
      optional: {
        deleted: false,
        difficult: false,
        indicator: 2,
        lastTrained: new Date(),
        nextTraining: new Date(),
        trained: 1,
      },
    };
    updateUserWord(id, body);
    const { words } = this.state;
    const newWords = words.filter((el) => el.wordId !== id);
    this.setState({ words: newWords });
  }

  render() {
    const { words, isSpinnerOn } = this.state;
    const { type, wordInfo } = this.props;
    if (isSpinnerOn) {
      return (<Spinner />);
    }
    return (
      <table>
        <tbody>
          {words.map((el) => (
            <tr className="word-container" key={el.word}>
              <td className="audio-container">
                <audio id={el.word} src={el.audio} />
                <img
                  className="audio"
                  src={audioImg}
                  alt="audio"
                  role="button"
                  tabIndex={0}
                  onClick={() => document.getElementById(el.word).play()}
                />
              </td>
              <td className="word">
                <span className="word-name">{el.word}</span>
                <br />
                <span className="word-translation">{el.translation}</span>
              </td>
              <td style={{ minWidth: '70px' }} className={!wordInfo.wordTranscription ? 'hidden' : ''}>{el.transcription}</td>
              <td>
                <img className={!wordInfo.associationImage ? 'hidden' : 'association-image'} src={el.image} alt={el.word} />
              </td>
              <td className="sentences">
                <span className={!wordInfo.explanationSentence ? 'hidden' : ''}>{ReactHtmlParser(el.meaning)}</span>
                <br />
                <span className={!wordInfo.exampleSentence ? 'hidden' : ''}>{ReactHtmlParser(el.example)}</span>
              </td>
              <td className={`sentences ${!wordInfo.showWordAndSentenceTranslation ? 'hidden' : ''}`}>
                <span className={!wordInfo.explanationSentence ? 'hidden' : ''}>{el.meaningTranslate}</span>
                <br />
                <span className={!wordInfo.exampleSentence ? 'hidden' : ''}>{el.exampleTranslate}</span>
              </td>
              <td className={type === 'learning' ? 'hidden' : 'return'}>
                <img
                  role="button"
                  src={returnImg}
                  alt="return"
                  onClick={() => this.returnToLearning(el.wordId)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
