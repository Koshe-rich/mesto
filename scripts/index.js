import {
    cfg
} from './validation.js';
import {
    blockSubmitBtn
} from './validation.js';

import {Card} from './Card.js'
// import { FormValidator } from './FormValidator.js';

const body = document.querySelector('.page');
const popupProfile = body.querySelector('.popup-edit-profile');
const popups = document.querySelectorAll('.popup');
const popupProfileBtnOpen = body.querySelector('.profile__edit-button');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const nameInput = popupProfile.querySelector('.popup__input_line_name');
const jobInput = popupProfile.querySelector('.popup__input_line_description');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

const popupAdd = body.querySelector('.popup-add-card');
const popupAddBtnOpen = body.querySelector('.profile__add-button');
const addForm = popupAdd.querySelector('.popup__form');
const addNameInput = popupAdd.querySelector('.popup__input_line_name');
const addlinkInput = popupAdd.querySelector('.popup__input_line_description');

const listItem = document.querySelector('.elements');
const templateSelector = '#template-item';


initialCards.forEach((cardData) => {
  const card = new Card(cardData, templateSelector);
  const cardElement = card.createCard();
  listItem.prepend(cardElement);
});


// const validator1 = new FormValidator(cfg, document.querySelector('#popup__form'));
// validator1.enableValidation();

// // // Открытие попапа

export function openPopUp(el) {
    el.classList.add('popup_opened');
    document.addEventListener('keydown', handlekeyDown);
}



// Закрытие попапа

function closePopUp(el) {
    el.classList.remove('popup_opened');
    document.removeEventListener('keydown', handlekeyDown);
};

// Закрыть попап оверлей и крестик

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopUp(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopUp(popup)
        }
    })
});
// Закрытие попапа на клик ESC

const handlekeyDown = (e) => {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.popup_opened');
        closePopUp(openModal);
    };
}
// // Создание элемента

// function createElement(item) {
//     const placeItem = templateItem.cloneNode(true);
//     const itemName = placeItem.querySelector('.place-item__place-name');
//     const itemImage = placeItem.querySelector('.place-item__mask');
//     itemName.textContent = item.name;
//     itemImage.src = item.link;
//     itemImage.alt = item.name;

//     const likeBtn = placeItem.querySelector('.place-item__btn-like');
//     const deleteBtn = placeItem.querySelector('.place-item__btn-del');

//     likeBtn.addEventListener('click', likeItemHandler);
//     deleteBtn.addEventListener('click', deleteItemHandler);

//     const popupImage = function () {
//         previewImg.src = item.link;
//         previewImg.alt = item.name;
//         titleImg.textContent = item.name;
//         openPopUp(popupPreview);
//     };

//     itemImage.addEventListener('click', popupImage);

//     return placeItem;
// };



// Создание элемента

// const addNewElement = (item, wrapEl) => {
//     const newItem = card.createCard(item);
//     wrapEl.prepend(newItem);
// };

// Проход по массиву + добавление элемента в конец

// initialCards.forEach(function (item) {
//     addNewElement(item, listItem);
// });



// // Добавление локации

function addFormSubmitHandler(evt) {
    evt.preventDefault();

    const addObj = {
        name: addNameInput.value,
        link: addlinkInput.value
    };
    card.createCard(addObj, listItem);
    closePopUp(popupAdd);
    blockSubmitBtn(cfg);
    addForm.reset();
};

// Попап изменения профиля

function addFormProfileSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopUp(popupProfile);
};

// Листенеры

popupProfileBtnOpen.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopUp(popupProfile);
});

popupAddBtnOpen.addEventListener('click', () => {
    openPopUp(popupAdd);
});


popupProfileForm.addEventListener('submit', addFormProfileSubmitHandler);
addForm.addEventListener('submit', addFormSubmitHandler);