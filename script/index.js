const popupEdit = document.querySelector('#popup-edit');  //Нашли сам попап редактирования профиля
const popupEditButtonOpen = document.querySelector('.profile__edit');  //нашли кнопку открытия попапа редактирования профиля
const popupEditButtonClose = document.querySelector('#popup-edit__close');  //Нашли кнопку закрытия попапа редактирования профиля
 
const popupAdd = document.querySelector('#popup-mesto');   //Нашли сам попап добавления карточки
const popupAddButtonOpen = document.querySelector('#profile__add'); //Нашли кнопку открытия попапа добавления карточки
const popupAddButtonClose = document.querySelector('#popup-mesto__close'); //Нашли кнопку закрытия попапа добавления карточки

function popupOpen(popupElement) {
    popupElement.classList.add('popup_opened');  //Создали универсанльную функцию открытия любых попапов
};

function popupClose(popupElement) {
    popupElement.classList.remove('popup_opened'); //Создали универсанльную функцию закрытия любых попапов
};

function addValueToTextcontent(popup) {       //Функция, которая подставляет действующие значения имени и профессии в поля инпут
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};
  
//ОТКРЫТИЕ ПОПАПОВ
popupEditButtonOpen.addEventListener('click', function() {   //Повесили обработчик на кнопку редактирования профиля редакт.проф. -> открывает попап
    addValueToTextcontent(popupEdit);//Функция, которая подставляет значения в имени и работы в инпуты
    popupOpen(popupEdit)
});  
popupEditButtonClose.addEventListener('click', function() {popupClose(popupEdit)});  //Повесили обработчик на кнопку Закрытия попапа редакт.проф. -> закрывает попап
popupAddButtonOpen.addEventListener('click', function() {popupOpen(popupAdd)});   //Повесили обработчик на кнопку редактирования профиля доб. карточки -> открывает попап
popupAddButtonClose.addEventListener('click', function() {popupClose(popupAdd)});  //Повесили обработчик на кнопку Закрытия попапа доб. карточки -> закрывает попап

//СОХРАНЕНИЕ ИМЕНИ И ПРОФЕССИИ
const formElement = popupEdit.querySelector('.popup__edit');  // Находим форму в DOM
const nameInput = popupEdit.querySelector('#input-name');  // Находим поля формы в DOM
const jobInput = popupEdit.querySelector('#input-job');

const profileName = document.querySelector('.profile__name'); // Выберите элементы, куда должны быть вставлены значения полей
const profileJob = document.querySelector('.profile__info-about');

function handleFormSubmit(evt) {
    evt.preventDefault();  // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;  // Получите значение полей jobInput и nameInput из свойства value
    profileJob.textContent = jobInput.value;  // Вставьте новые значения с помощью textContent
    popupClose(popupEdit);  //Не забыть закрыть попап
};
formElement.addEventListener('submit', handleFormSubmit);  //Вызываем функцию при отправке формы

//ДОБАВЛЕНИЕ КАРТОЧКИ НА СТРАНИЦУ  -ДЭМО-
const cardContainer = document.querySelector('.elements');

function addCard(titleValue, linkValue) {
    const cardTemplate = document.querySelector('#card-template').content;   //Выбрали контент темплейта
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);  //Скопировали содержимое темплейта

    cardElement.querySelector('.card__title').textContent = titleValue;
    cardElement.querySelector('.card__image').src = linkValue;  //Подставили в скопированный темплейт данные из инпута

    return cardElement;    //Вернули собранную карточку
};

//const addButton = document.querySelector('#popup-mesto__save');  //Нашли кнопку
const mestoEdit = document.querySelector('[name="edit-form"]');  //Нашли форму добавления карточки

function renderCard(evt) {    
    evt.preventDefault();
    const title = document.querySelector('#input-title');   //Нашли инпут с названием
    const link = document.querySelector('#input-link');   //Нашли инпут с cсылкой
    cardContainer.prepend(addCard(title.value, link.value));
    title.value = '';
    link.value = '';
    popupClose(popupAdd);   //Закрыли попап
};
mestoEdit.addEventListener('submit', renderCard)