import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(submitCallback, popupSelector) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.getElementsByTagName('input');
  }

  _getInputValues() {
    const values = {};
    const inputsArray = Array.from(this._inputs);
    inputsArray.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._submitCallback(inputValues);
      this.close();
    });
    this.resetForm();
  }

  close() {
    super.close();
    this.resetForm();
  }

  resetForm() {
    this._form.reset();
  }
}
