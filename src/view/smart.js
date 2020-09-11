import AbstractView from './abstract.js';

export default class SmartView extends AbstractView {
  constructor() {
    super();
    this._data = {};
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.resetElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);
    prevElement = null;
    this._restoreHandlers();
  }

  updateData(update, justDataUpdate) {
    if (!update) {
      return;
    }

    Object.assign(this._data, update);

    if (justDataUpdate) {
      return;
    }

    this.updateElement();
  }

  _restoreHandlers() {
    throw new Error(`this method must re-define at instance of this class`);
  }

}
