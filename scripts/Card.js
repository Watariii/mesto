export default class Card {
  constructor(arrayCards, templateSelector, openPopUp) {
    this._name = arrayCards.name;
    this._link = arrayCards.link;
    this._template = document.querySelector(templateSelector).content;
    this._openPopUp = openPopUp;
  }

  _createCard = () => {
    this._element = this._template.querySelector("li").cloneNode(true);
    this._element.querySelector(".photo-elements__title").textContent =
      this._name;
    this._element.querySelector(".photo-elements__capture").src = this._link;
    this._element.querySelector(".photo-elements__capture").alt = this._name;

    this._setListenerButtonLike();
    this._setListenerButtonDelete();
    this._setListenerCapture();

    return this._element;
  };

  _setListenerButtonLike = () => {
    this._element
      .querySelector(".photo-elements__like")
      .addEventListener("click", () => {
        this._handleButtonLikeClick();
      });
  };

  _handleButtonLikeClick = () => {
    this._element
      .querySelector(".photo-elements__like")
      .classList.toggle("photo-elements__like_active");
  };

  _setListenerButtonDelete = () => {
    this._element
      .querySelector(".photo-elements__delete")
      .addEventListener("click", () => {
        this._handleButtonDeleteClick();
      });
  };

  _handleButtonDeleteClick = () => {
    this._element.remove();
  };

  _setListenerCapture = () => {
    this._element
      .querySelector(".photo-elements__capture")
      .addEventListener("click", () => {
        this._handleExtendCapture();
      });
  };

  _handleExtendCapture = () => {
    this._openPopUp(document.querySelector(".pop-up_type_extend-cap"));
    document.querySelector(".pop-up__capture").src = this._link;
    document.querySelector(".pop-up__capture").alt = this._name;
    document.querySelector(".pop-up__title_type_extend-cap").textContent =
      this._name;
  };

  getCard = () => {
    return this._createCard();
  };
}