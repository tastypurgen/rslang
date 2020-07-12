const getTheWordsData = async (randomNumber, difficulty) => {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${randomNumber}&group=${difficulty}`;
    const request = await fetch(url);
    return await request.json();
};

export default getTheWordsData;
