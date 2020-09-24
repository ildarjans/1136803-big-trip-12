import MenuFiltersView from '../view/menu/filters.js';
import {
  removeElement,
  replaceDOMElement,
  renderLastPlaceElement,
} from '../utils/render.js';
import {UpdateType, FilterType} from '../consts.js';
import {
  isDayBefore,
  isDayAfter,
} from '../utils/date.js';

export default class FilterPresenter {
  constructor(container, pointModel, filterModel) {
    this._container = container;
    this._filterModel = filterModel;
    this._pointModel = pointModel;

    this._activeFilter = null;
    this._filterComponent = null;

    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._modelEventHandler = this._modelEventHandler.bind(this);

    this._filterModel.addObserver(this._modelEventHandler);
    this._pointModel.addObserver(this._modelEventHandler);
  }

  init() {
    this._activeFilter = this._filterModel.getFilter();
    const prevComponent = this._filterComponent;
    this._filterComponent = new MenuFiltersView(this._activeFilter);
    this._filterComponent.setFilterChangeHandler(this._filterChangeHandler);

    if (!prevComponent) {
      renderLastPlaceElement(this._container, this._filterComponent);
      return;
    }

    replaceDOMElement(this._filterComponent, prevComponent);
    removeElement(prevComponent);
  }

  _filterChangeHandler(filterType) {
    if (this._activeFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _modelEventHandler() {
    this.init();
  }

  static getFilteredPoints(points, type) {
    switch (type) {
      case FilterType.EVERYTHING:
        return points;
      case FilterType.PAST:
        return points.filter((point) => isDayBefore(point.dateTo));
      case FilterType.FUTURE:
        return points.filter((point) => isDayAfter(point.dateFrom));
      default:
        return points;
    }
  }
}
