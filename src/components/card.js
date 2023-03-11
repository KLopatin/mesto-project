import {cardTemplate} from './constants.js'  
import {openImg} from '../index.js'
import {deleteCard} from './api.js'






//Поскольку Мне пришлось идти дальше в выполнении проекта,  initialCardReverse был убран вообще, потому что мы уже рендерим карточки с сервера
//Массив готовых карточек также убрал
//Надеюсь жто не повлияет на проверку





//ФУНКЦИЯ ИМЕННО СОЗДАНИЯ ШАБЛОНА КАРТОЧКИ
function createCard(name, link, serverlikes, owner, id) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);  //Скопировали содержимое темплейта
    const cardImg = cardElement.querySelector('.card__image'); //Выбираем картинку
    const cardName = cardElement.querySelector('.card__title'); //Выбираем заголовок
    const cardLike = cardElement.querySelector('.card__like-counter');
    const cardDelete = cardElement.querySelector('.card__button-delete');

    // if (serverlikes.length !== 0){
    //   cardLike.textContent = serverlikes.length;
    // } else {
    //   cardLike.classList.add('card__like-zero')
    // };
    
    cardImg.src = link;
    cardImg.alt = name;  //Присваиваем что и куда будет подставляться (link в src)
    cardName.textContent = name; //(name в alt и textContent)
    //Далее вешаем нужные слушатели
    cardImg.addEventListener('click', function (evt) {  // Слушатель Открытия картинки из карточки
      openImg(evt.target)
    });
  
    cardElement.querySelector('.card__button-like').addEventListener('click', function (evt) {  //Слушатель  лайки активными
      evt.target.classList.toggle('card__button-like_active')
    });
  
    cardDelete.addEventListener('click', function (evt) {  //Слушатель Удаление карточки
      // evt.target.closest('.card').remove();
      console.log(evt)
      deleteCard(id)
      .then (() => {
        console.log(evt)
        // evt.target.closest('.card').remove();
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль, если запрос неуспешный
      });
    });
  
    return cardElement;   //Возвращаем собранную карточку
  };
  //--------------------------------------------


  export {createCard}