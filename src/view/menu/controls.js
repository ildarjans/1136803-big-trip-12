import {createDOMElement} from '../../utils/render.js';

export default class MenuControlsView {
  constructor() {
    this._element = null;
  }
  _getTemplate() {
    return (
      `<div class="trip-main__trip-controls  trip-controls">
      </div>`
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
