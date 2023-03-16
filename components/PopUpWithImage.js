import PopUp from "./PopUp.js";

export default class PopUpWithImage extends PopUp {
  constructor(popUpSelector, name, link) {
    super(popUpSelector);
    this._name = name;
    this._link = link;
  }
  openPopUp = () => {
    this._popUpSelector.querySelector(".pop-up__capture").src = this._link;
    this._popUpSelector.querySelector(".pop-up__capture").alt = this._name;
    this._popUpSelector.querySelector(
      ".pop-up__title_type_extend-cap"
    ).textContent = this._name;
    this._popUpSelector.classList.add("pop-up_opened");
    this._setEventListeners();
  };
}
