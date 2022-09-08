let body = document.querySelector('.page');
let popup = body.querySelector('.popup');
let popupBtnClose = popup.querySelector('.popup__btn-close');
let popupBtnOpen = body.querySelector('.profile__edit-button');
let form = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_line_name');
let jobInput = document.querySelector('.popup__input_line_description');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

function formSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    form.addEventListener('submit', closePopup);
};

function openPopup() {
    popup.classList.add('popup_opened');
};

function closePopup() {
    popup.classList.remove('popup_opened');
};

popupBtnOpen.addEventListener('click', openPopup);

popupBtnClose.addEventListener('click', closePopup);

form.addEventListener('submit', formSubmitHandler);

