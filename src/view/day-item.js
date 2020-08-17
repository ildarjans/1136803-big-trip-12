import {getCustomDateString, getShortMonthDayString} from '../utils/date.js';

export function createDayItemTemplate(dateObj, counter) {
  const dateString = getCustomDateString(dateObj);
  const monthAndDayString = getShortMonthDayString(dateObj);
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${counter}</span>
        <time class="day__date" datetime="${dateString}">${monthAndDayString}</time>
      </div>
    </li>`
  );
}
