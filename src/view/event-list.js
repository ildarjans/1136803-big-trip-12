import {createDOMElement} from '../utils/render.js';
function createEventListTemplate() {
  return (
    `<ul class="trip-events__list">

    </ul>
   `
  );
}

export default class EventList {
  constructor() {
    this._element = null;
  }
  _getTemplate() {
    return createEventListTemplate(this._trip);
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
