const validateUserData = (userData) => {
  const { password, email } = userData;
  const emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
  // const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
  console.log(email);
  if (true) {
    return true; 
  }
  return false;
};

export default validateUserData;

// if ((/[A-Z]+/g.test(password) && (/[a-z]+/g.test(password)) && /[0-9]+/g.test(password) && (/[+-_@$!%*?&#.,;:[\]{}]+/g.test(password)) && (password.length >= 8 && password.length < 17)) && emailReg.test(email))
