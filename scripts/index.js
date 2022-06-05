const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileEditBtn = document.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close-button');

const formElement = popup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_data_name');
const jobInput = formElement.querySelector('.popup__input_data_job');

function togglePopup() {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    document.addEventListener('keydown', closePopupOnEsc);
    nameInput.focus();
  } else {
    document.removeEventListener('keydown', closePopupOnEsc);
  }
  
}

function closePopupOnEsc(e) {
  if (e.keyCode === 27) {
    togglePopup();
  }
}

profileEditBtn.addEventListener('click', togglePopup);
popupCloseBtn.addEventListener('click', togglePopup);

popup.addEventListener('click', function(e) {
  if (e.target === e.currentTarget) {
    togglePopup();
  }
});

formElement.addEventListener('submit', function(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup();
});
