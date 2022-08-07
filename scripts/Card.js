export default class Card {
  constructor(data, cardSelector, config, handleCardClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._config = config;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector(this._config.cardSelector)
      .cloneNode(true);
  }

  _handleLikeClick() {
    this._cardlike.classList.toggle(this._config.cardLikeButtonActiveClass);
  }
  
  _handleRemoveClick() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardlike.addEventListener('click', () => this._handleLikeClick());
    this._cardRemove.addEventListener('click', () => this._handleRemoveClick());
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._data));
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardName = this._element.querySelector(this._config.cardNameSelector);
    this._cardImage = this._element.querySelector(this._config.cardImageSelector);
    this._cardlike = this._element.querySelector(this._config.cardLikeButtonSelector);
    this._cardRemove = this._element.querySelector(this._config.cardRemoveButtonSelector);
    
    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();
    
    return this._element;
  }
}
