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
    console.log(response);
    window.userToken = response.token;
    window.userId = response.userId;
    console.log(window.userToken);
    console.log(window.userId);
  } catch (e) {
    return false;
  }
  return response;
};
export default toPostUserData;
