import client from "../../network/client";

export class UserApi {
  signin() {
    return client.api.url("/signin/");
  }

  signup() {
    return client.api.url("/singup/");
  }
}
