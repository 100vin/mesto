import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
  configValidation,
  configPopup,
  configCard,
  initialCards,
  buttonEditProfile,
  buttonAddCard
} from '../utils/constants.js';


// Валидация вводимых данных
const validatorEditProfile = new FormValidator(document.forms.formEditProfile, configValidation);
const validatorAddCard = new FormValidator(document.forms.formAddCard, configValidation);
validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();

// Создание карточки
function createCard(data) {
  const card = new Card(data, '#cardTemplate', configCard, openPopupShowPhoto);
  return card.createCard();
}

// Секция для отрисовки карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardList.addItem(createCard(data));
    }
  },
  '.elements__list'
);

// Объект с информацией о пользователе
const userInfo = new UserInfo(configPopup);

// Обработчик формы редактирования профиля
function handleEditProfileSubmit(formData) {
  userInfo.setUserInfo({
    name: formData.name, 
    job: formData.job
  });
  this.close();
}

// Обработчик формы создания карточки
function handleAddCardSubmit(formData) {
  cardList.addItem(createCard({
    name: formData.title,
    link: formData.link
  }));
  this.close();
}

// Попап редактирования профиля
const popupEditProfile = new PopupWithForm('#popupEditProfile', configPopup, handleEditProfileSubmit);
popupEditProfile.setEventListeners();

// Попап создания карточки
const popupAddCard = new PopupWithForm('#popupAddCard', configPopup, handleAddCardSubmit);
popupAddCard.setEventListeners();

// Попап с фотографией
const popupShowPhoto = new PopupWithImage('#popupShowPhoto', configPopup);
popupShowPhoto.setEventListeners();


// Открытие окна редактирования профиля
function openPopupEditProfile() {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
}

// Открытие окна добавления карточки
function openPopupAddCard() {
  popupAddCard.open();
}

// Открытие окна с фотографией
function openPopupShowPhoto(data) {
  popupShowPhoto.open(data);
}

// Обработчик кнопки редактирование профиля
function handleButtonEditProfile() {
  openPopupEditProfile();
  validatorEditProfile.resetValidation();
}

// Обработчик кнопки добавления карточки
function handleButtonAddCard() {
  openPopupAddCard();
  validatorAddCard.resetValidation();
}

// Нажатие на кнопку редактирования профиля
buttonEditProfile.addEventListener('click', handleButtonEditProfile);

// Нажатие на кнопку добавления карточки
buttonAddCard.addEventListener('click', handleButtonAddCard);

// Заполнение начальными карточками
cardList.renderItems();