import AbstractView from '../abstract.js';

export default class PointListView extends AbstractView {
  _getTemplate() {
    return (
      `<ul class="trip-events__list">
      </ul>`
    );
  }
}
