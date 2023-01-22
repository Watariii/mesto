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

const profileButtonInfo = document.querySelector('.profile__button-info');
const profileButtonCards = document.querySelector('.profile__button-cards')

const popUpInfo = document.querySelector('.pop-up_info');
const popUpCards = document.querySelector('.pop-up_cards')

const popUpInfoCloseIcon = document.querySelector('.pop-up__close-icon_info');
const popUpCardsCloseIcon = document.querySelector('.pop-up__close-icon_cards');

const profileFirstname = document.querySelector('.profile__firstname');
const profileJob = document.querySelector('.profile__job');

const popUpFirstname = document.querySelector('.pop-up__input_type_firstname');
const popUpJob = document.querySelector('.pop-up__input_type_job');

const popUpForm = document.querySelector('.pop-up__form');

const photoElementsList = document.querySelector('.photo-elements__list');

const popUpInfoOpened = () => {
    popUpInfo.classList.add('pop-up_opened');    
    popUpFirstname.value = profileFirstname.textContent;
    popUpJob.value = profileJob.textContent;
};

const popUpInfoClose = () => {
    popUpInfo.classList.remove('pop-up_opened');
};

const handleFormSubmit = evt => {
    evt.preventDefault();
    let changeFirstname = popUpFirstname.value;
    let changeJob = popUpJob.value;
    profileFirstname.textContent = changeFirstname;
    profileJob.textContent = changeJob;
    popUpInfoClose();
};

const popUpCardsOpened = () => {
    popUpCards.classList.add('pop-up_opened');
};

const popUpCardsClose = () => {
    popUpCards.classList.remove('pop-up_opened');
};

const arrayNameCards = arrayCards.map((item) => {
    return item.name;
});

const arrayLinkCards = arrayCards.map((item) => {
    return item.link;
});

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

const addCards = (arrayNameCards, arrayLinkCards) => {
    photoElementsList.prepend(createCards(arrayNameCards, arrayLinkCards));
};

for (i=0; i<arrayCards.length; i+=1) {
    addCards(arrayNameCards[i],arrayLinkCards[i])
};

profileButtonInfo.addEventListener('click', popUpInfoOpened);
popUpInfoCloseIcon.addEventListener('click', popUpInfoClose);

popUpForm.addEventListener('submit',handleFormSubmit);

profileButtonCards.addEventListener('click', popUpCardsOpened);
popUpCardsCloseIcon.addEventListener('click', popUpCardsClose);