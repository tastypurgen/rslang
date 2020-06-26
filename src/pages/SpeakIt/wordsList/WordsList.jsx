import React from 'react';
import './WordsList.scss';
import Word from './Word/Word';

const WordsList = props => {
    const { changeWordActiveElement, changeActiveImage, playModeState, rightWords, wordActiveElement, toHandleTheWord } = props;
    return (
        <ul className="WordList__list">
            {props.data.map((it, i) => {
                return <Word
                    changeWordActiveElement={changeWordActiveElement}
                    changeActiveImage={changeActiveImage}
                    playModeState={playModeState}
                    rightWords={rightWords}
                    activeIndex={wordActiveElement}
                    wordIndex={i}
                    toHandleTheWord={toHandleTheWord}
                    key={i}
                    wordData={it}
                />
            })}
        </ul>
    )
}

export default WordsList;
