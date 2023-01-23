// --------Massives---------------------------------------------------------------------------------------
const arrayCards = [
    {
      name: 'Петропавловск-Камчатский',
      link: './images/petropavlovs-kamchatskiy-min.jpg'
    },
    {
      name: 'Карелия',
      link: './images/karelia.jpg'
    },
    {
      name: 'Волга',
      link: './images/beach-volga.jpg'
    },
    {
      name: 'Домбай',
      link: './images/dombay.png'
    }, 
    {
      name: 'Гора Эльбрус',
      link: './images/elbrus.png'
    },
    {
      name: 'Карачаевск',
      link: './images/karachaevsk-min.jpg'
    },
      
];
const arrayNameCards = [];
const arrayLinkCards = [];
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
// --------Pop-ups---------------------------------------------------------------------------------------
const popUpInfoOpened = () => {
    popUpInfo.classList.add('pop-up_opened');    
    popUpFirstname.value = profileFirstname.textContent;
    popUpJob.value = profileJob.textContent;
};

const popUpInfoClose = () => {
    popUpInfo.classList.remove('pop-up_opened');
};
const popUpCardsOpened = () => {
    popUpCards.classList.add('pop-up_opened');
};

const popUpCardsClose = () => {
    popUpCards.classList.remove('pop-up_opened');
};
// --------Handle form for Info---------------------------------------------------------------------------------------
const handleFormInfoSubmit = evt => {
    evt.preventDefault();
    const changeFirstname = popUpFirstname.value;
    const changeJob = popUpJob.value;
    profileFirstname.textContent = changeFirstname;
    profileJob.textContent = changeJob;
    popUpInfoClose();
};
// --------Creating two massives from one---------------------------------------------------------------------------------------
const arrayNameAndLinkCreate = () => {
    for (i=0; i<arrayCards.length; i+=1){
    arrayNameCards[i] = arrayCards[i].name;
    arrayLinkCards[i] = arrayCards[i].link
};
};

arrayNameAndLinkCreate();
// --------Creating and rendering cards---------------------------------------------------------------------------------------
const createCards = (arrayNameCards, arrayLinkCards) => {
    const template = `
        <li>
        <article class="photo-elements__item">
        <img
            src=""
            alt=""
            class="photo-elements__capture"
        />
        <p class="photo-elements__title"></p>
        <button class="photo-elements__like" type="button"></button>
        </article>
        </li>
        `;
    const container = document.createElement('div');
    container.innerHTML = template;
    container.querySelector('.photo-elements__title').textContent = arrayNameCards;
    container.querySelector('.photo-elements__capture').setAttribute('src',arrayLinkCards);
    container.querySelector('.photo-elements__capture').setAttribute('alt',arrayNameCards);

    return container.firstElementChild;
};

const renderCards = (arrayNameCards, arrayLinkCards) => {
    photoElementsList.prepend(createCards(arrayNameCards, arrayLinkCards));
};
// --------Adding first six cards---------------------------------------------------------------------------------------
const AddFirstSixCards = () => {
    for (i=0; i<arrayCards.length; i+=1) {
    renderCards(arrayNameCards[i],arrayLinkCards[i])
}
};
AddFirstSixCards();
// --------Handle form cards for new cards---------------------------------------------------------------------------------------
const handleFormCardsSubmit = (evt) => {
    evt.preventDefault();
    const changeName = popUpName.value;
    const changeLink = popUpLink.value;
    const newObject ={};
    
    newObject.name = changeName;
    newObject.link = changeLink;

    arrayCards.push(newObject);
    arrayNameAndLinkCreate(arrayCards);
    renderCards(changeName,changeLink);
    
    popUpName.value='';
    popUpLink.value='';

    popUpCardsClose();
};
// --------Launch functions by events---------------------------------------------------------------------------------------
profileButtonInfo.addEventListener('click', popUpInfoOpened);
popUpInfoCloseIcon.addEventListener('click', popUpInfoClose);

popUpFormInfo.addEventListener('submit',handleFormInfoSubmit);
popUpFormCards.addEventListener('submit',handleFormCardsSubmit);


profileButtonCards.addEventListener('click', popUpCardsOpened);
popUpCardsCloseIcon.addEventListener('click', popUpCardsClose);