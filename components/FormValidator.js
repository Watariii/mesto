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
    this._addListenerSubmit();
    this._addListenerFormInput();
    this._addListenerInput();
    this.toggleButton();
  };

  _addListenerSubmit = () => {
    this._form.addEventListener("submit", (evt) => {
      this._disableReload(evt);
    });
  };

  _disableReload = (evt) => {
    evt.preventDefault();
  };

  _addListenerFormInput = () => {
    this._form.addEventListener("input", () => {
      this.toggleButton();
    });
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
    this._inputList.forEach((item) => {
      item.addEventListener("input", (evt) => {
        this._handleFormInput(evt);
      });
    });
  }

  _handleFormInput(evt) {
    const input = evt.target;
    const inputId = input.id;
    const errorElement = this._form.querySelector(`#${inputId}-error`);
    if (input.validity.valid) {
      input.classList.remove(this._inputErrorClass);
      errorElement.textContent = "";
    } else {
      input.classList.add(this._inputErrorClass);
      errorElement.textContent = input.validationMessage;
    }
  }
}
