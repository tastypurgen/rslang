import { API } from '../utils/constants';
import { getToken, getUserId } from './postUserData';

const getUserStatistics = async () => {
  try {
    const rawResponse = await fetch(`${API}users/${getUserId()}/statistics`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`,
          Accept: 'application/json',
        },
      });
    const response = await rawResponse.json();
    return response;
  } catch {
    return false;
  }
};

const upsertUserStatistics = async (body) => {
  const rawResponse = await fetch(`${API}users/${getUserId()}/statistics`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  return rawResponse.ok;
};

const setDefaultStatistics = async () => {
  const defaultStatistics = {
    learnedWords: 0,
    optional: {
      today: {
        cards: 0,
        newWords: 0,
        rightAnswers: 0,
        longestChain: 0,
      },
      speakIt: {
        timesPlayed: 0,
        days: [
          {
            day: null,
            correct: 0,
            wrong: 0,
          },
        ],
      },
      savannah: {
        timesPlayed: 0,
        days: [
          {
            day: null,
            correct: 0,
            wrong: 0,
          },
        ],
      },
      audioChallenge: {
        timesPlayed: 0,
        days: [
          {
            day: null,
            correct: 0,
            wrong: 0,
          },
        ],
      },
      sprint: {
        timesPlayed: 0,
        days: [
          {
            day: null,
            correct: 0,
            wrong: 0,
          },
        ],
      },
      englishPuzzle: {
        timesPlayed: 0,
        days: [
          {
            day: null,
            correct: 0,
            wrong: 0,
          },
        ],
      },
      wordConstructor: {
        timesPlayed: 0,
        days: [
          {
            day: null,
            correct: 0,
            wrong: 0,
          },
        ],
      },
    },
  };
  const jsonStatistics = JSON.stringify(defaultStatistics);

  let rawResponse = null;
  try {
    rawResponse = await fetch(`${API}users/${getUserId()}/statistics`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: jsonStatistics,
    });
  } catch (err) {
    return err;
  }

  if (rawResponse.status !== 200) {
    return {
      status: rawResponse.status,
      text: rawResponse.statusText,
    };
  }
  const response = await rawResponse.json();
  response.status = rawResponse.status;
  return response;
};

export { getUserStatistics, upsertUserStatistics, setDefaultStatistics };
