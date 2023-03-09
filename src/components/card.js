import {initialCards, cardContainer, popupEdit, popupEditButtonOpen, popupEditButtonClose, popupAdd, popupAddButtonOpen, popupAddButtonClose, formElement, nameInput, jobInput, profileName,
    profileJob, mestoEdit, title, link, initialCardsReverse, popupImg, imgLink, imgName, popupImgClose, cardTemplate} from './constants.js'
    import {closePopupOverlay, closePopupEsc, popupOpen, popupClose, addValueToTextcontent, openImg} from './modal.js'    
//ФУНКЦИЯ РЕНДЕРА КАРТОЧКИ
function renderCard(evt) {    
    evt.preventDefault();
    
    cardContainer.prepend(createCard(title.value, link.value));  //Вызываем фукн-ю createCard со значениями из инпутов
    mestoEdit.reset();   //Очистили форму
    popupClose(popupAdd);   //Закрыли попап
};

//--------------------------------------------

//ФУНКЦИЯ ИМЕННО СОЗДАНИЯ ШАБЛОНА КАРТОЧКИ
function createCard(name, link) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);  //Скопировали содержимое темплейта
    const cardImg = cardElement.querySelector('.card__image'); //Выбираем картинку
    const cardName = cardElement.querySelector('.card__title'); //Выбираем заголовок
  
    cardImg.src = link;
    cardImg.alt = name;  //Присваиваем что и куда будет подставляться (link в src)
    cardName.textContent = name; //(name в alt и textContent)
    //Далее вешаем нужные слушатели
    cardImg.addEventListener('click', function (evt) {  // Слушатель Открытия картинки из карточки
      openImg(evt.target)
    });
  
    cardElement.querySelector('.card__button-like').addEventListener('click', function (evt) {  //Слушатель  лайки активными
      evt.target.classList.toggle('card__button-like_active')
    });
  
    cardElement.querySelector('.card__button-delete').addEventListener('click', function (evt) {  //Слушатель Удаление карточки
      evt.target.closest('.card').remove();
    });
  
    return cardElement;   //Возвращаем собранную карточку
  };
  //--------------------------------------------
  
  
  initialCardsReverse.forEach(function (card) {   //Перебираем массив форичем
    const newCard = createCard(card.name, card.link) //Записываем в переменную - собранную карточку из функции createCard
    cardContainer.prepend(newCard); //Вставляем карточку в контейнер
  });

  export {renderCard, createCard}