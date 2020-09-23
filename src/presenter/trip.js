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
import LoadingView from '../view/loading.js';

export default class TripPresenter {
  constructor(pointsContainer, pointModel, filterModel, api) {
    this._pointsContainer = pointsContainer;
    this._pointModel = pointModel;
    this._filterModel = filterModel;
    this._api = api;

    this._pointSortComponent = null;
    this._emptyMessageComponent = null;
    this._daysListComponent = null;
    this._dayItemComponent = null;
    this._pointListComponent = null;
    this._loadingComponent = null;

    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;
    this._pointPresenter = {};
    this._menuPresenter = null;


    this._bindInnerHandlers();

    this._newPointPresenter = new NewPointPresenter(
        this._pointsContainer,
        this._filterModel,
        this._changeData,
        this._changeMode
    );
  }

  init() {
    this._renderTrip();

    this._pointModel.addObserver(this._modelEventHandler);
    this._filterModel.addObserver(this._modelEventHandler);

  }

  createPoint(enableButton) {
    this._newPointPresenter.init(enableButton);
  }

  destroy() {
    if (this._emptyMessageComponent) {
      removeElement(this._emptyMessageComponent);
    }

    this._clearDaysList({resetSortType: true});

    removeElement(this._daysListComponent);

    this._pointModel.removeObserver(this._modelEventHandler);
    this._filterModel.removeObserver(this._modelEventHandler);

  }

  getContainer() {
    return this._pointsContainer;
  }

  setMenuPresenter(menuPresenter) {
    this._menuPresenter = menuPresenter;
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

  _renderLoadingComponent() {
    this._loadingComponent = new LoadingView();
    renderLastPlaceElement(this._pointsContainer, this._loadingComponent);
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoadingComponent();
      return;
    }

    const points = this._getPoints();
    const offers = this._pointModel.getOffers();
    const destinations = this._pointModel.getDestinations();

    if (!points) {
      this._renderEmptyMessage();
      return;
    }

    this._renderSort();

    this._daysListComponent = new DaysListView();
    let lastDay = null;
    let dayCounter = 0;

    points.forEach((point) => {
      let tripDay = point.dateFrom;

      if (!isSameDate(lastDay, tripDay)) {
        dayCounter++;
        this._dayItemComponent = new DayItemView(tripDay, dayCounter);
        this._pointListComponent = new PointListView();

        this._renderDayItem();
        this._renderEventList();
        lastDay = tripDay;
      }

      this._setPointComponent(point, offers, destinations);

    });

    if (this._menuPresenter) {
      this._menuPresenter.activateMenu();
    }

    renderLastPlaceElement(this._pointsContainer, this._daysListComponent);
  }

  _setPointComponent(point, offers, destinations) {
    const pointPresenter = new PointPresenter(
        this._pointListComponent,
        this._changeData,
        this._changeMode,
        offers,
        destinations
    );
    this._pointPresenter[point.id] = pointPresenter;
    pointPresenter.init(point);
  }

  _changeData(actionType, updateType, updatedPoint) {
    switch (actionType) {
      case UserAction.ADD_POINT:
        this._pointModel.addPoint(updateType, updatedPoint);
        break;
      case UserAction.UPDATE_POINT:
        this._api.updatePoint(updatedPoint)
        .then((response) => {
          this._pointModel.updatePoint(updateType, response);
        });
        break;
      case UserAction.DELETE_POINT:
        this._pointModel.deletePoint(updateType, updatedPoint);
        break;
    }
  }

  _changeMode() {
    Object.values(this._pointPresenter)
      .forEach((presenter) => presenter.setDefaultMode());

    this._newPointPresenter.destroy();
  }

  _sortClickHandler(type) {
    if (this._currentSortType === type) {
      return;
    }

    this._currentSortType = type;
    this._clearDaysList();
    this._renderTrip();
  }

  _clearDaysList({resetSortType = false, deactivateMenu = false} = {}) {
    if (deactivateMenu) {
      this._menuPresenter.deactivateMenu();
    }

    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetComponent());
    removeElement(this._daysListComponent);
    removeElement(this._pointSortComponent);
    this._pointPresenter = {};

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderSort() {
    this._pointSortComponent = null;
    this._pointSortComponent = new PointSortView(this._currentSortType);
    this._pointSortComponent.setSortClickHandler(this._sortClickHandler);
    renderLastPlaceElement(this._pointsContainer, this._pointSortComponent);
  }

  _renderEmptyMessage() {
    this._emptyMessageComponent = new PointMessageView(EVENT_MESSAGES.EMPTY);
    renderLastPlaceElement(this._pointsContainer, this._emptyMessageComponent);
  }

  _renderDaysList() {
    renderLastPlaceElement(this._pointsContainer, this._daysListComponent);
  }

  _renderDayItem() {
    renderLastPlaceElement(this._daysListComponent, this._dayItemComponent);
  }

  _renderEventList() {
    renderLastPlaceElement(this._dayItemComponent, this._pointListComponent);
  }

  _modelEventHandler(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearDaysList();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearDaysList({resetSortType: true, deactivateMenu: true});
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        removeElement(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }

}
