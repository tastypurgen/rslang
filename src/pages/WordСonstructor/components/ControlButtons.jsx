import React from 'react';

const ControlButtons = (props) => {
  const {
    nextLevel, skipLevel, availableSkips, isCurrentWordResolved,
  } = props;
  if (availableSkips && !isCurrentWordResolved) {
    return (
      <div className="word-constructor__buttons">
        <button className="word-constructor__btn word-constructor__btn_white" type="button" onClick={skipLevel}>Пропустить</button>
      </div>
    );
  }

  if (isCurrentWordResolved) {
    return (
      <div className="word-constructor__buttons">
        <button className="word-constructor__btn" type="button" onClick={nextLevel}>Далее</button>
      </div>
    );
  }

  return (
    <div className="word-constructor__buttons">
      <button className="word-constructor__btn word-constructor__btn_red" type="button">Сдаться</button>
    </div>
  );
};

export default ControlButtons;
