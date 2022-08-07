import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, config) {
    super(popupSelector, config);
    this._photo = this._popup.querySelector(this._config.photoSelector);
    this._caption = this._popup.querySelector(this._config.captionSelector);
  }

  open({name, link}) {
    this._photo.src = link;
    this._photo.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
