const toPostUserData = async (userData, endPoint) => {
  try {
    const request = await fetch(`https://afternoon-falls-25894.herokuapp.com/${endPoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const response = await request.json();
    console.log(response);
  } catch (e) {
    return false;
  }
  return true;
};
export default toPostUserData;
