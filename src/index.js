import "./pages/index.css";

import {
  popupEditButtonOpen,
  popupAddButtonOpen,
  popupAvatarButtonOpen,
} from "./components/constants.js";

import Api from "./components/Api.js";
import UserInfo from "./components/UserInfo";
import Section from "./components/Section";
import Card from "./components/card";
import PopupWithForm from "./components/PopupWithForm";
import FormValidator from "./components/FormValidator";
import PopupWithImage from "./components/PopupWithImage";

const popupAddForm = document.querySelector("#popup-mesto__edit");
const popupEditForm = document.querySelector("#edit-form");
const popupAvatarForm = document.querySelector("#popup-avatar__edit");

const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-20",
  headers: {
    authorization: "21e38aba-593f-4d28-b61c-f45be8c5d807",
    "Content-Type": "application/json",
  },
};

const api = new Api(config);

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__info-about",
  ".profile__avatar"
);

const section = new Section(
  {
    renderer: (card) => {
      const elem = generateCard(card);
      section.addItem(elem);
    },
  },
  ".elements"
);

Promise.all([api.getCards(), api.getProfile()])
  .then(([cards, user]) => {
    userInfo.setUserInfo(user);
    section.renderItems(cards.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

//функция создания карточки

function generateCard(data) {
  const newCard = new Card(
    data,
    "#card-template",
    getId,
    handleImgClick,
    handleDeleteCard,
    (id) => {
      api
        .addLike(id)
        .then((res) => {
          newCard.getLikesCount(res);
          newCard.changeLike(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    (id) => {
      api
        .deleteLike(id)
        .then((res) => {
          newCard.getLikesCount(res);
          newCard.changeLike(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  );

  return newCard.generateCard();
}

const popupWithImage = new PopupWithImage({ selector: "#popup-img" });

function handleImgClick(name, link) {
  popupWithImage.open(name, link);
}

function getId() {
  return userInfo.getUserId();
}

//Функция удаления карточки
function handleDeleteCard(cardId, func) {
  api
    .deleteCard(cardId)
    .then(() => func())
    .catch((err) => {
      console.log(err);
    });
}

const popupFormNewCard = new PopupWithForm({
  selector: "#popup-mesto",
  handleSubmitForm: (data) => {
    api
      .addNewCard(data)
      .then((res) => {
        const newCard = generateCard(res);
        section.addItem(newCard);
        popupFormNewCard.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

const popupWithAvatar = new PopupWithForm({
  selector: "#popup-avatar",
  handleSubmitForm: (data) => {
    api
      .changeAvatar(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupWithAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

//   popupAvatarSave.textContent = "Сохранение...";

//     .finally(() => {
//       popupAvatarSave.textContent = "Сохранить";
//     });
// }

//Функция поменять ИМЯ И ОПИСАНИЕ ПРОФИЛЯ
const popupFormProfile = new PopupWithForm({
  selector: "#popup-edit",
  handleSubmitForm: (data) => {
    api
      .changeInfoProfile(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupFormProfile.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

popupAvatarButtonOpen.addEventListener("click", function () {
  popupWithAvatar.open();
});

popupEditButtonOpen.addEventListener("click", function () {
  popupFormProfile.setInputValues(userInfo.getUserInfo());
  popupFormProfile.open();
});

popupAddButtonOpen.addEventListener("click", function () {
  popupFormNewCard.open();
});

const settings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};
const placeFormValidator = new FormValidator(settings, popupAddForm);
placeFormValidator.enableValidation();
const profileFormValidator = new FormValidator(settings, popupEditForm);
profileFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(settings, popupAvatarForm);
avatarFormValidator.enableValidation();

popupWithAvatar.setEventListeners();
popupFormNewCard.setEventListeners();
popupFormProfile.setEventListeners();
popupWithImage.setEventListeners();
