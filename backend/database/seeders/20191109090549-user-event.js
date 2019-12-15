"use strict";

const models = require("../models");
const User = models.User;
const Event = models.Event;
const Question = models.Question;

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
        }
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
        // {
        //   username: "test",
        //   email: "test@gmail.com",
        //   password: bcrypt.hashSync("test", salt),
        //   createdAt: new Date()
        // }
      ],
      {}
    );

    console.log("querying users");

    const users = await User.findAll({
      attributes: ["id"]
    });

    console.log("seeding events");
    const now = new Date();
    await queryInterface.bulkInsert(
      "Events",
      [
        {
          name: "The future of AI",
          ownerId: users[0].id,
          accessCode: "00001G",
          startAt: now,
          endAt: new Date(new Date().setMonth(now.getMonth() + 1))
        },
        {
          name: "Robotic & design",
          ownerId: users[0].id,
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
    });

    await queryInterface.bulkInsert(
      "Questions",
      [
        {
          content: "This is a question",
          timestamp: now,
          eid: eids[0].id,
          reply: "This is a reply"
        },
        {
          content: "This is also a question",
          timestamp: now,
          eid: eids[0].id,
          reply: "This is a reply"
        }
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Events", null, {});
    await queryInterface.bulkDelete("Questions", null, {});
    return queryInterface.bulkDelete("Users", null, {});
  }
};
