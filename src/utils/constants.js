import petropavlovsImage from "../images/petropavlovs-kamchatskiy-min.jpg";
import kareliaImage from "../images/karelia.jpg";
import volgaImage from "../images/beach-volga.jpg";
import dombayImage from "../images/dombay.png";
import elbrusImage from "../images/elbrus.png";
import karachaevskImage from "../images/karachaevsk-min.jpg";

const arrayCards = [
  {
    name: "Петропавловск-Камчатский",
    link: petropavlovsImage,
  },
  {
    name: "Карелия",
    link: kareliaImage,
  },
  {
    name: "Волга",
    link: volgaImage,
  },
  {
    name: "Домбай",
    link: dombayImage,
  },
  {
    name: "Гора Эльбрус",
    link: elbrusImage,
  },
  {
    name: "Карачаевск",
    link: karachaevskImage,
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
