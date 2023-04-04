import { formValidationConfig, apiConfig } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopUpWithImage from "../components/PopUpWithImage.js";
import PopUpWithForm from "../components/PopUpWithForm.js";
import PopUpConfirmDelete from "../components/PopUpConfirmDelete.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "./index.css";

// --------Variables------------------------------------------------------------------------------------------------------------------------------------------------------
const profileButtonInfo = document.querySelector(".profile__button-info");
const profileButtonCards = document.querySelector(".profile__button-cards");
const profileButtonAvatar = document.querySelector(".profile__avatar");

const popUpInputFirstName = document.querySelector(
  ".pop-up__input_type_firstname"
);
const popUpInputJob = document.querySelector(".pop-up__input_type_job");

const popUpInfoSelector = ".pop-up_type_info";
const popUpCardsSelector = ".pop-up_type_cards";
const popUpAvatarSelector = ".pop-up_type_avatar";
const popUpExtendCapSelector = ".pop-up_type_extend-cap";
const popUpConfirmDeleteSelector = ".pop-up_type_delete-card";
const profileFirstNameSelector = ".profile__firstname";
const profileJobSelector = ".profile__job";
const profileAvatarSelector = ".profile__avatar-selector";
const photoElementsSelector = ".photo-elements__list";

const templateSelector = "#photo-elements__item";

const formValidators = {};

// --------Enable validation and add name form validator in object "formValidators"------------------------------------------------------------------------------------
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(formValidationConfig);

// --------Pop-up capture opening (class Card)--------------------------------------------------------------------------------------------------------------------------
const handleClickCard = (name, link) => {
  popUpWithImage.open({ name, link });
};
// --------Handle form for Info (class PopUpWithForm)-------------------------------------------------------------------------------------------------------------------
function handleInfoFormSubmit(object) {
  api
    .editUserInfo(object)
    .then((dataUser) => {
      userInfo.setUserInfo(dataUser);
      popUpFormInfo.close();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      popUpFormInfo.renderLoading(false);
    });
}
// --------Filling pop-up info form before opening (class UserInfo)---------------------------------------------------------------------------------------------------------
function fillPopUpInfoForm() {
  const newObject = userInfo.getUserInfo();
  popUpInputFirstName.value = newObject.name;
  popUpInputJob.value = newObject.about;
}

// --------Creating cards---------------------------------------------------------------------------------------------------------------------------------------------------
const createCard = (item) => {
  const card = new Card(
    item,
    templateSelector,
    handleClickCard,
    api,
    (cardElement, idCard) => {
      popUpConfirmDelete.open(cardElement, idCard);
    }
  );
  const cardElement = card.getCard();
  return cardElement;
};

//---------Add cards in photo element list and rendering (class Section)---------------------------------------------------------------------------------------------
const cardsList = new Section((item) => {
  const cardElement = createCard(item);
  cardsList.addCard(cardElement);
}, photoElementsSelector);

// --------Handle form cards for new cards (class PopUpWithImage)------------------------------------------------------------------------------
const handleCardFormSubmit = (object) => {
  api
    .addNewCard(object)
    .then((cardElement) => {
      cardsList.addCard(createCard(cardElement));
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      popUpFormCard.renderLoading(false);
    });
};
// --------Handle form avatar for ubdate avatar (class PopUpWithForm)------------------------------------------------------------------------------
const handleAvatarFormSubmit = (objectAvatar) => {
  api
    .updateAvatar(objectAvatar)
    .then((dataUser) => {
      userInfo.setUserAvatar(dataUser.avatar);
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      popUpFormAvatar.renderLoading(false);
    });
};
// --------Create objects of classes pop-ups------------------------------------------------
const popUpWithImage = new PopUpWithImage(popUpExtendCapSelector);
popUpWithImage.setEventListeners();

const userInfo = new UserInfo({
  profileFirstNameSelector,
  profileJobSelector,
  profileAvatarSelector,
});

const popUpFormInfo = new PopUpWithForm(
  popUpInfoSelector,
  handleInfoFormSubmit
);
popUpFormInfo.setEventListeners();

const popUpFormCard = new PopUpWithForm(
  popUpCardsSelector,
  handleCardFormSubmit
);
popUpFormCard.setEventListeners();

const popUpFormAvatar = new PopUpWithForm(
  popUpAvatarSelector,
  handleAvatarFormSubmit
);
popUpFormAvatar.setEventListeners();

const popUpConfirmDelete = new PopUpConfirmDelete(
  popUpConfirmDeleteSelector,
  (cardElement, idCard) => {
    api
      .deleteCard(idCard)
      .then(() => {
        cardElement.remove();
        cardElement = null;
      })
      .catch((err) => {
        alert(err);
      });
  }
);
popUpConfirmDelete.setEventListeners();

// --------Launch functions by events------------------------------------------------------------------------------------
profileButtonInfo.addEventListener("click", () => {
  fillPopUpInfoForm();
  popUpFormInfo.open();
  formValidators["form-info"].toggleButton();
});

profileButtonCards.addEventListener("click", () => {
  popUpFormCard.open();

  formValidators["form-cards"].toggleButton();
});

profileButtonAvatar.addEventListener("click", () => {
  popUpFormAvatar.open();
  formValidators["form-avatar"].toggleButton();
});

// --------Creating cards by api (class Api)--------------------------------------------------------------
const api = new Api(apiConfig);
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then((data) => {
    cardsList.renderCards(data[0].reverse());
    userInfo.setUserInfo(data[1]);
    userInfo.setUserAvatar(data[1].avatar);
  })
  .catch((err) => {
    alert(err);
  });
