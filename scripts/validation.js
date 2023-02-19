const formValidationConfig = {
  formSelector: ".pop-up__form",
  inputSelector: ".pop-up__input",
  submitButtonSelector: ".pop-up__button",
  inactiveButtonClass: "pop-up__button_disabled",
  inputErrorClass: "pop-up__input_type_error",
};
function submitDisable(evt) {
  evt.preventDefault();
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    enableFormValidation(form, config);
  });
}

function enableFormValidation(form, config) {
  form.addEventListener("submit", submitDisable);
  form.addEventListener("input", () => {
    toggleButton(form, config);
  });
  addInputListener(form, config);
  toggleButton(form, config);

  form.addEventListener("reset", () => {
    setTimeout(() => {
      toggleButton(form, config);
    }, 0);
  });
}

function handleFormInput(evt, config) {
  const input = evt.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);
  if (input.validity.valid) {
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = "";
  } else {
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }
}

function toggleButton(form, config) {
  const submitButton = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();
  submitButton.disabled = !isFormValid;
  submitButton.classList.toggle(config.inactiveButtonClass, !isFormValid);
}

function addInputListener(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach((item) => {
    item.addEventListener("input", (evt) => {
      handleFormInput(evt, config);
    });
  });
}
enableValidation(formValidationConfig);
