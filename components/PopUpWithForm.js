import PopUp from "./PopUp.js";

export default class PopUpWithForm extends PopUp {
  constructor(popUpSelector, handleFormSubmit) {
    super(popUpSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  closePopUp = () => {
    this._popUpSelector.querySelector(".pop-up__form").reset();
    this._popUpSelector.classList.remove("pop-up_opened");
  };

  setEventListeners = () => {
    this._popUpSelector.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
      this._popUpSelector.querySelector(".pop-up__form").reset();
      this.closePopUp();
    });
    this._closeIcon.addEventListener("click", () => {
      this.closePopUp();
    });
  };

  _getInputValues = () => {
    this._inputList = Array.from(this._popUpSelector.querySelectorAll("input"));
    this._newObject = {
      firstInputForm: this._inputList[0].value,
      secondInputForm: this._inputList[1].value,
    };
    return this._newObject;
  };
}
