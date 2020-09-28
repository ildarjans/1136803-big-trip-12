
import PointFormView from '../view/point/edit-form.js';
import {
  FormType,
  FilterType,
  UserAction,
  UpdateType,
  BLANK_EVENT
} from '../consts.js';
import {
  removeElement,
  renderBeforeDirectElement
} from '../utils/render.js';

export default class NewPointPresenter {
  constructor(directElement, pointModel, filterModel, changeData, changeMode) {
    this._directElement = directElement;
    this._filterModel = filterModel;
    this._pointModel = pointModel;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointFormComponent = null;
    this._destroyCallback = null;
    this._bindInnerHandlers();

    this._isActive = false;

  }

  init() {
    if (this._pointFormComponent) {
      this.destroy();
      return;
    }

    this._changeMode();
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    this._pointFormComponent = new PointFormView(
        BLANK_EVENT,
        this._pointModel.offers,
        this._pointModel.destinations,
        FormType.NEW
    );
    this._pointFormComponent.setSubmitClickHandler(this._submitClickHandler);
    this._pointFormComponent.setDeleteClickHandler(this._cancelClickHandler);

    renderBeforeDirectElement(this._directElement, this._pointFormComponent);

    this._pointFormComponent.validateForm();

    document.addEventListener(`keydown`, this._escKeyDownHandler);

    this._isActive = true;
  }

  destroy() {
    if (!this._pointFormComponent) {
      return;
    }

    removeElement(this._pointFormComponent);
    this._pointFormComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  setAborting() {
    this._pointFormComponent.shake(this._resetFormViewState);
  }

  setSavingState() {
    this._pointFormComponent.updateData({
      state: {
        isSaving: true,
        isDisabled: true,
      }
    });
  }

  _bindInnerHandlers() {
    this._submitClickHandler = this._submitClickHandler.bind(this);
    this._cancelClickHandler = this._cancelClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._resetFormViewState = this._resetFormViewState.bind(this);
  }

  _cancelClickHandler() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }

  _resetFormViewState() {
    this._pointFormComponent.updateData({
      state: {
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      }
    });
  }

  _submitClickHandler(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        point
    );
  }

}
