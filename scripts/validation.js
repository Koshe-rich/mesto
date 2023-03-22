export const cfg = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Блокировка кнопки сохранить

// export const blockSubmitBtn = ({inactiveButtonClass}) => {
//   const btnSave = document.querySelector('.popup__btn-add')
//   btnSave.classList.add(inactiveButtonClass);
//   btnSave.disabled = 'disabled';
// };