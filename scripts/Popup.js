export default class Popup {
  constructor(popupSelector, config) {
    this._popup = document.querySelector(popupSelector);
    this._config = config;
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  
  _handleEscClose(e) {
    if (e.key === 'Escape') this.close();
  }

  open() {
    this._popup.classList.add(this._config.popupOpenedClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(this._config.popupOpenedClass);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', e => {
      if (
        e.target.classList.contains(this._config.popupOpenedClass) || 
        e.target.classList.contains(this._config.popupCloseButtonClass)
      ) this.close();
    })
  }
}
