import {getTripsArray} from './mock/trip.js';
import TripPresenter from './presenter/trip.js';

const tripMain = document.querySelector(`.page-header__container .trip-main`);
const tripEvents = document.querySelector(`.page-body__page-main .trip-events`);
const presenter = new TripPresenter(tripMain, tripEvents);

const trips = getTripsArray();

presenter.init(trips);
