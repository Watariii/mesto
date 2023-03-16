export default class Card {
  constructor(arrayCards, templateSelector, handleClickCard) {
    this._name = arrayCards.name;
    this._link = arrayCards.link;
    this._template = document.querySelector(templateSelector).content;
    this._handleClickCard = handleClickCard;

    this._cardElement = this._template.querySelector("li").cloneNode(true);
    this._cardTitle = this._cardElement.querySelector(".photo-elements__title");
    this._cardImage = this._cardElement.querySelector(".photo-elements__capture");

    this._buttonLike = this._cardElement.querySelector(".photo-elements__like");
    this._buttonDelete = this._cardElement.querySelector(
      ".photo-elements__delete"
    );
  }

  _createCard = () => {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  };

  _setEventListeners = () => {
    this._buttonLike.addEventListener("click", this._handleButtonLikeClick);
    this._buttonDelete.addEventListener("click",this._handleButtonDeleteClick);
    this._cardImage.addEventListener("click", () => {
      this._handleClickCard(this._name, this._link);
    });
  };

  _handleButtonLikeClick = () => {
    this._buttonLike.classList.toggle("photo-elements__like_active");
  };

  _handleButtonDeleteClick = () => {
    this._cardElement.remove();
  };

  getCard = () => {
    return this._createCard();
  };
}
