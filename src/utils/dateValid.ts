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

export const isBookingDateValid = (ngayDen, ngayDi) => {
  const format = 'YYYY.MM.DD';
  const startDate = moment(ngayDen, format);
  const endDate = moment(ngayDi, format);
  const today = moment().startOf('day');
  
  return startDate.isSameOrBefore(endDate) && startDate.isSameOrAfter(today) && endDate.isSameOrAfter(today);
};