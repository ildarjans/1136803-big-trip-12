import {MOCK_TRIP_LENGTH} from './consts.js';
import {genereteMockTrips} from './mock/trip.js';

import TripPresenter from './presenter/presenter.js';

const tripMain = document.querySelector(`.page-header__container .trip-main`);
const tripEvents = document.querySelector(`.page-body__page-main .trip-events`);
const presenter = new TripPresenter(tripMain, tripEvents);

const trips = Array(MOCK_TRIP_LENGTH)
  .fill()
  .map(() => genereteMockTrips());

presenter.init(trips);
