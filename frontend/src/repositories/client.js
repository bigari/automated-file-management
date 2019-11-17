import wretch from "wretch";

class Client {
  api =  wretch()
  .url("http://localhost:5002")
  .options({ credentials: "include", mode: "cors" });

  //Useful for automatic testing
  addJwt (jwt) {
    this.api = this.api.auth("Bearer " + jwt);
  }
}

const client = new Client();

export default client;
