"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable("Workspaces", "Events");
    await queryInterface.removeColumn("Events", "storageProvider");
    await queryInterface.removeColumn("Events", "storageToken");
    await queryInterface.addColumn("Events", "startAt", Sequelize.DATE);
    await queryInterface.addColumn("Events", "endAt", Sequelize.DATE);
    return queryInterface.addColumn("Events", "accessCode", Sequelize.STRING);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable("Events", "Worspaces");
    await queryInterface.addColumn(
      "Workspaces",
      "storageProvider",
      Sequelize.STRING
    );
    await queryInterface.addColumn(
      "Workspaces",
      "storageToken",
      Sequelize.STRING
    );
    await queryInterface.removeColumn("Workspaces", "startAt");
    await queryInterface.removeColumn("Workspaces", "endAt");
    return queryInterface.removeColumn("Workspaces", "accessCode");
  }
};
