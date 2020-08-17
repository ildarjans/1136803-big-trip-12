import {MOCK_TRIP_LENGTH} from './consts.js';
import {render} from './utils/common.js';
import {sortTripsByDate, isSameDate} from './utils/date.js';
import {createControlsTemplate} from './view/menu.js';
import {createDaysContainerTemplate} from './view/days-container.js';
import {createDayItemTemplate} from './view/day-item.js';
import {createEventListTemplate} from './view/event-list.js';
import {createEventItemTemplate} from './view/event-item.js';
import {createEventEditFormTemplate} from './view/event-edit-form.js';
import {createSortTemplate} from './view/event-sort.js';
import {genereteMockTrips} from './mock/trip.js';

const header = document.querySelector(`.page-header__container`);
const tripMain = header.querySelector(`.trip-main`);
tripMain.querySelector(`.trip-main__trip-controls`).remove();
render(tripMain, createControlsTemplate(), `afterbegin`);

const trips = Array(MOCK_TRIP_LENGTH).fill().map(() => genereteMockTrips());

const main = document.querySelector(`.page-body__page-main`);
const tripEvents = main.querySelector(`.trip-events`);
render(tripEvents, createSortTemplate());
renderTrips(trips);

function renderTrips(tripsArr) {
  if (!tripsArr.length) {
    return; // render empty message
  }
  const sortedTrips = sortTripsByDate(tripsArr.slice());

  // tripEvent --> daysContainer --> dayContainer --> eventContainer
  const daysContainer = getDOMElement(createDaysContainerTemplate());
  let lastDay;
  let dayItem;
  let eventsList;
  let daysCounter = 0;

  sortedTrips.forEach((trip, index) => {
    const tripDay = trip.schedule.start;

    // is same day add new events
    if (!isSameDate(lastDay, tripDay)) {
      daysCounter++;
      dayItem = getDOMElement(createDayItemTemplate(tripDay, daysCounter)); // new day element
      eventsList = getDOMElement(createEventListTemplate()); // new event list element
      dayItem.append(eventsList);
      daysContainer.append(dayItem);
      lastDay = tripDay;
    }
    // temperary statement
    const eventItem = index === 0 ?
      getDOMElement(createEventEditFormTemplate(trip)) :
      getDOMElement(createEventItemTemplate(trip));
    eventsList.append(eventItem);

  });

  tripEvents.append(daysContainer);
}

function getDOMElement(content) {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = content;
  return wrapper.firstChild;
}
