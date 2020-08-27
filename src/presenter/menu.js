import MenuControlsView from '../view/menu/controls.js';
import MenuFiltersView from '../view/menu/filters.js';
import MenuTabsView from '../view/menu/tabs.js';
import MenuInfoView from '../view/menu/info.js';

import {
  renderFirstPlaceElement,
  renderLastPlaceElement,
} from '../utils/render.js';

export default class MenuPresenter {
  constructor(headerContainer) {
    // DOMElement
    this._headerContainer = headerContainer;

    // menu components
    this._menuControls = new MenuControlsView();
    this._menuTabs = new MenuTabsView();
    this._menuFilters = new MenuFiltersView();
    this._menuInfo = new MenuInfoView();
  }

  init() {
    this._renderMenu();
  }

  _renderMenu() {
    renderLastPlaceElement(this._menuControls, this._menuTabs);
    renderLastPlaceElement(this._menuControls, this._menuFilters);
    renderFirstPlaceElement(this._headerContainer, this._menuControls);
    renderFirstPlaceElement(this._headerContainer, this._menuInfo);
  }
}
