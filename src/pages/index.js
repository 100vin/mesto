import './index.css';
import Api from '../components/Api';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import {
  configValidation,
  configPopup,
  configCard,
  buttonEditAvatar,
  buttonEditProfile,
  buttonAddCard,
  apiToken,
  apiBaseUrl
} from '../utils/constants.js';

// API
const api = new Api({
  baseUrl: apiBaseUrl,
  headers: {
    authorization: apiToken,
    'Content-Type': 'application/json'
  }
});

// Валидация вводимых данных
const validatorEditProfile = new FormValidator(document.forms.formEditProfile, configValidation);
const validatorAddCard = new FormValidator(document.forms.formAddCard, configValidation);
const validatorEditAvatar = new FormValidator(document.forms.formEditAvatar, configValidation);
validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();
validatorEditAvatar.enableValidation();

// Объект с информацией о пользователе
const userInfo = new UserInfo(configPopup);

// Секция для отрисовки карточек
const cardList = new Section(
  {
    renderer: data => cardList.addItem(createCard(data))
  },
  '.elements__list'
);

// Создание карточки
function createCard(data) {
  const card = new Card(data, configCard, {
    handleCardClick: openPopupShowPhoto,
    handleLikeClick: toggleLikeButton,
    handleRemoveClick: clickRemoveButton
  });
  return card.createCard();
}

// Переключение кнопки лайка
function toggleLikeButton() {
  api.toggleLike(this.getId(), !this.isLiked())
    .then(card => this.setLike(
      card.likes.length, 
      card.likes.some(user => user._id === userInfo.getUserId())
    ))
    .catch(err => console.log(err));
}

// Нажатие кнопки удаления карточки
function clickRemoveButton(cardId, card) {
  popupConfirm.open();
  popupConfirm.setHandleFormSubmit(() => {
    api.deleteCard(cardId)
      .then(() => {
        popupConfirm.close();
        card.removeCard();
      })
      .catch(err => console.log(err));
  })
}

// Обработчик формы редактирования аватара
function handleEditAvatarSubmit(formData) {
  this.setLoadingState(true);
  api.changeAvatar({
    avatar: formData.link
  })
    .then(data => {
      this.close();
      userInfo.setUserInfo(data);
    })
    .catch(err => console.log(err))
    .finally(() => this.setLoadingState(false));
}

// Обработчик формы редактирования профиля
function handleEditProfileSubmit(formData) {
  this.setLoadingState(true);
  api.changeUserInfo(formData)
    .then(data => {
      this.close();
      userInfo.setUserInfo(data);
    })
    .catch(err => console.log(err))
    .finally(() => this.setLoadingState(false));
}

// Обработчик формы создания карточки
function handleAddCardSubmit(formData) {
  this.setLoadingState(true);
  api.addCard(formData)
    .then(data => {
      this.close();
      cardList.addItem(createCard({
        id: data._id,
        name: data.name,
        link: data.link,
        likes: 0,
        isLiked: false,
        isOwn: true
      }));
    })
    .catch(err => console.log(err))
    .finally(() => this.setLoadingState(false));
}

// Попап редактирования аватара
const popupEditAvatar = new PopupWithForm('#popupEditAvatar', configPopup, handleEditAvatarSubmit);
popupEditAvatar.setEventListeners();

// Попап редактирования профиля
const popupEditProfile = new PopupWithForm('#popupEditProfile', configPopup, handleEditProfileSubmit);
popupEditProfile.setEventListeners();

// Попап создания карточки
const popupAddCard = new PopupWithForm('#popupAddCard', configPopup, handleAddCardSubmit);
popupAddCard.setEventListeners();

// Попап с фотографией
const popupShowPhoto = new PopupWithImage('#popupShowPhoto', configPopup);
popupShowPhoto.setEventListeners();

// Попап с подтверждением удаления
const popupConfirm = new PopupWithConfirmation('#popupConfirm', configPopup);
popupConfirm.setEventListeners();

// Открытие окна редактирования аватара
function openPopupEditAvatar() {
  popupEditAvatar.open();
}

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

// Обработчик кнопки редактирования аватара
function handleButtonEditAvatar() {
  openPopupEditAvatar();
  validatorEditAvatar.resetValidation();
}

// Обработчик кнопки редактирования профиля
function handleButtonEditProfile() {
  openPopupEditProfile();
  validatorEditProfile.resetValidation();
}

// Обработчик кнопки добавления карточки
function handleButtonAddCard() {
  openPopupAddCard();
  validatorAddCard.resetValidation();
}

// Нажатие на кнопку редактирования аватара
buttonEditAvatar.addEventListener('click', handleButtonEditAvatar);

// Нажатие на кнопку редактирования профиля
buttonEditProfile.addEventListener('click', handleButtonEditProfile);

// Нажатие на кнопку добавления карточки
buttonAddCard.addEventListener('click', handleButtonAddCard);

// Загрузка информации о пользователе и заполнение начальными карточками
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    cardList.renderItems(initialCards.reverse().map(item => ({ 
      id: item._id,
      name: item.name,
      link: item.link,
      likes: item.likes.length,
      isLiked: item.likes.some(user => user._id === userInfo.getUserId()),
      isOwn: item.owner._id === userInfo.getUserId()
    })));
  })
  .catch(err => console.log(err));
