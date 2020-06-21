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

export default getRandomWords;
