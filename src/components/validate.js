// import {settings} from './constants.js'

const showInputError = (formProfileElement, inputElement, errorMessage, settings) => {   
  inputElement.classList.add(settings.inputErrorClass) //Добавляем класс показывающий стили ошибки
  const errorElement = formProfileElement.querySelector(`.${inputElement.id}-error`); //Нашли спан ошибки по уникальному классу ИМЕННО ПРОВЕРЯЕМОГО ПОЛЯ
  errorElement.textContent = errorMessage;  //Поменяли текст на текст ошибки
  errorElement.classList.add(settings.errorClass); //Добавили класс. Это сделает ошибку видимой, когда в поле ввода добавят некорректный текст.
};

const hideInputError = (formProfileElement, inputElement, settings) => {   
  inputElement.classList.remove(settings.inputErrorClass); //Убираем класс показывающий стили ошибки
  const errorElement = formProfileElement.querySelector(`.${inputElement.id}-error`); //Нашли спан ошибки по уникальному классу ИМЕННО ПРОВЕРЯЕМОГО ПОЛЯ
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = ''; //Текст - пустая строка, чтобы не было видно ошибки
};

const checkInputValidity = (formProfileElement, inputElement, settings) => {//функция проверяет валидность инпута(formInput) и показывает или скрывает ошибку
  if (inputElement.validity.patternMismatch) {// встроенный метод setCustomValidity принимает на вход строку
        // и заменяет ею стандартное сообщение об ошибке
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);// данные атрибута доступны у элемента инпута через ключевое слово dataset.
  } else {
        // если передать пустую строку, то будут доступны
        // стандартные браузерные сообщения
        inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) { // теперь, если ошибка вызвана регулярным выражением,
    // переменная validationMessage хранит наше кастомное сообщение
    showInputError(formProfileElement, inputElement, inputElement.validationMessage, settings)
  } else {
    hideInputError(formProfileElement, inputElement, settings)
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

const setEventListeners = (formProfileElement, settings) => {
  const inputList = Array.from(formProfileElement.querySelectorAll(settings.inputSelector));  //Собираем массив инпутов
  const buttonElement = formProfileElement.querySelector(settings.submitButtonSelector); //Выбираем кнопку
   
   toggleButtonState(inputList, buttonElement, settings); // чтобы проверить состояние кнопки в самом начале

  inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', function () {   //Каждому вешаем слушатель 
    checkInputValidity(formProfileElement, inputElement, settings);   //Проверяем Валидность каждого инпута
    
    toggleButtonState(inputList, buttonElement, settings); // чтобы проверять его при изменении любого из полей
  });
});
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector)); //Собираем массив всех форм
  formList.forEach((formProfileElement) => {
  formProfileElement.addEventListener('submit', (evt) => { //Вешаем на все формы слушатели
    evt.preventDefault();  //Сбрасываем стандартное поведение
    });
    const fieldsetList = Array.from(formProfileElement.querySelectorAll(settings.fieldsetSelector)); //Собираем массив филдсэтов
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, settings);  //Вешаем слушатели на все инпуты внутри филдсэтов
      }); 
  });
};


//Функция блокировки кнопки отправки при добавлении карточки
function disablePopupButton(settings, popupButton){
  popupButton.disabled = true;
  popupButton.classList.add(settings.inactiveButtonClass);
};

export {showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation, disablePopupButton}


