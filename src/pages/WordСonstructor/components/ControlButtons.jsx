import React from 'react';
import classNames from 'classnames';

const ControlButtons = (props) => {
  const {
    nextLevel, skipLevel, availableSkips, isCurrentWordResolved, currentLevel,
  } = props;
  const isFinalLevel = currentLevel === 9;

  if (!isCurrentWordResolved) {
    const btnTitle = availableSkips ? `Пропустить${isFinalLevel ? ' и завершить' : ''}` : `Сдаться${isFinalLevel ? ' и завершить' : ''}`;
    const btnClass = availableSkips ? classNames('word-constructor__btn', 'word-constructor__btn_white') : classNames('word-constructor__btn', 'word-constructor__btn_red');
    return (
      <div className="word-constructor__buttons">
        <button className={btnClass} type="button" onClick={skipLevel}>
          {btnTitle}
        </button>
      </div>
    );
  }

  return (
    <div className="word-constructor__buttons">
      <button className="word-constructor__btn" type="button" onClick={nextLevel}>
        {!isFinalLevel ? 'Далее' : 'Завершить игру'}
      </button>
    </div>
  );
};

export default ControlButtons;
