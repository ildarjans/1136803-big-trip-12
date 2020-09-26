import Observer from '../utils/observer.js';
import {sortTripsByDate} from '../utils/trip.js';
import {getDateISOString} from '../utils/date.js';

export default class PointModel extends Observer {
  constructor() {
    super();
    this._points = [];
    this._offers = [];
    this._destinations = [];
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

  getOffers() {
    return this._offers.slice();
  }

  getDestinations() {
    return this._destinations;
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      return;
    }

    this._points.splice(index, 1);

    this._notify(updateType);
  }

  setPoints(updateType, points) {
    this._points = points.sort(sortTripsByDate);

    this._notify(updateType);
  }

  setOffers(offers) {
    this._offers = offers;
  }

  setDestinations(destinations) {
    this._destinations = destinations;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === point.id);

    if (index === -1) {
      return;
    }

    this._points.splice(index, 1, update);

    this._notify(updateType, update);

  }


  static adaptDestinationsToClient(destinations) {
    return {
      names: destinations.map((destination) => destination.name),
      all: destinations
    };
  }

  static adaptPointToClient(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          basePrice: point[`base_price`],
          dateFrom: new Date(point[`date_from`]),
          dateTo: new Date(point[`date_to`]),
          isFavorite: point[`is_favorite`],
        }
    );

    delete adaptedPoint[`base_price`];
    delete adaptedPoint[`date_from`];
    delete adaptedPoint[`date_to`];
    delete adaptedPoint[`is_favorite`];

    return adaptedPoint;
  }

  static adaptPointToServer(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          [`base_price`]: point.basePrice,
          [`date_from`]: getDateISOString(point.dateFrom),
          [`date_to`]: getDateISOString(point.dateTo),
          [`is_favorite`]: point.isFavorite,
        }
    );
    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }

}
