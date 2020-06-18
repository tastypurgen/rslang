const toValidateUserData = (userData) => {
  const reg = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/g;
  if ((/[A-Z]+/g.test(userData.password) && /[0-9]+/g.test(userData.password) && /[a-z]+/g.test(userData.password) && userData.password.length >= 8 && userData.password.length < 17) && reg.test(userData.email)) {
    return true;
  }
  return false;
};

export default toValidateUserData;
