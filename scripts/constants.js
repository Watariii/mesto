const arrayCards = [
  {
    name: "Петропавловск-Камчатский",
    link: "./images/petropavlovs-kamchatskiy-min.jpg",
  },
  {
    name: "Карелия",
    link: "./images/karelia.jpg",
  },
  {
    name: "Волга",
    link: "./images/beach-volga.jpg",
  },
  {
    name: "Домбай",
    link: "./images/dombay.png",
  },
  {
    name: "Гора Эльбрус",
    link: "./images/elbrus.png",
  },
  {
    name: "Карачаевск",
    link: "./images/karachaevsk-min.jpg",
  },
];

const formValidationConfig = {
  formSelector: ".pop-up__form",
  inputSelector: ".pop-up__input",
  submitButtonSelector: ".pop-up__button",
  inactiveButtonClass: "pop-up__button_disabled",
  inputErrorClass: "pop-up__input_type_error",
};

export { arrayCards, formValidationConfig };
