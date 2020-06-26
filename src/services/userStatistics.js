const getUserStatistics = async () => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${localStorage.userId}/statistics`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.userToken}`,
        Accept: 'application/json',
      },
    });
  const response = await rawResponse.json();
  return response;
};

const upsertUserStatistics = async (body) => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${localStorage.userId}/statistics`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.userToken}`,
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
    rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${localStorage.userId}/statistics`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.userToken}`,
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
