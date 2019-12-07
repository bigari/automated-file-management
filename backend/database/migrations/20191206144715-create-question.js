'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      eid: {
        type: Sequelize.INTEGER,
        references: {         
          model: 'Events',
          key: 'id'
        }
      },
      content: {
        type: Sequelize.STRING
      },
      timestamp: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Questions');
  }
};