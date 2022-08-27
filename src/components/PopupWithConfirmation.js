import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, config) {
    super(popupSelector, config);
    this._form = this._popup.querySelector(this._config.formSelector);
  }

  setHandleFormSubmit(handle) {
    this._handleFormSubmit = handle;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
  }
}
