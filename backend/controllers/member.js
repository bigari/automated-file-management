const { Event, Member } = require("../database/models/index");
const JWT = require("jsonwebtoken");
const jwtSecret = process.env["JWT_SECRET"];

module.exports = {
  //Create member for an event given the access code
  createAnonymousMember: async function(req, res) {
    const accessCode = req.body.accessCode;
    const anonymousUser = req.anonymousUser;
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
        userId: 0,
        auid: anonymousUser.id
      });
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
  }
};
