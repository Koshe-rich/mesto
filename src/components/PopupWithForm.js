import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(submitCallback, popupSelector) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    this._resetFormOnClose = true;
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

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
      this.close();
    });
  }


  close() {
    super.close();
    if (this._resetFormOnClose) {
      this._form.reset();
    }
  }

  setResetFormOnClose(reset) {
    this._resetFormOnClose = reset;
  }

}

