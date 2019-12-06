'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Replies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      qid: {
        type: Sequelize.INTEGER,
        references: {         
          model: 'Questions',
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
    return queryInterface.dropTable('Replies');
  }
};