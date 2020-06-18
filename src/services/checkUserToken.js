const checkUserToken = async () => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${localStorage.userId}/words`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.userToken}`,
    },
  });
  if (rawResponse.status === 200) {
    return true;
  }
  localStorage.clear();

  return false;
};

export default checkUserToken;
