import './pages/index.css';

import {initialCards, cardContainer, popupEdit, popupEditButtonOpen, popupEditButtonClose, popupAdd, popupAddButtonOpen, popupAddButtonClose, formElement, nameInput, jobInput, profileName,
  profileJob, mestoEdit, title, link, initialCardsReverse, popupImg, imgLink, imgName, popupImgClose, cardTemplate, settings} from './components/constants.js'
import {closePopupOverlay, closePopupEsc, popupOpen, popupClose, addValueToTextcontent, openImg} from './components/modal.js'
import {showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation} from './components/validate.js'
import {renderCard, createCard} from './components/card.js'

//ИЗМЕНЯЕМ ИМЯ И ОПИСАНИЕ ПРОФИЛЯ
function handleFormSubmit(evt) {
  evt.preventDefault();  // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;  // Получите значение полей jobInput и nameInput из свойства value
  profileJob.textContent = jobInput.value;  // Вставьте новые значения с помощью textContent
  popupClose(popupEdit);  //Не забыть закрыть попап
};
formElement.addEventListener('submit', handleFormSubmit);  //Вызываем функцию при отправке формы
//--------------------------------------------


popupEditButtonOpen.addEventListener('click', function () {   //Повесили обработчик на кнопку редактирования профиля редакт.проф. -> открывает попап
  addValueToTextcontent(popupEdit); //Функция, которая подставляет значения в имени и работы в инпуты
  popupOpen(popupEdit)
});

popupEditButtonClose.addEventListener('click', function () { popupClose(popupEdit) });  //Повесили обработчик на кнопку Закрытия попапа редакт.проф. -> закрывает попап

popupAddButtonOpen.addEventListener('click', function () { popupOpen(popupAdd) });   //Повесили обработчик на кнопку доб. карточки -> открывает попап
popupAddButtonClose.addEventListener('click', function () { popupClose(popupAdd) });  //Повесили обработчик на кнопку Закрытия попапа доб. карточки -> закрывает попап

popupImgClose.addEventListener('click', function () {    //Закрытие попапа картинки
  popupClose(popupImg)
});

mestoEdit.addEventListener('submit', renderCard);



//ВЫЗОВ ФУНКЦИИ ВАЛИДАЦИИ
enableValidation(settings);

//:3