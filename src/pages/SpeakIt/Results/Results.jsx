import React, { useState } from 'react';
import './Results.css';

import playAudioFunction from '../utils/playAudioFunction';
import getTheWordTranslation from '../services/getTheWordTranslation';

const Results = (props) => {
    const [translatedWords, setTranslatedWords] = useState([]);
    const [translateIsLoaded, setTranslateIsLoaded] = useState(false);
    const { rightWordsObject, data, toShowResults, toStartNewGame } = props;

    if (!translateIsLoaded) {
        const wordsToTranslate = [];
        for (let i = 0; i < data.length; i++) {
            wordsToTranslate.push(data[i].word);
        }

        getTheWordTranslation(wordsToTranslate.join('|')).then((response) => {
            setTranslatedWords(response.text[0].split('|'));
            setTranslateIsLoaded(true);
        })
    }

    return (
        <div className="Results__container">
            <ul className="Results__list">
                {data.map((it, i) => {
                    const classes = ['Results__list-item'];
                    if (rightWordsObject[it.word]) {
                        classes.push('Results__list-item--right');
                    }

                    return (
                        <li key={i}
                            onClick={() => {
                                if (window.isClickEnabled) {
                                    playAudioFunction(`https://raw.githubusercontent.com/Koptohhka/rslang-data/master/${it.audio}`);
                                }
                            }}
                            className={classes.join(' ')}>
                            {it.word} {it.transcription} {translateIsLoaded ? translatedWords[i] : ''}
                        </li>
                    );
                })}
            </ul>
            <button onClick={() => {
                toShowResults();
            }}>return</button>
            <button onClick={() => {
                toStartNewGame();
            }}>new game</button>
        </div>
    )
}

export default Results;