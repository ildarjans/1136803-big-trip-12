function getCustomDateObject(dateObj, ...literals) {
  /**
  * function apply string literals
  @yyyy year 4-digit format
  @yy year 2-digit format
  @mm month 2-digit format
  @MMM short month Jan, Feb etc...
  @MMMM full month January, Febrary etc...
  @dd date 2-digit format
  @h hour 2-digit format
  @m minutes 2-digit format */

  const fnLiterals = {
    yyyy: () => `${zeroPad(dateObj.getFullYear())}`,
    yy: () => `${dateObj.getFullYear()}`.slice(2),
    mm: () => `${zeroPad(dateObj.getMonth())}`,
    MMM: () => `${getMonthString(dateObj)}`,
    MMMM: () => `${getMonthString(dateObj, true)}`,
    dd: () => `${zeroPad(dateObj.getDate())}`,
    h: () => `${zeroPad(dateObj.getHours())}`,
    m: () => `${zeroPad(dateObj.getMinutes())}`,
  };
  if (Object.prototype.toString.call(dateObj) !== `[object Date]`) {
    throw new Error(`first parametr must be Date object`);
  }
  let resultObj = {};
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
      resultObj[arg] = fnLiterals[arg]();
    }
  });

  return resultObj;
}

function calcTimeDiff(date1, date2) {
  if (date2 < date1) {
    [date1, date2] = [date2, date1];
  }
  const S = 1000;
  const m = S * 60;
  const h = m * 60;
  const d = h * 24;

  const diff = date2.valueOf() - date1.valueOf();
  const days = Math.floor(diff / d);
  const hours = Math.floor((diff - days * d) / h);
  const minutes = Math.floor((diff - days * d - hours * h) / m);

  return {days, hours, minutes};
}

function zeroPad(number) {
  return number < 10 ? `0${number}` : number;
}

function getMonthString(dateObj, long = false) {
  return dateObj.toLocaleDateString(`en-US`, {month: long ? `long` : `short`});
}

export function getTimeDiffString(date1, date2) {
  // Менее часа: минуты (например «23M»);
  // Менее суток: часы минуты (например «02H 44M»);
  // Более суток: дни часы минуты (например «01D 02H 30M»);
  const {days, hours, minutes} = calcTimeDiff(date1, date2);

  const d = `${zeroPad(days)}`;
  const h = `${zeroPad(hours)}`;
  const m = `${zeroPad(minutes)}`;

  return `\
  ${ d !== `00` ? `${d}D` : ``}\
  ${ h !== `00` ? `${h}H` : ``}\
  ${ m !== `00` ? `${m}M` : ``}`
  .trim();
}

export function getFormDateString(dateObj) {
  // return string like this -> dd/mm/yy hh:mm
  const {
    yy: year,
    mm: month,
    dd: date,
    h: hour,
    m: minutes,
  } = getCustomDateObject(dateObj, `yy`, `mm`, `dd`, `h`, `m`);

  return `${date}/${month}/${year} ${hour}:${minutes}`;
}

export function isSameDate(date1, date2) {
  // compare date strings like yyyy-mm-dd
  if (Object.prototype.toString.call(date1) === `[object Date]` &&
      Object.prototype.toString.call(date2) === `[object Date]`) {
    const date1Str = getCustomDateString(date1);
    const date2Str = getCustomDateString(date2);
    return date1Str === date2Str;
  }
  return false;
}

export function sortTripsByDate(trips) {
  return trips.sort((a, b) => {
    return (
      a.schedule.start.valueOf() >
      b.schedule.start.valueOf() ?
        1 : -1
    );
  });
}

export function getCustomDateLocaleString(dateObj) {
  // return string like this -> yyyy-mm-ddThh:mm
  const {
    yyyy: fullYear,
    mm: month,
    dd: date,
    h: hour,
    m: minutes,
  } = getCustomDateObject(dateObj, `yyyy`, `mm`, `dd`, `h`, `m`);

  return `${fullYear}-${month}-${date}T${hour}:${minutes}`;
}

export function getShortMonthDayString(dateObj) {
  const {
    MMM: monthShort,
    dd: date,
  } = getCustomDateObject(dateObj, `MMM`, `dd`);

  return `${monthShort} ${date}`;
}

export function getCustomDateString(dateObj) {
  const {
    yyyy: fullYear,
    mm: month,
    dd: date,
  } = getCustomDateObject(dateObj, `yyyy`, `mm`, `dd`);

  return `${fullYear}-${month}-${date}`;
}

export function getCustomTimeString(dateObj) {
  const {
    h: hour,
    m: month,
  } = getCustomDateObject(dateObj, `h`, `m`);

  return `${hour}:${month}`;
}

