const { Event, Member } = require("../database/models/index");
const JWT = require("jsonwebtoken");
const jwtSecret = process.env["JWT_SECRET"];

module.exports = {
  genToken: function(id, now, eventEndDate) {
    return JWT.sign(
      {
        iss: "afm",
        sub: id,
        iat: now,
        exp: eventEndDate
      },
      jwtSecret
    );
  },

  create: async function(req, res) {
    const accessCode = req.body.accessCode;
    const event = await Event.findOne({
      where: {
        accessCode: accessCode
      }
    });
    if (!event) {
      res
        .status(401)
        .set("Content-Type", "application/json")
        .send({ error: "Invalid access code" });
      return;
    }
    try {
      const member = await Member.create({
        eventId: event.id,
        role: 2,
        userId: 0
      });

      const now = new Date().getTime();
      const jwtToken = await this.genToken(
        member.id,
        now,
        event.endDate.getTime()
      );
      res.cookie(`mjwt_${event.id}`, jwtToken, {
        maxAge: event.endDate.getTime() - now,
        secure: false,
        httpOnly: true
      });

      member.dataValues[`mjwt_${event.id}`] = jwtToken;
      res
        .status(200)
        .set("Content-Type", "application/json")
        .send({ member: { ...member.dataValues } });
    } catch (err) {
      res
        .status(500)
        .set("Content-Type", "application/json")
        .send({ error: "An error has occurred, please try again later." });
    }
  },

  auth: (req, res) => {
    //Should define a passport strategy for mjwt
  }
};
