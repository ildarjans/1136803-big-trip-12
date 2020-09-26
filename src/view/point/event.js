import AbstractView from '../abstract.js';
import {
  getCustomDateLocaleString,
  getEventDurationString,
  getCustomTimeString
} from '../../utils/date.js';
import {capitalizeString as capitalize} from '../../utils/common.js';


import {POINT_TYPE_PREFIXES, OFFER_ITEM_VIEW_LIMIT} from '../../consts.js';

function createEventItemTemplate(point) {

  const dateStartEvent = getCustomDateLocaleString(point.dateFrom);
  const dateEndEvent = getCustomDateLocaleString(point.dateTo);
  const timeStartEvent = getCustomTimeString(point.dateFrom);
  const timeEndEvent = getCustomTimeString(point.dateTo);
  const eventDuration = getEventDurationString(point.dateFrom, point.dateTo);
  const prefix = POINT_TYPE_PREFIXES[point.type];

  return (
    `<div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
      </div>
        <h3 class="event__title">${capitalize(point.type)} ${prefix} ${point.destination.name}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateStartEvent}">${timeStartEvent}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateEndEvent}">${timeEndEvent}</time>
        </p>
        <p class="event__duration">${eventDuration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createEventOffersTemplate(point.offers)}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`
  );
}

function createEventOffersTemplate(offers) {
  return offers
    .slice(0, OFFER_ITEM_VIEW_LIMIT)
    .map((offer) => {
      return `
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </>`;
    })
    .join(``);
}

export default class PointEventView extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
    this._dropDownClickHandler = this._dropDownClickHandler.bind(this);
  }
  _getTemplate() {
    return createEventItemTemplate(this._point);
  }

  _dropDownClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.click();
  }

  setDropdownClickHandler(cb) {
    this._callbacks.click = cb;
    this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, this._dropDownClickHandler);
  }

}