export const cfg = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Блокировка кнопки сохранить

export const blockSubmitBtn = (cfg) => {
  const btnSave = document.querySelector('.popup__btn-add')
  btnSave.classList.add(cfg.inactiveButtonClass);
  btnSave.disabled = 'disabled';
};

// Отображаем ошибки валидации

const checkInputValidity = (input, cfg) => {
  const error = document.querySelector(`#${input.id}-error`);

  if (input.validity.valid) {
    error.classList.remove(cfg.errorClass);
    input.classList.remove(cfg.inputErrorClass);
    error.textContent = '';
  } else {
    error.classList.add(cfg.errorClass);
    input.classList.add(cfg.inputErrorClass);
    error.textContent = input.validationMessage;
  };
};

// Меняем стили кнопке добавить/сохранить

const toggleButton = (inputs, button, cfg) => {
  const isFormValid = inputs.every(input => input.validity.valid)
  console.log(isFormValid);

  if (isFormValid) {
    button.classList.remove(cfg.inactiveButtonClass);
    button.disabled = '';
  } else {
    button.classList.add(cfg.inactiveButtonClass);
    button.disabled = 'disabled';
  };
};

// Валидиииииируем

const enableValidation = (cfg) => {
  const {
    formSelector,
    inputSelector,
    submitButtonSelector,
    ...rest
  } = cfg;
  const forms = [...document.querySelectorAll(formSelector)];

  forms.forEach(form => {

    const inputs = [...document.querySelectorAll(inputSelector)];
    const button = form.querySelector(submitButtonSelector);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });


    inputs.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(input, rest);
        toggleButton(inputs, button, rest);
      });
    });
  });
};


enableValidation(cfg);