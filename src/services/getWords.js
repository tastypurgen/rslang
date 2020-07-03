import API from '../utils/constants';
// https://afternoon-falls-25894.herokuapp.com/words?group=0&page=1&wordsPerExampleSentenceLTE=70&wordsPerPage=70

const getWordsByPageCount = async (wordsPerPage, wordsPerExample = 20) => {
  const rawResponse = await fetch(`${API}words?group=0&wordsPerExampleSentenceLTE=${wordsPerExample}&wordsPerPage=${wordsPerPage}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.userToken}`,
    },
  });
  try {
    const response = await rawResponse.json();
    return response;
  } catch {
    return false;
  }
};

const getWordByPageAndDifficultyNumber = async (pageNumber, groupNumber) => {
  const rawResponse = await fetch(`${API}words?page=${pageNumber}&group=${groupNumber}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.userToken}`,
    },
  });
  try {
    const response = await rawResponse.json();
    return response;
  } catch {
    return false;
  }
};

const getRandomWords = async (group, pageAmount) => {
  const pages = new Set();
  while (pages.size !== pageAmount) {
    pages.add(Math.floor(Math.random() * 30));
  }
  Promise.all(
    Array.from(pages).map(async (page) => {
      const rawResponse = await fetch(`${API}words?page=${page}&group=${group}`);
      return rawResponse.json();
    }),
  ).then((content) => {
    localStorage.words = JSON.stringify(content.flat());
  });
};

const getWordById = async (wordId) => {
  const rawResponse = await fetch(`${API}words/${wordId}`);
  const response = await rawResponse.json();
  return response;
};

export {
  getWordsByPageCount, getWordByPageAndDifficultyNumber, getRandomWords, getWordById,
};
