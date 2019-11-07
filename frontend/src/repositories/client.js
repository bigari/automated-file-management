import wretch from "wretch";

const client = wretch()
  .url("http://localhost:5002")
  .options({ credentials: "include", mode: "cors" });

export default client;
