"use strict";

const models = require("../models");
const User = models.User;
const Event = models.Event;
const Question = models.Question;
const Reply = models.Reply;

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log("deleting");
    await queryInterface.bulkDelete("Events", null, {});
    await queryInterface.bulkDelete("Users", null, {});

    console.log("salting");
    const salt = bcrypt.genSaltSync(10);
    console.log("seeding users");
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "bigari",
          email: "bigari7+afm1@gmail.com",
          password: bcrypt.hashSync("000000", salt),
          createdAt: new Date()
        },
        // ,
        // {
        //   username: "steeve",
        //   email: "bigari7+afm2@gmail.com",
        //   password: bcrypt.hashSync("000000", salt),
        //   createdAt: new Date()
        // },
        // {
        //   username: "yerima",
        //   email: "bigari7+afm3@gmail.com",
        //   password: bcrypt.hashSync("000000", salt),
        //   createdAt: new Date()
        // },
        {
          username: "test",
          email: "test@gmail.com",
          password: bcrypt.hashSync("test", salt),
          createdAt: new Date()
        }
      ],
      {}
    );

    console.log("querying users");

    const users = await User.findAll({
      attributes: ["id"]
    }).map(user => user.dataValues.id);

    console.log("seeding events");
    const now = new Date();
    await queryInterface.bulkInsert(
      "Events",
      [
        {
          name: "The future of AI",
          ownerId: users[0],
          accessCode: "00001G",
          startAt: now,
          endAt: new Date(new Date().setMonth(now.getMonth() + 1))
        },
        {
          name: "Robotic & design",
          ownerId: users[0],
          accessCode: "00007Q",
          startAt: new Date(new Date().setMonth(now.getMonth() - 1)),
          endAt: now
        }
      ],
      {}
    );

    console.log("Seeding questions")
    
    const eids = await Event.findAll({
      attributes: ['id']  
    }).map(event => event.dataValues.id);

    await queryInterface.bulkInsert(
      "Questions",
      [
        {
          content: "This is a question",
          timestamp: now,
          eid: eids[0]
        },
        {
          content: "This is also a question",
          timestamp: now,
          eid: eids[0]
        }
      ]
    );

    console.log("Seeding replies")

    const qids = await Question.findAll({
      attributes: ['id']
    }).map(question => question.dataValues.id);

    await queryInterface.bulkInsert(
      "Replies",
      [
        {
          content: "This is a reply for question 2",
          timestamp: new Date(),
          qid: qids[0]
        },
        {
          content: "This is a reply for question 1",
          timestamp: new Date(),
          qid: qids[1]
        } 
      ]
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Replies", null, {});
    await queryInterface.bulkDelete("Questions", null, {});
    await queryInterface.bulkDelete("Events", null, {});
    return queryInterface.bulkDelete("Users", null, {});
  }
};
