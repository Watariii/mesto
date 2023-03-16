export default class UserInfo {
  constructor({profileFirstName, profileJob}) {
    this._profileFirstName = profileFirstName;
    this._profileJob = profileJob;
    this._popUpFirstName = document.querySelector(
      ".pop-up__input_type_firstname"
    );
    this._popUpJob = document.querySelector(".pop-up__input_type_job");
    this._newObject = {};
  }

  getUserInfo() {
    this._popUpFirstName.value = this._profileFirstName.textContent;
    this._popUpJob.value = this._profileJob.textContent;
    const changeName = this._popUpFirstName.value;
    const changeJob = this._popUpJob.value;
    this._newObject = {name:changeName, job:changeJob};

    return this._newObject;
  }

  setUserInfo(object) {
    this._profileFirstName.textContent = object.firstInputForm;
    this._profileJob.textContent = object.secondInputForm;

    
  }
}
