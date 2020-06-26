// example of filter:
// const filter = '{"userWord.difficulty":"easy"}';

const getUserAggregatedWords = async (filter) => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${localStorage.userId}/aggregatedWords?filter=${filter}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  const response = await rawResponse.json();
  return response;
};

export default getUserAggregatedWords;
