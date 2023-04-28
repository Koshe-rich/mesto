// export class Card {
//   constructor({ name, link }, templateSelector, handleCardClick) {
//     this._name = name;
//     this._link = link;
//     this._templateSelector = templateSelector;
//     this._handleCardClick = handleCardClick;

//     this._element = null;
//     this._itemImage = null;
//     this._item = null;
//   }

//   _getTemplate() {
//     const template = document.querySelector(this._templateSelector).content.querySelector('.place-item');
//     return template.cloneNode(true);
//   }

//   _setEventListeners() {
//     this._element.querySelector('.place-item__btn-like').addEventListener('click', this._handleLikeClick);
//     this._element.querySelector('.place-item__btn-del').addEventListener('click', this._handleDeleteClick);
//     this._itemImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
//   }

//   _handleLikeClick(evt) {
//     evt.target.classList.toggle('place-item__btn-like_active');
//   }

//   _handleDeleteClick(evt) {
//     const item = evt.target.closest('.place-item');
//     item.remove();
//   }
  

//   createCard() {
//     this._element = this._getTemplate();
//     this._itemImage = this._element.querySelector('.place-item__mask');
//     this._setEventListeners();
//     this._item = this._element.querySelector('.place-item');

//     const itemName = this._element.querySelector('.place-item__place-name');

//     itemName.textContent = this._name;
//     this._itemImage.src = this._link;
//     this._itemImage.alt = this._name;

//     return this._element;
//   }
// }
  
export class Card {
  constructor({ name, link, likes, isLiked, ownerId, handleCardClick, handleLikeClick, handleRemoveClick, userId }, templateSelector) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._isLiked = isLiked;
    this._ownerId = ownerId;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleRemoveClick = handleRemoveClick;

    this._element = null;
    this._itemImage = null;
    this._item = null;
    this._likesElement = null;
    this._deleteButton = null;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content.querySelector('.place-item');
    return template.cloneNode(true);
  }

  _setEventListeners() {
    this._likesElement.addEventListener('click', this._handleLikeClick);
    if (this._ownerId === this._userId) {
      this._deleteButton.addEventListener('click', this._handleRemoveClick);
    } else {
      this._deleteButton.remove();
    }
    this._itemImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  _handleLike(evt) {
    this._isLiked = !this._isLiked;
    this._likes += this._isLiked ? 1 : -1;
    this._likesElement.classList.toggle('place-item__btn-like_active');
    this._handleLikeClick(this._likes, this._isLiked);
  }

  _handleRemove() {
    this._element.remove();
    this._element = null;
    this._handleRemoveClick();
  }
  

  createCard() {
    this._element = this._getTemplate();
    this._itemImage = this._element.querySelector('.place-item__mask');
    this._likesElement = this._element.querySelector('.place-item__btn-like');
    this._deleteButton = this._element.querySelector('.place-item__btn-del_display_block');
    this._setEventListeners();
    this._item = this._element.querySelector('.place-item');

    const itemName = this._element.querySelector('.place-item__place-name');
    const itemLikes = this._element.querySelector('.place-item__like-count');

    itemName.textContent = this._name;
    itemLikes.textContent = this._likes;
    this._itemImage.src = this._link;
    this._itemImage.alt = this._name;

    if (this._isLiked) {
      this._likesElement.classList.add('place-item__btn-like_active');
    }

    return this._element;
  }
}

