import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
  config,
  initialCards,
  buttonEditProfile,
  buttonAddCard
} from '../utils/constants.js';


// Валидация вводимых данных
const validatorEditProfile = new FormValidator(document.forms.formEditProfile, config);
const validatorAddCard = new FormValidator(document.forms.formAddCard, config);
validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();

// Создание карточки
function createCard(data) {
  const card = new Card(data, '#cardTemplate', config, openPopupShowPhoto);
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
const userInfo = new UserInfo(config);

// Обработчик формы редактирования профиля
function handleEditProfileSubmit(formData) {
  userInfo.setUserInfo({
    name: formData.name, 
    job: formData.job
  });
}

// Обработчик формы создания карточки
function handleAddCardSubmit(formData) {
  cardList.addItem(createCard({
    name: formData.title,
    link: formData.link
  }));
}

// Попап редактирования профиля
const popupEditProfile = new PopupWithForm('#popupEditProfile', config, handleEditProfileSubmit);

// Попап создания карточки
const popupAddCard = new PopupWithForm('#popupAddCard', config, handleAddCardSubmit);

// Попап с фотографией
const popupShowPhoto = new PopupWithImage('#popupShowPhoto', config);

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
buttonEditProfile.addEventListener('click', () => {
  openPopupEditProfile();
  validatorEditProfile.resetValidation();
});

// Обработчик кнопки добавления карточки
buttonAddCard.addEventListener('click', () => {
  openPopupAddCard();
  validatorAddCard.resetValidation();
});

// Заполнение начальными карточками
cardList.renderItems();