import EventItemView from './item.js';
import EventFormView from './edit-form.js';
import {renderElement} from '../../utils/render.js';

export function renderEventComponent(container, trip) {
  const eventItem = new EventItemView(trip).getElement();
  const eventForm = new EventFormView(trip).getElement();

  renderElement(container, eventItem);

  function switchToEventForm() {
    container.replaceChild(eventForm, eventItem);
    window.addEventListener(`keydown`, windowEscHandler);
  }

  function switchToEventItem() {
    container.replaceChild(eventItem, eventForm);
    window.removeEventListener(`keydown`, windowEscHandler);
  }

  function windowEscHandler(evt) {
    if (evt.key === `Escape`) {
      switchToEventItem();
    }
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
