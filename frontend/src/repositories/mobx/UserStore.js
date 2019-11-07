import { observable, action, computed, runInAction, decorate } from "mobx";
import client from "../client";

export class UserStore {
  email;
  userName;
  jwt;
  signinError;
  signupError;
  rootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

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
      .unauthorized(_ => {
        runInAction(() => {
          this.signinError = "Unauthorized";
        });
      })
      .json(json => {
        runInAction(() => {
          this.email = email;
          this.userName = json.userName;
          this.signinError = null;
          this.jwt = json.jwt;
          client.addJwt(this.jwt);
        });
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
        runInAction(() => {
          this.id = json.id;
          this.email = email;
          this.userName = json.userName;
          this.signupError = null;
          this.jwt = json.jwt;
          client.addJwt(this.jwt);
        });
      });
  }
}

decorate(UserStore, {
  email: observable,
  userName: observable,
  jwt: observable,
  isLoggedIn: computed,
  signinError: observable,
  signupError: observable,
  signin: action,
  signup: action
});
