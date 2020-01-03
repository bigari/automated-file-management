const {
  Event,
  Member,
  User,
  Sequelize,
  sequelize
} = require("../database/models/index");

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
  // TODO: add events that the use is apart of 
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

  addMember: async function(req, res) {
    const role = 1
    const eid = req.params.eid
    const username = req.body.username
    try {
      const user = await this.getUser(username)
      const member = await Member.create({
        eventId: eid,
        role: role,
        userId: user.id,
        auid: 0
      })

      res.status(200)
        .set("Content-Type", "application/json")
        .send({member: user});
    
    } catch (e) {
      console.log(e.message)
      res
        .status(500)
        .set("Content-Type", "application/json")
        .send({ error: e.message });
    }
  },

  getUser: async function(username) {
    const user = await User.findOne({
      where: {username: username}
    })

    if(user) return user
    throw new Error("Invalid username")
  },

  create: async function(req, res) {
    const name = req.body.name;
    const startAt = new Date(req.body.startAt);
    const endAt = new Date(req.body.endAt);
    try {
      // persist in database
      const currentMaxCode = await Event.max("accessCode", {
        where: { endAt: { [Sequelize.Op.gt]: new Date().toISOString() } }
      });
      console.log(currentMaxCode);
      const nextAccessCode = nextCode(currentMaxCode);
      console.log(nextAccessCode);

      const event = await sequelize.transaction(async t => {
        const _event = await Event.create(
          {
            name: name,
            ownerId: req.user.id,
            accessCode: nextAccessCode,
            startAt: startAt,
            endAt: endAt
          },
          { transaction: t }
        );
        await Member.create(
          {
            eventId: _event.id,
            userId: req.user.id,
            role: 0,
            auid: 0
          },
          { transaction: t }
        );
        return _event;
      });
      res
        .status(200)
        .set("Content-Type", "application/json")
        .send({ event: event });
    } catch (error) {
      console.error(error);
      res.end();
    }
  },

  fetchMembers: async function(req, res) {
    try{
      const eid = req.params.eid
      let members = await Member.findAll({
        where: {
          eventId: eid,
          [Sequelize.Op.not]: {
            role: 2
          }
        },
        include: [
          {model: User, as: 'user', attributes: ["id", "username", "email"]}
        ],
      })

      members = members.map(member => {
        let mem = member.user
        mem.createdAt = member.createdAt

        return mem
      })

      res
      .status(200)
      .set("Content-Type", "application/json")
      .send({
        members: members
      })
    }
    catch(e) {
      res
      .status(500)
      .set("Content-Type", "application/json")
      .send({error: e.message})
    }
  }
};
