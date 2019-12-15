const { Event, Sequelize } = require("../database/models/index");

const BLOCK_SIZE = 100;
const MAX_CODE_NUM = parseInt("ZZZZZZ", 36) + 1;
const getRandomInt = (min, max) => {
  //The maximum is exclusive and the minimum is inclusive
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const pad = (n, width, z) => {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

const nextCode = accessCode => {
  let nextNum = Math.ceil(parseInt(accessCode, 36) / BLOCK_SIZE) * BLOCK_SIZE;
  nextNum += getRandomInt(0, BLOCK_SIZE + 1);
  nextNum = nextNum % MAX_CODE_NUM;
  return pad(nextNum.toString(36).toUpperCase(), 6, "0");
};

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
    const startAt = new Date(req.body.startAt);
    const endAt = new Date(req.body.endAt);
    try {
      // persist in database
      const currentMaxCode = await Event.max("accessCode", {
        where: { endAt: { [Sequelize.Op.lt]: new Date().toISOString() } }
      });
      console.log(currentMaxCode);
      const nextAccessCode = nextCode(currentMaxCode)
      console.log(nextAccessCode);
      const event = await Event.create({
        name: name,
        ownerId: req.user.id,
        accessCode: nextAccessCode,
        startAt: startAt,
        endAt: endAt
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
