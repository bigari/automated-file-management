"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("AnonymousUsers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    //Fodder
    return queryInterface.bulkInsert(
      "AnonymousUsers",
      [
        {
          id: 0,
          createdAt: new Date()
        }
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("AnonymousUsers");
  }
};
