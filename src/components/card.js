// #card-template
//ФУНКЦИЯ ИМЕННО СОЗДАНИЯ ШАБЛОНА КАРТОЧКИ
export default class Card {
  constructor(
    data,
    templateSelector,
    getId,
    handleImgClick,
    handleDeleteCard,
    handlePutLike,
    handleDeleteLike
  ) {
    this._data = data;

    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._getId = getId;
    this._handleImgClick = handleImgClick;

    this._handleDeleteCard = handleDeleteCard;
    this._handlePutLike = handlePutLike;
    this._handleDeleteLike = handleDeleteLike;
    this._isLike =
      data.likes.length !== 0
        ? data.likes.find((item) => item._id == this._getId())
        : false;
  }

  _createTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    const card = template.querySelector(".card").cloneNode(true);
    return card;
  }

  _setData() {
    this._btnLike = this._cardElement.querySelector(".card__button-like");
    this._title = this._cardElement.querySelector(".card__title");
    this._img = this._cardElement.querySelector(".card__image");

    this._img.src = this._link;
    this._img.alt = this._name;
    this._title.textContent = this._name;

    this._isLike
      ? this._btnLike.classList.add("card__button-like_active")
      : null;
  }

  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getElements() {
    this._cardLike = this._cardElement.querySelector(".card__like-counter");
    this._cardDelete = this._cardElement.querySelector(".card__button-delete");
  }

  _changeLikeApi(data) {
    if (this._btnLike.classList.contains("card__button-like_active")) {
      this._handleDeleteLike(data._id);
    } else {
      this._handlePutLike(data._id);
    }
  }

  _isOwner(data) {
    if (data.owner._id !== this._getId()) {
      this._cardDelete.classList.add("card__button-delete_disabled");
    }
  }

  _setListeners() {
    this._img.addEventListener("click", () => {
      this._handleImgClick(this._name, this._link);
    });
    this._btnLike.addEventListener("click", () => {
      this._changeLikeApi(this._data);
    });
    this._cardDelete.addEventListener("click", () => {
      this._handleDeleteCard(this._data._id, this._deleteCard.bind(this));
    });
  }

  _likeCard() {
    this._btnLike.classList.add("card__button-like_active");
  }

  _dislikeCard() {
    this._btnLike.classList.remove("card__button-like_active");
  }

  changeLike(data) {
    const myLike = data.likes.some((like) => {
      return like._id === this._getId();
    });
    if (myLike) {
      this._likeCard();
    } else {
      this._dislikeCard();
    }
  }

  getLikesCount(data) {
    this._cardLike.textContent = data.likes.length;
  }

  generateCard() {
    this._cardElement = this._createTemplate();
    this._getElements();
    this._isOwner(this._data);
    this.getLikesCount(this._data);
    this._setData();
    this._setListeners();

    return this._cardElement;
  }
}
