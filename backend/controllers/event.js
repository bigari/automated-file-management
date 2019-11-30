const { Event, Member } = require("../database/models/index");

module.exports = {
  //List all events current user is part of
  list: async function(req, res) {
    try {
      const events = await Event.findAll({
        where: {
          ownerId: req.user.id
        }
      });

      res
        .status(200)
        .set("Content-Type", "application/json")
        .send({ events: events });
    } catch (error) {
      console.log(error);
      res.end();
    }
  },

  create: async function(req, res) {
    const name = req.body.name;
    try {
      // persist in database
      const event = await Event.create({
        name: name,
        ownerId: req.user.id
      });
      res
        .status(200)
        .set("Content-Type", "application/json")
        .send({ event: event });
    } catch (error) {
      console.error(error);
      res.end();
    }
  }
};
