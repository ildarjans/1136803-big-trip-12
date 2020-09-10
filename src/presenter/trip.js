import {EVENT_MESSAGES, SortType} from '../consts.js';
import DaysListView from '../view/day/list.js';
import DayItemView from '../view/day/item.js';
import EventSortView from '../view/event/sort.js';
import EventListView from '../view/event/list.js';
import EventMessageView from '../view/event/message.js';
import EventPresenter from './event.js';
import {isSameDate} from '../utils/date.js';
import {
  sortTripsByDate,
  sortEventsByPrice,
  sortEventsByTime
} from '../utils/trip.js';
import {
  renderLastPlaceElement,
  updateItem,
  removeElement
} from '../utils/render.js';

export default class TripPresenter {
  constructor(eventsContainer) {
    this._trips = null;
    this._sourceTrips = null;
    this._eventsContainer = eventsContainer;

    this._eventSort = new EventSortView();
    this._eventEmptyMessage = new EventMessageView(EVENT_MESSAGES.EMPTY);
    this._daysList = null;
    this._dayItem = null;
    this._eventList = null;

    this._sort = SortType.DEFAULT;
    this._eventPresenter = {};
  }

  init(trips) {
    this._trips = trips.sort(sortTripsByDate);
    this._sourceTrips = this._trips.slice();

    if (!this._trips) {
      this._renderEmptyMessage();
      return;
    }

    this._bindInnerHandlers();
    this._setInnerHandlers();

    this._renderSort();
    this._renderTrips();

  }

  _bindInnerHandlers() {
    this._changeData = this._changeData.bind(this);
    this._changeMode = this._changeMode.bind(this);
    this._sortClickHandler = this._sortClickHandler.bind(this);
  }

  _setInnerHandlers() {
    this._eventSort.setSortClickHandler(this._sortClickHandler);
  }

  _renderTrips() {
    this._daysList = new DaysListView();
    const displayDayInfo = this._sort === SortType.DEFAULT;
    let lastDay = null;
    let dayCounter = 0;
    this._trips.forEach((trip) => {
      let tripDay = trip.point.date_from;

      if (!isSameDate(lastDay, tripDay)) {
        dayCounter++;
        this._dayItem = new DayItemView(tripDay, dayCounter, displayDayInfo);
        this._eventList = new EventListView();

        this._renderDayItem();
        this._renderEventList();
        lastDay = tripDay;
      }

      this._setEventComponent(trip);

    });
    renderLastPlaceElement(this._eventsContainer, this._daysList);
  }

  _setEventComponent(trip) {
    const eventPresenter = new EventPresenter(
        this._eventList,
        this._changeData,
        this._changeMode
    );
    this._eventPresenter[trip.point.id] = eventPresenter;
    eventPresenter.init(trip);
  }

  _changeData(updatedTrip) {
    this._trips = updateItem(this._trips, updatedTrip);
    const id = updatedTrip.point.id;
    this._eventPresenter[id].init(updatedTrip);
  }

  _changeMode() {
    Object.values(this._eventPresenter)
      .forEach((presenter) => presenter.resetViewMode());
  }

  _sortClickHandler(type) {
    if (this._sort === type) {
      return;
    }

    switch (type) {
      case SortType.PRICE:
        this._trips.sort(sortEventsByPrice);
        break;
      case SortType.TIME:
        this._trips.sort(sortEventsByTime);
        break;
      default:
        this._trips = this._sourceTrips;
    }

    this._sort = type;
    this._resetDayListComponents();
    this._renderTrips();
  }

  _resetDayListComponents() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetEvent());
    removeElement(this._daysList);
    this._eventPresenter = {};
  }

  _renderSort() {
    renderLastPlaceElement(this._eventsContainer, this._eventSort);
  }

  _renderEmptyMessage() {
    renderLastPlaceElement(this._eventsContainer, this._eventEmptyMessage);
  }

  _renderDaysList() {
    renderLastPlaceElement(this._eventsContainer, this._daysList);
  }

  _renderDayItem() {
    renderLastPlaceElement(this._daysList, this._dayItem);
  }

  _renderEventList() {
    renderLastPlaceElement(this._dayItem, this._eventList);
  }

}
