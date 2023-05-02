export class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._id = undefined;
    this._name = undefined;
    this._avatar = undefined;
    this._about = undefined;
  }

  __displayInfo() {
    this._nameElement.textContent = this._name;
    this._infoElement.textContent = this._about;
    this._avatarElement.src = this._avatar;
  }

  getUserInfo() {
    const {
      _id,
      _name: name,
      _avatar: avatar,
      _about: about,
    } = this;

    return {
      _id,
      name,
      avatar,
      about,
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._id = _id;
    this._name = name;
    this._avatar = avatar;
    this._about = about;

    this.__displayInfo();
  }

  getUserId() {
    return this._id;
  }
}
