import {
  getFormDateString,
  isDateBefore,
} from '../../utils/date.js';
import {capitalizeString as capitalize} from '../../utils/common.js';
import SmartView from '../smart.js';
import {
  TRANSPORT_TYPES,
  ACTIVITY_TYPES,
  POINT_TYPE_PREFIXES,
  FORM_FLATPICKR_DATE_FORMAT,
  FormType,
} from '../../consts.js';

import flatpickr from 'flatpickr';
import '../../../node_modules/flatpickr/dist/flatpickr.min.css';

function createEventEditFormTemplate(data, offers, destinationNames, formType) {
  const {formData, state} = data;
  const {isDisabled, isSaving, isDeleting} = state;

  const destination = createEditFormDestinations(formData.destination);
  const pickDateFrom = getFormDateString(formData.dateFrom);
  const pickDateTo = getFormDateString(formData.dateTo);
  const offersByType = offers.filter((offer) => offer.type === formData.type)[0].offers;
  const pickedOffers = formData.offers;
  const isSubmitDisabled = isDateBefore(formData.dateTo, formData.dateFrom);
  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
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

              ${createEventListTemplate(formData.type, isDisabled)}

            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              ${createActivityListTemplate(formData.type, isDisabled)}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${capitalize(formData.type)} ${POINT_TYPE_PREFIXES[formData.type]}
          </label>
          <input 
            class="event__input  event__input--destination" 
            id="event-destination-1" 
            type="text" 
            name="event-destination" 
            value="${formData.destination.name}" 
            list="destination-list-1"
            ${isDisabled ? `disabled` : ``}
          >
          <datalist id="destination-list-1">
            ${createCitiesListTemplate(destinationNames)}
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
            ${isDisabled ? `disabled` : ``}
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
            ${isDisabled ? `disabled` : ``}
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
            value="${formData.basePrice}"
            min="0"
            ${isDisabled ? `disabled` : ``}
          >
        </div>

        <button 
          class="event__save-btn  btn  btn--blue"
          type="submit"
          ${isSubmitDisabled || isDisabled ? `disabled` : ``}
        >
        ${isSaving ? `Saving` : `Save`}
        </button>

        ${formType === FormType.EDIT ? createDeleteButton(isDisabled, isDeleting) : createCancelButton(isDisabled)}
        ${formType === FormType.EDIT ? createFavoriteButton(isDisabled, formData.isFavorite) : ``}

      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createFormOffersTemplate(offersByType, pickedOffers, isDisabled)}
          </div>
        </section>
      </section>
      ${destination}
    </form>`
  );
}

function createCancelButton(isDisabled) {
  return (
    `<button 
      class="event__reset-btn" 
      type="reset"
      ${isDisabled ? `disabled` : ``}
    >
    Cancel
  </button>`
  );
}

function createDeleteButton(isDisabled, isDeleting) {
  return (
    `<button 
      class="event__reset-btn" 
      type="reset"
      ${isDisabled ? `disabled` : ``}
    >
    ${isDeleting ? `Deleting` : `Delete`}
  </button>`
  );
}

function createFavoriteButton(isDisabled, isFavorite) {
  return (
    `<input
      id="event-favorite-1"
      class="event__favorite-checkbox  visually-hidden"
      type="checkbox"
      name="event-favorite"
      ${isFavorite ? `checked` : ``}
      ${isDisabled ? `disabled` : ``}
    >
    <label class="event__favorite-btn" for="event-favorite-1">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </label>`
  );
}

function createEditFormDestinations(destination) {
  if (!destination.description || destination.pictures.length === 0) {
    return ``;
  }
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

function createFormOffersTemplate(offers, pickedOffers, isDisabled) {
  return offers.map((offer) => {
    const isPicked = pickedOffers.some((pick) => pick.title === offer.title);
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden"
          id="event-offer-${offer.title}-1"
          type="checkbox"
          name="${offer.title}"
          value="${offer.price}"
          ${isPicked ? `checked` : ``}
          ${isDisabled ? `disabled` : ``}
        >
        <label 
          class="event__offer-label"
          for="event-offer-${offer.title}-1"
        >
          <span class="event__offer-title">
            ${offer.title}
          </span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">
          ${offer.price}
          </span>
        </label>
      </div>`
    );
  }).join(``);
}

function createCitiesListTemplate(destinationNames) {
  return destinationNames.map((city) => {
    return (
      `<option value="${city}"></option>`
    );
  }).join(``);
}

function createEventListTemplate(selectedType, isDisabled) {
  return TRANSPORT_TYPES
    .map((type) => {
      return (
        `<div class="event__type-item">
          <input
                id="event-type-${type}-1"
                class="event__type-input visually-hidden"
                type="radio"
                name="event-type"
                value="${type}"
                ${selectedType === type.toLowerCase() ? `checked` : ``}
                ${isDisabled ? `disabled` : ``}
          >
          <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}-1">${type}</label>
        </div>`
      );
    }).join(``);
}

function createActivityListTemplate(selectedType, isDisabled) {
  return ACTIVITY_TYPES.map((type) => {
    return (
      `<div class="event__type-item">
        <input
              id="event-type-${type}-1"
              class="event__type-input visually-hidden"
              type="radio"
              name="event-type"
              value="${type}"
              ${selectedType === type.toLowerCase() ? `checked` : ``}
              ${isDisabled ? `disabled` : ``}
        >
        <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}-1">${type}</label>
      </div>`
    );
  }).join(``);
}

function createPicturesTemplate(pictures) {
  return pictures.map((pic) => {
    return (
      `<img
        class="event__photo"
        src="${pic.src}"
        alt="Event photo">
      </img>`
    );
  }).join(``);
}


export default class PointFormView extends SmartView {
  constructor(point, offers, destinations, formType = FormType.EDIT) {
    super();
    this._data = PointFormView.parsePointToData(point);
    this._offers = offers;
    this._destinations = destinations;
    this._formType = formType;
    this._datePicker = null;

    this._bindInnerHandlers();
    this._setInnerHandlers();

  }

  reset(point) {
    this.updateData(PointFormView.parsePointToData(point));
  }

  setDeleteClickHandler(cb) {
    this._callbacks.delete = cb;
  }

  setSubmitClickHandler(cb) {
    this._callbacks.submit = cb;
  }

  validateForm() {
    const destinationInput = this.getElement()
      .querySelector(`.event__input--destination`);
    this._validateDestination(destinationInput);
  }

  _bindInnerHandlers() {
    this._submitClickHandler = this._submitClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._eventTypeClickHandler = this._eventTypeClickHandler.bind(this);
    this._dateInputChangeHandler = this._dateInputChangeHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  _dateInputChangeHandler(selectedDate, dateStr, self) {
    switch (self.input.name) {
      case (`event-start-time`):
        this.updateData(this._data.formData.dateFrom = selectedDate[0]);
        break;
      case (`event-end-time`):
        this.updateData(this._data.formData.dateTo = selectedDate[0]);
        break;
    }
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.delete(this._data);
  }

  _destinationChangeHandler(evt) {
    this._validateDestination(evt.target);
  }

  _favoriteClickHandler(evt) {
    this._data.formData.isFavorite = evt.target.checked;
    this.updateData(this._data, true);
  }

  _eventTypeClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains(`event__type-input`)) {
      this._data.formData.type = (evt.target.value).toLowerCase();
      this._data.formData.offers = [];
      this.updateData(this._data);
    }
    this.validateForm();
  }

  _getTemplate() {
    return createEventEditFormTemplate(
        this._data,
        this._offers,
        this._destinations.names,
        this._formType
    );
  }

  _offersChangeHandler(evt) {
    const isPicked = evt.target.checked;
    const title = evt.target.name;
    const price = evt.target.value ? parseInt(evt.target.value, 10) : 0;
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

  _priceChangeHandler(evt) {
    this._data.formData.basePrice = parseInt(evt.target.value, 10);
    this.updateData(this._data, true);
  }

  _restoreHandlers() {
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    const self = this.getElement();
    this._setDatePicker();

    if (this._formType === FormType.EDIT) {
      self
      .querySelector(`.event__favorite-checkbox`)
      .addEventListener(`click`, this._favoriteClickHandler);
    }

    self
      .querySelector(`.event__type-list`)
      .addEventListener(`change`, this._eventTypeClickHandler);
    self
      .querySelector(`.event__input--price`)
      .addEventListener(`change`, this._priceChangeHandler);
    self
      .querySelector(`.event__section--offers`)
      .addEventListener(`change`, this._offersChangeHandler);
    self
      .addEventListener(`submit`, this._submitClickHandler);
    self
      .querySelector(`.event__reset-btn`)
      .addEventListener(`click`, this._deleteClickHandler);
    self
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._destinationChangeHandler);
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
          dateFormat: FORM_FLATPICKR_DATE_FORMAT,
          onChange: this._dateInputChangeHandler
        }
    );
  }

  _submitClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.submit(PointFormView.parseDataToPoint(this._data));
  }

  _validateDestination(inputField) {
    const isValidCity = this._destinations.names
        .some((name) => name === inputField.value);

    if (isValidCity) {
      const selectedDesctination = this._destinations.all
        .filter((dest) => dest.name === inputField.value);
      this._data.formData.destination = selectedDesctination[0];
      this.updateData(this._data);
      inputField.setCustomValidity(``);
    } else {
      inputField.setCustomValidity(`Select one of cities from dropdown list`);
    }
  }

  static parsePointToData(point) {
    return Object.assign(
        {},
        point,
        {
          formData: {
            basePrice: point.basePrice,
            isFavorite: point.isFavorite,
            dateFrom: point.dateFrom,
            dateTo: point.dateTo,
            type: point.type,
            offers: point.offers.slice(),
            destination: Object.assign({}, point.destination)
          },
          state: {
            isDisabled: false,
            isSaving: false,
            isDeleting: false,
          }
        }
    );
  }

  static parseDataToPoint(data) {
    const point = Object.assign(
        {},
        data,
        data.formData
    );

    delete point.state;
    delete point.formData;
    return point;
  }
}
