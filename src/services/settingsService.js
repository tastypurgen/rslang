const token = localStorage.getItem('userToken');
const userId = localStorage.getItem('userId');
const getUserSettings = async () => {
  let rawResponse = null;
  try {
    rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`, {
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

export default getUserSettings;
