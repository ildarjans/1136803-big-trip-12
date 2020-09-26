import AbstractView from '../abstract.js';

export default class PointItemView extends AbstractView {
  _getTemplate() {
    return (
      `<li class="trip-events__item">
      </li>`
    );
  }
}
