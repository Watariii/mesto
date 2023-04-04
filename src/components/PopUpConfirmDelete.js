import PopUp from "./PopUp.js";

export default class PopUpConfirmDelete extends PopUp {
  constructor(popUpSelector, handleDeleteCard) {
    super(popUpSelector);
    this._handleDeleteCard = handleDeleteCard;
    this._confirmButton = this._popUp.querySelector(".pop-up__button");
  }

  open(cardElement, idCard) {
    super.open();
    this._cardElement = cardElement;
    this._idCard = idCard;
  }
  setEventListeners() {
    this._confirmButton.addEventListener("click", () => {
      this._handleDeleteCard(this._cardElement, this._idCard);
      this.close();
    });
    super.setEventListeners();
  }
}
