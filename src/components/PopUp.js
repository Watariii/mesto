export default class PopUp {
  constructor(popUpSelector) {
    this._popUp = document.querySelector(popUpSelector);
    this._closeIcon = this._popUp.querySelector(".pop-up__close-icon");
  }
  open() {
    this._popUp.classList.add("pop-up_opened");
    this._setEventListeners();
  };

  close = () => {
    this._deleteEventListeners();
    this._popUp.classList.remove("pop-up_opened");
    
  };

  setEventListeners() {
    this._closeIcon.addEventListener("click", () => {
      this.close();
    });
    this._popUp.addEventListener("mousedown", this._handleOverlayClose);
  };
  _setEventListeners = () => {
    document.addEventListener("keydown", this._handleEscapeClose);
    
  };
  _deleteEventListeners = () => {
    document.removeEventListener("keydown", this._handleEscapeClose);
  };
  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    } else {
      evt.stopPropagation();
    }
  };
}
