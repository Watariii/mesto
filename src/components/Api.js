export default class Api {
  constructor(config) {
    this._urlCards = config.url + "Cards";
    this._urlUsersMe = config.url + "users/me";
    this._urlAvatar = config.url + "users/me/avatar";
    this._headers = config.headers;
  }

  getInitialCards() {
    return fetch(this._urlCards, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkStatus());
  }

  addNewCard(newCard) {
    return fetch(this._urlCards, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(newCard),
    }).then(this._checkStatus());
  }

  deleteCard(idCard) {
    return fetch(`${this._urlCards}/${idCard}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkStatus());
  }

  getUserInfo() {
    return fetch(this._urlUsersMe, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkStatus());
  }

  updateAvatar(object) {
    return fetch(this._urlAvatar, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(object),
    }).then(this._checkStatus());
  }

  editUserInfo(object) {
    return fetch(this._urlUsersMe, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: object.name,
        about: object.about,
      }),
    }).then(this._checkStatus());
  }

  getLikeCounter() {
    return fetch(this._urlCards, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkStatus());
  }

  likeCard(idCard) {
    return fetch(`${this._urlCards}/${idCard}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkStatus());
  }

  removeLikeCard(idCard) {
    return fetch(`${this._urlCards}/${idCard}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkStatus());
  }

  _checkStatus() {
    return (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  }
}
