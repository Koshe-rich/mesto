export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  render() {
    this._items.forEach(item => {
      const cardElement = this._renderer(item);
      this._container.prepend(cardElement);
    })
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
