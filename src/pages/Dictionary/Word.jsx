import React, { PureComponent } from 'react';
import ReactHtmlParser from 'react-html-parser';
import './Dictionary.scss';
import getUserAggregatedWords from '../../services/userAggregatedWords';
import { updateUserWord } from '../../services/userWords';
import Spinner from '../../components/Spinner/Spinner';

import audioImg from './img/audio.png';
import returnImg from './img/return.png';
import { URI } from '../../utils/constants';

const colors = ['#e04f5f', '#ff934d', '#ffd07d', '#82d243', '#32bea6'];

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
    const content = await getUserAggregatedWords(filter);
    const contentWords = content[0].paginatedResults;
    const stateWords = [];

    contentWords.map((el) => stateWords.push({
      // eslint-disable-next-line no-underscore-dangle
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
      indicator: el.userWord.optional.indicator,
    }));

    this.setState({ words: stateWords });
  }

  returnToLearning(id, indicator) {
    const body = {
      optional: {
        indicator,
        deleted: false,
        difficult: false,
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
    if (!words.length) {
      let message;
      switch (type) {
        case 'learning':
          message = 'У вас пока нет слов. Начните изучать английский прямо сейчас!';
          break;
        case 'difficult':
          message = 'У вас пока нет сложных слов.';
          break;
        case 'deleted':
          message = 'У вас пока нет удаленных слов.';
          break;
        default:
          break;
      }
      return <p>{message}</p>;
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
              <td className={!wordInfo.associationImage ? 'hidden' : ''}>
                <img className="association-image" src={el.image} alt={el.word} />
              </td>
              <td className={`sentences ${!wordInfo.explanationSentence && !wordInfo.exampleSentence ? 'hidden' : ''}`}>
                <span className={!wordInfo.explanationSentence ? 'hidden' : ''}>{ReactHtmlParser(el.meaning)}</span>
                <br />
                <span className={!wordInfo.exampleSentence ? 'hidden' : ''}>{ReactHtmlParser(el.example)}</span>
              </td>
              <td className={`sentences ${!wordInfo.showWordAndSentenceTranslation ? 'hidden' : ''}`}>
                <span className={!wordInfo.explanationSentence ? 'hidden' : ''}>{el.meaningTranslate}</span>
                <br />
                <span className={!wordInfo.exampleSentence ? 'hidden' : ''}>{el.exampleTranslate}</span>
              </td>
              <td>
                <div className="indicators-container">
                  {colors.map((color, i) => (
                    <div
                        style={{ backgroundColor: `${i + 1 <= el.indicator ? color : ''}` }}
                        className="indicator"
                        key={color}
                      />
                  ))}
                </div>
              </td>
              <td className={type === 'learning' ? 'hidden' : 'return'}>
                <img
                  role="button"
                  src={returnImg}
                  alt="return"
                  onClick={() => this.returnToLearning(el.wordId, el.indicator)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
