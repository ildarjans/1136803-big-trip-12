import {createDOMElement} from '../utils/render.js';

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`It's Abstract class. Only on child extending`);
    }
    this._element = null;
    this._callbacks = {};
  }
  _getTemplate() {
    throw new Error(`Abstract class. Don't implement _getTemplate method`);
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
