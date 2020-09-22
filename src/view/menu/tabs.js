import AbstractView from '../abstract.js';
import {MenuTabs, TAB_ACTIVE_CLASS} from '../../consts.js';

function getTabsTemplate() {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" data-tab-name="${MenuTabs.TABLE}" href="#">${MenuTabs.TABLE}</a>
      <a class="trip-tabs__btn" data-tab-name="${MenuTabs.STATS}"href="#">${MenuTabs.STATS}</a>
    </nav>`
  );
}


export default class MenuTabsView extends AbstractView {
  constructor() {
    super();
    this._controlTabsClickHandler = this._controlTabsClickHandler.bind(this);
    this.toggleActiveTab = this.toggleActiveTab.bind(this);
  }

  setControlTabsClickHandler(cb) {
    this._callbacks.tabsClick = cb;
    this.getElement().addEventListener(`click`, this._controlTabsClickHandler);
  }

  toggleActiveTab(activeTabName) {
    this.getElement()
      .querySelectorAll(`.trip-tabs__btn`)
      .forEach((tab) => tab.dataset.tabName === activeTabName ?
        tab.classList.add(TAB_ACTIVE_CLASS) :
        tab.classList.remove(TAB_ACTIVE_CLASS));
  }

  _controlTabsClickHandler(evt) {
    if (evt.target.classList.contains(`trip-tabs__btn`)) {
      this._callbacks.tabsClick(evt.target);
    }
  }

  _getTemplate() {
    return getTabsTemplate();
  }
}
