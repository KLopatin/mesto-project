import {form, formInput, formError, settings} from './constants.js'

const showInputError = (formElement, inputElement, errorMessage) => {   
  inputElement.classList.add(settings.inputErrorClass) //Добавляем класс показывающий стили ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //Нашли спан ошибки по уникальному классу ИМЕННО ПРОВЕРЯЕМОГО ПОЛЯ
  errorElement.textContent = errorMessage;  //Поменяли текст на текст ошибки
  errorElement.classList.add(settings.errorClass); //Добавили класс. Это сделает ошибку видимой, когда в поле ввода добавят некорректный текст.
};

const hideInputError = (formElement, inputElement) => {   
  inputElement.classList.remove(settings.inputErrorClass); //Убираем класс показывающий стили ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //Нашли спан ошибки по уникальному классу ИМЕННО ПРОВЕРЯЕМОГО ПОЛЯ
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = ''; //Текст - пустая строка, чтобы не было видно ошибки
};

const checkInputValidity = (formElement, inputElement) => {//функция проверяет валидность инпута(formInput) и показывает или скрывает ошибку
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
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));  //Собираем массив инпутов
  const buttonElement = formElement.querySelector(settings.submitButtonSelector); //Выбираем кнопку
   
   toggleButtonState(inputList, buttonElement); // чтобы проверить состояние кнопки в самом начале

  inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', function () {   //Каждому вешаем слушатель 
    checkInputValidity(formElement, inputElement);   //Проверяем Валидность каждого инпута
    
    toggleButtonState(inputList, buttonElement); // чтобы проверять его при изменении любого из полей
  });
});
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector)); //Собираем массив всех форм
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => { //Вешаем на все формы слушатели
    evt.preventDefault();  //Сбрасываем стандартное поведение
    });
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__fieldset')); //Собираем массив филдсэтов
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);  //Вешаем слушатели на все инпуты внутри филдсэтов
      }); 
  });
};


export {showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation}


