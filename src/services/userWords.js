const createUserWord = async (wordId, body) => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${localStorage.userId}/words/${wordId}`, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.userToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const response = await rawResponse.json();
  return response;
};

const updateUserWord = async (wordId, body) => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${localStorage.userId}/words/${wordId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  const response = await rawResponse.json();
  return response;
};

const deleteUserWord = async (wordId) => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${localStorage.userId}/words/${wordId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.userToken}`,
      },
    });
  return rawResponse.ok;
};

const getAllUserWords = async () => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${localStorage.userId}/words`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.userToken}`,
      },
    });
  const response = await rawResponse.json();
  return response;
};

export {
  createUserWord, deleteUserWord, getAllUserWords, updateUserWord,
};
