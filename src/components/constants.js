/*ОБЪЯВЛЕНИЕ КОНСТАНТ*/

let serverLikesCard;

const mestoSave = document.querySelector('#popup-mesto__save');
const profileAvatar = document.querySelector('.profile__avatar')

const cardContainer = document.querySelector(".elements"); //Нашли куда будем вставлять карточки (див где будут все карточки)

const popupEdit = document.querySelector("#popup-edit"); //Нашли сам попап редактирования профиля
const popupEditButtonOpen = document.querySelector(".profile__edit"); //Нашли кнопку открытия попапа редактирования профиля
const popupEditButtonClose = document.querySelector("#popup-edit__close"); //Нашли кнопку закрытия попапа редактирования профиля

const popupAdd = document.querySelector("#popup-mesto"); //Нашли сам попап добавления карточки
const popupAddButtonOpen = document.querySelector("#profile__add"); //Нашли кнопку открытия попапа добавления карточки
const popupAddButtonClose = document.querySelector("#popup-mesto__close"); //Нашли кнопку закрытия попапа добавления карточки

//СОХРАНЕНИЕ ИМЕНИ И ПРОФЕССИИ
const formProfileElement = popupEdit.querySelector('.popup__edit');  // Находим форму в DOM
const nameInput = popupEdit.querySelector('#input-name');  // Находим инпуты формы в DOM
const jobInput = popupEdit.querySelector('#input-job');

const profileName = document.querySelector('.profile__name'); // Выберите элементы, куда должны быть подставлены значения инпутов 
const profileJob = document.querySelector('.profile__info-about');

//ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ ИЗ ФОРМЫ
const mestoEdit = document.querySelector('[name="add-form"]');  //Нашли форму добавления карточки
const title = document.querySelector('#input-title');   //Нашли инпут с названием
const link = document.querySelector('#input-link');   //Нашли инпут с cсылкой

// const initialCardsReverse = initialCards.reverse();  //Разворачиваем массив, чтобы карточки рендерились в правильном порядке, тк каждый объект ставится в начало

//ФУНКЦИЯ ОТКРЫТИЯ КАРТИНКИ ИЗ КАРТОЧКИ
const popupImg = document.querySelector('#popup-img') //Нашли сам попап
const imgLink = popupImg.querySelector('.popup-img__image'); //Нашли куда будем вставлять ссылку на картинку
const imgName = popupImg.querySelector('#popup-img__title'); //Нашли название картинки
const popupImgClose = document.querySelector('#popup-img__close'); //Выбрали кнопку закрытия попапа

//ФУНКЦИЯ ИМЕННО СОЗДАНИЯ ШАБЛОНА КАРТОЧКИ
const cardTemplate = document.querySelector('#card-template').content;   //Выбрали контент темплейта

//КОНСТАНТЫ ДЛЯ ВАЛИДАЦИИ
const form = document.querySelector('.popup__edit'); //Нашли форму
const formInput = form.querySelector('.popup__input'); //Нашли инпут
const formError = form.querySelector(`.${formInput.id}-error`);  //Нашли спан ошибки по уникальному классу

const settings = {
  formSelector: '.popup__edit',
  fieldsetSelector: '.popup__fieldset',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}; 


export {cardContainer, popupEdit, popupEditButtonOpen, popupEditButtonClose, popupAdd, popupAddButtonOpen, popupAddButtonClose, formProfileElement,
nameInput, jobInput, profileName, profileJob, mestoEdit, title, link, popupImg, imgLink, imgName, popupImgClose, cardTemplate, form,
formInput, formError, settings, mestoSave, profileAvatar};