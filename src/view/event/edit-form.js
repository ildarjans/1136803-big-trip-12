import AbstractView from '../abstract.js';
import {getFormDateString} from '../../utils/date.js';

import {
  TRASNFER_TYPES,
  ACTIVITY_TYPES,
  CITIES
} from '../../consts.js';

export default class EventForm extends AbstractView {
  constructor(trip, destination = true) {
    super();
    this._trip = trip;
    this._destination = destination;
    this._submitHandler = this._submitHandler.bind(this);
  }
  _getTemplate() {
    return createEventEditFormTemplate(this._trip, this._destination);
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._callbacks.submit();
  }

  setSubmitHandler(cb) {
    this._callbacks.submit = cb;
    this.getElement()
      .querySelector(`form`)
      .addEventListener(`submit`, this._callbacks.submit);
  }

}

function createEventEditFormTemplate(trip, includeDestination = true) {
  const {
    type,
    city,
    schedule,
    price,
    offers,
  } = trip;

  const destination = includeDestination ? createEditFormDestinations(trip) : ``;
  const pickDateFrom = getFormDateString(schedule.start);
  const pickDateTo = getFormDateString(schedule.finish);
  return (
    `<li class="trip-events__item">
      <form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              ${createTransferListTemplate(type)}

            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              ${createActivityListTemplate(type)}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type} to
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createDestinationListTemplate()}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input
                class="event__input event__input--time
                "id="event-start-time-1"
                type="text"
                name="event-start-time"
                value="${pickDateFrom}"
          >
            &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input
                class="event__input event__input--time"
                id="event-end-time-1"
                type="text"
                name="event-end-time"
                value="${pickDateTo}"
          >
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">
              Price
            </span>
            &euro;
          </label>
          <input
                class="event__input event__input--price"
                id="event-price-1"
                type="text"
                name="event-price"
                value="${price}"
          >
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createFormOffersTemplate(offers)}
          </div>
        </section>
      </section>
      ${destination}
    </form>
  </li>
`);
}

function createEditFormDestinations(trip) {
  const {
    description,
    photos,
  } = trip;
  return (
    `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">
          ${description}
        </p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${createPhotosTemplate(photos)}
          </div>
        </div>
      </section>
  </section>`
  );
}

function createFormOffersTemplate(offers) {
  return offers.map((offer) => {
    return `\
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden"
              id="event-offer-${offer.type}-1"
              type="checkbox"
              name="event-offer-${offer.type}"
        >
        <label class="event__offer-label"
              for="event-offer-${offer.type}-1">
          <span class="event__offer-title">
            ${offer.title}
          </span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">
          ${offer.price}
          </span>
        </label>
      </div>`;
  }).join(``);
}

function createDestinationListTemplate() {
  return CITIES.map((city) => {
    return `\
      <option value="${city}"></option>`;
  }).join(``);
}

function createTransferListTemplate(selectedType) {
  return TRASNFER_TYPES.map((type) => {
    return `\
    <div class="event__type-item">
      <input
            id="event-type-${type}-1"
            class="event__type-input visually-hidden"
            type="radio"
            name="event-type"
            value="${type}"
            ${selectedType === type ? `checked` : ``}
      >
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>`;
  }).join(``);
}

function createActivityListTemplate(selectedType) {
  return ACTIVITY_TYPES.map((type) => {
    return `\
    <div class="event__type-item">
      <input
            id="event-type-${type}-1"
            class="event__type-input visually-hidden"
            type="radio"
            name="event-type"
            value="${type}"
            ${selectedType === type ? `checked` : ``}
      >
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>`;
  }).join(``);
}

function createPhotosTemplate(photos) {
  return photos.map((photo) => {
    return `\
    <img
      class="event__photo"
      src="${photo}"
      alt="Event photo"></img>`;
  }).join(``);
}
