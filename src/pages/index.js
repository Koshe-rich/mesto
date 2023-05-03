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
import { API } from '../components/API.js';
import { token, apiUrl } from '../scripts/constant.js';
import { Popup } from '../components/Popup.js';


const body = document.querySelector('.page');
const popupProfile = body.querySelector('.popup-edit-profile');
const editProfileButton = body.querySelector('.profile__edit-button');
const popupProfileForm = popupProfile.querySelector('.popup__form-edit-profile');

const popupDeleteCard = body.querySelector('.popup-delete-card');
const formDeleteCard = body.querySelector('.popup__form-delete-card');
const formDelete = popupDeleteCard.querySelector('.popup__form-delete-profile');

const popupAdd = body.querySelector('.popup-add-card');
const popupAddBtnOpen = body.querySelector('.profile__add-button');
const addForm = popupAdd.querySelector('.popup__add-card');

const popupChangeCard = body.querySelector('.popup-change-photo')
const popupFormChangePhoto = popupChangeCard.querySelector('.popup__form-change-photo')
const avatarImage = body.querySelector(".profile__avatar-photo");
const changeAvatarButton = body.querySelector('.profile__edit-avatar');


const formAddCardValidator = new FormValidator(cfg, addForm);
formAddCardValidator.enableValidation();

const formProfileValidator = new FormValidator(cfg, popupProfileForm);
formProfileValidator.enableValidation();

const formChangePhotoValidator = new FormValidator(cfg, popupFormChangePhoto);
formChangePhotoValidator.enableValidation();

const api = new API(
  apiUrl,
  {
    authorization: token,
    'Content-Type': 'application/json',
  },
);

const deleteCardPopup = new PopupWithForm(
  () => {},
  '.popup-delete-card',
);

deleteCardPopup.setResetFormOnClose(true);
deleteCardPopup.setEventListeners();

const handleDeleteClickFn = (id) => {
  return new Promise((resolve, reject) => {
    const callback = ({ id }) => {
      deleteCardPopup.renderLoading(true);
  
      return api.deleteCard(id)
        .then(resolve)
        .catch((error) => {
          console.error(error);
          reject(error);
        })
        .finally(() => {
          deleteCardPopup.renderLoading(false);
        });
    };

    document.querySelector("#delete-card-id").value = id;
    deleteCardPopup.setCallback(callback);
    deleteCardPopup.open();
  });
};

const createCard = (item) => {
  const userId = userInfo.getUserId();
  const card = new Card(item, '#template-item', handleCardClick, handleLikeClick, handleDeleteClickFn, userId);
  const cardElement = card.createCard();

  return cardElement;
};

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__description',
  avatarSelector: '.profile__avatar-photo',
});

// получаем инфо по пользователю и карточкам асинхронно
Promise.all([
    api.getUserData(),
    api.getCardData(),
  ])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);

    const section = new Section({
      renderer: (item) => section.addItem(createCard(item)),
    }, '.elements', cards);

    section.render();
  });

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
};
const handleLikeClick = (id, putOrRemove) => {
  const method = putOrRemove ? 'addLike' : 'deleteLike';

  return api[method](id)
    .then(({ likes }) => likes);
};

const popupWithImage = new PopupWithImage('.popup-img');
const editProfilePopupWithForm = new PopupWithForm(
  (userData) => {
    editProfilePopupWithForm.renderLoading(true);

    return api.updateUserData(userData)
      .then((data) => {
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

editProfilePopupWithForm.setResetFormOnClose(false);

// Добавление карточки на сервер

const addCardPopupWithForm = new PopupWithForm(
  ({ name, link }) => {
    addCardPopupWithForm.renderLoading(true);

    return api.addCard({ name, link })
    .then((cardData) => {
      const cardElement = createCard(cardData);

      section.addItem(cardElement);
      console.log('Card added successfully:', cardData);
    })
    .catch((error) => {
      console.error('Error adding card:', error);
    })
    .finally(() => {
      addCardPopupWithForm.renderLoading(false);
    });
  },
  '.popup-add-card'
);

const changeAvatarPopup = new PopupWithForm(
  ({ link }) => {
    changeAvatarPopup.renderLoading(true);

    return api.updateAvatar(link)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        changeAvatarPopup.renderLoading(false);
      });
  },
  '.popup-change-photo',
);

function openProfilePopup() {
  const {name, about} = userInfo.getUserInfo();
  popupProfileForm.elements.name.value = name;
  popupProfileForm.elements.about.value = about;
  formProfileValidator.resetValidationErrors();
  formProfileValidator.toggleButtonState();
  editProfilePopupWithForm.open();
}

function openAddCardPopup() {
  addCardPopupWithForm.open();
  formAddCardValidator.resetValidationErrors();
  formAddCardValidator.toggleButtonState();
}

function openChangeAvatarPopup() {
  changeAvatarPopup.open();
  formProfileValidator.resetValidationErrors();
  formProfileValidator.toggleButtonState();
}

addCardPopupWithForm.setEventListeners();
editProfilePopupWithForm.setEventListeners();
popupWithImage.setEventListeners();
changeAvatarPopup.setEventListeners();

popupAddBtnOpen.addEventListener('click', openAddCardPopup);
editProfileButton.addEventListener('click', openProfilePopup);
changeAvatarButton.addEventListener('click', openChangeAvatarPopup);