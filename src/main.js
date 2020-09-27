import PointModel from './model/point.js';
import FilterModel from './model/filter.js';
import TripPresenter from './presenter/trip.js';
import MenuPresenter from './presenter/menu.js';
import Api from './api.js';
import {
  Url,
  AUTORIZATION_KEY,
  UpdateType
} from './consts.js';

const menuContainer = document.querySelector(`.page-header__container .trip-main`);
const tripContainer = document.querySelector(`.page-body__page-main .trip-events`);
const api = new Api(Url.SERVER, AUTORIZATION_KEY);
const filterModel = new FilterModel();
const pointModel = new PointModel();
const tripPresenter = new TripPresenter(tripContainer, pointModel, filterModel, api);
const menuPresenter = new MenuPresenter(menuContainer, tripPresenter, pointModel, filterModel);

menuPresenter.init();
tripPresenter.init();


Promise.all([
  api.getPoints(Url.POINTS),
  api.getOffers(Url.OFFERS),
  api.getDestinations(Url.DESTINATIONS)
])
  .then(([points, offers, destinations]) => {
    pointModel.offers = offers;
    pointModel.destinations = destinations;
    pointModel.setPoints(UpdateType.INIT, points);
    menuPresenter.activateMenu();
    tripPresenter.menuPresenter = menuPresenter;
  })
  .catch(() => {
    pointModel.offers = [];
    pointModel.destinations = [];
    pointModel.setPoints(UpdateType.INIT, []);
  });
