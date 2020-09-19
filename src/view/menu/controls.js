import AbstractView from '../abstract.js';
import {FilterType} from '../../consts.js';

function getTabsTemplate() {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
  );
}

function getFiltersTemplate(currentType) {
  const filters = Object.values(FilterType).map((type) => {
    return (
      `<div class="trip-filters__filter">
        <input 
          id="filter-${type}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="${type}"
          ${type === currentType ? `checked` : ``}
        >
        <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
      </div>`
    );
  });
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filters.join(``)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
  );
}

export default class MenuControlsView extends AbstractView {
  constructor(currentFilter) {
    super();
    this._currentFilter = currentFilter;

    this._filterChangeHandler = this._filterChangeHandler.bind(this);
  }

  setFilterChangeHandler(cb) {
    this._callbacks.filterChange = cb;
    this.getElement()
      .addEventListener(`change`, this._filterChangeHandler);
  }

  _filterChangeHandler(evt) {
    evt.preventDefault();
    this._callbacks.filterChange(evt.target.value);
  }

  _getTemplate() {
    return (
      `<div class="trip-main__trip-controls  trip-controls">
        <h2 class="visually-hidden">Switch trip view</h2>
          ${getTabsTemplate()}
        <h2 class="visually-hidden">Filter events</h2>
          ${getFiltersTemplate(this._currentFilter)}
      </div>`
    );
  }
}
