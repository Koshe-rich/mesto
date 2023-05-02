import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(submitCallback, popupSelector) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._openCallback = () => {};
    this._closeCallback = () => {};
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    this._resetFormOnClose = true;
    this._submitButton = this._form.querySelector('.popup__btn-add');
    this._buttonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  setCallback(fn) {
    this._submitCallback = fn;
  }

  setOpenCallback(fn) {
    this._openCallback = fn;
  }

  setCloseCallback(fn) {
    this._closeCallback = fn;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues())
        .then(() => this.close());
    });
  }


  renderLoading(isLoading) {
    const text = isLoading ? 'Сохранение...' : this._buttonText;

    this._submitButton.textContent = text;
    this._submitButton.disabled = isLoading;
  }

  open() {
    super.open();

    this._openCallback();
  }

  close() {
    super.close();

    if (this._resetFormOnClose) {
      this._form.reset();
    }

    this._closeCallback();
  }

  setResetFormOnClose(reset) {
    this._resetFormOnClose = reset;
  }

}

