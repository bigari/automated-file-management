import {
  observable,
  action,
  computed,
  decorate
} from "mobx";
import client from '../../client';

export class UserStore {
  user;
  pending = true;
  signinError;
  signupErrors = {
    password: '',
    username: '',
    email: '',
    internal: ''  
  }
  
  constructor() {
    this.validateCookie();
  }

  get isLoggedIn() {
    return this.user? true:false;
  }

  // isPending is true if the call to validateCookie is yet to be resolved
  get isPending() {
    return Boolean(this.pending)
  }

  signin(email, password) {
    client.url('/signin')
      .options({
        method: 'POST',
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

  signup(username, email, password) {
    client.url('/signup')
      .options({
        method: 'POST',
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

  logout() {
    // invalidate cookie && invalidate user obj
    return client.url('/logout').options({method: 'POST'})
      .post()
      .res((response) => {
        this.user = null;
        //redirect
        console.log('disconnected');
      })
      .catch((error) => {
        console.log(error)
      });
  }

  validateCookie() {
    this.pending = true
    client.url('/validateCookie')
    .get()
    .json(({user}) => {
      this.pending = false
      this.user = user
    })
    .catch((error) => {this.pending = false})
  }
}

decorate(UserStore, {
  user: observable,
  pending: observable,
  isLoggedIn: computed,
  isPending: computed,
  signinError: observable,
  signupErrors: observable,
  signin: action,
  signup: action,
  logout: action,
  validateCookie: action
});