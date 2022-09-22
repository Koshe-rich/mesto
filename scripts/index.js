let body = document.querySelector('.page');
let popup = body.querySelector('.popup');
let popupBtnClose = popup.querySelector('.popup__btn-close');
let popupBtnOpen = body.querySelector('.profile__edit-button');
let form = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_line_name');
let jobInput = document.querySelector('.popup__input_line_description');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

const element = document.querySelector('.element');
const elementPlace = document.querySelector('#element-place');
const img = elementPlace.content.querySelector('.img');
const elementPlaceName = elementPlace.content.querySelector('.element__place-name');
const elementBtnLike  = elementPlace.content.querySelector('.element__btn-like');

console.log(img )


const initialCards = [
    {
        name: 'Дюна Пилат',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Беловежская пуща',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Сан-Франциско-де-Кампече',
        link: 'https://images.unsplash.com/photo-1623843740978-8a18154b8e5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80'
    },
    {
        name: 'Озеро Брайес',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Самарканд',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Королевство Мустанг',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];



function formSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
};

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.textContent = profileName.value;
    jobInput.textContent = profileJob.value;
};

function closePopup() {
    popup.classList.remove('popup_opened');
};

popupBtnOpen.addEventListener('click', openPopup);

popupBtnClose.addEventListener('click', closePopup);

form.addEventListener('submit', formSubmitHandler);

