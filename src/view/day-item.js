import {createDOMElement} from '../utils/render.js';
import {getCustomDateString, getShortMonthDayString} from '../utils/date.js';

export default class DayItemView {
  constructor(date, order) {
    this._element = null;
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

  getElement() {
    if (!this._element) {
      this._element = createDOMElement(this._getTemplate());
    }
    return this._element;
  }

  resetElement() {
    this._element = null;
  }
}

