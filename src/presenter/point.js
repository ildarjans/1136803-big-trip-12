import PointItemView from '../view/point/item.js';
import PointFormView from '../view/point/edit-form.js';
import {
  renderLastPlaceElement,
  replaceDOMElement,
  removeElement,
} from '../utils/render.js';
import {PointMode, UpdateType, UserAction} from '../consts.js';

export default class PointPresenter {
  constructor(pointsList, changeData, changeMode) {
    this._pointsList = pointsList;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._point = null;
    this._mode = PointMode.DEFAULT;

    this._pointItemComponent = null;
    this._pointFormComponent = null;
  }

  init(point) {
    this._point = point;

    const prevItemComponent = this._pointItemComponent;
    const prevFormComponent = this._pointFormComponent;

    this._pointItemComponent = new PointItemView(point);
    this._pointFormComponent = new PointFormView(point);

    this._bindInnerHandlers();
    this._setInnetHandlers();

    if (!prevItemComponent || !prevFormComponent) {
      renderLastPlaceElement(this._pointsList, this._pointItemComponent);
      return;
    }

    switch (this._mode) {
      case PointMode.DEFAULT:
        replaceDOMElement(this._pointItemComponent, prevItemComponent);
        break;
      case PointMode.EDIT:
        replaceDOMElement(this._pointFormComponent, prevFormComponent);
        break;
    }

    removeElement(prevItemComponent);
    removeElement(prevFormComponent);
  }

  _bindInnerHandlers() {
    this._windowEscHandler = this._windowEscHandler.bind(this);
    this._switchToPointForm = this._switchToPointForm.bind(this);
    this._switchToPointItem = this._switchToPointItem.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._submitClickHandler = this._submitClickHandler.bind(this);
  }

  _setInnetHandlers() {
    this._pointItemComponent.setDropdownClickHandler(this._switchToPointForm);
    this._pointFormComponent.setSubmitClickHandler(this._submitClickHandler);
    this._pointFormComponent.setDeleteClickHandler(this._deleteClickHandler);
  }

  _windowEscHandler(evt) {
    if (evt.key === `Escape`) {
      this._pointFormComponent.reset(this._point);
      this._switchToPointItem();
    }
  }

  _deleteClickHandler(point) {
    this._changeData(
        UserAction.DELETE_POINT,
        UpdateType.MAJOR,
        point
    );
  }

  _switchToPointForm() {
    replaceDOMElement(this._pointFormComponent, this._pointItemComponent);
    window.addEventListener(`keydown`, this._windowEscHandler);
    this._changeMode();
    this._mode = PointMode.EDIT;
  }

  _switchToPointItem() {
    replaceDOMElement(this._pointItemComponent, this._pointFormComponent);
    window.removeEventListener(`keydown`, this._windowEscHandler);
    this._mode = PointMode.DEFAULT;
  }

  _submitClickHandler(point) {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        point
    );
  }

  setDefaultMode() {
    if (this._mode === PointMode.EDIT) {
      this._pointFormComponent.reset(this._point);
      this._switchToPointItem();
    }
  }

  resetComponent() {
    removeElement(this._pointItemComponent);
    removeElement(this._pointFormComponent);
  }

}
