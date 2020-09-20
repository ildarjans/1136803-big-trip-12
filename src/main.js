import {getTripsArray} from './mock/trip.js';
import PointModel from './model/point.js';
import FilterModel from './model/filter.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import MenuInfoView from './view/menu/info.js';
import AddPointView from './view/menu/add-point.js';
import {
  renderLastPlaceElement,
} from './utils/render.js';


const tripMain = document.querySelector(`.page-header__container .trip-main`);
const tripEvents = document.querySelector(`.page-body__page-main .trip-events`);
const menuInfoView = new MenuInfoView();
const addPointView = new AddPointView();
const filterModel = new FilterModel();
const pointModel = new PointModel();
const filterPresenter = new FilterPresenter(tripMain, pointModel, filterModel);
const tripPresenter = new TripPresenter(tripEvents, pointModel, filterModel);

const trips = getTripsArray();

renderLastPlaceElement(tripMain, menuInfoView);

pointModel.setPoints(trips);
tripPresenter.init();
filterPresenter.init();

renderLastPlaceElement(tripMain, addPointView);

addPointView.setAddPointClickHandler(addNewPointClickHandler);

function addNewPointClickHandler() {
  tripPresenter.createPoint(addPointView.enableButton);
  addPointView.disableButton();
}
