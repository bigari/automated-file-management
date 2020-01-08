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
    await queryInterface.bulkDelete("Questions", null, {});
    await queryInterface.bulkDelete("Members", null, {});
    await queryInterface.bulkDelete("Events", null, {});
    await queryInterface.bulkDelete("Users", null, {});

    console.log("salting");
    const salt = bcrypt.genSaltSync(10);
    console.log("seeding users");
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: 0, //For some reasons i have no choice but separate
          username: "anonymous",
          email: "anonymous@interconf.com",
          password: bcrypt.hashSync("010509", salt),
          createdAt: new Date()
        }, 
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "bigari",
          email: "bigari7+afm1@gmail.com",
          password: bcrypt.hashSync("000000", salt),
          createdAt: new Date()
        },
        // {
        //   username: "steeve",
        //   email: "bigari7+afm2@gmail.com",
        //   password: bcrypt.hashSync("000000", salt),
        //   createdAt: new Date()
        // }
        // {
        //   username: "yerima",
        //   email: "bigari7+afm3@gmail.com",
        //   password: bcrypt.hashSync("000000", salt),
        //   createdAt: new Date()
        // },
        {
          username: "Saul",
          email: "saul@gmail.com",
          password: bcrypt.hashSync("000000", salt),
          createdAt: new Date()
        }
      ],
      {}
    );


    console.log("querying users");

    const users = await User.findAll({
      attributes: ["id"]
    }).map(user => user.dataValues);

    console.log("seeding events");
    const now = new Date();
    await queryInterface.bulkInsert(
      "Events",
      [
        {
          name: "The future of AI",
          ownerId: users[1].id,
          accessCode: "00001G",
          startAt: now,
          endAt: new Date(new Date().setMonth(now.getMonth() + 1))
        },
        {
          name: "Robotic & design",
          ownerId: users[1].id,
          accessCode: "00007Q",
          startAt: new Date(new Date().setMonth(now.getMonth() - 1)),
          endAt: now
        }
      ],
      {}
    );
    console.log("Seeding members (owners)");

    const eids = await Event.findAll({
      attributes: ["id"]
    }).map(user => user.dataValues);

    await queryInterface.bulkInsert(
      "Members",
      [
        {
          eventId: eids[0].id,
          userId: users[1].id,
          auid: 0,
          role: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          eventId: eids[1].id,
          userId: users[1].id,
          auid: 0,
          role: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );

    console.log("Seeding questions");


    await queryInterface.bulkInsert("Questions", [
      {
        content: "This is a question",
        timestamp: now,
        eid: eids[0].id
      },
      {
        content: "This is also a question",
        timestamp: now,
        eid: eids[0].id
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Members", null, {});
    await queryInterface.bulkDelete("Questions", null, {});
    await queryInterface.bulkDelete("Events", null, {});
    return queryInterface.bulkDelete("Users", null, {});
  }
};
