import {DAY_LIMIT_EVENTS, MOCK_TRIP_LENGTH} from './consts.js';
import {render} from './utils.js';
import {createControlsTemplate} from './view/menu.js';
import {createDaysContainerTemplate} from './view/days.js';
import {createEventItemTemplate} from './view/event-item.js';
import {createEventContentTemplate} from './view/event-content.js';
import {createEventEditFormTemplate} from './view/event-edit-form.js';
import {createSortTemplate} from './view/event-sort.js';
import {genereteMockTrips} from './mock/trip.js';

const header = document.querySelector(`.page-header__container`);
const tripMain = header.querySelector(`.trip-main`);
tripMain.querySelector(`.trip-main__trip-controls`).remove();
render(tripMain, createControlsTemplate(), `afterbegin`);

const trips = Array(MOCK_TRIP_LENGTH).fill().map(() => genereteMockTrips());

console.log(trips);

const main = document.querySelector(`.page-body__page-main`);
const tripEvents = main.querySelector(`.trip-events`);
render(tripEvents, createSortTemplate());
render(tripEvents, createDaysContainerTemplate());

const dayEvents = tripEvents.querySelector(`.trip-days__item .trip-events__list`);
render(dayEvents, createEventItemTemplate(createEventEditFormTemplate));

// or createEditFormTemplate(createEditFormTemplate.bind(null, false)) if need form without images
for (let i = 0; i < DAY_LIMIT_EVENTS; i++) {
  render(dayEvents, createEventItemTemplate(createEventContentTemplate));
}
