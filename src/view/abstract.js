import {createDOMElement} from '../utils/render.js';
import {SHAKE_ANIMATION_TIMEOUT} from '../consts.js';

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

  shake(callback) {
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = ``;
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
