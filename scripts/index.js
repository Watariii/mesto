import { arrayCards, formValidationConfig } from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// --------Variables---------------------------------------------------------------------------------------
const profileButtonInfo = document.querySelector(".profile__button-info");
const profileButtonCards = document.querySelector(".profile__button-cards");

const popUpInfo = document.querySelector(".pop-up_type_info");
const popUpCards = document.querySelector(".pop-up_type_cards");

const profileFirstName = document.querySelector(".profile__firstname");
const profileJob = document.querySelector(".profile__job");

const popUpFirstName = document.querySelector(".pop-up__input_type_firstname");
const popUpJob = document.querySelector(".pop-up__input_type_job");
const popUpName = document.querySelector(".pop-up__input_type_name");
const popUpLink = document.querySelector(".pop-up__input_type_link");

const popUpFormInfo = document.querySelector(".pop-up__form_type_info");
const popUpFormCards = document.querySelector(".pop-up__form_type_cards");

const photoElementsList = document.querySelector(".photo-elements__list");

const templateSelector = "#photo-elements__item";

// --------Pop-ups closing by taps on overlay---------------------------------------------------------------------------------------
const handleOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopUp(evt.currentTarget);
  } else {
    evt.stopPropagation();
  }
};
// --------Pop-ups closing by Escape---------------------------------------------------------------------------------------
const handleEscape = (evt) => {
  if (evt.key === "Escape") {
    const popUpOpened = document.querySelector(".pop-up_opened");
    closePopUp(popUpOpened);
  }
};
// --------Pop-ups opening---------------------------------------------------------------------------------------
const openPopUp = (popUp) => {
  popUp.classList.add("pop-up_opened");
  document.addEventListener("keydown", handleEscape);
  popUp.addEventListener("mousedown", handleOverlay);
};
// --------Pop-ups closing---------------------------------------------------------------------------------------
const closePopUp = (popUp) => {
  popUp.classList.remove("pop-up_opened");
  document.removeEventListener("keydown", handleEscape);
  popUp.removeEventListener("mousedown", handleOverlay);
};
// --------Handle form for Info---------------------------------------------------------------------------------------
const handleInfoFormSubmit = () => {
  const changeFirstname = popUpFirstName.value;
  const changeJob = popUpJob.value;
  profileFirstName.textContent = changeFirstname;
  profileJob.textContent = changeJob;
  closePopUp(popUpInfo);
};

//---------Rendering cards---------------------------------------------------------------------------------------------
const renderCard = (cardElement) => {
  photoElementsList.prepend(cardElement);
};
// --------Adding first six cards---------------------------------------------------------------------------------------
arrayCards.forEach((item) => {
  const card = new Card(item, templateSelector, openPopUp);
  const cardElement = card.getCard();
  renderCard(cardElement);
});
// --------Handle form cards for new cards------------------------------------------------------------------------------
const handleCardFormSubmit = () => {
  const changeName = popUpName.value;
  const changeLink = popUpLink.value;
  const newObject = {
    name: changeName,
    link: changeLink,
  };
  renderCard(new Card(newObject, templateSelector, openPopUp).getCard());
  closePopUp(popUpCards);
};
// --------Set last value for pop-up form info------------------------------------------------------------------------------------
const fillProfileInputs = () => {
  popUpFirstName.value = profileFirstName.textContent;
  popUpJob.value = profileJob.textContent;
};
// --------Add listeners for close buttons of pop-ups------------------------------------------------------------------------------------
const addCloseButtonListener = () => {
  const closeButtons = document.querySelectorAll(".pop-up__close-icon");
  closeButtons.forEach((button) => {
    const popUp = button.closest(".pop-up");
    button.addEventListener("click", () => closePopUp(popUp));
  });
};
// --------Launch functions by events------------------------------------------------------------------------------------
addCloseButtonListener();

profileButtonInfo.addEventListener("click", () => {
  fillProfileInputs();
  openPopUp(popUpInfo);
  new FormValidator(
    formValidationConfig,
    popUpInfo.querySelector(formValidationConfig.formSelector)
  ).enableFormValidation();
});

popUpFormInfo.addEventListener("submit", handleInfoFormSubmit);

popUpFormCards.addEventListener("submit", () => {
  handleCardFormSubmit();
  popUpFormCards.reset();
});

profileButtonCards.addEventListener("click", () => {
  openPopUp(popUpCards);
  new FormValidator(
    formValidationConfig,
    popUpCards.querySelector(formValidationConfig.formSelector)
  ).enableFormValidation();
});