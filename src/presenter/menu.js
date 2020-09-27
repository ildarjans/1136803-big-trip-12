import MenuControlsView from '../view/menu/controls.js';
import FilterPresenter from '../presenter/filter.js';
import StatsPresenter from '../presenter/stats.js';
import MenuTabsView from '../view/menu/tabs.js';
import AddPointView from '../view/menu/add-point.js';

import {
  renderFirstPlaceElement,
  renderLastPlaceElement,
  renderAfterFirstChild
} from '../utils/render.js';
import {MenuTabs} from '../consts.js';

export default class MenuPresenter {
  constructor(menuContainer, tripPresenter, pointModel, filterModel) {
    this._container = menuContainer;
    this._tripPresenter = tripPresenter;
    this._pointModel = pointModel;
    this._filterModel = filterModel;
    this._activeTabMenu = MenuTabs.TABLE;

    this._menuControls = new MenuControlsView();
    this._filterPresenter = new FilterPresenter(this._menuControls, this._pointModel, this._filterModel);
    this._menuTabs = new MenuTabsView();
    this._addEventButton = new AddPointView();
    this._statsPresenter = new StatsPresenter(this._tripPresenter.container, this._pointModel, this._filterModel);

    this._addNewPointClickHandler = this._addNewPointClickHandler.bind(this);
    this._tabsClickHandler = this._tabsClickHandler.bind(this);

  }

  init() {
    this._renderMenu();
    this._filterPresenter.init();
  }

  _resetInnerHandlers() {
    this._addEventButton.removeAddPointClickHandler();
    this._menuTabs.removeControlTabsClickHandler();
  }

  _setInnerHandlers() {
    this._addEventButton.setAddPointClickHandler(this._addNewPointClickHandler);
    this._menuTabs.setControlTabsClickHandler(this._tabsClickHandler);
  }

  activateMenu() {
    this._setInnerHandlers();
  }

  deactivateMenu() {
    this._resetInnerHandlers();
  }

  _renderMenu() {
    renderAfterFirstChild(this._menuControls, this._menuTabs);
    renderFirstPlaceElement(this._container, this._menuControls);
    renderLastPlaceElement(this._container, this._addEventButton);
  }

  _addNewPointClickHandler() {
    this._tripPresenter.createPoint(this._addEventButton.enableButton);
    this._addEventButton.disableButton();
  }

  _tabsClickHandler(tabElement) {
    const tabName = tabElement.dataset.tabName;
    if (!tabName || this._activeTabMenu === tabName) {
      return;
    }

    switch (tabName) {
      case MenuTabs.TABLE:
        this._statsPresenter.destroy();
        this._tripPresenter.init();
        this._addEventButton.enableButton();
        break;
      case MenuTabs.STATS:
        this._tripPresenter.destroy();
        this._addEventButton.disableButton();
        this._statsPresenter.init();
        break;
    }
    this._activeTabMenu = tabName;
    this._menuTabs.toggleActiveTab(this._activeTabMenu);

  }

}
