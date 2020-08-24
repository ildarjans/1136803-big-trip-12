import Abstract from '../abstract.js';

export default class EventMessageView extends Abstract {
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
