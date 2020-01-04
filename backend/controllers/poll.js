const { Poll, Option, Vote, Sequelize } = require("../database/models/index");

module.exports = {
  vote: async function(req, res) {
    const pollId = req.params.pollId;
    const optionId = req.body.optionId;
    const member = req.user.extras.member;
    try {
      const option = await Option.findOne({
        where: {
          id: optionId
        },
        group: ["Option.id"],
        attributes: {
          include: [
            [Sequelize.fn("COUNT", Sequelize.col("votes.id")), "voteCount"]
          ]
        },
        include: [
          {
            model: Vote,
            as: "votes",
            attributes: []
          }
        ]
      });
      if (!option) {
        res
          .status(404)
          .set("Content-Type", "application/json")
          .send({ error: "Option not found" });
        return;
      }
      option.dataValues.voteCount = parseInt(option.dataValues.voteCount);
      const vote = await Vote.findOne({
        where: {
          pollId: pollId,
          memberId: member.id
        }
      });
      if (vote && vote.optionId != optionId) {
        await Vote.destroy({
          where: {
            id: vote.id
          }
        });
      }

      if (!vote || vote.optionId != optionId) {
        await Vote.create({
          pollId: pollId,
          optionId: optionId,
          memberId: member.id
        });
        option.dataValues.voteCount += 1;
      }

      res
        .status(200)
        .set("Content-Type", "application/json")
        .send({ option: option });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .set("Content-Type", "application/json")
        .send({ error: "An error has occurred, please try again later." });
    }
  },
  deletePoll: async function(req, res) {
    const pollId = req.params.pollId;
    try {
      await Poll.destroy({
        where: {
          id: pollId
        }
      });
      const poll = {
        id: pollId
      };
      res
        .status(200)
        .set("Content-Type", "application/json")
        .send({ poll: poll });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .set("Content-Type", "application/json")
        .send({ error: "An error has occurred, please try again later." });
    }
  },

  updatePoll: async function(req, res) {
    const eid = req.params.eid;
    const pollId = req.params.pollId;
    try {
      await Poll.update(
        {
          title: req.body.title
        },
        { where: { id: pollId } }
      );

      const poll = {
        id: pollId,
        title: req.body.title,
        eventId: eid
      };

      await Option.destroy({
        where: {
          pollId: pollId
        }
      });
      const options = await this.insertOptions(pollId, req.body.options);
      poll.options = options;
      res
        .status(200)
        .set("Content-Type", "application/json")
        .send({ poll: poll });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .set("Content-Type", "application/json")
        .send({ error: "An error has occurred, please try again later." });
    }
  },

  insertOptions: async function(pollId, options) {
    return await Promise.all(
      options.map(async op => {
        op.pollId = pollId;
        const option = await Option.create(op);
        option.dataValues.voteCount = 0;
        return option;
      })
    );
  },

  createPoll: async function(req, res) {
    const eid = req.params.eid;
    try {
      const poll = await Poll.create({
        title: req.body.title,
        eventId: eid
      });
      const options = await this.insertOptions(poll.id, req.body.options);
      poll.dataValues.options = options;
      res
        .status(200)
        .set("Content-Type", "application/json")
        .send({ poll: poll });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .set("Content-Type", "application/json")
        .send({ error: "An error has occurred, please try again later." });
    }
  },
  fetchPolls: async function(req, res) {
    const member = req.user.extras.member;
    try {
      const polls = await Poll.findAll({
        group: ["Poll.id", "options.id"],
        where: {
          eventId: member.eventId
        },
        include: [
          {
            model: Option,
            as: "options",
            attributes: {
              include: [
                [
                  Sequelize.fn("COUNT", Sequelize.col("options->votes.id")),
                  "voteCount"
                ]
              ]
            },
            include: [
              {
                model: Vote,
                as: "votes",
                attributes: [],
                duplicating: true
              }
            ],
            duplicating: true
          }
        ]
      });
      res
        .status(200)
        .set("Content-Type", "application/json")
        .send({ polls: polls });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .set("Content-Type", "application/json")
        .send({ error: "An error has occurred, please try again later." });
    }
  }
};
