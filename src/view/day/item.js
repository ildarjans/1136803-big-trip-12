import AbstractView from '../abstract.js';
import {getCustomDateString, getShortMonthDayString} from '../../utils/date.js';

export default class DayItemView extends AbstractView {
  constructor(date, order) {
    super();
    this._date = date;
    this._order = order;
  }

  _getTemplate() {
    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${this._order}</span>
          <time
            class="day__date"
            datetime="${getCustomDateString(this._date)}"
          >
            ${getShortMonthDayString(this._date)}
          </time>  
        </div>
      </li>`
    );
  }
}

