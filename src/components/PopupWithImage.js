import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor({ selector }) {
    super({ selector });
    this._popupImg = this._popup.querySelector(".popup-img__image");
    this._popupTitle = this._popup.querySelector(".popup-img__title");
  }
  open(name, src) {
    this._popupImg.src = src;
    this._popupTitle.textContent = name;
    this._popupImg.alt = name;
    super.open();
  }
}
