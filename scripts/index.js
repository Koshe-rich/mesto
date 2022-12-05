let body = document.querySelector('.page');
let popup = body.querySelector('.popup');
let popupBtnClose = body.querySelector('.popup__btn-close');
let popupBtnOpen = body.querySelector('.profile__edit-button');
let form = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_line_name');
let jobInput = document.querySelector('.popup__input_line_description');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

const listItem = document.querySelector('.elements');
const templateItem = document.querySelector('#template-item').content.querySelector('.place-item');
const popupAdd = body.querySelector('.popup-add');
const popupAddBtnClose = body.querySelector('.popup-add__btn-close');
const popupAddBtnOpen = body.querySelector('.profile__add-button');
const addForm = document.querySelector('.popup-add__container');
const addNameInput = document.querySelector('.popup-add__input_line_name');
const addlinkInput = document.querySelector('.popup-add__input_line_link');

const previewImg = document.querySelector('.popup-img__image');
const titleImg = document.querySelector('.popup-img__title');
const popupPreview = document.querySelector('.popup-img');
const popupImgBtnClose = document.querySelector('.popup-img__btn-close');

const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
}, {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
}, {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
}, {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
}, {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
}, {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}];

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

    likeBtn.addEventListener('click', likeHandler);
    deleteBtn.addEventListener('click', deleteHandler);

    const openImage = placeItem.querySelector('.place-item__mask');

    const popupImage = function() {
        previewImg.src = item.link;
        previewImg.alt = item.name;
        titleImg.textContent = item.name;
        tooglePopUp(popupPreview);
    };

    openImage.addEventListener('click', popupImage);

    return placeItem;

};

// Лайк

const likeHandler = (evt) => {
    evt.target.classList.toggle('place-item__btn-like_active');
};

// Удаление

const deleteHandler = (evt) => {
    evt.target.closest('.place-item').remove();
}

// Создание элемента

const newElement = (item, wrapEl) => {
    const newItem = createElement(item);
    wrapEl.prepend(newItem);
};

// Проход по массиву + добавление элемента в конец

initialCards.forEach(function(item) {
    newElement(item, listItem);
});

// Удаление value

function deleteValue() {
    addNameInput.value = "";
    addlinkInput.value = "";
};

// Toogle popup

function tooglePopUp(el) {
    el.classList.toggle('popup_opened');
}

// Попап изменения профиля

function formSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    tooglePopUp(popup);
};

// добавление локации

function formAddSubmitHandler(evt) {
    evt.preventDefault();

    const addObj = {
        name: addNameInput.value,
        link: addlinkInput.value
    };

    newElement(addObj, listItem);
    tooglePopUp(popupAdd);
    deleteValue();
};


// Листенеры

popupBtnOpen.addEventListener('click', () => {
    tooglePopUp(popup);
});
popupBtnClose.addEventListener('click', () => {
    tooglePopUp(popup);
});

popupAddBtnClose.addEventListener('click', () => {
    tooglePopUp(popupAdd);
});

popupAddBtnOpen.addEventListener('click', () => {
    tooglePopUp(popupAdd);
});

popupImgBtnClose.addEventListener('click', () => {
    tooglePopUp(popupPreview);
});

form.addEventListener('submit', formSubmitHandler);

addForm.addEventListener('submit', formAddSubmitHandler);