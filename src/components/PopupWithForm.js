import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, config, handleFormSubmit) {
    super(popupSelector, config);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(this._config.formSelector);
    this._inputList = this._form.querySelectorAll(this._config.inputSelector);
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => this._inputValues[input.name] = input.value);
    return this._inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      if(data[input.name]) input.value = data[input.name];
    });
  }

  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      // this.close();
    });
  }
}
