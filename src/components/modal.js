//ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПОВ

//Закрытие на оверлэй и esc
function closePopupOverlay(evt) {
    if (evt.target.classList.contains('overlay')) {  //проверяем, чтобы клик был на оверлэе
      const opened = document.querySelector('.popup_opened'); //Нахожу открытый попап
      closePopup(opened); 
    }
};

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {  //проверяем, чтобы нажалась клавиша esc
    const opened = document.querySelector('.popup_opened');
    closePopup(opened);  //Закрываем попап
  }
};

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');  //Создали универсальную функцию открытия любых попапов
  popupElement.addEventListener('mousedown', closePopupOverlay);
  document.addEventListener('keydown', closePopupEsc);
};

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened'); //Создали универсальную функцию закрытия любых попапов
  popupElement.removeEventListener('mousedown', closePopupOverlay); //Сняли слушатель при закрытии попапа
  document.removeEventListener('keydown', closePopupEsc);
};

export {closePopupOverlay, closePopupEsc, openPopup, closePopup};