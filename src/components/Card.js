export default class Card {
  constructor(
    card,
    templateSelector,
    handleClickCard,
    api,
    handleConfirmDelete
  ) {
    this._name = card.name;
    this._link = card.link;
    this._likes = card.likes;
    this._idCard = card._id;
    this._idOwner = card.owner._id;
    this._template = document.querySelector(templateSelector).content;
    this._handleClickCard = handleClickCard;
    this._api = api;
    this._handleConfirmDelete = handleConfirmDelete;

    this._cardElement = this._template.querySelector("li").cloneNode(true);
    this._cardTitle = this._cardElement.querySelector(".photo-elements__title");
    this._cardImage = this._cardElement.querySelector(
      ".photo-elements__capture"
    );

    this._buttonLike = this._cardElement.querySelector(
      ".photo-elements__like-button"
    );
    this._buttonDelete = this._cardElement.querySelector(
      ".photo-elements__delete"
    );
    this._likesCounter = this._cardElement.querySelector(
      ".photo-elements__like-counter"
    );
  }

  _createCard = () => {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setAmountLikes();
    this._setEventListeners();
    this._handleButtonLike();

    return this._cardElement;
  };

  _setEventListeners = () => {
    this._buttonLike.addEventListener("click", () => {
      if (
        this._buttonLike.classList.contains(
          "photo-elements__like-button_active"
        )
      ) {
        this._removeLikeCard();
      } else {
        this._likeCard();
      }
    });
    this._buttonDelete.addEventListener("click", () => {
      this._handleConfirmDelete(this._cardElement, this._idCard);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleClickCard(this._name, this._link);
    });
    this._hideButtonDelete();
  };

  _handleButtonLike = () => {
    this._api
      .getUserInfo()
      .then((data) => {
        return data._id;
      })
      .then((meId) => {
        this._likes.forEach((item) => {
          if (item._id === meId) {
            this._buttonLike.classList.add(
              "photo-elements__like-button_active"
            );
          } else {
            this._buttonLike.classList.remove(
              "photo-elements__like-button_active"
            );
          }
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  _hideButtonDelete() {
    this._api
      .getUserInfo()
      .then((data) => {
        return data._id;
      })
      .then((meId) => {
        if (meId != this._idOwner) {
          this._buttonDelete.remove();
          this._buttonDelete = null;
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  _setAmountLikes() {
    return (this._likesCounter.textContent = this._likes.length);
  }

  _likeCard() {
    this._api
      .likeCard(this._idCard)
      .then((card) => {
        this._likesCounter.textContent = card.likes.length;
        this._buttonLike.classList.add("photo-elements__like-button_active");
      })
      .catch((err) => {
        alert(err);
      });
  }

  _removeLikeCard() {
    this._api
      .removeLikeCard(this._idCard)
      .then((card) => {
        this._likesCounter.textContent = card.likes.length;
        this._buttonLike.classList.remove("photo-elements__like-button_active");
      })
      .catch((err) => {
        alert(err);
      });
  }

  getCard = () => {
    return this._createCard();
  };
}
