import Abstract from '../abstract.js';
import {getCustomDateString, getShortMonthDayString} from '../../utils/date.js';

export default class DayItemView extends Abstract {
  constructor(date, order) {
    super();
    this._date = date;
    this._order = order;
  }
  _getTemplate() {
    const dateString = getCustomDateString(this._date);
    const monthAndDayString = getShortMonthDayString(this._date);
    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${this._order}</span>
          <time class="day__date" datetime="${dateString}">${monthAndDayString}</time>
        </div>
      </li>`
    );
  }
}

