export default class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._form = form;
    this._submitButton = this._form.querySelector(config.submitButtonSelector);
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
  }

  enableValidation = () => {
    this._addListenerInput();
    this.toggleButton();
  };

  toggleButton = () => {
    const isFormValid = this._form.checkValidity();
    this._submitButton.disabled = !isFormValid;
    this._submitButton.classList.toggle(
      this._inactiveButtonClass,
      !isFormValid
    );
  };

  _addListenerInput() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._handleFormInput(input);
        this.toggleButton();
      });
    });
  }

  _handleFormInput(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    if (input.validity.valid) {
      this._hideErrorMessage(input,errorElement)
    } else {
      this._showErrorMessage(input,errorElement)
    }
  }

  _showErrorMessage(input,errorElement) {
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }

  _hideErrorMessage(input,errorElement) {
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
  }
}
