import {cardTemplate} from './constants.js'  
import {openImg} from '../index.js'

//ФУНКЦИЯ ИМЕННО СОЗДАНИЯ ШАБЛОНА КАРТОЧКИ
function createCard(name, link, serverlikes, myId, ownerId, cardId, handleDeleteCard, handlePutLike, handleDeleteLike) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImg = cardElement.querySelector('.card__image'); 
    const cardName = cardElement.querySelector('.card__title');
    const cardLike = cardElement.querySelector('.card__like-counter');
    const cardDelete = cardElement.querySelector('.card__button-delete');
    const cardButtonLike =  cardElement.querySelector('.card__button-like');
    
    if(serverlikes) {
      const myLike = serverlikes.some((like) => {
        return like._id === myId
      })

      if(myLike) {
        cardButtonLike.classList.add('card__button-like_active')
      }
    }
     
    if(myId !== ownerId) {
      cardDelete.classList.add('card__button-delete_disabled')
    }

    if (serverlikes.length !== 0){
      cardLike.textContent = serverlikes.length;
    }
    
    cardImg.src = link;
    cardImg.alt = name;
    cardName.textContent = name;
    cardImg.addEventListener('click', function (evt) {
      openImg(evt.target)
    });
  
    cardButtonLike.addEventListener('click', function (evt) {
      if(cardButtonLike.classList.contains('card__button-like_active')) {
        handleDeleteLike(cardId, cardButtonLike, cardLike)
      } else {
      handlePutLike(cardId, cardButtonLike, cardLike)
      }
    });
  
    cardDelete.addEventListener('click', function (evt) {
      handleDeleteCard(cardId, cardElement)
    });

  
    return cardElement;
  };
  //--------------------------------------------


  export {createCard}