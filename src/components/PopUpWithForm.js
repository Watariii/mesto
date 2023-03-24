import PopUp from "./PopUp.js";

export default class PopUpWithForm extends PopUp {
  constructor(popUpSelector, handleFormSubmit) {
    super(popUpSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popUpForm = this._popUp.querySelector(".pop-up__form");
    this._inputList = Array.from(this._popUp.querySelectorAll("input"));
  }

  close = () => {
    this._popUpForm.reset();
    this._popUp.classList.remove("pop-up_opened");
  };

  setEventListeners = () => {
    this._popUp.addEventListener("submit", (evt) => {
      this._disableReload(evt);
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  };

  _disableReload = (evt) => {
    evt.preventDefault();
  };

  _getInputValues = () => {
    this._newObject = {};
    this._inputList.forEach((inputElement) => {
      this._newObject[inputElement.getAttribute('name')] = inputElement.value
    });    
    return this._newObject;
  };
}
