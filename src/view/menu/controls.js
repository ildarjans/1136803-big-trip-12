import AbstractView from '../abstract.js';

export default class MenuControlsView extends AbstractView {
  _getTemplate() {
    return (
      `<div class="trip-main__trip-controls  trip-controls">
        <h2 class="visually-hidden">Switch trip view</h2>
        <h2 class="visually-hidden">Filter events</h2>
      </div>`
    );
  }
}
