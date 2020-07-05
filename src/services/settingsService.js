import { API } from '../utils/constants';

const getUserSettings = async (token, userId) => {
  let rawResponse = null;
  try {
    rawResponse = await fetch(`${API}users/${userId}/settings`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
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

const setUserSettings = async (token, userId, settingsObj) => {
  const jsonSettings = JSON.stringify(settingsObj);

  let rawResponse = null;
  try {
    rawResponse = await fetch(`${API}users/${userId}/settings`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: jsonSettings,
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

const setDefaultSettings = async (token, userId) => {
  const defaultSettings = {
    wordsPerDay: 20,
    optional: {
      associationImage: true,
      autoPronunciation: false,
      displayAssessmentBtns: true,
      displayDeleteBtn: true,
      displayDifficultBtn: true,
      displayShowAnswerBtn: true,
      exampleSentence: true,
      explanationSentence: true,
      isRequiredInputChecked: true,
      maxCardsPerDay: 20,
      showWordAndSentenceTranslation: true,
      wordTranscription: true,
      wordTranslation: true,
    },
  };
  const jsonSettings = JSON.stringify(defaultSettings);

  let rawResponse = null;
  try {
    rawResponse = await fetch(`${API}users/${userId}/settings`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: jsonSettings,
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

export { getUserSettings, setUserSettings, setDefaultSettings };
