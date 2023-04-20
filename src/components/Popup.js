export default class Popup {
  constructor({ selector }) {
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popup.classList.add("popup_opened"); //Создали универсальную функцию открытия любых попапов
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened"); //Создали универсальную функцию закрытия любых попапов
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      //проверяем, чтобы нажалась клавиша esc
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("overlay") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}