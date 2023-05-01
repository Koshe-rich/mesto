export class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
    this._id = undefined;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._infoElement.textContent
    };
  }

  setUserInfo({ name, about, _id }) {
    console.log(this._nameElement);
    console.log(this._infoElement);

    this._nameElement.textContent = name;
    this._infoElement.textContent = about;
    this._id = _id;
  }

  getUserId() {
    return this._id;
  }
}
