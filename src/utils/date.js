import moment from 'moment';
import {FORM_MOMENT_DATE_FORMAT, TimeUnitInMs as TimeUnit} from '../consts.js';


function getCustomDateObject(date, ...literals) {
  const fnLiterals = {
    yyyy: () => `${getZeroPad(date.getFullYear())}`,
    yy: () => `${date.getFullYear()}`.slice(2),
    mm: () => `${getZeroPad(date.getMonth())}`,
    MMM: () => `${getMonthString(date)}`,
    MMMM: () => `${getMonthString(date, true)}`,
    dd: () => `${getZeroPad(date.getDate())}`,
    h: () => `${getZeroPad(date.getHours())}`,
    m: () => `${getZeroPad(date.getMinutes())}`,
  };
  if (typeof date === `string`) {
    date = new Date(date);
  }

  if (Object.prototype.toString.call(date) !== `[object Date]`) {
    throw new Error(`first parameter must be Date object`);
  }
  const result = {};
  if (!literals.length) {
    literals = [
      `yyyy`,
      `yy`,
      `mm`,
      `MMM`,
      `MMMM`,
      `dd`,
      `h`,
      `m`
    ];
  }
  literals.forEach((arg) => {
    if (fnLiterals[arg]) {
      result[arg] = fnLiterals[arg]();
    }
  });

  return result;
}

function getZeroPad(number) {
  return number < 10 ? `0${number}` : number;
}

function getMonthString(date, long = false) {
  return date.toLocaleDateString(`en-US`, {month: long ? `long` : `short`});
}

export function isSameDate(date1, date2) {
  if (Object.prototype.toString.call(date1) === `[object Date]` &&
      Object.prototype.toString.call(date2) === `[object Date]`) {
    const date1Str = getCustomDateString(date1);
    const date2Str = getCustomDateString(date2);
    return date1Str === date2Str;
  }
  return false;
}

export function getCustomDateLocaleString(date) {
  const {
    yyyy: fullYear,
    mm: twoDigitMonth,
    dd: twoDigitDate,
    h: hour,
    m: minutes,
  } = getCustomDateObject(date, `yyyy`, `mm`, `dd`, `h`, `m`);

  return `${fullYear}-${twoDigitMonth}-${twoDigitDate}T${hour}:${minutes}`;
}

export function getShortMonthDayString(date) {
  const {
    MMM: monthShort,
    dd: twoDigitDate,
  } = getCustomDateObject(date, `MMM`, `dd`);

  return `${monthShort} ${twoDigitDate}`;
}

export function getCustomDateString(date) {
  const {
    yyyy: fullYear,
    mm: twoDigitMonth,
    dd: twoDigitDate,
  } = getCustomDateObject(date, `yyyy`, `mm`, `dd`);

  return `${fullYear}-${twoDigitMonth}-${twoDigitDate}`;
}

export function getCustomTimeString(date) {
  const {
    h: hour,
    m: minutes,
  } = getCustomDateObject(date, `h`, `m`);

  return `${hour}:${minutes}`;
}

export function getFormDateString(date) {
  return date instanceof Date ? moment(date).format(FORM_MOMENT_DATE_FORMAT) : ``;
}

export function getEventDurationString(dateFrom, dateTo) {
  const momentFrom = moment(dateFrom);
  const momentTo = moment(dateTo);
  const duration = moment.duration(momentTo.diff(momentFrom));
  let d = duration.days();
  let h = duration.hours();
  let m = duration.minutes();
  d = d ? `${getZeroPad(d)}D` : ``;
  h = h ? `${getZeroPad(h)}H` : ``;
  m = m ? `${getZeroPad(m)}M` : ``;
  return `${d} ${h} ${m}`;
}

export function isDayBefore(date, now = new Date()) {
  return moment(date).isBefore(now, `day`);
}

export function isDayAfter(date, now = new Date()) {
  return moment(date).isAfter(now, `day`);
}

export function isDateBefore(earlyDate, nextDate) {
  return moment(earlyDate).isBefore(nextDate);
}

export function getEventDurationInMinutes(dateFrom, dateTo) {
  const from = moment(dateFrom);
  const to = moment(dateTo);
  return moment.duration(to.diff(from));
}

export function convertMsInHours(timeInMs) {
  return moment.duration(timeInMs).hours();
}

export function getDateISOString(date) {
  return date instanceof Date ? date.toISOString() : ``;
}
