"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Users", "created_at", "createdAt");
    return queryInterface.addColumn("Users", "updatedAt", {
      type: Sequelize.DATE,
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.renameColumn("Users", "createdAt", "created_at");
    queryInterface.removeColumn("Users", "updatedAt");
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
