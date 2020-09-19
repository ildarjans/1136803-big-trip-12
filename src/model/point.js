import Observer from '../utils/observer.js';
import {sortTripsByDate} from '../utils/trip.js';
export default class PointModel extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  getPoints() {
    return this._points.slice();
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((trip) => trip.point.id === update.point.id);

    if (index === -1) {
      return;
    }

    this._points.splice(index, 1);

    this._notify(updateType);
  }

  setPoints(points) {
    this._points = points.slice().sort(sortTripsByDate);
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((trip) => trip.point.id === update.point.id);

    if (index === -1) {
      return;
    }

    this._points.splice(index, 1, update);

    this._notify(updateType, update);

  }

}
