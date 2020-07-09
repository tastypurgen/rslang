import findEmptyIndex from './findEmptyIndex';

const checkWordCorrectness = (gameWords, currentLevel) => {
  const userAnswerArr = gameWords[currentLevel].answerLetters;
  const rightWord = gameWords[currentLevel].word;

  if (!findEmptyIndex(userAnswerArr)) {
    const userAnswer = userAnswerArr.map((letter) => letter.letter).join('');
    return (userAnswer === rightWord);
  }
  return false;
};

export default checkWordCorrectness;
