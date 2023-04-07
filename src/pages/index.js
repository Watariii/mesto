import {
  formValidationConfig,
  apiConfig,
  profileButtonInfo,
  profileButtonCards,
  profileButtonAvatar,
  popUpInfoSelector,
  popUpCardsSelector,
  popUpAvatarSelector,
  popUpExtendCapSelector,
  popUpConfirmDeleteSelector,
  profileFirstNameSelector,
  profileJobSelector,
  profileAvatarSelector,
  photoElementsSelector,
  templateSelector,
  formValidators,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopUpWithImage from "../components/PopUpWithImage.js";
import PopUpWithForm from "../components/PopUpWithForm.js";
import PopUpConfirmDelete from "../components/PopUpConfirmDelete.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "./index.css";
let userId
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
      popUpFormInfo.renderLoadingSubmitButton(false);
    });
}
// --------Filling pop-up info form before opening (class UserInfo)---------------------------------------------------------------------------------------------------------
function fillPopUpInfoForm() {
  popUpFormInfo.getInputValues(userInfo.getUserInfo());
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
    },
    userId
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
      popUpFormCard.close();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      popUpFormCard.renderLoadingSubmitButton(false);
    });
};
// --------Handle form avatar for ubdate avatar (class PopUpWithForm)------------------------------------------------------------------------------
const handleAvatarFormSubmit = (objectAvatar) => {
  api
    .updateAvatar(objectAvatar)
    .then((dataUser) => {
      userInfo.setUserInfo(dataUser);
      popUpFormAvatar.close();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      popUpFormAvatar.renderLoadingSubmitButton(false);
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
        popUpConfirmDelete.this.close();
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
  .then(([cards, userData]) => {
    cardsList.renderCards(cards.reverse());
    userInfo.setUserInfo(userData);
    userId = userData._id;
  })
  .catch((err) => {
    alert(err);
  });
