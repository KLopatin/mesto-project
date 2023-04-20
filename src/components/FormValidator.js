export default class FormValidator {
  constructor(config, validatiedForm) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = validatiedForm;

    this._inputList = Array.from(
      validatiedForm.querySelectorAll(this._inputSelector)
    );
    this._submitBtn = this._form.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`); //Нашли спан ошибки по уникальному классу ИМЕННО ПРОВЕРЯЕМОГО ПОЛЯ
    inputElement.classList.add(this._inputErrorClass); //Добавляем класс показывающий стили ошибки
    errorElement.textContent = inputElement.validationMessage; //Поменяли текст на текст ошибки
    errorElement.classList.add(this._errorClass); //Добавили класс. Это сделает ошибку видимой, когда в поле ввода добавят некорректный текст.
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`); //Нашли спан ошибки по уникальному классу ИМЕННО ПРОВЕРЯЕМОГО ПОЛЯ
    inputElement.classList.remove(this._inputErrorClass); //Убираем класс показывающий стили ошибки
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = ""; //Текст - пустая строка, чтобы не было видно ошибки
  }

  _checkInputValidity(inputElement) {
    //функция проверяет валидность инпута(formInput) и показывает или скрывает ошибку
    if (inputElement.validity.patternMismatch) {
      // встроенный метод setCustomValidity принимает на вход строку
      // и заменяет ею стандартное сообщение об ошибке
      inputElement.setCustomValidity(inputElement.dataset.errorMessage); // данные атрибута доступны у элемента инпута через ключевое слово dataset.
    } else {
      // если передать пустую строку, то будут доступны
      // стандартные браузерные сообщения
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      // теперь, если ошибка вызвана регулярным выражением,
      // переменная validationMessage хранит наше кастомное сообщение
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //   //Функция блокировки кнопки отправки при добавлении карточки
  //    _disablePopupButton(settings, popupButton){
  //     popupButton.disabled = true;
  //     popupButton.classList.add(settings.inactiveButtonClass);
  //   };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitBtn.disabled = true;
      this._submitBtn.classList.add(this._inactiveButtonClass);
      //   disablePopupButton(settings, buttonElement)
    } else {
      this._submitBtn.disabled = false;
      this._submitBtn.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._toggleButtonState(); // чтобы проверить состояние кнопки в самом начале

    //добавляем задержку, чтобы состояние кнопки менялось после полного сброса формы
    this._form.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        //Каждому вешаем слушатель
        this._checkInputValidity(inputElement); //Проверяем Валидность каждого инпута
        this._toggleButtonState(); // чтобы проверять его при изменении любого из полей
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
