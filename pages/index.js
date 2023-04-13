import {
  cfg
} from '../scripts/validation.js';
import {Card} from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js'

const body = document.querySelector('.page');
const popupProfile = body.querySelector('.popup-edit-profile');
const editProfileButton = body.querySelector('.profile__edit-button');
const popupProfileForm = popupProfile.querySelector('.popup__form-edit-profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

const popupAdd = body.querySelector('.popup-add-card');
const popupAddBtnOpen = body.querySelector('.profile__add-button');
const addForm = popupAdd.querySelector('.popup__add-card');


const formAddCardValidator = new FormValidator(cfg, addForm);
formAddCardValidator.enableValidation();

const formProfileValidator = new FormValidator(cfg, popupProfileForm);
formProfileValidator.enableValidation();

// Открываем попап изображения по клику

const handleCardClick = (name, link) => {
popupWithImage.open(name, link);
}



// Добавляем карточки 

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#template-item', handleCardClick);
    return card.createCard();
  }
}, '.elements');

section.render();

// Создаем экземпляр PopupWithImage

const popupWithImage = new PopupWithImage('.popup-img');


// Создаем экземпляр UserInfo

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__description'
});

const editProfilePopupWithForm = new PopupWithForm (
  (userData) => {
    userInfo.setUserInfo(userData);
  },
  '.popup-edit-profile'
);

// Добавление новых карточек

const addCardPopupWithForm = new PopupWithForm(
  (cardData) => {
    const { name, link } = cardData;
    const card = new Card({name, link}, '#template-item', handleCardClick);
    const cardElement = card.createCard();
    section.addItem(cardElement);
    addCardPopupWithForm.close();
  },
  '.popup-add-card'
);

function openProfilePopup() {
  editProfilePopupWithForm.open();
  profileName.value = userInfo.getUserInfo().name;
  profileJob.value = userInfo.getUserInfo().info;
  formProfileValidator.resetValidationErrors();
  formProfileValidator.toggleButtonState();
}

function openAddCardPopup() {
  addCardPopupWithForm.open();
  formAddCardValidator.resetValidationErrors();
  formAddCardValidator.toggleButtonState();
}

addCardPopupWithForm.setEventListeners();
editProfilePopupWithForm.setEventListeners();
popupWithImage.setEventListeners();

popupAddBtnOpen.addEventListener('click', openAddCardPopup);
editProfileButton.addEventListener('click', openProfilePopup);
