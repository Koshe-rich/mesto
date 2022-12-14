const body = document.querySelector('.page');
const popupProfile = body.querySelector('.popup-edit-profile');
const popupProfileBtnClose = popupProfile.querySelector('.popup__btn-close');
const popupProfileBtnOpen = body.querySelector('.profile__edit-button');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const nameInput = popupProfile.querySelector('.popup__input_line_name');
const jobInput = popupProfile.querySelector('.popup__input_line_description');
const profileName = popupProfile.querySelector('.profile__name');
const profileJob = popupProfile.querySelector('.profile__description');

const popupAdd = body.querySelector('.popup-add-card');
const popupAddBtnClose = popupAdd.querySelector('.popup__btn-close');
const popupAddBtnOpen = body.querySelector('.profile__add-button');
const listItem = document.querySelector('.elements');
const templateItem = document.querySelector('#template-item').content.querySelector('.place-item');
const addForm = popupAdd.querySelector('.popup__form');
const addNameInput = popupAdd.querySelector('.popup-add__input_line_name');
const addlinkInput = popupAdd.querySelector('.popup-add__input_line_link');

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

function openPopUp (el) {
    el.classList.add('popup_opened');
}

// Закрытие попапа

function closePopUp (el) {
    el.classList.remove('popup_opened');
}

// Попап изменения профиля

function formProfileSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopUp(popupProfile);
};

// добавление локации

function formAddSubmitHandler(evt) {
    evt.preventDefault();

    const addObj = {
        name: addNameInput.value,
        link: addlinkInput.value
    };

    addNewElement(addObj, listItem);
    closePopUp(popupAdd);
    addForm.reset();
};


// Листенеры

popupProfileBtnOpen.addEventListener('click', () => {
    openPopUp(popupProfile);
});
popupProfileBtnClose.addEventListener('click', () => {
    closePopUp(popupProfile);
});

popupAddBtnClose.addEventListener('click', () => {
    closePopUp(popupAdd);
});

popupAddBtnOpen.addEventListener('click', () => {
    openPopUp(popupAdd);
});

popupImgBtnClose.addEventListener('click', () => {
    closePopUp(popupPreview);
});

popupProfileForm.addEventListener('submit', formProfileSubmitHandler);

addForm.addEventListener('submit', formAddSubmitHandler);