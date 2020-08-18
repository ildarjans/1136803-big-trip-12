import {createDOMElement} from '../utils/render.js';
function createDaysContainerTemplate() {
  return (
    `<ul class="trip-days">
    </ul>`
  );
}

export default class DaysList {
  constructor() {
    this._element = null;
  }
  _getTemplate() {
    return createDaysContainerTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createDOMElement(this._getTemplate());
    }
    return this._element;
  }

  resetElement() {
    this._element = null;
  }
}
