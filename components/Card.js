export class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content.querySelector('.place-item');
    return template.cloneNode(true);
  }

  _setEventListeners() {
    this._element.querySelector('.place-item__btn-like').addEventListener('click', this._handleLikeClick);
    this._element.querySelector('.place-item__btn-del').addEventListener('click', this._handleDeleteClick);
    this._itemImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle('place-item__btn-like_active');
  }

  _handleDeleteClick(evt) {
    evt.target.closest('.place-item').remove();
  }

  createCard() {
    this._element = this._getTemplate();
    this._itemImage = this._element.querySelector('.place-item__mask');
    this._setEventListeners();

    const itemName = this._element.querySelector('.place-item__place-name');

    itemName.textContent = this._name;
    this._itemImage.src = this._link;
    this._itemImage.alt = this._name;

    return this._element;
  }
}