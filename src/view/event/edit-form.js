import {getFormDateString} from '../../utils/date.js';
import SmartView from '../smart.js';

import {
  OFFER_TYPES,
  ACTIVITY_TYPES,
  POINT_TYPE_PREFIXES,
  CITIES
} from '../../consts.js';

export default class EventFormView extends SmartView {
  constructor(data, destination = true) {
    super();
    this._data = data;
    this._destination = destination;

    this._bindInnerHandlers();
    this._setInnerHandlers();
  }

  _getTemplate() {
    return createEventEditFormTemplate(this._data, this._destination);
  }

  _bindInnerHandlers() {
    this._submitClickHandler = this._submitClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._eventTypeClickHandler = this._eventTypeClickHandler.bind(this);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`change`, this._eventTypeClickHandler);
  }

  _submitClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.submit();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.favorite();
  }

  _eventTypeClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains(`event__type-input`)) {
      this._data.offer = this._data.offers
        .find((offer) => offer.type === evt.target.value);
      this.updateData(this._data);
    }
  }

  setSubmitClickHandler(cb) {
    this._callbacks.submit = cb;
    this.getElement()
      .querySelector(`form`)
      .addEventListener(`submit`, this._submitClickHandler);
  }

  setFavoriteClickHandler(cb) {
    this._callbacks.favorite = cb;
    this.getElement()
    .querySelector(`.event__favorite-checkbox`)
    .addEventListener(`click`, this._favoriteClickHandler);
  }

  _restoreHandlers() {
    this.setSubmitClickHandler(this._submitClickHandler);
    this._setInnerHandlers();
  }

}

function createEventEditFormTemplate(trip, includeDestination = true) {
  const {
    offer,
    description,
    point,
  } = trip;

  const destination = includeDestination ? createEditFormDestinations(description) : ``;
  const pickDateFrom = getFormDateString(point.date_from);
  const pickDateTo = getFormDateString(point.date_to);
  return (
    `<li class="trip-events__item">
      <form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${offer.type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              ${createEventListTemplate(offer.type)}

            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              ${createActivityListTemplate(offer.type)}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${offer.type} ${POINT_TYPE_PREFIXES[offer.type]}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${description.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createCitiesListTemplate()}
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
                value="${point.base_price}"
          >
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input
              id="event-favorite-1"
              class="event__favorite-checkbox  visually-hidden"
              type="checkbox"
              name="event-favorite"
              ${point[`is_favorite`] ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createFormOffersTemplate(offer)}
          </div>
        </section>
      </section>
      ${destination}
    </form>
  </li>
`);
}

function createEditFormDestinations(description) {
  return (
    `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">
          ${description.description}
        </p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${createPicturesTemplate(description.pictures)}
          </div>
        </div>
      </section>
  </section>`
  );
}

function createFormOffersTemplate(offer) {
  return offer.offers.map((off) => {
    return `\
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden"
              id="event-offer-${off.title}-1"
              type="checkbox"
              name="event-offer-${off.title}"
        >
        <label class="event__offer-label"
              for="event-offer-${off.title}-1">
          <span class="event__offer-title">
            ${off.title}
          </span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">
          ${off.price}
          </span>
        </label>
      </div>`;
  }).join(``);
}

function createCitiesListTemplate() {
  return CITIES.map((city) => {
    return `\
      <option value="${city}"></option>`;
  }).join(``);
}

function createEventListTemplate(selectedType) {
  return OFFER_TYPES
    .map((type) => {
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

function createPicturesTemplate(pictures) {
  return pictures.map((pic) => {
    return `\
    <img
      class="event__photo"
      src="${pic.src}"
      alt="Event photo"></img>`;
  }).join(``);
}
