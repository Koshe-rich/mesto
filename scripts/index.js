let body = document.querySelector('.page');
let popup = body.querySelector('.popup');
let popupBtnClose = popup.querySelector('.popup__btn-close');
let popupBtnOpen = body.querySelector('.profile__edit-button');
let form = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_line_name');
let jobInput = document.querySelector('.popup__input_line_description');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  const listItem = document.querySelector('.elements');
  const templateItem = document.querySelector('#template-item').content.querySelector('.place-item');

  function createElement(item) {

    const placeItem = templateItem.cloneNode(true);

    const itemName = templateItem.querySelector('.place-item__place-name');
    const itemImage = templateItem.querySelector('.place-item__mask');
    
    itemName.textContent = item.name;
    itemImage.src = item.link;
    itemImage.alt = item.name;

    return placeItem;

  };
  
  initialCards.forEach(function (item){
    const newItem =  createElement(item);
    listItem.prepend(newItem);
  });

function formSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
};

function openPopup () {
popup.classList.add('popup_opened'); 
nameInput.textContent = profileName.value; 
jobInput.textContent = profileJob.value;
};

function closePopup() {
    popup.classList.remove('popup_opened');
};

popupBtnOpen.addEventListener('click', openPopup);

popupBtnClose.addEventListener('click', closePopup);

form.addEventListener('submit', formSubmitHandler);

