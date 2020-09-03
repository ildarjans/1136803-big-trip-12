import EventItemView from '../view/event/item.js';
import EventFormView from '../view/event/edit-form.js';
import {
  renderLastPlaceElement,
  replaceDOMElement,
  removeElement
} from '../utils/render.js';


export default class EventPresenter {
  constructor(eventsList) {
    // DOMElements
    this._eventsList = eventsList;
    this._trip = null;

    // trip components
    this._eventItemComponent = null;
    this._eventFormComponent = null;

    // handlers

  }

  init(trip) {
    this._trip = trip;
    const prevItemComponent = this._eventItemComponent;
    const prevFormComponent = this._eventFormComponent;

    this._eventItemComponent = new EventItemView(trip);
    this._eventFormComponent = new EventFormView(trip);

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

  _setInnetHandlers() {
    this._eventItemComponent.setClickHandler(this._switchToEventForm);
    this._eventFormComponent.setSubmitHandler(this._switchToEventItem);
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


}
