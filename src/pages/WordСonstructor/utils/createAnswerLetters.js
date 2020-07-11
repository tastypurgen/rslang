const createAnswerLetters = (wordLength, id) => {
  const answerLettersObj = [];
  for (let i = 0; i < wordLength; i += 1) {
    const letter = {
      id: `${id}${i}`,
      letter: null,
      isEmpty: true,
      initialPosition: null,
      answerPosition: i,
    };
    answerLettersObj.push(letter);
  }
  return answerLettersObj;
};

export default createAnswerLetters;
