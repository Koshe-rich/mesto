// export class Section {
//   constructor({ items, renderer }, containerSelector) {
//     this._items = items;
//     this._renderer = renderer;
//     this._container = document.querySelector(containerSelector);
//   }

// render() {
//   if (this._items) {
//     this._items.forEach(item => {
//       this._renderer(item);
//     });
//   }
// }

//   addItem(element) {
//     this._container.prepend(element);
//   }
// }


export class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
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
