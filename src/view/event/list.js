import {createDOMElement} from '../../utils/render.js';

export default class EventListView {
  constructor() {
    this._element = null;
  }
  _getTemplate() {
    return (
      `<ul class="trip-events__list">
      </ul>`
    );
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
