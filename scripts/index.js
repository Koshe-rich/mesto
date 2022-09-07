let body = document.querySelector('.page');
let popup = body.querySelector('.popup');
let popupBtnClose = popup.querySelector('.popup__btn-close');
let popupBtnOpen = body.querySelector('.profile__edit-button');
let form = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_description');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

function formSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
};

form.addEventListener('submit', formSubmitHandler);

popupBtnOpen.addEventListener('click', function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.textContent = profileName.value;
    jobInput.textContent = profileJob.value;
});

popupBtnClose.addEventListener('click', function closePopup() {
    popup.classList.remove('popup_opened');
});
