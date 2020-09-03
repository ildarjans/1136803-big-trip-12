import {EVENT_MESSAGES} from '../consts.js';
import DaysListView from '../view/day/list.js';
import DayItemView from '../view/day/item.js';
import EventSortView from '../view/event/sort.js';
import EventListView from '../view/event/list.js';
import EventMessageView from '../view/event/message.js';
import EventPresenter from './event.js';
import {sortTripsByDate, isSameDate} from '../utils/date.js';
import {
  renderLastPlaceElement,
} from '../utils/render.js';


export default class TripPresenter {
  constructor(eventsContainer) {
    // DOMElements
    this._eventsContainer = eventsContainer;

    // trip components
    this._eventSort = new EventSortView();
    this._eventEmptyMessage = new EventMessageView(EVENT_MESSAGES.EMPTY);
    this._daysList = new DaysListView();
    this._dayItem = null;
    this._eventList = null;

    this._eventPresenter = [];

    // closure variables
    this._dayCounter = 0;
    this._tripDay = null;
    this._trips = null;
    this._lastDay = null;
  }

  init(trips) {
    this._trips = sortTripsByDate(trips);

    if (!this._trips) {
      this._renderEmptyMessage();
      return;
    }

    this._renderSort();

    this._trips.forEach((trip) => {
      this._tripDay = trip.schedule.start;

      if (!isSameDate(this._lastDay, this._tripDay)) {
        this._dayCounter++;
        this._dayItem = new DayItemView(this._tripDay, this._dayCounter);
        this._eventList = new EventListView();

        this._renderDayItem();
        this._renderEventList();
        this._lastDay = this._tripDay;
      }

      const presenter = new EventPresenter(this._eventList);
      this._eventPresenter.push(presenter);
      presenter.init(trip);

    });

    renderLastPlaceElement(this._eventsContainer, this._daysList);

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
