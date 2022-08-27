export default class Card {
  constructor(data, config, { handleCardClick, handleLikeClick, handleRemoveClick }) {
    this._data = data;
    this._id = data.id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._isLiked = data.isLiked;
    this._isOwn = data.isOwn;
    this._config = config;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleRemoveClick = handleRemoveClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._config.cardTemplate)
      .content
      .querySelector(this._config.cardSelector)
      .cloneNode(true);
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._data));
    this._cardlikeButton.addEventListener('click', () => this._handleLikeClick());
    if (this._isOwn) this._cardRemove.addEventListener('click', () => this._handleRemoveClick(this._id, this));
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }

  setLike(likes, isLiked) {
    this._likes = likes;
    this._isLiked = isLiked;
    this._cardlikeButton.classList.toggle(this._config.cardLikeButtonActiveClass, isLiked);
    this._cardlikeAmount.textContent = likes;
  }
  
  createCard() {
    this._element = this._getTemplate();
    this._cardName = this._element.querySelector(this._config.cardNameSelector);
    this._cardImage = this._element.querySelector(this._config.cardImageSelector);
    this._cardlikeButton = this._element.querySelector(this._config.cardLikeButtonSelector);
    this._cardlikeAmount = this._element.querySelector(this._config.cardLikeAmountSelector);
    this._cardRemove = this._element.querySelector(this._config.cardRemoveButtonSelector);
    
    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardlikeAmount.textContent = this._likes;

    if (!this._isOwn) {
      this._cardRemove.remove();
      this._cardRemove = null;
    }

    this.setLike(this._likes, this._isLiked);

    this._setEventListeners();
    
    return this._element;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
    this._cardName = null;
    this._cardImage = null;
    this._cardlikeButton = null;
    this._cardlikeAmount = null;
    this._cardRemove = null;
  }
}
