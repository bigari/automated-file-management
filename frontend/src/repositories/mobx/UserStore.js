import { observable, action, computed, runInAction, decorate } from "mobx";
import client from "../client";

export class UserStore {
  user;
  jwt;
  signinError;
  signupError;
  rootStore;

  get isLoggedIn() {
    return !(this.jwt == null);
  }

  signin(email, password) {
    console.log(email);
    console.log(password);
    client
      .url("/signin")
      .post({
        email: email,
        password: password
      })
    .json(json => {
        // runInAction(() => {
        this.user = json.user
        this.signinError = null
        // });
      });
  }

  signup(username, email, password) {
    client
      .url("/signup")
      .post({ username: username, email: email, password: password })
      .error(400, err => {
        runInAction(() => {
          this.signupError = err.message;
        });
      })
      .json(json => {
        // runInAction(() => {
          this.user = json.user;
          this.signupError = null
        // });
      });
  }
}

decorate(UserStore, {
  user: observable,
  jwt: observable,
  isLoggedIn: computed,
  signinError: observable,
  signupError: observable,
  signin: action,
  signup: action
});
