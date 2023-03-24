import { arrayCards, formValidationConfig } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopUpWithImage from "../components/PopUpWithImage.js";
import PopUpWithForm from "../components/PopUpWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

// --------Variables---------------------------------------------------------------------------------------
const profileButtonInfo = document.querySelector(".profile__button-info");
const profileButtonCards = document.querySelector(".profile__button-cards");
const popUpInputFirstName = document.querySelector(".pop-up__input_type_firstname");
const popUpInputJob = document.querySelector(".pop-up__input_type_job");

const popUpInfoSelector = ".pop-up_type_info";
const popUpCardsSelector = ".pop-up_type_cards";
const popUpExtendCapSelector = ".pop-up_type_extend-cap";
const profileFirstNameSelector = ".profile__firstname";
const profileJobSelector = ".profile__job";
const photoElementsSelector = ".photo-elements__list";

const templateSelector = "#photo-elements__item";

const formValidators = {};

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
  popUpWithImage.open({ name, link });
};
// --------Handle form for Info (class PopUpWithForm)---------------------------------------------------------------------------------------
function handleInfoFormSubmit(object) {
  userInfo.setUserInfo(object);
  popUpFormInfo.close();
}
// --------Filling pop-up info form before opening (class UserInfo)---------------------------------------------------------------------------------------
function fillPopUpInfoForm() {
  const newObject = userInfo.getUserInfo();
  popUpInputFirstName.value = newObject.name;
  popUpInputJob.value = newObject.job;

};
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
  photoElementsSelector
);
cardsList.renderCards();

// --------Handle form cards for new cards (class PopUpWithImage)------------------------------------------------------------------------------
const handleCardFormSubmit = (object) => {
  const { name, link } = object;
  cardsList.addCard(createCard({ name, link }));
};
// --------Create objects of classes pop-ups------------------------------------------------
const popUpWithImage = new PopUpWithImage(popUpExtendCapSelector);
popUpWithImage.setEventListeners();

const userInfo = new UserInfo({ profileFirstNameSelector, profileJobSelector });

const popUpFormInfo = new PopUpWithForm(
  popUpInfoSelector,
  handleInfoFormSubmit
);
popUpFormInfo.setEventListeners();

const popUpFormCard = new PopUpWithForm(
  popUpCardsSelector,
  handleCardFormSubmit
);
popUpFormCard.setEventListeners();

// --------Launch functions by events------------------------------------------------------------------------------------
profileButtonInfo.addEventListener("click", () => {
  fillPopUpInfoForm();
  popUpFormInfo.open();
  formValidators["form-info"].toggleButton();
});

profileButtonCards.addEventListener("click", () => {
  popUpFormCard.open();

  formValidators["form-cards"].toggleButton();
});
