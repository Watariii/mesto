export default class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._form = form;
  }

  enableFormValidation = () => {
    this._addListenerSubmit();
    this._addListenerFormInput();
    this._addListenerInput();
    this._toggleButton();
  };

  _addListenerSubmit = () => {
    this._form.addEventListener("submit", (evt) => {
      this._submitDisable(evt);
    });
  };

  _submitDisable = (evt) => {
    console.log(evt);
    evt.preventDefault();
  };

  _addListenerFormInput = () => {
    this._form.addEventListener("input", () => {
      this._toggleButton();
    });
  };

  _toggleButton = () => {
    const submitButton = this._form.querySelector(this._submitButtonSelector);
    const isFormValid = this._form.checkValidity();
    submitButton.disabled = !isFormValid;
    submitButton.classList.toggle(this._inactiveButtonClass, !isFormValid);
  };

  _addListenerInput() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    inputList.forEach((item) => {
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