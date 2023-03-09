//ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПОВ

import {initialCards, cardContainer, popupEdit, popupEditButtonOpen, popupEditButtonClose, popupAdd, popupAddButtonOpen, popupAddButtonClose, formElement, nameInput, jobInput, profileName,
  profileJob, mestoEdit, title, link, initialCardsReverse, popupImg, imgLink, imgName, popupImgClose, cardTemplate} from './constants.js'

//Закрытие на оверлэй и esc
function closePopupOverlay(evt) {
    const opened = document.querySelector('.popup_opened'); //Нахожу открытый попап
    if (evt.target.classList.contains('overlay')) {  //проверяем, чтобы клик был на оверлэе
      popupClose(opened); 
    }
};

function closePopupEsc(evt) {
  const opened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {  //проверяем, чтобы нажалась клавиша esc
    popupClose(opened);  //Закрываем попап
  }
};

function popupOpen(popupElement) {
  popupElement.classList.add('popup_opened');  //Создали универсальную функцию открытия любых попапов
  popupElement.addEventListener('click', closePopupOverlay);
  document.addEventListener('keydown', closePopupEsc);
};

function popupClose(popupElement) {
  popupElement.classList.remove('popup_opened'); //Создали универсальную функцию закрытия любых попапов
  popupElement.removeEventListener('click', closePopupOverlay); //Сняли слушатель при закрытии попапа
  document.removeEventListener('keydown', closePopupEsc);
};

function addValueToTextcontent(popup) {       //Функция, которая подставляет действующие значения имени и профессии в поля инпут
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

//ФУНКЦИЯ ОТКРЫТИЯ КАРТИНКИ ИЗ КАРТОЧКИ
function openImg(element) {  
  imgLink.src = element.src;   //Подставляем значения из массива
  imgLink.alt = element.alt;
  imgName.textContent = element.alt;
  popupOpen(popupImg);
};

  //--------------------------------------------

  export {closePopupOverlay, closePopupEsc, popupOpen, popupClose, addValueToTextcontent, openImg};