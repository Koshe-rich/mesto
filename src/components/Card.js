export class Card {
  constructor({ _id, name, link, likes, owner: { _id: ownerId } }, templateSelector, handleCardClickFn, handleLikeClickFn, handleDeleteClickFn, userId) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClickFn = handleCardClickFn;
    this._handleLikeClickFn = handleLikeClickFn;
    this._handleDeleteClickFn = handleDeleteClickFn;
    this._element = null;
    this._itemImage = null;
    this._item = null;
    this._likesCountElement = null;
    this._likesCount = likes.length;
    this._ownerId = ownerId;
    this._userId = userId;
    this._isUserCard = ownerId === userId;
    this._hasUserLike = likes.some(({ _id }) => _id === userId);
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content.querySelector('.place-item');
    return template.cloneNode(true);
  }

  _setEventListeners() {
    this._element.querySelector('.place-item__btn-like').addEventListener('click', this._handleLikeClick.bind(this));
    this._element.querySelector('.place-item__btn-del').addEventListener('click', this._handleDeleteClick.bind(this));
    this._itemImage.addEventListener('click', () => this._handleCardClickFn(this._name, this._link));
  }

  _handleLikeClick(evt) {
    this._hasUserLike = !this._hasUserLike;
    this._handleLikeClickFn(this._id, this._hasUserLike)
      .then((likes) => {
        this._hasUserLike = likes.some(({ _id }) => _id === this._userId);
        this._likesCount = likes.length;
        this._likesCountElement.textContent = `${this._likesCount}`;

        evt.target.classList.toggle('place-item__btn-like_active');
      })
      .catch((error) => console.error(error));
  }

  _handleDeleteClick() {
    this._handleDeleteClickFn(this._id)
      .then(() => this._element.remove())
      .catch((error) => console.error(error));
  }
  

  createCard() {
    this._element = this._getTemplate();

    if (!this._isUserCard) {
      const delButton = this._element.querySelector('.place-item__btn-del');

      delButton.classList.remove("place-item__btn-del_display_block");
      delButton.classList.add("place-item__btn-del_display_none");
    }

    this._itemImage = this._element.querySelector('.place-item__mask');
    this._likesCountElement = this._element.querySelector('.place-item__like-count');
    this._setEventListeners();
    this._item = this._element.querySelector('.place-item');

    const itemName = this._element.querySelector('.place-item__place-name');
    
    if (this._hasUserLike) {
      this._element.querySelector('.place-item__btn-like')
        .classList.add("place-item__btn-like_active");
    }

    itemName.textContent = this._name;
    this._likesCountElement.textContent = this._likesCount;
    this._itemImage.src = this._link;
    this._itemImage.alt = this._name;

    return this._element;
  }
}
  
// export class Card {
//   constructor({ name, link, likes, isLiked, ownerId, handleCardClick, handleLikeClick, handleRemoveClick, userId }, templateSelector) {
//     this._name = name;
//     this._link = link;
//     this._likes = likes;
//     this._isLiked = isLiked;
//     this._ownerId = ownerId;
//     this._userId = userId;
//     this._templateSelector = templateSelector;
//     this._handleCardClick = handleCardClick;
//     this._handleLikeClick = handleLikeClick;
//     this._handleRemoveClick = handleRemoveClick;

//     this._element = null;
//     this._itemImage = null;
//     this._item = null;
//     this._likesElement = null;
//     this._deleteButton = null;
//   }

//   _getTemplate() {
//     const template = document.querySelector(this._templateSelector).content.querySelector('.place-item');
//     return template.cloneNode(true);
//   }

//   _setEventListeners() {
//     this._likesElement.addEventListener('click', this._handleLikeClick);
//     if (this._ownerId === this._userId) {
//       this._deleteButton.addEventListener('click', this._handleRemoveClick);
//     } else {
//       this._deleteButton.remove();
//     }
//     this._itemImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
//   }

//   _handleLike(evt) {
//     this._isLiked = !this._isLiked;
//     this._likes += this._isLiked ? 1 : -1;
//     this._likesElement.classList.toggle('place-item__btn-like_active');
//     this._handleLikeClick(this._likes, this._isLiked);
//   }

//   _handleRemove() {
//     this._element.remove();
//     this._element = null;
//     this._handleRemoveClick();
//   }
  

//   createCard() {
//     this._element = this._getTemplate();
//     this._itemImage = this._element.querySelector('.place-item__mask');
//     this._likesElement = this._element.querySelector('.place-item__btn-like');
//     this._deleteButton = this._element.querySelector('.place-item__btn-del_display_block');
//     this._setEventListeners();
//     this._item = this._element.querySelector('.place-item');

//     const itemName = this._element.querySelector('.place-item__place-name');
//     const itemLikes = this._element.querySelector('.place-item__like-count');

//     itemName.textContent = this._name;
//     itemLikes.textContent = this._likes;
//     this._itemImage.src = this._link;
//     this._itemImage.alt = this._name;

//     if (this._isLiked) {
//       this._likesElement.classList.add('place-item__btn-like_active');
//     }

//     return this._element;
//   }
// }

