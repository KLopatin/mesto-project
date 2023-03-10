import './pages/index.css';

import {popupEdit, popupEditButtonOpen, popupEditButtonClose, popupAdd, popupAddButtonOpen, popupAddButtonClose, formElement, nameInput, jobInput, profileName,
  profileJob, mestoEdit,popupImgClose,settings} from './components/constants.js'
import {popupOpen, popupClose, addValueToTextcontent,} from './components/modal.js'
import {enableValidation} from './components/validate.js'
import {renderCard} from './components/card.js'

import {getCards, getProfile} from './components/api.js'

//ИЗМЕНЯЕМ ИМЯ И ОПИСАНИЕ ПРОФИЛЯ
function changeDataProfile(evt) {
  evt.preventDefault();  // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;  // Получите значение полей jobInput и nameInput из свойства value
  profileJob.textContent = jobInput.value;  // Вставьте новые значения с помощью textContent
  popupClose(popupEdit);  //Не забыть закрыть попап
};
formElement.addEventListener('submit', changeDataProfile);  //Вызываем функцию при отправке формы
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

getCards();
getProfile()

//:3