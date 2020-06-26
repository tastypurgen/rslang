import React from 'react';
import './StartScreen.scss';

const StartScreen = props => {
    const { startTheGame } = props;
    return (
        <div className="StartScreen">
            <div className="StartScreen__container">
                <h3 className="StartScreen__title">Повторяйка</h3>
                <p className="StartScreen__description">Слушай слова и взывай к силам земли!</p>
                <button
                    onClick={() => {
                        startTheGame();
                    }}
                    className="StartScreen__button">Начать!</button>
            </div>
        </div>
    )
}

export default StartScreen;
