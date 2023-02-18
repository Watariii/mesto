// --------Variables---------------------------------------------------------------------------------------
const profileButtonInfo = document.querySelector('.profile__button-info');
const profileButtonCards = document.querySelector('.profile__button-cards');

const popUpInfo = document.querySelector('.pop-up_type_info');
const popUpCards = document.querySelector('.pop-up_type_cards');

const profileFirstName = document.querySelector('.profile__firstname');
const profileJob = document.querySelector('.profile__job');

const popUpFirstName = document.querySelector('.pop-up__input_type_firstname');
const popUpJob = document.querySelector('.pop-up__input_type_job');
const popUpName = document.querySelector('.pop-up__input_type_name');
const popUpLink = document.querySelector('.pop-up__input_type_link');

const popUpFormInfo = document.querySelector('.pop-up__form_type_info');
const popUpFormCards = document.querySelector('.pop-up__form_type_cards');

const photoElementsList = document.querySelector('.photo-elements__list');

const popUpExtendCap = document.querySelector('.pop-up_type_extend-cap');
const popUpCapture = document.querySelector('.pop-up__capture');
const popUpTitleExtendCap = document.querySelector('.pop-up__title_type_extend-cap');


const template = document.querySelector('#photo-elements__item').content;

// --------Pop-ups closing by taps on overlay---------------------------------------------------------------------------------------
const handleOverlay = (evt) => {
        if (evt.target===evt.currentTarget) {
            closePopUp(evt.currentTarget)
        } else {
           evt.stopPropagation(); 
        }
};
// --------Pop-ups closing by Escape---------------------------------------------------------------------------------------
const handleEscape = (evt) => {   
        if (evt.key === 'Escape') {
            const popUpOpened = document.querySelector('.pop-up_opened');
            closePopUp(popUpOpened);    
        }      
};
// --------Pop-ups opening---------------------------------------------------------------------------------------
const openPopUp = (popUp) => {
    popUp.classList.add('pop-up_opened');
    document.addEventListener('keydown',handleEscape);
    popUp.addEventListener('mousedown',handleOverlay)
    enableValidation(formValidationConfig)
};
// --------Pop-ups closing---------------------------------------------------------------------------------------
const closePopUp = (popUp) => {
    popUp.classList.remove('pop-up_opened');
    document.removeEventListener('keydown',handleEscape);
    popUp.removeEventListener('mousedown',handleOverlay);

};
// --------Handle form for Info---------------------------------------------------------------------------------------
const handleInfoFormSubmit = () => {
    const changeFirstname = popUpFirstName.value;
    const changeJob = popUpJob.value;
    profileFirstName.textContent = changeFirstname;
    profileJob.textContent = changeJob;
    closePopUp(popUpInfo)
};
// --------Creating two massives from one------------------------------------------------------------------------------

//---------Creating card---------------------------------------------------------------------------------------------
const createCard = (name,link) => {
    const photoElements = template.querySelector('li').cloneNode(true);
    const photoElementCapture = photoElements.querySelector('.photo-elements__capture')
    photoElements.querySelector('.photo-elements__title').textContent = name;
    photoElementCapture.setAttribute('src',link);
    photoElementCapture.setAttribute('alt',name);
//----------Creating cards: Toggling like----------------------------------------------------------------------------------------------
    const photoElementsButtonLike = photoElements.querySelector('.photo-elements__like');
    photoElementsButtonLike.addEventListener('click', () => {
    photoElementsButtonLike.classList.toggle('photo-elements__like_active');
    });
//----------Creating cards: Deleting cards---------------------------------------------------------------------------------------------
    const photoElementsButtonDelete = photoElements.querySelector('.photo-elements__delete');
    photoElementsButtonDelete.addEventListener('click', () => {
        photoElements.remove();
    });
//----------Creating cards: Extended capture---------------------------------------------------------------------------------------------
    photoElementCapture.addEventListener('click', () => {
        openPopUp(popUpExtendCap);
        popUpCapture.setAttribute('src',link);
        popUpCapture.setAttribute('alt',name);
        popUpTitleExtendCap.textContent = name;
    });
//---------Creating cards finish--------------------------------------------------------------------------------------------
    return photoElements;
};
//---------Rendering cards---------------------------------------------------------------------------------------------
const renderCard = (name,link) => {
    photoElementsList.prepend(createCard(name,link));
};
// --------Adding first six cards---------------------------------------------------------------------------------------
arrayCards.forEach((item) => {
    renderCard(item.name, item.link);
})
// --------Handle form cards for new cards------------------------------------------------------------------------------
const handleCardFormSubmit = () => {
    const changeName = popUpName.value;
    const changeLink = popUpLink.value;
    const newObject =
    {
        name: changeName,
        link: changeLink
    };
    renderCard(changeName,changeLink);
    closePopUp(popUpCards);
};
// --------Set last value for pop-up form info------------------------------------------------------------------------------------
const fillProfileInputs = () => {
    popUpFirstName.value = profileFirstName.textContent;
    popUpJob.value = profileJob.textContent;
};
// --------Add listeners for close buttons of pop-ups------------------------------------------------------------------------------------
const addCloseButtonListener = () => {
    const closeButtons = document.querySelectorAll('.pop-up__close-icon');
    closeButtons.forEach((button) => {
        const popUp = button.closest('.pop-up');
        button.addEventListener('click', () => closePopUp(popUp));
}); 
};
// --------Launch functions by events------------------------------------------------------------------------------------
addCloseButtonListener();

profileButtonInfo.addEventListener('click', () => {
    fillProfileInputs();
    openPopUp(popUpInfo)
});

popUpFormInfo.addEventListener('submit',handleInfoFormSubmit);

popUpFormCards.addEventListener('submit',() => {
    handleCardFormSubmit();
    popUpFormCards.reset(); 
});

profileButtonCards.addEventListener('click', () => {  
    openPopUp(popUpCards);
});