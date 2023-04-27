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
// import { initialCards } from '../scripts/dataCards.js';
import { API } from '../components/API.js';


const body = document.querySelector('.page');
const popupProfile = body.querySelector('.popup-edit-profile');
const editProfileButton = body.querySelector('.profile__edit-button');
const popupProfileForm = popupProfile.querySelector('.popup__form-edit-profile');

const popupDeleteCard = body.querySelector('.popup-delete-card')
const formDelete = popupDeleteCard.querySelector('.popup__form-delete-profile')

const popupAdd = body.querySelector('.popup-add-card');
const popupAddBtnOpen = body.querySelector('.profile__add-button');
const addForm = popupAdd.querySelector('.popup__add-card');

const popupChangeCard = body.querySelector('.popup-change-photo')
const popupFormChangePhoto = popupChangeCard.querySelector('.popup__form-change-photo')
const changeAvatarButton = body.querySelector('.profile__edit-avatar')


const formAddCardValidator = new FormValidator(cfg, addForm);
formAddCardValidator.enableValidation();

const formProfileValidator = new FormValidator(cfg, popupProfileForm);
formProfileValidator.enableValidation();

const formChangePhotoValidator = new FormValidator(cfg, popupFormChangePhoto);
formChangePhotoValidator.enableValidation();

const api = new API({
  baseUrl: 'https://nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'f8dda380-44f0-48ca-95cc-9cd738f6ebff',
    'Content-Type': 'application/json'
  }
});

api.getUserInfo()
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });

  api.getInitialCards()
  .then(cards => {
    cards.forEach(card => {
      section.addItem(createCard(card));
    });
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

const section = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    section.addItem(cardElement);
    return cardElement;
  }
}, '.elements');

section.render();

const popupWithImage = new PopupWithImage('.popup-img');

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__description'
});


const editProfilePopupWithForm = new PopupWithForm(
  (userData) => {
    editProfilePopupWithForm.renderLoading(true);
    api.editUserInfo(userData)
      .then(data => {
        userInfo.setUserInfo(data);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        editProfilePopupWithForm.renderLoading(false);
      });
  },
  '.popup-edit-profile'
);

editProfilePopupWithForm.setResetFormOnClose(false)

const addCardPopupWithForm = new PopupWithForm(
  ({ name, link }) => {
    addCardPopupWithForm.renderLoading(true);
    api.addCard({ name, link })
      .then(card => {
        const cardElement = createCard(card);
        section.addItem(cardElement);
        addCardPopupWithForm.close();
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        addCardPopupWithForm.renderLoading(false);
      });
  },
  '.popup-add-card'
);

const changeAvatarPopup = new PopupWithForm(
  (formData) => {
    changeAvatarPopup.renderLoading(true);
    api.updateAvatar(formData.link)
      .then(data => {
        userInfo.setUserAvatar(data.avatar);
        changeAvatarPopup.close();
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        changeAvatarPopup.renderLoading(false);
      });
  },
  '.popup-change-photo'
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

function openPopupChangePhoto() {
  changeAvatarPopup.open();
  formChangePhotoValidator.resetValidationErrors();
  console.log("openPopupChangePhoto function called");
}

addCardPopupWithForm.setEventListeners();
editProfilePopupWithForm.setEventListeners();
popupWithImage.setEventListeners();
changeAvatarPopup.setEventListeners();

popupAddBtnOpen.addEventListener('click', openAddCardPopup);
editProfileButton.addEventListener('click', openProfilePopup);
changeAvatarButton.addEventListener('click', openPopupChangePhoto)

