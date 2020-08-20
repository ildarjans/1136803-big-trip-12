import {createDOMElement} from '../../utils/render.js';

export default class DaysListView {
  constructor() {
    this._element = null;
  }
  _getTemplate() {
    return (
      `<ul class="trip-days">
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
