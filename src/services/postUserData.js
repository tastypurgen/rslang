import { API } from '../utils/constants';

const postUserData = async (userData, endPoint) => {
  let response;
  try {
    const request = await fetch(`${API}${endPoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    response = await request.json();
    localStorage.userToken = response.token;
    localStorage.userId = response.userId;
  } catch (e) {
    return false;
  }
  return true;
};

const getToken = localStorage.userToken || '';
const getUserId = localStorage.userId || '';

export { postUserData, getToken, getUserId };
