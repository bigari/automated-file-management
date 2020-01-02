const { Event, Member } = require("../database/models/index");
const JWT = require("jsonwebtoken");
const jwtSecret = process.env["JWT_SECRET"];
const jwtExpiration = 3.154e7;

module.exports = {
  genToken: function(id) {
    return JWT.sign(
      {
        iss: "afm",
        sub: id,
        iat: new Date().getTime(),
        exp: new Date().getTime() + jwtExpiration
      },
      jwtSecret
    );
  },

  create: async function(req, res) {
    try {
      const anonymousUser = await AnonymousUser.create({
        createdAt: new Date()
      });
      const jwtToken = await this.genToken(anonymousUser.id);
      res.cookie("ajwt", jwtToken, {
        maxAge: jwtExpiration * 1000,
        secure: false,
        httpOnly: true
      });

      anonymousUser.dataValues["ajwt"] = jwtToken;
      res
        .status(200)
        .set("Content-Type", "application/json")
        .send({ anonymousUser: { ...anonymousUser.dataValues } });
    } catch (err) {
      res
        .status(500)
        .set("Content-Type", "application/json")
        .send({ error: "An error has occurred, please try again later." });
    }
  },

  //
  auth: (req, res) => {
    const anonymousUser = req.anonymousUser;
    anonymousUser.dataValues.ajwt = req.cookies["ajwt"];
    res
      .status(200)
      .set("Content-Type", "application/json")
      .send({ anonymousUser: anonymousUser });
  }
};
