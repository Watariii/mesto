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

  setUserInfo({ name, about, avatar, _id }) {
    this._profileFirstName.textContent = name;
    this._profileJob.textContent = about;
    this._profileAvatar.src = avatar;
    this._userId = _id;
  }

getUserId(){
  return this._userId
}
}
