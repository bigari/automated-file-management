import wretch from "wretch";

class Client {
  api = wretch()
    .url("http://rest-api:5002")
    .options({ credentials: "include", mode: "cors" });

  addJwt(jwt) {
    this.api = this.api.auth("Bearer " + jwt);
  }
}

const client = new Client();

export default client;
