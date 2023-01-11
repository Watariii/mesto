let profileButtonInfo = document.querySelector('.profile__button-info');
let popUp = document.querySelector('.pop-up');
let popUpCloseIcon = document.querySelector('.pop-up__close-icon');

let profileFirstname = document.querySelector('.profile__firstname');
let profileJob = document.querySelector('.profile__job');

let popUpFirstname = document.querySelector('.pop-up__input_type_firstname');
let popUpJob = document.querySelector('.pop-up__input_type_job');

let popUpForm = document.querySelector('.pop-up__form');

function popUpOpened() {
    popUp.classList.add('pop-up_opened');    
    popUpFirstname.value = profileFirstname.textContent;
    popUpJob.value = profileJob.textContent;
}

function popUpClose() {
    popUp.classList.remove('pop-up_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    let changeFirstname = popUpFirstname.value;
    let changeJob = popUpJob.value;
    profileFirstname.textContent = changeFirstname;
    profileJob.textContent = changeJob;
    popUpClose();
}

profileButtonInfo.addEventListener('click', popUpOpened);
popUpCloseIcon.addEventListener('click', popUpClose);
popUpForm.addEventListener('submit',handleFormSubmit);