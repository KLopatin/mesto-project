export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._userName = document.querySelector(nameSelector);
    this._userAbout = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userAbout: this._userAbout.textContent,
    };
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userAbout.textContent = data.about;
    this._avatar.src = data.avatar;
    this._userId = data._id;
  }

  getUserId() {
    return this._userId;
  }
}
