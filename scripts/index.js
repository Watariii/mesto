// --------Variables---------------------------------------------------------------------------------------
const profileButtonInfo = document.querySelector('.profile__button-info');
const profileButtonCards = document.querySelector('.profile__button-cards')

const popUpInfo = document.querySelector('.pop-up_type_info');
const popUpCards = document.querySelector('.pop-up_type_cards')

const popUpInfoCloseIcon = document.querySelector('.pop-up__close-icon_type_info');
const popUpCardsCloseIcon = document.querySelector('.pop-up__close-icon_type_cards');

const profileFirstname = document.querySelector('.profile__firstname');
const profileJob = document.querySelector('.profile__job');

const popUpFirstname = document.querySelector('.pop-up__input_type_firstname');
const popUpJob = document.querySelector('.pop-up__input_type_job');
const popUpName = document.querySelector('.pop-up__input_type_name');
const popUpLink = document.querySelector('.pop-up__input_type_link');

const popUpFormInfo = document.querySelector('.pop-up__form_type_info');
const popUpFormCards = document.querySelector('.pop-up__form_type_cards');

const photoElementsList = document.querySelector('.photo-elements__list');

const popUpExtendCap = document.querySelector('.pop-up_type_extend-cap');
const popUpCapture = document.querySelector('.pop-up__capture');
const popUpTitleExtendCap = document.querySelector('.pop-up__title_type_extend-cap');
const popUpExtendCapCloseIcon = document.querySelector('.pop-up__close-icon_type_extend-cap');

const template = document.querySelector('#photo-elements__item').content;
// --------Pop-ups opening---------------------------------------------------------------------------------------
const openPopUp = (popUp) => {
    popUp.classList.add('pop-up_opened');
};
// --------Pop-ups closing---------------------------------------------------------------------------------------
const closePopUp = (popUp) => {
    popUp.classList.remove('pop-up_opened');
};
// --------Handle form for Info---------------------------------------------------------------------------------------
const submitHandleFormInfo = (evt) => {
    evt.preventDefault();
    const changeFirstname = popUpFirstname.value;
    const changeJob = popUpJob.value;
    profileFirstname.textContent = changeFirstname;
    profileJob.textContent = changeJob;
    closePopUp(popUpInfo)
};
// --------Creating two massives from one------------------------------------------------------------------------------

//---------Creating card---------------------------------------------------------------------------------------------
const createCard = (name,link) => {
    const photoElements = template.querySelector('li').cloneNode(true);
    photoElements.querySelector('.photo-elements__title').textContent = name;
    photoElements.querySelector('.photo-elements__capture').setAttribute('src',link);
    photoElements.querySelector('.photo-elements__capture').setAttribute('alt',name);
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
    const photoElementsCapture = photoElements.querySelector('.photo-elements__capture');
    photoElementsCapture.addEventListener('click', () => {
        openPopUp(popUpExtendCap);
        popUpCapture.setAttribute('src',link);
        popUpCapture.setAttribute('alt',name);
        popUpTitleExtendCap.textContent = name;
    })
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
const submitHandleFormCards = (evt) => {
    evt.preventDefault();
    const changeName = popUpName.value;
    const changeLink = popUpLink.value;
    const newObject =
    {
        name: changeName,
        link: changeLink
    };
    renderCard(changeName,changeLink);
    popUpFormCards.reset();
    closePopUp(popUpCards);
};
// --------Launch functions by events------------------------------------------------------------------------------------
profileButtonInfo.addEventListener('click', () => {openPopUp(popUpInfo)
    popUpFirstname.value = profileFirstname.textContent;
    popUpJob.value = profileJob.textContent;});
popUpInfoCloseIcon.addEventListener('click', () => {closePopUp(popUpInfo)});

popUpFormInfo.addEventListener('submit',submitHandleFormInfo);
popUpFormCards.addEventListener('submit',submitHandleFormCards);


profileButtonCards.addEventListener('click', () => {openPopUp(popUpCards)});
popUpCardsCloseIcon.addEventListener('click', () => {closePopUp(popUpCards)});

popUpExtendCapCloseIcon.addEventListener('click', () => {closePopUp(popUpExtendCap)});