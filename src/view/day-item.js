import {createDOMElement} from '../utils/render.js';
import {getCustomDateString, getShortMonthDayString} from '../utils/date.js';

function createDayItemTemplate(date, order) {
  const dateString = getCustomDateString(date);
  const monthAndDayString = getShortMonthDayString(date);
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${order}</span>
        <time class="day__date" datetime="${dateString}">${monthAndDayString}</time>
      </div>
    </li>`
  );
}

export default class DayItem {
  constructor(trip, order) {
    this._element = null;
    this._trip = trip;
    this._order = order;
  }
  _getTemplate() {
    return createDayItemTemplate(this._trip, this._order);
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

