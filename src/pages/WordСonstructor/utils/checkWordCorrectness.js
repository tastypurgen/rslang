import findEmptyIndex from './findEmptyIndex';

const checkWordCorrectness = (gameWords, currentLevel) => {
  const userAnswerArr = gameWords[currentLevel].answerLetters;
  const rightWord = gameWords[currentLevel].word;

  if (!findEmptyIndex(userAnswerArr)) {
    const userAnswer = userAnswerArr.map((letter) => letter.letter).join('');
    return { isAnswerFilled: true, isAnswerCorrect: (userAnswer === rightWord) };
  }
  return { isAnswerFilled: false, isAnswerCorrect: false };
};

export default checkWordCorrectness;
