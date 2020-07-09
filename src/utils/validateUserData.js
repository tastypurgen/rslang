const validateUserData = (userData) => {
  const emailReg = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/g;
  const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[+@$!_.,;:#%[\]}{*?&])[A-Za-z\d@$!%.,;:[\]{}_+#*?&]{8,}$/;
  if (passwordReg.test(userData.password) && emailReg.test(userData.email)) {
    return true;
  }
  return false;
};

export default validateUserData;
