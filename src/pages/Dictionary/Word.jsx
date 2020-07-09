/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import './Dictionary.scss';
import getUserAggregatedWords from '../../services/userAggregatedWords';
import { updateUserWord } from '../../services/userWords';
import Spinner from '../../components/Spinner/Spinner';
import Indicator from '../../components/Indicator/Indicator';

import audioImg from './img/audio.png';
import returnImg from './img/return.png';
import infoImg from './img/info.png';
import deleteImg from './img/delete.png';
import { URI } from '../../utils/constants';

export default class Word extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      isSpinnerOn: true,
    };
  }

  componentDidMount = async () => {
    await this.getSectionWords();
    await this.setState({ isSpinnerOn: false });
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
      indicator: el.userWord.optional.indicator,
      trained: el.userWord.optional.trained,
      lastTrained: el.userWord.optional.lastTrained,
      nextTraining: el.userWord.optional.nextTraining,
    }));

    this.setState({ words: stateWords });
  }

  returnToLearning(id, indicator, trained, lastTrained, nextTraining) {
    const body = {
      optional: {
        indicator,
        deleted: false,
        difficult: false,
        trained,
        lastTrained,
        nextTraining,
      },
    };
    updateUserWord(id, body);
    const { words } = this.state;
    const newWords = words.filter((el) => el.wordId !== id);
    this.setState({ words: newWords });
  }

  deleteWord(id, indicator, trained) {
    const body = {
      optional: {
        deleted: true,
        difficult: false,
        indicator,
        lastTrained: new Date(),
        nextTraining: new Date(),
        trained,
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
                  <Indicator indicator={el.indicator} />
                  <span className="indicator-hint">
                    <Indicator indicator={5} />
                    У вас прекрасная память!
                    <br />
                    <Indicator indicator={4} />
                    Это слово так и вертится у вас на языке!
                    <br />
                    <Indicator indicator={3} />
                    Вы в процессе запоминания этого слова.
                    <br />
                    <Indicator indicator={2} />
                    Это слово нужно подучить.
                    <br />
                    <Indicator indicator={1} />
                    Новое слово! Вам оно еще не встречалось.
                  </span>
                </div>
              </td>
              <td className={type === 'deleted' ? 'hidden' : ''}>
                <img
                  className="delete"
                  role="button"
                  src={deleteImg}
                  alt="delete"
                  title="Удалить слово"
                  onClick={() => this.deleteWord(el.wordId, el.indicator, el.trained)}
                />
              </td>
              <td className={type === 'learning' ? 'hidden' : 'return'}>
                <img
                  role="button"
                  src={returnImg}
                  title="Восстановить слово для изучения"
                  alt="return"
                  onClick={() => this.returnToLearning(
                    el.wordId, el.indicator, el.trained, el.lastTrained, el.nextTraining,
                  )}
                />
              </td>
              <td>
                <div className="info">
                  <img src={infoImg} alt="info" />
                  <span className="word-hint">
                    Всего повторялось
                    {` ${el.trained} `}
                    раз
                    <br />
                    Дата последнего повтора
                    {` ${new Date(el.lastTrained).toLocaleDateString()}`}
                    <br />
                    Снова повторится
                    {` ${new Date(el.nextTraining).toLocaleDateString()}`}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
