const toSaveUserData = (userData) => {
  localStorage.userData = JSON.stringify(userData);
};

export default toSaveUserData;
