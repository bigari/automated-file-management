"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Members", "auid", {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      references: {
        model: "AnonymousUsers",
        key: "id"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Members", "auid");
  }
};
