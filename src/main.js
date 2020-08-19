import {MOCK_TRIP_LENGTH} from './consts.js';
import DaysList from './view/days-container.js';
import TripMenu from './view/menu.js';
import TripSort from './view/event-sort.js';
import DayItem from './view/day-item.js';
import EventList from './view/event-list.js';
import EventItem from './view/event-item.js';
import EventForm from './view/event-edit-form.js';
import {renderElement} from './utils/render.js';
import {sortTripsByDate, isSameDate} from './utils/date.js';
import {genereteMockTrips} from './mock/trip.js';

const header = document.querySelector(`.page-header__container`);
const tripMain = header.querySelector(`.trip-main`);
tripMain.querySelector(`.trip-main__trip-controls`).remove();
renderElement(tripMain, new TripMenu().getElement(), `afterbegin`);

const trips = Array(MOCK_TRIP_LENGTH).fill().map(() => genereteMockTrips());

const main = document.querySelector(`.page-body__page-main`);
const tripEvents = main.querySelector(`.trip-events`);
renderElement(tripEvents, new TripSort().getElement());
renderTrips(trips);

function renderTrips(tripsArr) {
  if (!tripsArr.length) {
    return; // render empty message
  }
  const sortedTrips = sortTripsByDate(tripsArr.slice());

  // tripEvent --> daysContainer --> dayContainer --> eventContainer
  const daysContainer = new DaysList().getElement();
  let lastDay;
  let dayItem;
  let eventsList;
  let daysCounter = 0;

  sortedTrips.forEach((trip) => {
    const tripDay = trip.schedule.start;

    // is same day add new events
    if (!isSameDate(lastDay, tripDay)) {
      daysCounter++;
      dayItem = new DayItem(tripDay, daysCounter).getElement();
      eventsList = new EventList().getElement();
      renderElement(dayItem, eventsList);
      renderElement(daysContainer, dayItem);
      lastDay = tripDay;
    }

    renderEventComponent(eventsList, trip);

  });

  renderElement(tripEvents, daysContainer);

}

function renderEventComponent(container, trip) {
  const eventItem = new EventItem(trip).getElement();
  const eventForm = new EventForm(trip).getElement();

  renderElement(container, eventItem);

  function switchToEventForm() {
    container.replaceChild(eventForm, eventItem);
  }

  function switchToEventItem() {
    container.replaceChild(eventItem, eventForm);
  }

  eventItem
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      switchToEventForm();
    });

  eventForm
    .querySelector(`form`)
    .addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      switchToEventItem();
    });

}

