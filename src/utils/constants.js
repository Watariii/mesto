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

export { formValidationConfig, apiConfig };
