const DAY_LIMIT_EVENTS = 3;

import {createControlsTemplate} from './tripMenu.js';
import {createDaysContainerTemplate} from './tripDays.js';
import {
  createEventItemTemplate,
  createEventContentTemplate,
  createEventEditFormTemplate,
  createEventsSortTemplate
} from './tripEvents.js';

const header = document.querySelector(`.page-header__container`);
const tripMain = header.querySelector(`.trip-main`);
tripMain.querySelector(`.trip-main__trip-controls`).remove();
tripMain.insertAdjacentHTML(`afterbegin`, createControlsTemplate());

const main = document.querySelector(`.page-body__page-main`);
const tripEvents = main.querySelector(`.trip-events`);

tripEvents.insertAdjacentHTML(`beforeend`, createEventsSortTemplate());
tripEvents.insertAdjacentHTML(`beforeend`, createDaysContainerTemplate());

const dayEvents = tripEvents.querySelector(`.trip-days__item .trip-events__list`);
dayEvents.insertAdjacentHTML(`beforeend`, createEventItemTemplate(createEventEditFormTemplate));
// or createEditFormTemplate(createEditFormTemplate.bind(null, false)) if need form without images
for (let i = 0; i < DAY_LIMIT_EVENTS; i++) {
  dayEvents.insertAdjacentHTML(`beforeend`, createEventItemTemplate(createEventContentTemplate));
}
