import EventItemView from '../view/event/item.js';
import EventFormView from '../view/event/edit-form.js';
import {
  renderLastPlaceElement,
  replaceDOMElement,
  removeElement,
} from '../utils/render.js';
import {EventMode} from '../consts.js';


export default class EventPresenter {
  constructor(eventsList, changeData, changeMode) {
    this._eventsList = eventsList;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._trip = null;
    this._mode = EventMode.DEFAULT;

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

    switch (this._mode) {
      case EventMode.DEFAULT:
        replaceDOMElement(this._eventItemComponent, prevItemComponent);
        break;
      case EventMode.EDIT:
        replaceDOMElement(this._eventFormComponent, prevFormComponent);
        break;
    }

    removeElement(prevItemComponent);
    removeElement(prevFormComponent);
  }

  _bindInnerHandlers() {
    this._windowEscHandler = this._windowEscHandler.bind(this);
    this._switchToEventForm = this._switchToEventForm.bind(this);
    this._switchToEventItem = this._switchToEventItem.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  _setInnetHandlers() {
    this._eventItemComponent.setDropdownClickHandler(this._switchToEventForm);
    this._eventFormComponent.setSubmitClickHandler(this._switchToEventItem);
    this._eventFormComponent.setFavoriteClickHandler(this._favoriteClickHandler);
  }

  _windowEscHandler(evt) {
    if (evt.key === `Escape`) {
      this._switchToEventItem();
    }
  }

  _favoriteClickHandler() {
    this._trip.point[`is_favorite`] = !this._trip.point[`is_favorite`];
    this._changeData(this._trip);
  }

  _switchToEventForm() {
    replaceDOMElement(this._eventFormComponent, this._eventItemComponent);
    window.addEventListener(`keydown`, this._windowEscHandler);
    this._changeMode();
    this._mode = EventMode.EDIT;
  }

  _switchToEventItem() {
    replaceDOMElement(this._eventItemComponent, this._eventFormComponent);
    window.removeEventListener(`keydown`, this._windowEscHandler);
    this._mode = EventMode.DEFAULT;
  }

  resetViewMode() {
    if (this._mode === EventMode.EDIT) {
      this._switchToEventItem();
    }
  }

  resetEvent() {
    this._eventItemComponent.resetElement();
    this._eventFormComponent.resetElement();
  }

}
