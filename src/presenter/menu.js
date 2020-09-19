import MenuControlsView from '../view/menu/controls.js';
import MenuInfoView from '../view/menu/info.js';

import {
  renderFirstPlaceElement,
} from '../utils/render.js';

export default class MenuPresenter {
  constructor(headerContainer) {
    this._headerContainer = headerContainer;

    this._menuControls = new MenuControlsView();
    this._menuInfo = new MenuInfoView();
  }

  init() {
    this._renderMenu();
  }

  _renderMenu() {
    renderFirstPlaceElement(this._headerContainer, this._menuControls);
    renderFirstPlaceElement(this._headerContainer, this._menuInfo);
  }
}
