const toShuffleArray = (array) => {
  const copiedArray = array.slice();
  const shuffledArray = [];
  for (let i = copiedArray.length - 1; i >= 0; i -= 1) {
    const randomNum = Math.floor(Math.random() * i);
    shuffledArray.push(copiedArray[randomNum]);
    copiedArray.splice(randomNum, 1);
  }
  return shuffledArray;
};

export default toShuffleArray;
