`use strict`;
const DAY_LIMIT_EVENTS = 3;

// trip-menu
const createControlsTemplate = window.tripMenu.createControlsTemplate;

// trip-days
const createDaysContainerTemplate = window.tripDays.createContainerTemplate;

// trip-events
const createEventTemplate = window.tripEvents.createItemTemplate; // arg : (createContent || createEditForm)
const createEventContentTemplate = window.tripEvents.createContentTemplate;
const createEditFormTemplate= window.tripEvents.createEditFormTemplate;
const createSortTemplate = window.tripEvents.createSortTemplate;

const header = document.querySelector(`.page-header__container`);
const tripMain = header.querySelector(`.trip-main`);
tripMain.querySelector(`.trip-main__trip-controls`).remove();
tripMain.insertAdjacentHTML('afterbegin', createControlsTemplate());

const main = document.querySelector(`.page-body__page-main`);
const tripEvents = main.querySelector(`.trip-events`);

tripEvents.insertAdjacentHTML(`beforeend`, createSortTemplate());
tripEvents.insertAdjacentHTML(`beforeend`, createDaysContainerTemplate());

const dayEvents = tripEvents.querySelector(`.trip-days__item .trip-events__list`);
dayEvents.insertAdjacentHTML('beforeend', createEventTemplate(createEditFormTemplate));
// or createEditFormTemplate(createEditFormTemplate.bind(null, false)) if need form without images
for (let i = 0; i < DAY_LIMIT_EVENTS; i++) {
  dayEvents.insertAdjacentHTML('beforeend', createEventTemplate(createEventContentTemplate));
}
