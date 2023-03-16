export default class PopUp {
  constructor(popUpSelector) {
    this._popUpSelector = popUpSelector;
    this._closeIcon = this._popUpSelector.querySelector(".pop-up__close-icon");
  }
  openPopUp = () => {
    this._popUpSelector.classList.add("pop-up_opened");
    this._setEventListeners();
  };

  closePopUp = () => {
    this._deleteEventListeners();
    this._popUpSelector.classList.remove("pop-up_opened");
    
  };

  setEventListeners = () => {
    this._closeIcon.addEventListener("click", () => {
      this.closePopUp();
    });
  };
  _setEventListeners = () => {
    document.addEventListener("keydown", this._handleEscapeClose);
    this._popUpSelector.addEventListener("mousedown", this._handleOverlayClose);
  };
  _deleteEventListeners = () => {
    document.removeEventListener("keydown", this._handleEscapeClose);
    this._popUpSelector.removeEventListener("mousedown", this._handleOverlayClose);
  };
  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.closePopUp();
    }
  };

  _handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.closePopUp();
    } else {
      evt.stopPropagation();
    }
  };
}
