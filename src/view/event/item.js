import AbstractView from '../abstract.js';
import {
  getCustomDateLocaleString,
  getTimeDiffString,
  getCustomTimeString
} from '../../utils/date.js';
import {TYPE_PREFIXES} from '../../consts.js';

export default class EventItemView extends AbstractView {
  constructor(trip) {
    super();
    this._trip = trip;
    this._clickHandler = this._clickHandler.bind(this);
  }
  _getTemplate() {
    return createEventItemTemplate(this._trip);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callbacks.click();
  }

  setClickHandler(cb) {
    this._callbacks.click = cb;
    this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, this._clickHandler);
  }

}

function createEventItemTemplate(trip) {
  const {
    type,
    city,
    schedule,
    price,
    offers,
  } = trip;

  const dateStartEvent = getCustomDateLocaleString(schedule.start);
  const dateEndEvent = getCustomDateLocaleString(schedule.finish);
  const timeStartEvent = getCustomTimeString(schedule.start);
  const timeEndEvent = getCustomTimeString(schedule.finish);
  const eventDuration = getTimeDiffString(schedule.start, schedule.finish);
  const prefix = TYPE_PREFIXES[type];

  return (
    `<li class="trip-events__item">
      <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
        <h3 class="event__title">${type} ${prefix} ${city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateStartEvent}">${timeStartEvent}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateEndEvent}">${timeEndEvent}</time>
        </p>
        <p class="event__duration">${eventDuration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createEventOffersTemplate(offers)}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
}

function createEventOffersTemplate(offers) {
  return offers.map((offer) => {
    return `\
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </>`;
  }).join(``);
}

