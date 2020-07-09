const shuffleLetters = (word, id) => {
  const shuffledLetters = word.split('').sort(() => 0.5 - Math.random());
  const shuffledLettersObj = [];
  for (let i = 0; i < shuffledLetters.length; i += 1) {
    const letter = {
      id: `${id}${i}`,
      letter: shuffledLetters[i],
      isOpened: false,
      initialPosition: i,
    };
    shuffledLettersObj.push(letter);
  }
  return shuffledLettersObj;
};

export default shuffleLetters;
