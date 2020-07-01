import API from '../utils/constants';
import { getToken, getUserId } from './postUserData';

const checkUserToken = async () => {
  const rawResponse = await fetch(`${API}users/${getUserId}/words`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  });
  if (rawResponse.ok) {
    return true;
  }
  localStorage.clear();

  return false;
};

export default checkUserToken;
