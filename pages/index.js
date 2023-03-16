import { arrayCards, formValidationConfig } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopUpWithImage from "../components/PopUpWithImage.js";
import PopUpWithForm from "../components/PopUpWithForm.js";
import UserInfo from "../components/UserInfo.js";

// --------Variables---------------------------------------------------------------------------------------
const profileButtonInfo = document.querySelector(".profile__button-info");
const profileButtonCards = document.querySelector(".profile__button-cards");

const popUpInfo = document.querySelector(".pop-up_type_info");
const popUpCards = document.querySelector(".pop-up_type_cards");

const profileFirstName = document.querySelector(".profile__firstname");
const profileJob = document.querySelector(".profile__job");

const photoElementsList = document.querySelector(".photo-elements__list");

const popUpExtendCap = document.querySelector(".pop-up_type_extend-cap");

const formValidators = {};

const templateSelector = "#photo-elements__item";

// --------Enable validation and add name form validator in object "formValidators"------------------------------------------------------------------------------------
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(formValidationConfig);

// --------Pop-up capture opening (class Card)---------------------------------------------------------------------------
const handleClickCard = (name, link) => {
  const popUpWithImage = new PopUpWithImage(popUpExtendCap, name, link);
  popUpWithImage.openPopUp();
  popUpWithImage.setEventListeners();
};
// --------Handle form for Info (class PopUpWithForm)---------------------------------------------------------------------------------------
function handleInfoFormSubmit(object) {
  userInfo.setUserInfo(object);
  popUpFormInfo.closePopUp();
}
// --------Creating cards---------------------------------------------------------------------------------------
const createCard = (item) => {
  const card = new Card(item, templateSelector, handleClickCard);
  const cardElement = card.getCard();
  return cardElement;
};

//---------Add cards in container and rendering (class Section)---------------------------------------------------------------------------------------------
const cardsList = new Section(
  {
    cards: arrayCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addCard(cardElement);
    },
  },
  photoElementsList
);
cardsList.renderCards();

// --------Handle form cards for new cards (class PopUpWithImage)------------------------------------------------------------------------------
const handleCardFormSubmit = (object) => {
  const newObject = {
    name: object.firstInputForm,
    link: object.secondInputForm,
  };
  cardsList.addCard(createCard(newObject));
};
// --------Create objects of classes pop-ups------------------------------------------------
const userInfo = new UserInfo({profileFirstName, profileJob});

const popUpFormInfo = new PopUpWithForm(popUpInfo, handleInfoFormSubmit);
popUpFormInfo.setEventListeners();

const popUpFormCard = new PopUpWithForm(popUpCards, handleCardFormSubmit);
popUpFormCard.setEventListeners();

// --------Launch functions by events------------------------------------------------------------------------------------
profileButtonInfo.addEventListener("click", () => {
  userInfo.getUserInfo();
  popUpFormInfo.openPopUp();
  formValidators["form-info"].toggleButton();
  
});

profileButtonCards.addEventListener("click", () => {
  const popUpFormCard = new PopUpWithForm(popUpCards, handleCardFormSubmit);
  popUpFormCard.openPopUp();

  formValidators["form-cards"].toggleButton();
});
