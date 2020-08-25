import AbstractView from '../abstract.js';

export default class EventListView extends AbstractView {
  _getTemplate() {
    return (
      `<ul class="trip-events__list">
      </ul>`
    );
  }
}
