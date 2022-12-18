export const cfg = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Блокировка кнопки сохранить

export const blockSubmitBtn = ({inactiveButtonClass}) => {
  const btnSave = document.querySelector('.popup__btn-add')
  btnSave.classList.add(inactiveButtonClass);
  btnSave.disabled = 'disabled';
};

// Отображаем ошибки валидации

const checkInputValidity = (input, {errorClass, inputErrorClass}) => {
  const error = document.querySelector(`#${input.id}-error`);

  if (input.validity.valid) {
    error.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
    error.textContent = '';
  } else {
    error.classList.add(errorClass);
    input.classList.add(inputErrorClass);
    error.textContent = input.validationMessage;
  };
};

// Меняем стили кнопке добавить/сохранить

const toggleButton = (inputs, button, {inactiveButtonClass}) => {
  const isFormValid = inputs.every(input => input.validity.valid)

  if (isFormValid) {
    button.classList.remove(inactiveButtonClass);
    button.disabled = '';
  } else {
    button.classList.add(inactiveButtonClass);
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

    const inputs = [...form.querySelectorAll(inputSelector)];
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