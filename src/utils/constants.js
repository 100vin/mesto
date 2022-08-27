export const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export const configPopup = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  submitButtonLoadingText: 'Сохранение...',
  nameSelector: '.profile__name', 
  jobSelector: '.profile__job',
  avatarSelector: '.profile__avatar',
  photoSelector: '.popup__photo',
  captionSelector: '.popup__caption',
  popupOpenedClass: 'popup_opened',
  popupCloseButtonClass: 'popup__close-button',
  
}

export const configCard = {
  cardTemplate: '#cardTemplate',
  cardSelector: '.element',
  cardNameSelector: '.element__name',
  cardImageSelector: '.element__image',
  cardLikeButtonSelector: '.element__like-button',
  cardLikeAmountSelector: '.element__like-amount',
  cardRemoveButtonSelector: '.element__remove-button',
  cardLikeButtonActiveClass: 'element__like-button_active'
}

export const buttonEditAvatar = document.querySelector('.profile__avatar-edit-button');
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddCard = document.querySelector('.profile__add-button');

export const apiToken = '97ae2188-defc-4242-9031-073e5e3dba90';
export const apiBaseUrl = 'https://mesto.nomoreparties.co/v1/cohort-48';