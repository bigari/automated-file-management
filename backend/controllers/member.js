const { Event, Member, Sequelize } = require("../database/models/index");

module.exports = {
  authStaff: async function(req, res) {
    const accessCode = req.query.accessCode;
    if (!accessCode) {
      res
        .status(400)
        .set("Content-Type", "application/json")
        .send({ error: "You must specify an access code in the url" });
      return;
    }
    try {
      const event = await Event.findOne({
        where: {
          accessCode: accessCode,
          endAt: { [Sequelize.Op.gt]: new Date().toISOString() }
        }
      });
      if (!event) {
        res
          .status(401)
          .set("Content-Type", "application/json")
          .send({ error: "Invalid access code" });
        return;
      }
      let member = await Member.findOne({
        where: {
          eventId: event.id,
          userId: req.user.id
        }
      });
      if (!member) {
        res
          .status(401)
          .set("Content-Type", "application/json")
          .send({ error: "You are not in this event staff" });
        return;
      }

      res
        .status(200)
        .set("Content-Type", "application/json")
        .send({
          member: { ...member.dataValues, event: { ...event.dataValues } }
        });
    } catch (err) {
      res
        .status(500)
        .set("Content-Type", "application/json")
        .send({ error: "An error has occurred, please try again later." });
    }
  },

  //Create member for an event given the access code
  createAnonymousMember: async function(req, res) {
    const accessCode = req.body.accessCode;
    const anonymousUser = req.user.extras.anonymousUser;
    try {
      //Only become member of (upcoming?) or ongoing event
      const event = await Event.findOne({
        where: {
          accessCode: accessCode,
          endAt: { [Sequelize.Op.gt]: new Date().toISOString() }
        }
      });
      if (!event) {
        res
          .status(401)
          .set("Content-Type", "application/json")
          .send({ error: "Invalid access code" });
        return;
      }
      let member = await Member.findOne({
        where: {
          eventId: event.id,
          auid: anonymousUser.id
        }
      });
      if (!member) {
        member = await Member.create({
          eventId: event.id,
          role: 2,
          userId: 0,
          auid: anonymousUser.id
        });
      }
      res
        .status(200)
        .set("Content-Type", "application/json")
        .send({
          member: { ...member.dataValues, event: { ...event.dataValues } }
        });
    } catch (err) {
      res
        .status(500)
        .set("Content-Type", "application/json")
        .send({ error: "An error has occurred, please try again later." });
    }
  }
};
