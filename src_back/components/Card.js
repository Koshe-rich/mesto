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
