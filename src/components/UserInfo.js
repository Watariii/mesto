export default class UserInfo {
  constructor({ profileFirstNameSelector, profileJobSelector }) {
    this._profileFirstName = document.querySelector(profileFirstNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);

    this.newObject = {};
  }

  getUserInfo() {
    this.newObject = {
      name: this._profileFirstName.textContent,
      job: this._profileJob.textContent,
    };

    return this.newObject;
  }

  setUserInfo(object) {
    const { firstname, job, ...other } = object;
    this._profileFirstName.textContent = firstname;
    this._profileJob.textContent = job;
  }
}
