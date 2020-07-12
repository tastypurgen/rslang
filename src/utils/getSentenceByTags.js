const getSentenceByTags = (sentence) => {
  // const regExp = /<b>.+<\/b>/g;
  // const word = sentence.match(regExp);
  const leftpart = sentence.slice(0, sentence.indexOf('<b>'));
  const rightPart = sentence.slice(sentence.indexOf('</b>') + 4, sentence.length);
  return { leftpart, rightPart };
};

export default getSentenceByTags;
