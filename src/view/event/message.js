import {createDOMElement} from '../../utils/render.js';

export default class EventMessageView {
  constructor(message) {
    this._element = null;
    this._message = message;
  }
  _getTemplate() {
    return (
      `<p class="trip-events__msg">${this._message}</p>`
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
