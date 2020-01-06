'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Replies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      qid: {
        type: Sequelize.INTEGER,
        references: {         
          model: 'Questions',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Replies');
  }
};