import React from 'react';
import './DifficultyControls.scss';

import DifficultyControl from './DifficultyControl/DifficultyControl.js';

const DifficultyControls = (props) => {
    const { isSpeechRecognitionOn, toHandleDifficultyControls } = props;
    const components = [];
    for (let i = 0; i < 6; i++)
    {
        components.push((
            <DifficultyControl
                isSpeechRecognitionOn={isSpeechRecognitionOn}
                activeElement={props.activeElement}
                value={i}
                toHandleDifficultyControls={toHandleDifficultyControls}
                key={i}
            />
        ))
    }
    return (
        <ul className="DifficultyControls__list">
            {/* <div className="DifficultyControls__decorative-element"></div> */}
            {components}
        </ul>
    )
}

export default DifficultyControls;

/**
 *
 *
 * <li className="DifficultyControls__list-item">
                <button className="DifficultyControls__button">1</button>
            </li>
            <li className="DifficultyControls__list-item">
                <button className="DifficultyControls__button">2</button>
            </li>
            <li className="DifficultyControls__list-item">
                <button className="DifficultyControls__button">3</button>
            </li>
            <li className="DifficultyControls__list-item">
                <button className="DifficultyControls__button">4</button>
            </li>
            <li className="DifficultyControls__list-item">
                <button className="DifficultyControls__button">5</button>
            </li>
            <li className="DifficultyControls__list-item">
                <button className="DifficultyControls__button">6</button>
            </li>
 */