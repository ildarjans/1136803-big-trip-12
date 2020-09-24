import PointFormView from '../view/point/edit-form.js';
import {generateId} from '../utils/common.js';
import {FilterType, UserAction, UpdateType} from '../consts.js';
import {
  removeElement,
  renderFirstPlaceElement,
} from '../utils/render.js';

export default class NewPointPresenter {
  constructor(container, filterModel, changeData, changeMode) {
    this._container = container;
    this._filterModel = filterModel;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointFormComponent = null;
    this._destroyCallback = null;
    this._bindInnerHandlers();

  }

  init(cb) {
    this._destroyCallback = cb;
    if (this._pointFormComponent) {
      return;
    }

    this._changeMode();
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    this._pointFormComponent = new PointFormView();
    this._pointFormComponent.setSubmitClickHandler(this._submitClickHandler);
    this._pointFormComponent.setDeleteClickHandler(this._deleteClickHandler);

    renderFirstPlaceElement(this._container, this._pointFormComponent);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (!this._pointFormComponent) {
      return;
    }

    if (this._destroyCallback) {
      this._destroyCallback();
    }

    removeElement(this._pointFormComponent);
    this._pointFormComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);

  }

  _bindInnerHandlers() {
    this._submitClickHandler = this._submitClickHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  _deleteClickHandler() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }

  _submitClickHandler(data) {
    data.point.id = generateId();
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MAJOR,
        data
    );

    this.destroy();
  }

}
