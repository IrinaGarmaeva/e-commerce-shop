export const PATTERN_EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/;
export const PATTERN_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
export const PATTERN_USERNAME = /^[A-Za-zА-Яа-я\- ]{3,40}$/
export const isValidEmail = (email: string) : boolean => PATTERN_EMAIL.test(email);
export const isValidPassword = (password: string) : boolean => PATTERN_PASSWORD.test(password);
export const isValidName = (name: string) : boolean => PATTERN_USERNAME.test(name);

export const VALIDATION_MESSAGES = {
  emptySearchRequest: 'Enter what you are looking for',
  invalidName: "Enter 3 to 40 characters, only letters, hyphen or space",
  invalidEmail: 'Enter a valid email address',
  validEmail: 'You have successfully subscribed to our newsletter',
  emptyEmail: 'Enter your email to subscribe to our newsletter',
  invalidPassword: 'Your password must be at least 8 characters long and contain 1 number, 1 uppercase, 1 lowercase'
};

export const validateInput = (
  name: string,
  value: string,
  errors: { [key: string]: string },
  setErrors: (errors: { [key: string]: string }) => void,
  validationFunction?: (value: string) => boolean,
  errorMessage: string = ""
): void => {
  if (validationFunction && !validationFunction(value)) {
    setErrors({ ...errors, [name]: errorMessage });
  } else {
    setErrors({ ...errors, [name]: "" });
  }
};
