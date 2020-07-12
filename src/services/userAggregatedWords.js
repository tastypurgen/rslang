import { API } from '../utils/constants';
import { getToken, getUserId } from './postUserData';

const getUserAggregatedWords = async (filter, wordsNumber = 3600) => {
  // let additionalEndPoints = '';
  // if (wordsNumber) {
  //   additionalEndPoints = `&wordsPerExampleSentenceLTE=${20}&wordsPerPage=${wordsNumber}`;
  // }
  const query = new window.URLSearchParams({ filter }).toString();
  const rawResponse = await fetch(`${API}users/${getUserId()}/aggregatedWords?${query}&wordsPerExampleSentenceLTE=${20}&wordsPerPage=${wordsNumber}`,
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
