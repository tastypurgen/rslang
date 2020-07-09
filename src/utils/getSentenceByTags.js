const getSentenceByTags = (sentence) => {
  // const regExp = /<b>.+<\/b>/g;
  // const word = sentence.match(regExp);
  // console.log(word[0].slice(3, word[0].length - 4));
  const leftpart = sentence.slice(0, sentence.indexOf('<b>'));
  const rightPart = sentence.slice(sentence.indexOf('</b>') + 4, sentence.length);
  return { leftpart, rightPart };
};

export default getSentenceByTags;
