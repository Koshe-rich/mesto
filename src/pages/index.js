import {
  cfg
} from '../scripts/validation.js';
import {Card} from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js'
import "./index.css"
import { initialCards } from '../scripts/dataCards.js';


const body = document.querySelector('.page');
const popupProfile = body.querySelector('.popup-edit-profile');
const editProfileButton = body.querySelector('.profile__edit-button');
const popupProfileForm = popupProfile.querySelector('.popup__form-edit-profile');

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

const createCard = (item) => {
  const card = new Card(item, '#template-item', handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
}

// Добавляем карточки 

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item)
    section.addItem(cardElement);
    return cardElement;
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

editProfilePopupWithForm.setResetFormOnClose(false)

// Добавление новых карточек

const addCardPopupWithForm = new PopupWithForm(
    ({ name, link }) => {
    const cardElement = createCard({name, link});
    section.addItem(cardElement);
    addCardPopupWithForm.close();
  },
  '.popup-add-card'
);

function openProfilePopup() {
  const {name, job} = userInfo.getUserInfo();
  popupProfileForm.elements.name.value = name;
  popupProfileForm.elements.job.value = job;
  formProfileValidator.resetValidationErrors();
  formProfileValidator.toggleButtonState();
  editProfilePopupWithForm.open();
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
