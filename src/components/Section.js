export class Section {
  constructor({ renderer }, containerSelector, items) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._items = items;
  }

  render(items) {
    if (!items) return;
    
    items.forEach(item => {
      this._renderer(item);
    });
  }
  

  addItem(element) {
    this._container.prepend(element);
  }
}
