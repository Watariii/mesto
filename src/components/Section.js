export default class Section {
  constructor({cards, renderer}, containerSelector) {
    this._cards = cards;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);;
  }

  renderCards = () => {
    this._cards.forEach((item) => {
      this._renderer(item);
    });
  }

  addCard = (cardElement) => {
    this._container.prepend(cardElement);
  }
}