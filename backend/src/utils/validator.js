const emailValidatorRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const passwordValidatorRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const emailValidator = (email) => {
  return emailValidatorRegex.test(email);
};

const passwordValidator = (password) => {
  return passwordValidatorRegex.test(password);
};

export { emailValidator, passwordValidator };
