export default class Section {
  constructor({cards, renderer}, container) {
    this._cards = cards;
    this._renderer = renderer;
    this._container = container;
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