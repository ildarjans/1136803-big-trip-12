import Abstract from '../abstract.js';

export default class EventListView extends Abstract {
  _getTemplate() {
    return (
      `<ul class="trip-events__list">
      </ul>`
    );
  }
}
