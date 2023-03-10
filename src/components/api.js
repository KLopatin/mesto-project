// import {cardContainer, profileName, profileJob} from './constants.js'
// import {createCard} from './card.js'

// export function getCards() {
// return fetch('https://nomoreparties.co/v1/plus-cohort-20/cards', {
//   headers: {
//     authorization: '21e38aba-593f-4d28-b61c-f45be8c5d807'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     result.forEach((res) => {
//         const newCard = createCard(res.name, res.link) //Записываем в переменную - собранную карточку из функции createCard
//         cardContainer.prepend(newCard); //Вставляем карточку в контейнер
//     });
//   });
// };


// export function getProfile() {
//     return fetch('https://nomoreparties.co/v1/plus-cohort-20/users/me', {
//       headers: {
//         authorization: '21e38aba-593f-4d28-b61c-f45be8c5d807'
//       }
//     })
//       .then(res => res.json())
//       .then((result) => {
//         console.log(result)
//             profileName.textContent = result.name;
//             profileJob.textContent = result.about;
//       });
//     };
