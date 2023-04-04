export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);;
  }

  renderCards = (arrayCards) => {
    this._arrayCards = arrayCards;
    this._arrayCards.forEach((card) => {
      this._renderer(card);
    });
  }

  addCard = (cardElement) => {
    this._container.prepend(cardElement);
  }
}