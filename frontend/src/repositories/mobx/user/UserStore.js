import { observable, action, computed, runInAction, decorate } from "mobx";
import wretch from "wretch";


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
    wretch().url(`http://localhost:5002/signin`)
    .options({ 
      method: 'POST',
      mode: "cors", 
      headers: {"Content-Type": "application/json"} 
    })
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
    wretch(`http://localhost:5001/signup`)
    .options({ 
      method: 'POST',
      mode: "cors", 
      headers: {"Content-Type": "application/json"} 
    })
    .post({ username: username, email: email, password: password })
      // .error(422, err => {
      //   runInAction(() => {
      //     this.signupError = err.message;
      //   });
      // })
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
