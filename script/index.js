const profileEdit = document.querySelector('.profile__edit'); //Выбрали кнопку редактирования профиля
const popupEdit = document.querySelector('#popup-edit'); //Выбрали секцию попап редактирования профиля, чтобы показать(добавить класс) его при нажатии на кнопку

const profileClose = document.querySelector('#popup-edit__close'); //Выбрали кнопку закрытия попапа редактирования профиля

function openPopup(popupElement) {    //ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {    //ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА
  popupElement.classList.remove('popup_opened');
}

profileEdit.addEventListener('click', function (){   //Открытие попапа редактирования профиля по клику
  addValueToTextcontent(popupEdit)    //вызываем функцию, которая подставляет значения имени и профессии в поля инпут с нудным попапом
  openPopup(popupEdit)   
}); 

profileClose.addEventListener('click', function (){    //Закрытие попапа редактирования профиля
  closePopup(popupEdit)
});

function addValueToTextcontent(popup) {       //Функция, которая подставляет децствующие значения имени и профессии в поля инпут
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfoAbout.textContent;
}

//СОХРАНЕНИЕ ВВЕДЕННЫХ ДАННЫХ РЕДАКТ. ПРОФИЛЯ
const formEditProfile = document.querySelector('.popup__edit'); // Находим форму в DOM

const nameInput = document.querySelector('#input-name'); // Находим поля формы в DOM
const jobInput = document.querySelector('#input-job');

const profileName = document.querySelector('.profile__name');   // Выбераем элементы, куда должны быть вставлены значения полей
const profileInfoAbout = document.querySelector('.profile__info-about');

function formSubmitHandler(evt) {
  evt.preventDefault();  // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;  // Выберите элементы, куда должны быть вставлены значения полей, Вставьте новые значения с помощью textContent
  profileInfoAbout.textContent = jobInput.value;
  closePopup(popupEdit);
}
formEditProfile.addEventListener('submit', formSubmitHandler); // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»




const profileAdd = document.querySelector('#profile__add'); //Выбрали кнопку добавления карточки
const popupMesto = document.querySelector('#popup-mesto'); //Выбрали секцию попап, чтобы показать(добавить класс) его при нажатии на кнопку
profileAdd.addEventListener('click', function (){    //Открытие попапа добавления карточки
  openPopup(popupMesto)
}); 

const profileAddClose = document.querySelector('#popup-mesto__close'); //Выбрали кнопку закрытия попапа
profileAddClose.addEventListener('click', function (){    //Закрытие попапа добавления карточки
  closePopup(popupMesto)
});

const mestoEdit = document.querySelector('#popup-mesto__edit') // Выбрали форму добавления карточки в попапе
const mestoTitle = document.querySelector('#input-title'); // Выбрали первый инпут формы 
const mestoLink = document.querySelector('#input-link'); // Выбрали второй инпут формы
const mestoElements = document.querySelector('.elements'); //Выбрали куда вставлять

mestoEdit.addEventListener('submit', addCardSubmitHandler);  //Добавили слушатель, который запустит функцию добавления карточки
//Если повесить обработчик в одну строку, не срабатывает фукция reset()

//ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ, ЛАЙК, УДАЛЕНИЕ И ОШИБКА, ЕСЛИ ПОЛЯ ПУСТЫЕ
function addCardSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const data = {                    //Создаем объект с данными (name и link) из инпутов
          name: mestoTitle.value,
          link: mestoLink.value,
        }
        renderCard(data, mestoElements);    //Вызываем функцию рендера карточки и аргументами, которые получены из инпутов
      
    closePopup(popupMesto); //Закрываем попап
    mestoEdit.reset();  //Очищаем поля ввода 
  };
 


//ФУНКЦИЯ ОТКРЫТИЯ ИЗОБРАЖЕНИЯ
const popupImage = document.querySelector('#popup-img');  //Выбрали попап картинки (ему приделаем класс активности)
const popupPic = popupImage.querySelector('.popup-img__image');  //Выбрали саму картинку
const popupTitle = document.querySelector('.popup-img__title');  //выбрали название
const popupImageClose = document.querySelector('#popup-img__close'); //Выбрали кнопку закрытия попапа

popupImageClose.addEventListener('click', function (){    //Закрытие попапа картинки
  closePopup(popupImage)
});

function handleClickImage(data) {     //Функция открытия 
  popupPic.src = data.link;         //Подставляем значения из массива
  popupPic.alt = data.name;
  popupTitle.textContent = data.name;
  openPopup(popupImage);         //Открываем попап
}

//МАССИВ КАРТОЧЕК, КОТОРЫЕ РЕНДЕРЯТСЯ НА СТРАНИЦЕ 
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const initialCardsReverse = initialCards.reverse();  //Разворачиваем массив, чтобы карточки рендерились в правильном порядке, тк каждый объект ставится в начало
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card'); //Выбрали содержимое темплейта 

function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true); //Копируем содержимое темплейта
  const cardLink = cardElement.querySelector('.card__image'); //Выбираем картику
  const cardName = cardElement.querySelector('.card__title'); //Выбираем заголовок

  cardLink.src = data.link;   // Подставляем значения из массива
  cardLink.alt = data.name;   //альт
  cardName.textContent = data.name;  //Название

  const cardDeleteButton = cardElement.querySelector('.card__button-delete'); // Выберем кнопку удаления
  cardDeleteButton.addEventListener('click', (evt) => {  // Добавим обработчик
    evt.target.closest('.card').remove();  //удаляем весь див
  });

  cardElement.querySelector('.card__button-like').addEventListener('click', function (evt) {  //Лайк на каждой карточке 
    evt.target.classList.toggle('card__button-like_active');
  });

  cardLink.addEventListener('click', () => {handleClickImage(data)});  //Вызываем функцию открытия попапа с картинкой по клику на картинку

  return cardElement;   // Возвращаем созданную карточку в функцию
}

function renderCard(data, container) {  //Функция которая занимется непосредственно рендером карточки
  const card = createCard(data);  // Передаем data(item) в функцию createCard
  container.prepend(card);        // Добавляем карточку на стр container=mestoElements
}

initialCardsReverse.forEach(function (item) {   // Перебираем элемент массива
  renderCard(item, mestoElements)       //Вызываем функцию рендера карточек с объектом(name и link) и местом куда вставлять
});






