//ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПОВ


function closePopupEsc(evt) {
  if (evt.key === 'Escape') {  //проверяем, чтобы нажалась клавиша esc
    const opened = document.querySelector('.popup_opened');
    closePopup(opened);  //Закрываем попап
  }
};

function closePopupOverlay(evt) {
  if (evt.target.classList.contains('overlay')) { //проверяем, чтобы клик был на оверлэе
    if(evt.currentTarget === evt.target) { 
    closePopup(evt.currentTarget); 
    }
  }
};

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');  //Создали универсальную функцию открытия любых попапов
  document.addEventListener('keydown', closePopupEsc);
};

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened'); //Создали универсальную функцию закрытия любых попапов
  document.removeEventListener('keydown', closePopupEsc);
};

export {closePopupOverlay, closePopupEsc, openPopup, closePopup};