import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ selector, handleSubmitForm }) {
    super({ selector });
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector("form");

    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const data = {};
    this._inputList.forEach((inputElement) => {
      data[inputElement.name] = inputElement.value;
    });
    return data;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
