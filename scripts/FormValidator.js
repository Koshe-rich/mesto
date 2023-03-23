export class FormValidator {
  constructor(cfg, formElement) {
    this._cfg = cfg; // содержит объект настроек, переданный в конструктор класса.
    this._formElement = formElement; // содержит элемент формы, переданный в конструктор класса.
    this._inputs = Array.from(formElement.querySelectorAll(this._cfg.inputSelector)); // массив всех инпутов формы.
    this._submitButton = formElement.querySelector(this._cfg.submitButtonSelector); // которая будет использоваться для отправки формы.
  }

  _showInputError(input) { // метод, который вызывается, когда инпут невалидный.
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._cfg.inputErrorClass);
    errorElement.classList.add(this._cfg.errorClass);
  }

  _hideInputError(input) { // метод, который вызывается, когда инпут валидный.
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove(this._cfg.inputErrorClass);
    errorElement.classList.remove(this._cfg.errorClass);
  }

  _checkInputValidity(input) { // метод, который проверяет валидность инпута.
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }

  _toggleButtonState() { // метод, который проверяет, все ли инпуты формы валидны.
    if (this._inputs.every((input) => input.validity.valid)) {
      this._submitButton.classList.remove(this._cfg.inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this.disableButton();
    }
  }

  _setEventListeners() { // метод, который добавляет обработчики событий на все инпуты формы.
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  disableButton() {
    this._submitButton.classList.add(this._cfg.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState();
  }
}
