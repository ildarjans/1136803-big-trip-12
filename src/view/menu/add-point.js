import AbstractView from '../abstract.js';

export default class AddPointView extends AbstractView {
  constructor() {
    super();

    this._addPointHandler = this._addPointHandler.bind(this);
  }

  disableButton() {
    this.getElement.disable = true;
  }

  enableButton() {
    this.getElement.disable = false;
  }

  setAddPointClickHandler(cb) {
    this._callbacks.addPoint = cb;
    this.getElement()
    .addEventListener(`click`, this._addPointHandler);
  }

  removeAddPointClickHandler() {
    this.getElement().removeEventListener(`click`, this._addPointHandler);
  }

  _addPointHandler() {
    this._callbacks.addPoint();
  }

  _getTemplate() {
    return (
      `<button 
        class="trip-main__event-add-btn  btn  btn--big  btn--yellow"
        type="button"
      >
        New event
      </button>`
    );
  }
}
