import {
  cfg
} from './validation.js';
import {Card} from './Card.js'
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js'

const body = document.querySelector('.page');
const popupProfile = body.querySelector('.popup-edit-profile');
const popups = document.querySelectorAll('.popup');
const editProfileButton = body.querySelector('.profile__edit-button');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

const popupAdd = body.querySelector('.popup-add-card');
const popupAddBtnOpen = body.querySelector('.profile__add-button');
const addForm = popupAdd.querySelector('.popup__form');


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
  nameSelector: '.popup__input_line_name',
  infoSelector: '.popup__input_line_description'
});


// Изменение профиля

const editProfilePopupWithForm = new PopupWithForm(
  (userData) => {
    const { name, info } = userData;
    userInfo.setUserInfo({ name, info });
    editProfilePopupWithForm.close();
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

addCardPopupWithForm.setEventListeners();
editProfilePopupWithForm.setEventListeners();
popupWithImage.setEventListeners()

popupAddBtnOpen.addEventListener('click', () => {
  addCardPopupWithForm.open();
});

editProfileButton.addEventListener('click', () => {
  editProfilePopupWithForm.open();
});
