import {
    cfg
} from './validation.js';
import {
    blockSubmitBtn
} from './validation.js';

const body = document.querySelector('.page');
const popupProfile = body.querySelector('.popup-edit-profile');
const popups = document.querySelectorAll('.popup');
const popupProfileBtnClose = popupProfile.querySelector('.popup__btn-close');
const popupProfileBtnOpen = body.querySelector('.profile__edit-button');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const nameInput = popupProfile.querySelector('.popup__input_line_name');
const jobInput = popupProfile.querySelector('.popup__input_line_description');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

const popupAdd = body.querySelector('.popup-add-card');
const popupAddBtnClose = popupAdd.querySelector('.popup__btn-close');
const popupAddBtnOpen = body.querySelector('.profile__add-button');
const listItem = document.querySelector('.elements');
const templateItem = document.querySelector('#template-item').content.querySelector('.place-item');
const addForm = popupAdd.querySelector('.popup__form');
const addNameInput = popupAdd.querySelector('.popup__input_line_name');
const addlinkInput = popupAdd.querySelector('.popup__input_line_description');

const popupPreview = body.querySelector('.popup-img');
const previewImg = popupPreview.querySelector('.popup-img__image');
const titleImg = popupPreview.querySelector('.popup-img__title');
const popupImgBtnClose = popupPreview.querySelector('.popup-img__btn-close');

// Создание элемента

function createElement(item) {
    const placeItem = templateItem.cloneNode(true);
    const itemName = placeItem.querySelector('.place-item__place-name');
    const itemImage = placeItem.querySelector('.place-item__mask');
    itemName.textContent = item.name;
    itemImage.src = item.link;
    itemImage.alt = item.name;

    const likeBtn = placeItem.querySelector('.place-item__btn-like');
    const deleteBtn = placeItem.querySelector('.place-item__btn-del');

    likeBtn.addEventListener('click', likeItemHandler);
    deleteBtn.addEventListener('click', deleteItemHandler);

    const popupImage = function () {
        previewImg.src = item.link;
        previewImg.alt = item.name;
        titleImg.textContent = item.name;
        openPopUp(popupPreview);
    };

    itemImage.addEventListener('click', popupImage);

    return placeItem;
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
})
// Закрытие попапа на клик ESC

const handlekeyDown = (e) => {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.popup_opened');
        closePopUp(openModal);
    };
};

// Лайк

const likeItemHandler = (evt) => {
    evt.target.classList.toggle('place-item__btn-like_active');
};

// Удаление

const deleteItemHandler = (evt) => {
    evt.target.closest('.place-item').remove();
}

// Создание элемента

const addNewElement = (item, wrapEl) => {
    const newItem = createElement(item);
    wrapEl.prepend(newItem);
};

// Проход по массиву + добавление элемента в конец

initialCards.forEach(function (item) {
    addNewElement(item, listItem);
});

// Открытие попапа

function openPopUp(el) {
    el.classList.add('popup_opened');
    document.addEventListener('keydown', handlekeyDown);
}

// Закрытие попапа

function closePopUp(el) {
    el.classList.remove('popup_opened');
    document.removeEventListener('keydown', handlekeyDown);
};

// Добавление локации

function addFormSubmitHandler(evt) {
    evt.preventDefault();
    
    const addObj = {
        name: addNameInput.value,
        link: addlinkInput.value
    };
    addNewElement(addObj, listItem);
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