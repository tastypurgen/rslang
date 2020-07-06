import API from '../utils/constants';

const defaultSettings = {
  wordsPerDay: 20,
  optional: {
    associationImage: true,
    autoPronunciation: true,
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
  const jsonSettings = settingsObj ? JSON.stringify(settingsObj) : JSON.stringify(defaultSettings);

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

export { getUserSettings, setUserSettings };
