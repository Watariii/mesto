import PopUp from "./PopUp.js";

export default class PopUpWithImage extends PopUp {
  constructor(popUpSelector) {
    super(popUpSelector);
    this._popUpCapture = this._popUp.querySelector(".pop-up__capture");
    this._popUpTitle = this._popUp.querySelector(
      ".pop-up__title_type_extend-cap"
    );
  }
  open = ({ name, link }) => {
    this._popUpCapture.src = link;
    this._popUpCapture.alt = name;
    this._popUpTitle.textContent = name;
    this._popUp.classList.add("pop-up_opened");
    this._setEventListeners();
  };
}
