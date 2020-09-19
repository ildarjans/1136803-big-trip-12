import {
  getFormDateString,
  parseFormDateString,
  isDateBefore,
  isDateAfter,
} from '../../utils/date.js';
import SmartView from '../smart.js';
import {
  OFFER_TYPES,
  ACTIVITY_TYPES,
  POINT_TYPE_PREFIXES,
  CITIES,
  FLATPICKR,
  BLANK_EVENT,
  INVALID_MESSAGE,
  INVALID_COLOR,
} from '../../consts.js';
import flatpickr from 'flatpickr';
import '../../../node_modules/flatpickr/dist/flatpickr.min.css';

export default class PointFormView extends SmartView {
  constructor(response = BLANK_EVENT, destination = true) {
    super();
    this._data = PointFormView.parseResponseToData(response);
    this._destination = destination;
    this._datePicker = null;

    this._bindInnerHandlers();
    this._setInnerHandlers();

  }

  setDeleteClickHandler(cb) {
    this._callbacks.delete = cb;
  }

  setSubmitClickHandler(cb) {
    this._callbacks.submit = cb;
  }

  reset(point) {
    this.updateData(PointFormView.parseResponseToData(point));
  }

  _bindInnerHandlers() {
    this._submitClickHandler = this._submitClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._eventTypeClickHandler = this._eventTypeClickHandler.bind(this);
    this._dateInputChangeHandler = this._dateInputChangeHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._cityChangeHandler = this._cityChangeHandler.bind(this);
  }

  _dateInputChangeHandler(selectedDate, dateStr, self) {
    switch (self.input.name) {
      case (`event-start-time`):
        this.updateData(this._data.formData[`date_from`] = selectedDate[0], true);
        break;
      case (`event-end-time`):
        this.updateData(this._data.formData[`date_to`] = selectedDate[0], true);
        break;
    }
    this._validateDate();
  }

  _validateDate() {
    const eventStart = this.getElement().querySelector(`[name="event-start-time"]`);
    const eventEnd = this.getElement().querySelector(`[name="event-end-time"]`);
    const submitBtn = this.getElement().querySelector(`.event__save-btn`);
    const dateFrom = parseFormDateString(eventStart.value);
    const dateTo = parseFormDateString(eventEnd.value);
    if (isDateBefore(dateFrom, dateTo)) {
      eventEnd.setCustomValidity(``);
      eventEnd.style.color = `unset`;
      submitBtn.disabled = false;
    } else {
      eventEnd.setCustomValidity(INVALID_MESSAGE);
      eventEnd.classList.add(`event__input--invalid`);
      submitBtn.disabled = true;
    }

  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.delete(this._data);
  }

  _favoriteClickHandler(evt) {
    this._data.formData[`is_favorite`] = evt.target.checked;
    this.updateData(this._data, true);
  }

  _getTemplate() {
    return createEventEditFormTemplate(this._data, this._destination);
  }

  _eventTypeClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains(`event__type-input`)) {
      this._data.formData.type = evt.target.value;
      this._data.formData.offers = [];
      this.updateData(this._data);
    }
  }

  _setInnerHandlers() {
    const self = this.getElement();
    this._setDatePicker();

    self
      .querySelector(`.event__type-list`)
      .addEventListener(`change`, this._eventTypeClickHandler);
    self
      .querySelector(`.event__favorite-checkbox`)
      .addEventListener(`click`, this._favoriteClickHandler);
    self
      .querySelector(`.event__input--price`)
      .addEventListener(`change`, this._priceChangeHandler);
    self
      .querySelector(`.event__section--offers`)
      .addEventListener(`change`, this._offersChangeHandler);
    self
      .querySelector(`.trip-events__item.event--edit`)
      .addEventListener(`submit`, this._submitClickHandler);
    self
      .querySelector(`.event__reset-btn`)
      .addEventListener(`click`, this._deleteClickHandler);
    self
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._cityChangeHandler);

  }

  _setDatePicker() {
    if (this._datePicker) {
      this._datePicker.forEach((dp) => dp.destroy());
      this._datePicker = null;
    }

    this._datePicker = flatpickr(
        this.getElement().querySelectorAll(`.event__input--time`),
        {
          enableTime: true,
          [`time_24hr`]: true,
          dateFormat: FLATPICKR.FORM_DATE_FORMAT,
          onChange: this._dateInputChangeHandler
        }
    );
  }

  _submitClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.submit(PointFormView.parseDataToRequest(this._data));
  }

  _restoreHandlers() {
    this._setInnerHandlers();
  }

  _priceChangeHandler(evt) {
    this._data.formData[`base_price`] = parseInt(evt.target.value, 10);
    this.updateData(this._data, true);
  }

  _cityChangeHandler(evt) {
    const isValidCity = Array.from(
        this.getElement()
        .querySelector(`#destination-list-1`).options
    )
      .some((option) => option.value === evt.target.value);
    if (isValidCity) {
      evt.target.setCustomValidity(``);
      this._data.formData.destination.name = evt.target.value;
      this.updateData(this._data, true);
    } else {
      evt.target.setCustomValidity(`Select one of cities from dropdown list`);
    }
  }

  _offersChangeHandler(evt) {
    const isPicked = evt.target.checked;
    const title = evt.target.name;
    const price = evt.target.value;
    const offers = this._data.formData.offers;

    if (isPicked) {
      offers.push({title, price});
    } else {
      const index = offers.findIndex((offer) => offer.title === title);
      if (index >= 0) {
        offers.splice(index, 1);
      }
    }
    this.updateData(this._data, true);
  }


  static parseResponseToData(response) {
    return Object.assign(
        {},
        response,
        {
          formData: {
            [`base_price`]: response.point[`base_price`],
            [`is_favorite`]: response.point[`is_favorite`],
            [`date_from`]: response.point[`date_from`],
            [`date_to`]: response.point[`date_to`],
            type: response.point.type,
            offers: response.point.offers.slice(),
            destination: Object.assign({}, response.point.destination)
          }
        }
    );
  }
  static parseDataToRequest(data) {
    Object.assign(
        data.point,
        data.formData
    );

    delete data.formData;
    return data;
  }
}


function createEventEditFormTemplate(trip, includeDestination = true) {
  const {
    formData,
    offers,
  } = trip;

  const destination = includeDestination ? createEditFormDestinations(formData.destination) : ``;
  const pickDateFrom = getFormDateString(formData.date_from);
  const pickDateTo = getFormDateString(formData.date_to);
  const offersByType = offers.filter((offer) => offer.type === formData.type)[0];
  const pickedOffers = formData.offers;

  return (
    `<li class="trip-events__item">
      <form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${formData.type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              ${createEventListTemplate(formData.type)}

            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              ${createActivityListTemplate(formData.type)}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${formData.type} ${POINT_TYPE_PREFIXES[formData.type]}
          </label>
          <input 
            class="event__input  event__input--destination" 
            id="event-destination-1" 
            type="text" 
            name="event-destination" 
            value="${formData.destination.name}" 
            list="destination-list-1">
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
                type="number"
                name="event-price"
                value="${formData.base_price}"
                min="0"
          >
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input
              id="event-favorite-1"
              class="event__favorite-checkbox  visually-hidden"
              type="checkbox"
              name="event-favorite"
              ${formData[`is_favorite`] ? `checked` : ``}>
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
            ${createFormOffersTemplate(offersByType.offers, pickedOffers)}
          </div>
        </section>
      </section>
      ${destination}
    </form>
  </li>
`);
}

function createEditFormDestinations(destination) {
  return (
    `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">
          ${destination.description}
        </p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${createPicturesTemplate(destination.pictures)}
          </div>
        </div>
      </section>
  </section>`
  );
}

function createFormOffersTemplate(offers, pickedOffers) {
  return offers.map((offer) => {
    const isPicked = pickedOffers.some((pick) => pick.title === offer.title);
    return `\
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden"
              id="event-offer-${offer.title}-1"
              type="checkbox"
              name="${offer.title}"
              value="${offer.price}"
              ${isPicked ? `checked` : ``}
        >
        <label class="event__offer-label"
              for="event-offer-${offer.title}-1">
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
