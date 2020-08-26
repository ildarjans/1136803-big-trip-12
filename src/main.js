import {getTripsArray} from './mock/trip.js';
import TripPresenter from './presenter/trip.js';
import MenuPresenter from './presenter/menu.js';

const tripMain = document.querySelector(`.page-header__container .trip-main`);
const tripEvents = document.querySelector(`.page-body__page-main .trip-events`);
const tripPresenter = new TripPresenter(tripEvents);
const menuPresenter = new MenuPresenter(tripMain);

const trips = getTripsArray();

menuPresenter.init();
tripPresenter.init(trips);
