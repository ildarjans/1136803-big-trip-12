import Observer from '../utils/observer.js';
import {FilterType} from '../consts.js';

export default class FilterModel extends Observer {
  constructor() {
    super();
    this._appliedFilter = FilterType.EVERYTHING;
  }

  getFilter() {
    return this._appliedFilter;
  }

  setFilter(updateType, filter) {
    this._appliedFilter = filter;
    this._notify(updateType, filter);
  }

}
