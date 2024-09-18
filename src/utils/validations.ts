import moment from 'moment';

export const userNotFound = 'User not found!';
export const itsYours = "It's yours!";

export const emailValidation = (email: string = '', message?: string) => {
  const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  if (email) {
    if (!re.test(email)) {
      return 'Please enter valid email';
    }
  }

  if (message) {
    return message;
  }

  return '';
};

export const usernameValidation = (username: string = '', message?: string) => {
  const re = /^[0-9a-zA-Z]+$/;

  if (username) {
    if (username.length < 5) {
      return 'Too short!';
    }

    if (!re.test(username)) {
      return 'Please enter valid username.';
    }
  }

  if (message) {
    return message;
  }

  return '';
};

export const passwordValidation = (password: string = '') => {
  if (password) {
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
  }

  return '';
};

export const confirmPasswordValidation = (password: string = '', confirmPassword: string = '') => {
  if (confirmPassword) {
    if (confirmPassword.length < 8) {
      return 'Password must be at least 8 characters';
    }

    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
  }

  return '';
};

export const getFormatedPhoneNumber = (number: string = '') => {
  return number.replace(/[^0-9]/g, '');
};

export const getValidDate = (date: any) => {
  let validDate: any = null;

  if (typeof date === 'number' || typeof date === 'string') {
    validDate = new Date(date);
  } else if (typeof date === 'object') {
    validDate = date;
  } else {
    validDate = new Date();
  }

  return validDate;
};

export const getFormatedDate = (date: any) => {
  return moment(date).format('MM/DD/YYYY');
};

export const getFormatedDateCut = (date: any) => {
  return moment(date).format('MM/DD/YY');
};

export const getFormatedTimeA = (time: any) => {
  return moment(time).format('hh:mm A');
};

export const getFormatedTime = (time: any) => {
  return moment(time).format('HH:mm');
};

export const getArrayFromStringWithBreak = (value: string) => {
  if (!value) {
    return [];
  }

  return value.split('\n');
};

export default {
  emailValidation,
  usernameValidation,
  passwordValidation,
  confirmPasswordValidation,
  getFormatedPhoneNumber,
  getValidDate,
  getArrayFromStringWithBreak,
};
