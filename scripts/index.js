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

const cardTemplate = document.querySelector('#card-template').content.querySelector('.element');
const cardList = document.querySelector('.elements__list');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupAddCard = document.querySelector('#popup-add-card');

const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

// const formElement = popup.querySelector('.popup__form');
const inputName = popupEditProfile.querySelector('.popup__input_data_name');
const inputJob = popupEditProfile.querySelector('.popup__input_data_job');

// Открытие всплывающего окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
  // popup.querySelector('.popup__input').focus();
  document.addEventListener('keydown', closePopupOnEsc);
}

// Закрытие всплывающего окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}

// Закрытие всплывающего окна при нажатии "Escape"
function closePopupOnEsc(e) {
  if (e.keyCode === 27) {
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

// Добавление карточки
function addCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.element__image').src = link;
  cardElement.querySelector('.element__image').alt = name;
  cardElement.querySelector('.element__name').textContent = name;
  cardList.prepend(cardElement);
}

// Заполнение начальными карточками
initialCards.forEach(item => addCard(item['name'], item['link']));

profileEditBtn.addEventListener('click', openPopupEditProfile);
profileAddBtn.addEventListener('click', () => openPopup(popupAddCard));

popupCloseButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

popups.forEach(popup => {
  popup.addEventListener('click', e => {
    if (e.target === e.currentTarget) closePopup(popup);
  })
});




// function formSubmitHandler(e) {
//   e.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   togglePopup();
// }


// popup.addEventListener('click', function(e) {
//   if (e.target === e.currentTarget) {
//     togglePopup();
//   }
// });

// formElement.addEventListener('submit', formSubmitHandler);
