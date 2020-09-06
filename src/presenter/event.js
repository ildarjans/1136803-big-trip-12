import EventItemView from '../view/event/item.js';
import EventFormView from '../view/event/edit-form.js';
import {
  renderLastPlaceElement,
  replaceDOMElement,
  removeElement,
  updateItem
} from '../utils/render.js';


export default class EventPresenter {
  constructor(eventsList, changeData) {
    // DOMElements
    this._eventsList = eventsList;
    this._changeData = changeData;
    this._trip = null;

    // trip components
    this._eventItemComponent = null;
    this._eventFormComponent = null;

  }

  init(trip) {
    this._trip = trip;
    const prevItemComponent = this._eventItemComponent;
    const prevFormComponent = this._eventFormComponent;

    this._eventItemComponent = new EventItemView(trip);
    this._eventFormComponent = new EventFormView(trip);

    this._bindInnerHandlers();
    this._setInnetHandlers();

    if (!prevItemComponent || !prevFormComponent) {
      renderLastPlaceElement(this._eventsList, this._eventItemComponent);
      return;
    }

    if (this._eventsList.getElement().contains(prevItemComponent.getElement())) {
      replaceDOMElement(this._eventItemComponent, prevItemComponent);
    }

    if (this._eventsList.getElement().contains(prevFormComponent.getElement())) {
      replaceDOMElement(this._eventFormComponent, prevFormComponent);
    }

    removeElement(prevItemComponent);
    removeElement(prevFormComponent);
  }

  _bindInnerHandlers() {
    this._windowEscHandler = this._windowEscHandler.bind(this);
    this._switchToEventForm = this._switchToEventForm.bind(this);
    this._switchToEventItem = this._switchToEventItem.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    // this._eventTypeClickHandler = this._eventTypeClickHandler.bind(this);
  }

  _setInnetHandlers() {
    this._eventItemComponent.setDropdownClickHandler(this._switchToEventForm);
    this._eventFormComponent.setSubmitClickHandler(this._switchToEventItem);
    this._eventFormComponent.setFavoriteClickHandler(this._favoriteClickHandler);
    // this._eventFormComponent.setEventTypeClickHandler(this._eventTypeClickHandler);
  }

  _windowEscHandler(evt) {
    if (evt.key === `Escape`) {
      this._switchToEventItem();
    }
  }

  _switchToEventForm() {
    replaceDOMElement(this._eventFormComponent, this._eventItemComponent);
    window.addEventListener(`keydown`, this._windowEscHandler);
  }

  _switchToEventItem() {
    replaceDOMElement(this._eventItemComponent, this._eventFormComponent);
    window.removeEventListener(`keydown`, this._windowEscHandler);
  }

  _favoriteClickHandler() {
    this._trip.point[`is_favorite`] = !this._trip.point[`is_favorite`];
    this._changeData(this._trip);
  }


}
