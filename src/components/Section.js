export class Section {
  constructor({ renderer }, containerSelector, items) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._items = items;
  }

  render() {
    this._items.forEach(item => {
      this._renderer(item);
    })
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
