export default class UserInfo {
  constructor({
    profileFirstNameSelector,
    profileJobSelector,
    profileAvatarSelector,
  }) {
    this._profileFirstName = document.querySelector(profileFirstNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);

    this.newObject = {};
  }

  getUserInfo() {
    this.newObject = {
      name: this._profileFirstName.textContent,
      about: this._profileJob.textContent,
    };

    return this.newObject;
  }

  setUserInfo(object) {
    const { name, about, ...other } = object;
    this._profileFirstName.textContent = name;
    this._profileJob.textContent = about;
  }

  setUserAvatar(avatar) {
    this._profileAvatar.src = avatar;
  }
}
