const superagent = require("superagent");
const sendHttp = async message => {
  let req;
  let res;
  const url = `http://rest-api:5002/${message.url}`;
  if (message.verb === "GET") {
    try {
      res = await superagent
        .get(url)
        .set("accept", "json")
        .set("Authorization", `Bearer ${message.jwt}`);
      return res.body;
    } catch {
      return null;
    }
  }
  if (message.verb === "PUT") {
    req = superagent.put(url);
  } else {
    req = superagent.post(url);
  }
  try {
    res = await req
      .set("accept", "json")
      .set("Authorization", `Bearer ${message.jwt}`)
      .send(message.data);
    return res.body;
  } catch {
    return null;
  }
};
module.exports = sendHttp;
