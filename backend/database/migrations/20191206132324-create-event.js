'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ownerId: {
        type: Sequelize.INTEGER,
        references: {         
          model: 'Users',
          key: 'id'
        }
      },
      accessCode: {
        type: Sequelize.STRING
      },
      startAt: {
        type: Sequelize.DATE
      },
      endAt: {
        type: Sequelize.DATE
      },
      name: {
        type: Sequelize.STRING
      }
    });
    return queryInterface.addIndex("Events", ["accessCode"]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events');
  }
};