import moment from 'moment';

const currentYear = moment().year();
const minYear = currentYear - 100;
const maxYear = currentYear - 16;

export const isAgeValid = (birthday) => {
  const format = 'YYYY.MM.DD';
  const date = moment(birthday, format);
  const year = date.year();
  return year >= minYear && year <= maxYear;
};