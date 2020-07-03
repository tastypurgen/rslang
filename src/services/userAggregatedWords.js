import { API } from '../utils/constants';
import { getToken, getUserId } from './postUserData';

// example of filter:
// const filter = '{"userWord.difficulty":"easy"}';

const getUserAggregatedWords = async (filter) => {
  const query = new window.URLSearchParams({ filter }).toString();
  const rawResponse = await fetch(`${API}users/${getUserId()}/aggregatedWords?${query}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  const response = await rawResponse.json();
  return response;
};

export default getUserAggregatedWords;
