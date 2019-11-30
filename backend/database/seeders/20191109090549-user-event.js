"use strict";

const models = require("../models");
const User = models.User;

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
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: "steeve",
          email: "bigari7+afm2@gmail.com",
          password: bcrypt.hashSync("000000", salt),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: "yerima",
          email: "bigari7+afm3@gmail.com",
          password: bcrypt.hashSync("000000", salt),
          createdAt: new Date(),
          updatedAt: new Date()
        }
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
          startAt: now,
          endAt: new Date(new Date().setMonth(now.getMonth() + 1)),
          createdAt: now,
          updatedAt: now
        },
        {
          name: "Robotic & design",
          ownerId: users[1].id,
          startAt: new Date(new Date().setMonth(now.getMonth() - 1)),
          endAt: now,
          createdAt: now,
          updatedAt: now
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Events", null, {});
    return queryInterface.bulkDelete("Users", null, {});
  }
};
