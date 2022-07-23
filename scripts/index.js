import Card from './Card.js';
import FormValidator from './FormValidator.js';

// Настройки для валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

// Шесть карточек «из коробки»
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardList = document.querySelector('.elements__list');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');

const popupEditProfile = document.querySelector('#popupEditProfile');
const formEditProfile = document.forms.formEditProfile;
const inputName = formEditProfile.elements.name;
const inputJob = formEditProfile.elements.job;

const popupAddCard = document.querySelector('#popupAddCard');
const formAddCard = document.forms.formAddCard;
const inputTitle = formAddCard.elements.title;
const inputLink = formAddCard.elements.link;

const popupShowPhoto = document.querySelector('#popupShowPhoto');
const popupPhoto = popupShowPhoto.querySelector('.popup__photo');
const popupCaption = popupShowPhoto.querySelector('.popup__caption');

// Открытие всплывающего окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

// Закрытие всплывающего окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}

// Закрытие всплывающего окна при нажатии "Escape"
function closePopupOnEsc(e) {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// Открытие окна редактирования профиля
function openPopupEditProfile() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(popupEditProfile);
}

// Открытие окна добавления карточки
function openPopupAddCard() {
  // resetValidation(formAddCard, validationConfig);
  openPopup(popupAddCard);
}

// Открытие окна с фотографией
function openPopupShowPhoto(card) {
  popupPhoto.src = card.link;
  popupPhoto.alt = card.name;
  popupCaption.textContent = card.name;
  openPopup(popupShowPhoto)
}

// Сохранение профиля
function saveProfile(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEditProfile);
}

// Добавление карточки
function addCard(data) {
  const card = new Card(data, '#cardTemplate', openPopupShowPhoto);
  cardList.prepend(card.createCard());
}

// Сохранение карточки
function saveCard(e) {
  e.preventDefault();
  addCard({
    name: inputTitle.value,
    link: inputLink.value
  });
  e.target.reset();
  closePopup(popupAddCard);
}

// Заполнение начальными карточками
initialCards.forEach(card => addCard(card));

// Валидация вводимых данных
const validatorEditProfile = new FormValidator(formEditProfile, validationConfig);
validatorEditProfile.enableValidation();
const validatorAddCard = new FormValidator(formAddCard, validationConfig);
validatorAddCard.enableValidation();

// Редактирование профиля
profileEditBtn.addEventListener('click', () => {
  openPopupEditProfile();
  validatorEditProfile.resetValidation();
});
formEditProfile.addEventListener('submit', saveProfile);

// Заполнение данных карточки
profileAddBtn.addEventListener('click', () => {
  openPopupAddCard();
  validatorAddCard.resetValidation();
});
formAddCard.addEventListener('submit', saveCard);

// Закрытие попапов по клику на оверлей и крестик
popups.forEach(popup => {
  popup.addEventListener('mousedown', e => {
    if (
      e.target.classList.contains('popup_opened') || 
      e.target.classList.contains('popup__close-button')
    ) closePopup(popup);
  })
});
