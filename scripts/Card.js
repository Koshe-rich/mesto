import {openPopUp} from './index.js'

export class Card {
  constructor(data, templateSelector) { //Конструктор класса принимает данные элемента и селектор шаблона.
    this._data = data;
    this._templateSelector = templateSelector;
  }

  _getTemplate() { // получает шаблон элемента и возвращает его клон.
    const template = document.querySelector(this._templateSelector).content.querySelector('.place-item');
    return template.cloneNode(true);
  }

  _setEventListeners() { // добавляет обработчики событий на кнопки лайка и удаления, а также на изображение для просмотра.
    this._element.querySelector('.place-item__btn-like').addEventListener('click', this._handleLikeClick);
    this._element.querySelector('.place-item__btn-del').addEventListener('click', this._handleDeleteClick);
    this._itemImage.addEventListener('click', this._handleImageClick);
  }

  _handleLikeClick(evt) { // переключает класс активности на кнопке лайка.
    evt.target.classList.toggle('place-item__btn-like_active');
  }

  _handleDeleteClick(evt) { // удаляет карточку элемента.
    evt.target.closest('.place-item').remove();
  }

  _handleImageClick = () => { // открывает модальное окно для просмотра изображения и устанавливает значения src и alt для просматриваемого изображения, а также значение заголовка.
    const popupPreview = document.querySelector('.popup-img');
    const previewImg = popupPreview.querySelector('.popup-img__image');
    const titleImg = popupPreview.querySelector('.popup-img__title');

    previewImg.src = this._data.link;
    previewImg.alt = this._data.name;
    titleImg.textContent = this._data.name;

    openPopUp(popupPreview);
  }

  createCard() { // создает карточку элемента, заполняет его данными и возвращает элемент.
    this._element = this._getTemplate();
    this._itemImage = this._element.querySelector('.place-item__mask');
    this._setEventListeners();

    const itemName = this._element.querySelector('.place-item__place-name');


    itemName.textContent = this._data.name;
    this._itemImage.src = this._data.link;
    this._itemImage.alt = this._data.name;

    return this._element;
  }
}
