import React from 'react';
import './WordsList.scss';
import Word from './Word/Word';

const WordsList = (props) => {
  const {
    changeWordActiveElement,
    changeActiveImage,
    playModeState,
    rightWords,
    wordActiveElement,
    toHandleTheWord,
    data,
  } = props;
  return (
    <ul className="WordList__list">
      {data.map((it, i) => (
        <Word
          changeWordActiveElement={changeWordActiveElement}
          changeActiveImage={changeActiveImage}
          playModeState={playModeState}
          rightWords={rightWords}
          activeIndex={wordActiveElement}
          wordIndex={i}
          toHandleTheWord={toHandleTheWord}
          key={i.toString()}
          wordData={it}
        />
      ))}
    </ul>
  );
};

export default WordsList;
