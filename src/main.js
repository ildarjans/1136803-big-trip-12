import {getTripsArray} from './mock/trip.js';
import PointModel from './model/point.js';
import FilterModel from './model/filter.js';
import TripPresenter from './presenter/trip.js';
import MenuPresenter from './presenter/menu.js';

const menuContainer = document.querySelector(`.page-header__container .trip-main`);
const tripContainer = document.querySelector(`.page-body__page-main .trip-events`);
const filterModel = new FilterModel();
const pointModel = new PointModel();
const tripPresenter = new TripPresenter(tripContainer, pointModel, filterModel);
const menuPresenter = new MenuPresenter(menuContainer, tripPresenter, pointModel, filterModel);

const trips = getTripsArray();

pointModel.setPoints(trips);

menuPresenter.init();
tripPresenter.init();
