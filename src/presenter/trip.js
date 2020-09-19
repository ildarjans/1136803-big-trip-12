import {EVENT_MESSAGES, UserAction, UpdateType, SortType} from '../consts.js';
import DaysListView from '../view/day/list.js';
import DayItemView from '../view/day/item.js';
import PointSortView from '../view/point/sort.js';
import PointListView from '../view/point/list.js';
import PointMessageView from '../view/point/message.js';
import PointPresenter from './point.js';
import NewPointPresenter from './new-point.js';
import {isSameDate} from '../utils/date.js';
import {
  sortEventsByPrice,
  sortEventsByTime
} from '../utils/trip.js';
import {
  renderLastPlaceElement,
  removeElement
} from '../utils/render.js';
import FilterPresenter from './filter.js';
import SortListView from '../../../taskmanager/src/view/sort-list.js';

export default class TripPresenter {
  constructor(pointsContainer, pointModel, filterModel) {
    this._pointsContainer = pointsContainer;
    this._pointModel = pointModel;
    this._filterModel = filterModel;

    this._pointSort = null;
    this._pointEmptyMessage = new PointMessageView(EVENT_MESSAGES.EMPTY);
    this._daysList = null;
    this._dayItem = null;
    this._pointList = null;

    this._currentSortType = SortType.DEFAULT;
    this._pointPresenter = {};

    this._bindInnerHandlers();

    this._newPointPresenter = new NewPointPresenter(
        this._pointsContainer,
        this._filterModel,

        this._changeData,
        this._changeMode);
  }

  init() {
    this._renderTrip();

    this._pointModel.addObserver(this._modelEventHandler);
    this._filterModel.addObserver(this._modelEventHandler);

  }
  createPoint(enableButton) {
    this._newPointPresenter.init(enableButton);
  }

  _bindInnerHandlers() {
    this._changeData = this._changeData.bind(this);
    this._changeMode = this._changeMode.bind(this);
    this._sortClickHandler = this._sortClickHandler.bind(this);
    this._modelEventHandler = this._modelEventHandler.bind(this);
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointModel.getPoints();
    const filteredPoints = FilterPresenter.getFilteredPoints(points, filterType);
    switch (this._currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(sortEventsByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortEventsByTime);
    }

    return filteredPoints;

  }

  _renderTrip() {
    const points = this._getPoints();

    if (!points) {
      this._renderEmptyMessage();
      return;
    }

    this._renderSort();

    this._daysList = new DaysListView();
    let lastDay = null;
    let dayCounter = 0;

    points.forEach((trip) => {
      let tripDay = trip.point.date_from;

      if (!isSameDate(lastDay, tripDay)) {
        dayCounter++;
        this._dayItem = new DayItemView(tripDay, dayCounter, true);
        this._pointList = new PointListView();

        this._renderDayItem();
        this._renderEventList();
        lastDay = tripDay;
      }

      this._setPointComponent(trip);

    });
    renderLastPlaceElement(this._pointsContainer, this._daysList);
  }

  _setPointComponent(trip) {
    const pointPresenter = new PointPresenter(
        this._pointList,
        this._changeData,
        this._changeMode
    );
    this._pointPresenter[trip.point.id] = pointPresenter;
    pointPresenter.init(trip);
  }

  _changeData(actionType, updateType, updatedPoint) {
    switch (actionType) {
      case UserAction.ADD_POINT:
        this._pointModel.addPoint(updateType, updatedPoint);
        break;
      case UserAction.UPDATE_POINT:
        this._pointModel.updatePoint(updateType, updatedPoint);
        break;
      case UserAction.DELETE_POINT:
        this._pointModel.deletePoint(updateType, updatedPoint);
        break;
    }
  }

  _changeMode() {
    Object.values(this._pointPresenter)
      .forEach((presenter) => presenter.setDefaultMode());
  }

  _sortClickHandler(type) {
    if (this._currentSortType === type) {
      return;
    }

    this._currentSortType = type;
    this._clearDaysList();
    this._renderTrip();
  }

  _clearDaysList(resetSortType) {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetComponent());
    removeElement(this._daysList);
    removeElement(this._pointSort);
    this._pointPresenter = {};

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderSort() {
    this._pointSort = null;
    this._pointSort = new PointSortView(this._currentSortType);
    this._pointSort.setSortClickHandler(this._sortClickHandler);
    renderLastPlaceElement(this._pointsContainer, this._pointSort);
  }

  _renderEmptyMessage() {
    renderLastPlaceElement(this._pointsContainer, this._pointEmptyMessage);
  }

  _renderDaysList() {
    renderLastPlaceElement(this._pointsContainer, this._daysList);
  }

  _renderDayItem() {
    renderLastPlaceElement(this._daysList, this._dayItem);
  }

  _renderEventList() {
    renderLastPlaceElement(this._dayItem, this._pointList);
  }

  _modelEventHandler(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.point.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearDaysList();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearDaysList(true);
        this._renderTrip();
        break;
    }
  }

}
