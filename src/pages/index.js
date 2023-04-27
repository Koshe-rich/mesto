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
const initialCardsUrl = 'https://mesto.nomoreparties.co/v1/cohort-64/cards';


const formAddCardValidator = new FormValidator(cfg, addForm);
formAddCardValidator.enableValidation();

const formProfileValidator = new FormValidator(cfg, popupProfileForm);
formProfileValidator.enableValidation();


fetch('https://nomoreparties.co/v1/cohort-64/users/me', {
  headers: {
    authorization: 'f8dda380-44f0-48ca-95cc-9cd738f6ebff'
  }
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });


const handleCardClick = (name, link) => {
popupWithImage.open(name, link);
}

const createCard = (item) => {
  const card = new Card(item, '#template-item', handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
}

// const section = new Section({
//   items: initialCards,
//   renderer: (item) => {
//     const cardElement = createCard(item)
//     section.addItem(cardElement);
//     return cardElement;
//   }
// }, '.elements');

// section.render();

const section = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    section.addItem(cardElement);
    return cardElement;
  }
}, '.elements');

fetch(initialCardsUrl, {
  headers: {
    authorization: 'f8dda380-44f0-48ca-95cc-9cd738f6ebff'
  }
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  })
  .then(cards => {
    cards.forEach(card => {
      section.addItem(createCard(card));
    });
  })
  .catch(error => {
    console.log(error);
  });

section.render();

const popupWithImage = new PopupWithImage('.popup-img');

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
