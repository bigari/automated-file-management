"use strict";

const models = require("../models");
const User = models.User;
const Workspace = models.Workspace;

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('deleting')
    await queryInterface.bulkDelete("Members", null, {});
    await queryInterface.bulkDelete("Workspaces", null, {});
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

    console.log("seeding workspaces");

    await queryInterface.bulkInsert(
      "Workspaces",
      [
        {
          name: "bigariteam",
          ownerId: users[0].id,
          storageProvider: 'google',
          storageToken: "token",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "steeveteam",
          ownerId: users[1].id,
          storageProvider: 'google',
          storageToken: "token",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );

    console.log("querying workspaces");

    const workspaces = await Workspace.findAll({ attributes: ["id"] });

    console.log("seeding members");

    return queryInterface.bulkInsert(
      "Members",
      [
        {
          userId: users[0].id,
          workspaceId: workspaces[0].id,
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: users[1].id,
          workspaceId: workspaces[1].id,
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: users[1].id,
          workspaceId: workspaces[0].id,
          roleId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: users[2].id,
          workspaceId: workspaces[0].id,
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: users[0].id,
          roleId: 3,
          workspaceId: workspaces[1].id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Members", null, {});
    await queryInterface.bulkDelete("Workspaces", null, {});
    return queryInterface.bulkDelete("Users", null, {});
  }
};
