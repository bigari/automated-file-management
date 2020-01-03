import { observable, action, computed, decorate } from "mobx";
import client from "../../client";

export class UserStore {
  anonymousUser;
  member;
  user;
  pending = true;
  joining = false;
  signinError;
  signupErrors = {
    password: "",
    username: "",
    email: "",
    internal: ""
  };
  root;
  jwt;

  constructor(root) {
    this.validateCookie();
    this.root = root;
  }

  get isLoggedIn() {
    return this.user ? true : false;
  }

  // isPending is true if the call to validateCookie is yet to be resolved
  get isPending() {
    return Boolean(this.pending);
  }

  signin(email, password) {
    client.api
      .url("/signin")
      .options({
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .post({
        email: email,
        password: password
      })
      .error(422, ({ text }) => {
        this.signinError = JSON.parse(text).error;
      })
      .error(500, ({ text }) => {
        this.signinError = JSON.parse(text).error;
      })
      .json(json => {
        this.user = json.user;
        this.signinError = null;
      });
  }

  signup(username, email, password) {
    client.api
      .url("/signup")
      .options({
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .post({
        username: username,
        email: email,
        password: password
      })
      .error(422, ({ text }) => {
        let errs = JSON.parse(text).errors;
        this.signupErrors = { ...this.signupErrors, ...errs };
      })
      .error(500, ({ text }) => {
        this.signupErrors.internal = JSON.parse(text).errors.internal;
      })
      .json(json => {
        this.user = json.user;
        this.signupError = {
          passwordError: "",
          usernameError: "",
          emailError: "",
          internal: ""
        };
      });
  }

  logout() {
    // invalidate cookie && invalidate user obj
    return client.api
      .url("/logout")
      .options({ method: "POST" })
      .post()
      .res(response => {
        this.user = null;
        //redirect
        console.log("disconnected");
      })
      .catch(error => {
        console.log(error);
      });
  }

  validateCookie() {
    this.pending = true;
    client.api
      .url("/validateCookie")
      .get()
      .json(({ user }) => {
        //this.pending = false;
        this.user = user;
        this.anonymousAuth();
      })
      .catch(error => {
        this.anonymousAuth();
      });
  }

  anonymousAuth() {
    // Use ajwt on device to get the corresponding anonymousUser
    client.api
      .url("/anonymous-users/auth")
      .get()
      .json(({ anonymousUser }) => {
        //this.pending = false;
        this.anonymousUser = anonymousUser;
        this.pending = false;
      })
      .catch(error => {
        console.log(error);
        this.pending = false;
      });
  }

  async joinAsAnonymousMember(accessCode, cb) {
    try {
      // At the start we should have already use the stored ajwt
      // ... if any to get the corresponding Anonymous User (AU)
      if (!this.anonymousUser) {
        // If there is still none, create one
        const json = await client.api
          .url("/anonymous-users")
          .post({})
          .json();
        this.anonymousUser = json.anonymousUser;
      }
      // Now we can add the AU as a member of the event
      // ... assuming the code is good
      // This endpoint must not create a member (same AU for same Event) twice
      const jsonMember = await client.api
        .url("/members")
        .post({ accessCode: accessCode })
        .json();
      this.member = jsonMember.member;
      this.joining = false;
      cb.onSuccess();
    } catch (e) {
      console.log("Bad code or 500");
      cb.onError();
      this.joining = false;
    }
  }

  async join(accessCode, cb) {
    this.joining = true;
    //First of all we try to join as a staff member (role == 1)
    if (this.isLoggedIn) {
      client.api
        .url("/members/auth-staff")
        .query({ accessCode: accessCode })
        .get()
        .unauthorized(_ => {
          //In case we are not allowed we join as an Anonymous Member
          // role == 2
          return this.joinAsAnonymousMember(accessCode, cb);
        })
        .json(({ member }) => {
          this.member = member;
          this.joining = false;
          console.log(this.member)
          cb.onSuccess();
        })
        .catch(e => {
          console.log("not staff");
          this.joining = false;
          cb.onError();
        });
    } else {
      //If the user is not logged In we can directly join
      // as an Anonymous Member
      this.joinAsAnonymousMember(accessCode, cb);
    }
  }
}

decorate(UserStore, {
  user: observable,
  member: observable,
  pending: observable,
  isLoggedIn: computed,
  isPending: computed,
  joining: observable,
  signinError: observable,
  signupErrors: observable,
  signin: action,
  signup: action,
  logout: action,
  join: action,
  joinAsAnonymousMember: action,
  validateCookie: action,
  anonymousAuth: action
});
