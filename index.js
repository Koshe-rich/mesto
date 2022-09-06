let body = document.querySelector('.page');
let popup = body.querySelector('.popup');
let popupBtnClose = popup.querySelector('.popup__btn-close');
let popupBtnOpen = body.querySelector('.profile__edit-button');

popupBtnOpen.addEventListener('click', function () {
    popup.classList.add('popup_opened');
});

popupBtnClose.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
});

let form = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__description');

function formSubmitHandler(event) {
    event.preventDefault();

    nameInput.value;
    jobInput.value;

    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__description');

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

};

form.addEventListener('submit', formSubmitHandler);