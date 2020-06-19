const toPostUserData = async (userData, endPoint) => {
  let response;
  try {
    const request = await fetch(`https://afternoon-falls-25894.herokuapp.com/${endPoint}`, {
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
export default toPostUserData;
