import PointEventView from '../view/point/event.js';
import PointFormView from '../view/point/edit-form.js';
import PointItemView from '../view/point/item.js';
import {
  renderLastPlaceElement,
  replaceDOMElement,
  removeElement,
} from '../utils/render.js';
import {PointMode, UpdateType, UserAction, FormState} from '../consts.js';

export default class PointPresenter {
  constructor(pointsList, changeData, changeMode, offers, destinations) {
    this._pointsList = pointsList;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._offers = offers;
    this._destinations = destinations;
    this._mode = PointMode.DEFAULT;

    this._componentWrapper = new PointItemView();
    this._pointItemComponent = null;
    this._pointFormComponent = null;

    this._bindInnerHandlers();

  }

  init(point, updateType) {
    this._point = point;

    if (updateType === UpdateType.PATCH && this._pointFormComponent) {
      this._pointFormComponent.resetFavoriteOnly(point);
      return;
    }

    const prevItemComponent = this._pointItemComponent;
    const prevFormComponent = this._pointFormComponent;

    this._pointItemComponent = new PointEventView(point);
    this._pointFormComponent = new PointFormView(point, this._offers, this._destinations);

    this._setInnetHandlers();

    if (!prevItemComponent || !prevFormComponent) {
      renderLastPlaceElement(this._componentWrapper, this._pointItemComponent);
      renderLastPlaceElement(this._pointsList, this._componentWrapper);
      return;
    }

    switch (this._mode) {
      case PointMode.DEFAULT:
        replaceDOMElement(this._pointItemComponent, prevItemComponent);
        break;
      case PointMode.EDIT:
        replaceDOMElement(this._pointItemComponent, prevFormComponent);
        this._mode = PointMode.DEFAULT;
        break;
    }

    removeElement(prevItemComponent);
    removeElement(prevFormComponent);
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

  setFormViewState(state) {
    switch (state) {
      case FormState.ABORTING:
        this._pointFormComponent.shake(this._resetFormViewState);
        break;

      case FormState.DELETING:
        this._pointFormComponent.updateData({
          state: {
            isDeleting: true,
            isDisabled: true
          }
        });
        break;

      case FormState.SAVING:
        this._pointFormComponent.updateData({
          state: {
            isSaving: true,
            isDisabled: true
          }
        });
        break;
    }
  }

  _bindInnerHandlers() {
    this._windowEscHandler = this._windowEscHandler.bind(this);
    this._switchToPointForm = this._switchToPointForm.bind(this);
    this._switchToPointItem = this._switchToPointItem.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._submitClickHandler = this._submitClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._resetFormViewState = this._resetFormViewState.bind(this);

  }

  _deleteClickHandler(point) {
    this._changeData(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        point
    );
    window.removeEventListener(`keydown`, this._windowEscHandler);
  }

  _favoriteClickHandler(point) {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.PATCH,
        point
    );
  }

  _hasChange(update) {
    return (
      this._point.dateFrom !== update.dateFrom ||
      this._point.dateTo !== update.dateTo ||
      this._point.type !== update.type ||
      this._point.basePrice !== update.basePrice ||
      this._point.destination.name !== update.destination.name ||
      this._point.offers.length !== update.offers.length ||
      (
        this._point.length !== 0 &&
        !this._point.offers.every((offer, index) => offer.title === update.offers[index].title)
      )
    );
  }

  _resetFormViewState() {
    this._pointFormComponent.updateData({
      state: {
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      }
    });
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
    if (this._hasChange(point)) {
      this._changeData(
          UserAction.UPDATE_POINT,
          UpdateType.MINOR,
          point
      );
    } else {
      this._switchToPointItem();
    }
  }

  _setInnetHandlers() {
    this._pointItemComponent.setDropdownClickHandler(this._switchToPointForm);
    this._pointFormComponent.setSubmitClickHandler(this._submitClickHandler);
    this._pointFormComponent.setFavoriteClickHandler(this._favoriteClickHandler);
    this._pointFormComponent.setDeleteClickHandler(this._deleteClickHandler);
  }

  _windowEscHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._pointFormComponent.reset(this._point);
      this._switchToPointItem();
    }
  }

}
