 const superagent = require("superagent");
const sendHttp = async message => {
  let req;
  let res;
  const url = `http://rest-api:5002/${message.url}`;
  if (message.verb === "GET") {
    try {
      res = await superagent
        .get(url)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${message.jwt}`);
      return res.body;
    } catch {
      return null;
    }
  }
  if (message.verb === "PUT") {
    req = superagent.put(url);
  }
  else if(message.verb === "DELETE") {
    req = superagent.del(url);
  } 
  else {
    req = superagent.post(url);
  }
  // try {
    res = await req
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${message.jwt}`)
      .send(message.data);
    return res.body;
  // } catch {
  //   return null;
  // }
};
module.exports = sendHttp;
