// const form = document.querySelector('.popup__edit');  //выбрали форму
// const formInput = form.querySelector('.popup__input');  //выбрали инпут
// const formError = form.querySelector(`.${formInput.id}-error`) //Выбрали уникальный спан, который связан с инпутом


const showInputError = (formElement, inputElement, errorMessage) => {  //Принимает на вход какой-то инпут и сообщение об ошибке
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');  //Добавляем класс который добавляет стили невалидных данных
    errorElement.textContent = errorMessage;   //Меняем текст спана
    errorElement.classList.add('form__input-error_active');  //Добавляем класс, который активирует видимость спана
}

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error'); 
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement) => {   //Проверка валидности ИНПУТА
    if (!inputElement.validity.valid) {  //Если инпут не валидный - функция показа ошибки
        showInputError(formElement, inputElement, inputElement.validationMessage)  //принимает инпут в который вводятся данные и стандартный текст ошибки
    } else {
        hideInputError(formElement, inputElement)   //Иначе скрой ошибку
    }
};

// form.addEventListener('submit', function (evt) {   //Сброс настроек формы (браузерных)
//     evt.preventDefault();
//   });

// formInput.addEventListener('input', function () {   //при вводе данных - срабатывает функция проверки формы
//     checkInputValidity(form, formInput);
//   });

  const setEventListeners = (formElement) => {  //Вешаем слушатели на все инпуты
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'))  //Собираем массив всех инпутов
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {  //Каждому добавляем слушатель
            checkInputValidity(formElement, inputElement);
        });
    });
  };
  
  const enableValidation = () => {    //Функция работы со всеми формами на сайте
    const formList = Array.from(document.querySelectorAll('.popup__edit'));  //Собираем массив всех форм
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {   //Сбрасываем браузерные настройки и запускаем функцию, которая вешает слушатели на все инпуты
      evt.preventDefault();   //Сброс настроек формы (браузерных)
        });
  
      setEventListeners(formElement);
    }); 
  };
  
  enableValidation();