import getUserAggregatedWords from '../services/userAggregatedWords';

const checkUserWordsForGames = async () => {
  const filter = {
    $and: [
      { 'userWord.optional.deleted': false },
      { 'userWord.optional.indicator': 5 }],
  };
  const content = await getUserAggregatedWords(JSON.stringify(filter));
  return content[0].paginatedResults.length >= 10;
};

const getUserWordsForGames = async () => {
  const filter = {
    $and: [
      { 'userWord.optional.deleted': false },
      { 'userWord.optional.indicator': 5 }],
  };
  const content = await getUserAggregatedWords(JSON.stringify(filter));
  localStorage.userWords = JSON.stringify(content[0].paginatedResults);
};

export { checkUserWordsForGames, getUserWordsForGames };
