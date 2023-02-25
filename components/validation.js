const form = document.querySelector('.popup__edit'); //Нашли форму
const formInput = form.querySelector('.popup__input'); //Нашли инпут
const formError = form.querySelector(`.${formInput.id}-error`);  //Нашли спан ошибки по уникальному классу

const showInputError = (formElement, inputElement, errorMessage) => {   
  inputElement.classList.add('popup__input_type_error') //Добавляем класс показывающий стили ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //Нашли спан ошибки по уникальному классу ИМЕННО ПРОВЕРЯЕМОГО ПОЛЯ
  errorElement.textContent = errorMessage;  //Поменяли текст на текст ошибки
  errorElement.classList.add('popup__input-error_active'); //Добавили класс. Это сделает ошибку видимой, когда в поле ввода добавят некорректный текст.
};

const hideInputError = (formElement, inputElement) => {   
  inputElement.classList.remove('popup__input_type_error'); //Убираем класс показывающий стили ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //Нашли спан ошибки по уникальному классу ИМЕННО ПРОВЕРЯЕМОГО ПОЛЯ
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = ''; //Текст - пустая строка, чтобы не было видно ошибки
};

const checkInputValidity = (formElement, inputElement) => {   //функция проверяет валидность инпута(formInput) и показывает или скрывает ошибку
  if (!inputElement.validity.valid) {
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
    buttonElement.classList.add('button_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('button_inactive');
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));  //Собираем массив инпутов
  const buttonElement = formElement.querySelector('.popup__save'); //Выбираем кнопку
   
   toggleButtonState(inputList, buttonElement); // чтобы проверить состояние кнопки в самом начале

  inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', function () {   //Каждому вешаем слушатель 
    checkInputValidity(formElement, inputElement);   //Проверяем Валидность каждого инпута
    
    toggleButtonState(inputList, buttonElement); // чтобы проверять его при изменении любого из полей
  });
});
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__edit')); //Собираем массив всех форм
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

enableValidation();


//-----------------------------------------------------------------------------------------------

