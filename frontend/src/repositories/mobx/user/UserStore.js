import {
  observable,
  action,
  computed,
  decorate
} from "mobx";
import wretch from "wretch";


export class UserStore {
  user;
  signinError;
  signupErrors = {
    password: '',
    username: '',
    email: '',
    internal: ''  
  }

  get isLoggedIn() {
    return false;
  }

  signin(email, password) {
    wretch().url(`http://localhost:5002/signin`)
      .options({
        method: 'POST',
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .post({
        email: email,
        password: password
      })
      .error(422, ({text}) => {
        this.signinError = JSON.parse(text).error;
      })
      .error(500, ({text}) => {
        this.signinError = JSON.parse(text).error;
      })
      .json(json => {
        this.user = json.user
        this.signinError = null
      });
  }

  // refresh token for re-auth

  signup(username, email, password) {
    wretch(`http://localhost:5002/signup`)
      .options({
        method: 'POST',
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .post({
        username: username,
        email: email,
        password: password
      })
      .error(422, ({text}) => {
        let errs = JSON.parse(text).errors;
        this.signupErrors = {...this.signupErrors, ...errs};
        console.log(this.signupErrors)
      })
      .error(500, ({text}) => {
        this.signupErrors.internal = JSON.parse(text).errors.internal;
      })
      .json(json => {
        this.user = json.user;
        this.signupError = {
          passwordError: '',
          usernameError: '',
          emailError: '',
          internal: '' 
        }
      });
  }
}

decorate(UserStore, {
  user: observable,
  isLoggedIn: computed,
  signinError: observable,
  signupErrors: observable,
  signin: action,
  signup: action
});