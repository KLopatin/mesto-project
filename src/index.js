import "./pages/index.css";

import {
  popupEdit,
  popupEditButtonOpen,
  popupEditButtonClose,
  popupAdd,
  popupAddButtonOpen,
  popupAddButtonClose,
  formProfileElement,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  mestoEdit,
  popupImgClose,
  settings,
  imgLink,
  imgName,
  popupImg,
  cardContainer,
  title,
  link,
  mestoSave,
  profileAvatar, 
  popupAvatar,
  popupAvatarButtonClose,
  popupAvatarButtonOpen,
  popupAvatarForm,
  popupAvatarInput,
  popupAvatarSave,
  popupEditSave
} from "./components/constants.js";

import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, disablePopupButton } from "./components/validate.js";
import { createCard } from "./components/card.js";
import { getCards, getProfile, changeInfoProfile, addNewCard} from "./components/api.js";
import { deleteCard, addLike, deleteLike, changeAvatar} from './components/api.js'


let myId;

Promise.all([getCards(), getProfile()])
  .then((result) => {
    myId = result[1]._id
    result[0].reverse().forEach((res) => {
      const newCard = createCard(res.name, res.link, res.likes, myId, res.owner._id, res._id, handleDeleteCard, handlePutLike, handleDeleteLike); //Записываем в переменную - собранную карточку из функции createCard
      cardContainer.prepend(newCard); //Вставляем карточку в контейнер
    }),
    profileName.textContent = result[1].name;
    profileJob.textContent = result[1].about;
    profileAvatar.src = result[1].avatar;
    console.log(result[1].avatar);
  })
  .catch((err) => {
    console.log(err);
  });

//ФУНКЦИЯ добавления новой КАРТОЧКИ
function renderCard(evt) {
  evt.preventDefault();
  mestoSave.textContent = "Сохранение...";
  addNewCard(title.value, link.value)
  .then((res) => {
    const newCard = createCard(res.name, res.link, res.likes, myId, res.owner._id, res._id, handleDeleteCard, handlePutLike, handleDeleteLike);
    cardContainer.prepend(newCard);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mestoSave.textContent = "Сохранить";
  });
  mestoEdit.reset(); //Очистили форму
  closePopup(popupAdd); //Закрыли попап
}

//Функция удаления карточки
function handleDeleteCard(cardId, currentCard) {
  deleteCard(cardId)
  .then(() => currentCard.remove())
  .catch((err) => {
    console.log(err);
  })
}

//Функция поставить лайк
function handlePutLike(cardId, buttonElement, counterLikes) {
  addLike(cardId)
  .then((res) => {
    counterLikes.textContent = res.likes.length
    buttonElement.classList.add('card__button-like_active')
  })
  .catch((err) => {
    console.log(err);
  })
}

//Функция удалить лайк
function handleDeleteLike(cardId, buttonElement, counterLikes) {
  deleteLike(cardId)
  .then((res) => {
    counterLikes.textContent = res.likes.length
    buttonElement.classList.remove('card__button-like_active')
    if(res.likes.length === 0) {
      counterLikes.textContent = ''
    }
  })
  .catch((err) => {
    console.log(err);
  })
}

//Функция поменять аватар
function handleChangeAvatar() {
  popupAvatarSave.textContent = "Сохранение...";
  changeAvatar(popupAvatarInput.value)
  .then((res) => {
    profileAvatar.src = res.avatar;
    profileName.textContent = res.name;
    profileJob.textContent = res.about;
    myId = res._id;
    closePopup(popupAvatar);
    popupAvatarForm.reset();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupAvatarSave.textContent = "Сохранить";
  });
}

//Функция поменять ИМЯ И ОПИСАНИЕ ПРОФИЛЯ

// function changeDataProfile(evt) {
//   evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
//   profileName.textContent = nameInput.value; // Получите значение полей jobInput и nameInput из свойства value
//   profileJob.textContent = jobInput.value; // Вставьте новые значения с помощью textContent
//   changeInfoProfile(nameInput.value, jobInput.value);
//   closePopup(popupEdit); //Не забыть закрыть попап
// }

function changeDataProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value; // Получите значение полей jobInput и nameInput из свойства value
  profileJob.textContent = jobInput.value; // Вставьте новые значения с помощью textContent
  popupEditSave.textContent = "Сохранение...";
  changeInfoProfile(nameInput.value, jobInput.value)
  .then((res) => {
    profileName.textContent = res.name;
    profileJob.textContent = res.about;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
      popupEditSave.textContent = "Сохранить";
    });

  closePopup(popupEdit);
}

formProfileElement.addEventListener("submit", changeDataProfile); //Вызываем функцию при отправке формы
//--------------------------------------------

function addValueToTextcontent(popup) {
  //Функция, которая подставляет действующие значения имени и профессии в поля инпут
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}


popupAvatarButtonOpen.addEventListener("click", function () {
  openPopup(popupAvatar);
  disablePopupButton(settings, popupAvatarSave);
});
popupAvatarButtonClose.addEventListener("click", function () {
  closePopup(popupAvatar);
});

popupAvatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleChangeAvatar();
});

popupEditButtonOpen.addEventListener("click", function () {
  //Повесили обработчик на кнопку редактирования профиля редакт.проф. -> открывает попап
  addValueToTextcontent(popupEdit); //Функция, которая подставляет значения в имени и работы в инпуты
  openPopup(popupEdit);
  disablePopupButton(settings, popupEditSave);
});

popupEditButtonClose.addEventListener("click", function () {
  closePopup(popupEdit);
}); //Повесили обработчик на кнопку Закрытия попапа редакт.проф. -> закрывает попап

popupAddButtonOpen.addEventListener("click", function () {
  openPopup(popupAdd);
  disablePopupButton(settings, mestoSave);
}); //Повесили обработчик на кнопку доб. карточки -> открывает попап

popupAddButtonClose.addEventListener("click", function () {
  closePopup(popupAdd);
}); //Повесили обработчик на кнопку Закрытия попапа доб. карточки -> закрывает попап

popupImgClose.addEventListener("click", function () {
  //Закрытие попапа картинки
  closePopup(popupImg);
});

mestoEdit.addEventListener("submit", renderCard);

//ФУНКЦИЯ ОТКРЫТИЯ КАРТИНКИ ИЗ КАРТОЧКИ
export function openImg(element) {
  imgLink.src = element.src; //Подставляем значения из массива
  imgLink.alt = element.alt;
  imgName.textContent = element.alt;
  openPopup(popupImg);
}

//ВЫЗОВ ФУНКЦИИ ВАЛИДАЦИИ
enableValidation(settings);

getCards();
getProfile();

//:3
