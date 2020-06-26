const getRandomWords = async (group, pageAmount) => {
  const pages = new Set();
  while (pages.size !== pageAmount) {
    pages.add(Math.floor(Math.random() * 30));
  }
  Promise.all(
    Array.from(pages).map(async (page) => {
      const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`);
      return rawResponse.json();
    }),
  ).then((content) => {
    localStorage.words = JSON.stringify(content.flat());
  });
};

const getWordById = async (wordId) => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/words/${wordId}`);
  const response = await rawResponse.json();
  return response;
};

export { getRandomWords, getWordById };
