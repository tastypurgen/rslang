import { API } from '../utils/constants';
import { getToken, getUserId } from './postUserData';

// example of body:
// const testObj = {
//   'difficulty': 'easy',
//   'optional': {
//       deleted: false,
//       difficult: false,
//   }
// }

// difficulty: easy, medium, hard
async function createUserWord(wordId, body) {
  let rawResponse;
  try {
    rawResponse = await fetch(`${API}users/${getUserId()}/words/${wordId}`, {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (rawResponse.status === 417) {
      console.log('failed');
    } else {
      const response = await rawResponse.json();
      return response;
    }
  } catch {
    console.log('catch srabotal');
    return 's';
  }
  return null;
}

const updateUserWord = async (wordId, body) => {
  const rawResponse = await fetch(`${API}users/${getUserId()}/words/${wordId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  const response = await rawResponse.json();
  return response;
};

const deleteUserWord = async (wordId, body) => {
  const rawResponse = await fetch(`${API}users/${getUserId()}/words/${wordId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  return rawResponse.ok;
};

const getAllUserWords = async () => {
  const rawResponse = await fetch(`${API}users/${getUserId()}/words`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  const response = await rawResponse.json();
  return response;
};

export {
  createUserWord, deleteUserWord, getAllUserWords, updateUserWord,
};
