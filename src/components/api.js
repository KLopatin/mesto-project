import { cardContainer, profileName, profileJob } from "./constants.js";
import { createCard } from "./card.js";

const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-20",
  headers: {
    authorization: "21e38aba-593f-4d28-b61c-f45be8c5d807",
    "Content-Type": "application/json",
  },
};

const checkResult = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

//Получаем карточки с сервера
export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => checkResult(res));
}

//Получаем данные профайла с сервера
export function getProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => checkResult(res));
}

//Изменение информации о пользоватале
export function changeInfoProfile(userName, userAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout,
    }),
  }).then((res) => checkResult(res));
}

export function addNewCard(cardName, cardLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then((res) => checkResult(res));
}

export function deleteCard(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResult(res));
}
