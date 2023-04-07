import PopUp from "./PopUp.js";

export default class PopUpWithForm extends PopUp {
  constructor(popUpSelector, handleFormSubmit) {
    super(popUpSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popUpForm = this._popUp.querySelector(".pop-up__form");
    this._inputList = Array.from(this._popUp.querySelectorAll("input"));
    this._submitButton = this._popUp.querySelector(".pop-up__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  close = () => {
    super.close()
    this._popUpForm.reset();
  };

  setEventListeners = () => {
    this._popUp.addEventListener("submit", (evt) => {
      this.renderLoadingSubmitButton(true);
      this._disableReload(evt);
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  };

  renderLoadingSubmitButton(isLoading, loadingText = 'Сохранение...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  getInputValues(object) {
    this._inputList.forEach((inputElement) => {
      inputElement.value = object[inputElement.name];
    });
  }

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
