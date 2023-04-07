// --------Variables------------------------------------------------------------------------------------------------------------------------------------------------------
const profileButtonInfo = document.querySelector(".profile__button-info");
const profileButtonCards = document.querySelector(".profile__button-cards");
const profileButtonAvatar = document.querySelector(".profile__avatar");

const popUpInfoSelector = ".pop-up_type_info";
const popUpCardsSelector = ".pop-up_type_cards";
const popUpAvatarSelector = ".pop-up_type_avatar";
const popUpExtendCapSelector = ".pop-up_type_extend-cap";
const popUpConfirmDeleteSelector = ".pop-up_type_delete-card";
const profileFirstNameSelector = ".profile__firstname";
const profileJobSelector = ".profile__job";
const profileAvatarSelector = ".profile__avatar-selector";
const photoElementsSelector = ".photo-elements__list";

const templateSelector = "#photo-elements__item";

const formValidators = {};

const formValidationConfig = {
  formSelector: ".pop-up__form",
  inputSelector: ".pop-up__input",
  submitButtonSelector: ".pop-up__button",
  inactiveButtonClass: "pop-up__button_disabled",
  inputErrorClass: "pop-up__input_type_error",
};

const apiConfig = {
  url: "https://mesto.nomoreparties.co/v1/cohort-62/",
  headers: {
    "content-type": "application/json",
    authorization: "4898a7e1-8307-419a-888b-936831ac477e",
  },
};

export {
  formValidationConfig,
  apiConfig,
  profileButtonInfo,
  profileButtonCards,
  profileButtonAvatar,
  popUpInfoSelector,
  popUpCardsSelector,
  popUpAvatarSelector,
  popUpExtendCapSelector,
  popUpConfirmDeleteSelector,
  profileFirstNameSelector,
  profileJobSelector,
  profileAvatarSelector,
  photoElementsSelector,
  templateSelector,
  formValidators,
};
