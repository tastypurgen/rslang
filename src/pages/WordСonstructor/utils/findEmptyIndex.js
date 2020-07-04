const findEmptyIndex = (array) => array
  .find((answerLetter) => answerLetter.isEmpty === true);

export default findEmptyIndex;
