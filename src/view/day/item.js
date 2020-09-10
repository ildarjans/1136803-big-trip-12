import AbstractView from '../abstract.js';
import {getCustomDateString, getShortMonthDayString} from '../../utils/date.js';

export default class DayItemView extends AbstractView {
  constructor(date, order, showDayInfo) {
    super();
    this._date = date;
    this._order = order;
    this._showDayInfo = showDayInfo;
  }
  _getTemplate() {
    const dayInfo = (`
      <span class="day__counter">${this._order}</span>
      <time
        class="day__date"
        datetime="${getCustomDateString(this._date)}"
      >
        ${getShortMonthDayString(this._date)}
      </time>`
    );

    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          ${this._showDayInfo ? dayInfo : ``}
        </div>
      </li>`
    );
  }
}

