import getUserAggregatedWords from '../services/userAggregatedWords';

const checkUserWordsForGames = async () => {
  const filter = {
    $and: [
      { 'userWord.optional.deleted': false },
      { 'userWord.optional.indicator': 5 }],
  };
  const content = await getUserAggregatedWords(JSON.stringify(filter));
  console.log(content[0].paginatedResults);
  if (content[0].paginatedResults.length >= 10) {
    localStorage.userWords = JSON.stringify(content[0].paginatedResults);
  } else {
    localStorage.userWords = '[]';
  }
};

export default checkUserWordsForGames;
