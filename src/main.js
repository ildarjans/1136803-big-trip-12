import {MOCK_TRIP_LENGTH, EVENT_MESSAGES} from './consts.js';
import DaysListView from './view/day/list.js';
import DayItemView from './view/day/item.js';
import MenuControlsView from './view/menu/controls.js';
import MenuFiltersView from './view/menu/filters.js';
import MenuTabsView from './view/menu/tabs.js';
import MenuInfoView from './view/menu/info.js';
import EventSortView from './view/event/sort.js';
import EventListView from './view/event/list.js';
import EventMessageView from './view/event/message.js';
import {renderEventComponent} from './view/event/render.js';
import {renderElement} from './utils/render.js';
import {sortTripsByDate, isSameDate} from './utils/date.js';
import {genereteMockTrips} from './mock/trip.js';

const header = document.querySelector(`.page-header__container`);
const tripMain = header.querySelector(`.trip-main`);
const menuControls = new MenuControlsView().getElement();
tripMain.querySelector(`.trip-main__trip-controls`).remove();
renderElement(menuControls, new MenuTabsView().getElement());
renderElement(menuControls, new MenuFiltersView().getElement());
renderElement(tripMain, menuControls, `afterbegin`);
renderElement(tripMain, new MenuInfoView().getElement(), `afterbegin`);

const trips = Array(MOCK_TRIP_LENGTH).fill().map(() => genereteMockTrips());

const main = document.querySelector(`.page-body__page-main`);
const tripEvents = main.querySelector(`.trip-events`);
renderTrips(trips);

function renderTrips(tripsArr) {
  if (!tripsArr.length) {
    // render empty message
    renderElement(
        tripEvents,
        new EventMessageView(EVENT_MESSAGES.EMPTY).getElement()
    );
    return;
  }
  renderElement(tripEvents, new EventSortView().getElement());
  const sortedTrips = sortTripsByDate(tripsArr.slice());

  // tripEvent --> daysContainer --> dayContainer --> eventContainer
  const daysContainer = new DaysListView().getElement();
  let eventsList;
  let lastDay;
  let dayItem;
  let daysCounter = 0;

  sortedTrips.forEach((trip) => {
    const tripDay = trip.schedule.start;

    // if not the same day, add new dayItem
    if (!isSameDate(lastDay, tripDay)) {
      daysCounter++;
      dayItem = new DayItemView(tripDay, daysCounter).getElement();
      eventsList = new EventListView().getElement();
      renderElement(dayItem, eventsList);
      renderElement(daysContainer, dayItem);
      lastDay = tripDay;
    }

    renderEventComponent(eventsList, trip);

  });

  renderElement(tripEvents, daysContainer);

}
