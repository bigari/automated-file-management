import app from "../app"
import request from "supertest";

const user = {
    username: "test2",
    email: "test2@gmail.com",
    password: "test",
}

const urlEncode = function(params) {
    var query = []
    for (let key in params) {
      let val = encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
      query.push(val)
    }
    return query.join('&')
}

module.exports.urlEncode = urlEncode

module.exports.signup = async function() {
    return request(app)
            .post('/signup')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(urlEncode(user))
            .then(res => {
                return res
            })
}

module.exports.getJwt = function(res) {
    return res.body.user.jwt
}

module.exports.getUserId = function(res) {
    return res.body.user.id
}


