import React from 'react';
import './DifficultyControl.scss';

const DifficultyControl = props => {
    const { isSpeechRecognitionOn, toHandleDifficultyControls, value } = props;
    const classesArray = ['DifficultyControl'];
    if (props.value === props.activeElement)
    {
        classesArray.push('DifficultyControl--active');
    }
    return (
        <li
            onClick={() => {
                if (!isSpeechRecognitionOn)
                {
                    toHandleDifficultyControls(value);
                }
            }}
            data-value={props.value}
            className={classesArray.join(' ')}>
            {/* {props.value + 1} */}
        </li>
    )
}

export default DifficultyControl;
