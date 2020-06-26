import React, { useState } from 'react';
import './Image.scss';
import SpeechInput from './SpeechInput/SpeechInput';

const Image = (props) => {
    const { isSpeechRecognitionOn, imageCaption, changeWordActiveElement, ChangeRightWordsObject, data, imagePath } = props;
    return (
        <div className="Image">
            <img className="Image__image" src={imagePath} alt="" />
            {
                isSpeechRecognitionOn ?
                    <SpeechInput
                        data={data}
                        changeWordActiveElement={changeWordActiveElement}
                        ChangeRightWordsObject={ChangeRightWordsObject} /> :
                    <p className="Image__caption">{imageCaption}</p>
            }
        </div>
    )
}

export default Image;
