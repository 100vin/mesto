export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  _setEventListeners() {
    this._cardlike.addEventListener('click', () => this._cardlike.classList.toggle('element__like-button_active'));
    this._cardRemove.addEventListener('click', () => this._element.remove());
    this._cardImage.addEventListener('click', () => this._handleImageClick(this._data));
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardName = this._element.querySelector('.element__name');
    this._cardImage = this._element.querySelector('.element__image');
    this._cardlike = this._element.querySelector('.element__like-button');
    this._cardRemove = this._element.querySelector('.element__remove-button');
    
    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();
    
    return this._element;
  }
}
