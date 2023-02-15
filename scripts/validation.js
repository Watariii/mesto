const formValidationConfig = {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__input',
    inputErrorClass: 'pop-up__input_type_error',
    buttonSelector: '.pop-up__button',
    buttonDisabledClass: 'pop-up__button_disabled',
  };
  function submitDisable (evt) {
    evt.preventDefault();
  }
  function enableValidation(config) {
    const form = document.querySelector(config.formSelector);
    form.addEventListener('submit', submitDisable);
    form.addEventListener('input',() => {
      toggleButton(form,config);
    })
    addInputListener(form,config);
    toggleButton(form,config);
    
  };


  function handleFormInput (evt,config) {
    const input =evt.target;
    const inputId = input.id;
    const errorElement = document.querySelector(`#${inputId}-error`);
    if(input.validity.valid) {
      input.classList.remove(config.inputErrorClass);
      errorElement.textContent = '';
    } else {
      input.classList.add(config.inputErrorClass);
      errorElement.textContent = input.validationMessage;
    };
    
  };

  function toggleButton (form, config) {
    const buttonSubmit = form.querySelector(config.buttonSelector);
    const isFormValid = form.checkValidity();
    console.log(isFormValid);
    buttonSubmit.disabled = !isFormValid;
    buttonSubmit.classList.toggle(config.buttonDisabledClass,!isFormValid);
  }

  function addInputListener(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    inputList.forEach( (item)=>{
      item.addEventListener('input', (evt) => {
       handleFormInput(evt, config)
      });
    });
  };

  enableValidation(formValidationConfig);