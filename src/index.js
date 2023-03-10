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
} from "./components/constants.js";

import { popupOpen, popupClose } from "./components/modal.js";
import { enableValidation, disablePopupButton } from "./components/validate.js";
import { createCard } from "./components/card.js";
import { getCards, getProfile, changeInfoProfile, addNewCard} from "./components/api.js";

Promise.all([getCards(), getProfile()])
  .then((result) => {
    result[0].forEach((res) => {
      const newCard = createCard(res.name, res.link, res.likes); //Записываем в переменную - собранную карточку из функции createCard
      cardContainer.prepend(newCard); //Вставляем карточку в контейнер
    }),
    profileName.textContent = result[1].name;
    profileJob.textContent = result[1].about;
    profileAvatar.src = result[1].avatar;
  })
  .catch((err) => {
    console.log(err);
  });



//ФУНКЦИЯ РЕНДЕРА КАРТОЧКИ
function renderCard(evt) {
  evt.preventDefault();
  cardContainer.prepend(createCard(title.value, link.value)); //Вызываем фукн-ю createCard со значениями из инпутов
  addNewCard(title.value, link.value)
  mestoEdit.reset(); //Очистили форму
  popupClose(popupAdd); //Закрыли попап
}
//--------------------------------------------

//ИЗМЕНЯЕМ ИМЯ И ОПИСАНИЕ ПРОФИЛЯ
function changeDataProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value; // Получите значение полей jobInput и nameInput из свойства value
  profileJob.textContent = jobInput.value; // Вставьте новые значения с помощью textContent
  changeInfoProfile(nameInput.value, jobInput.value);
  popupClose(popupEdit); //Не забыть закрыть попап
}
formProfileElement.addEventListener("submit", changeDataProfile); //Вызываем функцию при отправке формы
//--------------------------------------------

function addValueToTextcontent(popup) {
  //Функция, которая подставляет действующие значения имени и профессии в поля инпут
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

popupEditButtonOpen.addEventListener("click", function () {
  //Повесили обработчик на кнопку редактирования профиля редакт.проф. -> открывает попап
  addValueToTextcontent(popupEdit); //Функция, которая подставляет значения в имени и работы в инпуты
  popupOpen(popupEdit);
});

popupEditButtonClose.addEventListener("click", function () {
  popupClose(popupEdit);
}); //Повесили обработчик на кнопку Закрытия попапа редакт.проф. -> закрывает попап

popupAddButtonOpen.addEventListener("click", function () {
  popupOpen(popupAdd);
  disablePopupButton(settings, mestoSave);
}); //Повесили обработчик на кнопку доб. карточки -> открывает попап

popupAddButtonClose.addEventListener("click", function () {
  popupClose(popupAdd);
}); //Повесили обработчик на кнопку Закрытия попапа доб. карточки -> закрывает попап

popupImgClose.addEventListener("click", function () {
  //Закрытие попапа картинки
  popupClose(popupImg);
});

mestoEdit.addEventListener("submit", renderCard);

//ФУНКЦИЯ ОТКРЫТИЯ КАРТИНКИ ИЗ КАРТОЧКИ
export function openImg(element) {
  imgLink.src = element.src; //Подставляем значения из массива
  imgLink.alt = element.alt;
  imgName.textContent = element.alt;
  popupOpen(popupImg);
}

//ВЫЗОВ ФУНКЦИИ ВАЛИДАЦИИ
enableValidation(settings);

getCards();
getProfile();

//:3
