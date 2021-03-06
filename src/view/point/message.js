import AbstractView from '../abstract.js';

export default class PointMessageView extends AbstractView {
  constructor(message) {
    super();
    this._message = message;
  }
  _getTemplate() {
    return (
      `<p class="trip-events__msg">${this._message}</p>`
    );
  }
}
