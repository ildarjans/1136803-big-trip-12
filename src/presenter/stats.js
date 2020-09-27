import StatsView from '../view/stats.js';

import {
  removeElement,
  renderLastPlaceElement,
} from '../utils/render.js';

export default class StatsPresenter {
  constructor(pointsContainer, pointModel, filterModel) {
    this._container = pointsContainer;
    this._pointModel = pointModel;
    this._filterModel = filterModel;

    this._statsComponent = null;

  }

  init() {
    this._statsComponent = new StatsView(this._pointModel.points);
    this._renderStats();
  }

  destroy() {
    if (!this._statsComponent) {
      return;
    }
    removeElement(this._statsComponent);
  }

  _renderStats() {
    renderLastPlaceElement(this._container, this._statsComponent);
  }

}
