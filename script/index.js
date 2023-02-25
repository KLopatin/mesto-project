(function () {
const initialCards = [
  {
    name: 'Дубай',
    link: 'https://images.unsplash.com/photo-1656403102555-c34ecc98e5aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Челябинская область',
    link: 'https://images.unsplash.com/photo-1667059979192-a301b284fe87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Швейцария',
    link: 'https://images.unsplash.com/photo-1554747454-e0c176da447c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Камчатский край',
    link: 'https://images.unsplash.com/photo-1536383794906-773f6a5210be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80'
  },
  {
    name: 'Иран',
    link: 'https://images.unsplash.com/photo-1594322665827-f257ed9ac92e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=711&q=80'
  },
  {
    name: 'Канада',
    link: 'https://images.unsplash.com/photo-1502003148287-a82ef80a6abc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
  }
];

const cardContainer = document.querySelector('.elements'); //Нашли куда будем вставлять карточки (див где будут все карточки)


const popupEdit = document.querySelector('#popup-edit');  //Нашли сам попап редактирования профиля
const popupEditButtonOpen = document.querySelector('.profile__edit');  //Нашли кнопку открытия попапа редактирования профиля
const popupEditButtonClose = document.querySelector('#popup-edit__close');  //Нашли кнопку закрытия попапа редактирования профиля

const popupAdd = document.querySelector('#popup-mesto');   //Нашли сам попап добавления карточки
const popupAddButtonOpen = document.querySelector('#profile__add'); //Нашли кнопку открытия попапа добавления карточки
const popupAddButtonClose = document.querySelector('#popup-mesto__close'); //Нашли кнопку закрытия попапа добавления карточки

function popupOpen(popupElement) {
  popupElement.classList.add('popup_opened');  //Создали универсальную функцию открытия любых попапов
};

function popupClose(popupElement) {
  popupElement.classList.remove('popup_opened'); //Создали универсальную функцию закрытия любых попапов
};

function addValueToTextcontent(popup) {       //Функция, которая подставляет действующие значения имени и профессии в поля инпут
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

//ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПОВ
popupEditButtonOpen.addEventListener('click', function () {   //Повесили обработчик на кнопку редактирования профиля редакт.проф. -> открывает попап
  addValueToTextcontent(popupEdit); //Функция, которая подставляет значения в имени и работы в инпуты
  popupOpen(popupEdit)
});
popupEditButtonClose.addEventListener('click', function () { popupClose(popupEdit) });  //Повесили обработчик на кнопку Закрытия попапа редакт.проф. -> закрывает попап

popupAddButtonOpen.addEventListener('click', function () { popupOpen(popupAdd) });   //Повесили обработчик на кнопку доб. карточки -> открывает попап
popupAddButtonClose.addEventListener('click', function () { popupClose(popupAdd) });  //Повесили обработчик на кнопку Закрытия попапа доб. карточки -> закрывает попап

//Закрытие на оверлэй и esc
// popupEdit.addEventListener('click', function (evt) {    //Повесели слушатель на весь попап
//   if (evt.target.classList.contains('overlay')) {  //проверяем, чтобы клик был на оверлэе
//     popupClose(popupEdit);   //Закрываем попап
//   }
// });
// document.addEventListener('keydown', function (evt) {
//   if (evt.key === 'Escape') {  //проверяем, чтобы нажалась клавиша esc
//     popupClose(popupEdit);    //Закрываем попап
//   }
// });

// document.addEventListener('click', function (evt) {    //Повесели слушатель на весь попап
//   if (evt.target.classList.contains('overlay')) {  //проверяем, чтобы клик был на оверлэе
//     popupClose(popupAdd);   //Закрываем попап
//     popupClose(popupEdit);
//   }
// });
// document.addEventListener('keydown', function (evt) {
//   if (evt.key === 'Escape') {  //проверяем, чтобы нажалась клавиша esc
//     popupClose(popupAdd);    //Закрываем попап
//     popupClose(popupEdit);
//   }
// });


//--------------------------------------------

//СОХРАНЕНИЕ ИМЕНИ И ПРОФЕССИИ
const formElement = popupEdit.querySelector('.popup__edit');  // Находим форму в DOM
const nameInput = popupEdit.querySelector('#input-name');  // Находим инпуты формы в DOM
const jobInput = popupEdit.querySelector('#input-job');

const profileName = document.querySelector('.profile__name'); // Выберите элементы, куда должны быть подставлены значения инпутов 
const profileJob = document.querySelector('.profile__info-about');

function handleFormSubmit(evt) {
  evt.preventDefault();  // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;  // Получите значение полей jobInput и nameInput из свойства value
  profileJob.textContent = jobInput.value;  // Вставьте новые значения с помощью textContent
  popupClose(popupEdit);  //Не забыть закрыть попап
};
formElement.addEventListener('submit', handleFormSubmit);  //Вызываем функцию при отправке формы
//--------------------------------------------

//ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ ИЗ ФОРМЫ
const mestoEdit = document.querySelector('[name="add-form"]');  //Нашли форму добавления карточки
const title = document.querySelector('#input-title');   //Нашли инпут с названием
const link = document.querySelector('#input-link');   //Нашли инпут с cсылкой

function renderCard(evt) {    
    evt.preventDefault();
    
    cardContainer.prepend(createCard(title.value, link.value));  //Вызываем фукн-ю createCard со значениями из инпутов
    mestoEdit.reset();   //Очистили форму
    popupClose(popupAdd);   //Закрыли попап
};
mestoEdit.addEventListener('submit', renderCard);
//--------------------------------------------



const initialCardsReverse = initialCards.reverse();  //Разворачиваем массив, чтобы карточки рендерились в правильном порядке, тк каждый объект ставится в начало

//ФУНКЦИЯ ОТКРЫТИЯ КАРТИНКИ ИЗ КАРТОЧКИ
const popupImg = document.querySelector('#popup-img') //Нашли сам попап
const imgLink = popupImg.querySelector('.popup-img__image'); //Нашли куда будем вставлять ссылку на картинку
const imgName = popupImg.querySelector('#popup-img__title'); //Нашли название картинки
const popupImgClose = document.querySelector('#popup-img__close'); //Выбрали кнопку закрытия попапа

popupImgClose.addEventListener('click', function () {    //Закрытие попапа картинки
  popupClose(popupImg)
});

function openImg(element) {  
  imgLink.src = element.src;   //Подставляем значения из массива
  imgLink.alt = element.alt;
  imgName.textContent = element.alt;
  popupOpen(popupImg);
};
//--------------------------------------------

// popupImg.addEventListener('click', function (evt) {    //Повесели слушатель на весь попап
//   if (evt.target.classList.contains('overlay')) {  //проверяем, чтобы клик был на оверлэе
//     popupClose(popupImg);   //Закрываем попап
//   }
// });
// document.addEventListener('keydown', function (evt) {
//   if (evt.key === 'Escape') {  //проверяем, чтобы нажалась клавиша esc
//     popupClose(popupImg);    //Закрываем попап
//   }
// });

document.addEventListener('click', function (evt) {    //Повесели слушатель на весь документ
  if (evt.target.classList.contains('overlay')) {  //проверяем, чтобы клик был на оверлэе
    popupClose(popupAdd);   //Закрываем попап
    popupClose(popupEdit);
    popupClose(popupImg);
  }
});
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {  //проверяем, чтобы нажалась клавиша esc
    popupClose(popupAdd);    //Закрываем попап
    popupClose(popupEdit);
    popupClose(popupImg);
  }
});


//ФУНКЦИЯ ИМЕННО СОЗДАНИЯ ШАБЛОНА КАРТОЧКИ
const cardTemplate = document.querySelector('#card-template').content;   //Выбрали контент темплейта

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);  //Скопировали содержимое темплейта
  const cardImg = cardElement.querySelector('.card__image'); //Выбираем картинку
  const cardName = cardElement.querySelector('.card__title'); //Выбираем заголовок

  cardImg.src = link;
  cardImg.alt = name;  //Присваеваем что и куда будет подставляться (link в src)
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

})();

//:3