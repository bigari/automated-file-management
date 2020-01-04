"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.addColumn("Polls", "eventId", {
      type: Sequelize.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "Events",
        key: "id"
      }
    });

    await queryInterface.addColumn("Options", "pollId", {
      type: Sequelize.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "Polls",
        key: "id"
      }
    });

    await queryInterface.removeColumn("Options", "voteCount");

    return queryInterface.createTable("Votes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      memberId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Members",
          key: "id"
        }
      },
      pollId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Polls",
          key: "id"
        }
      },
      optionId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Options",
          key: "id"
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Polls", "eventId");
    await queryInterface.removeColumn("Options", "pollId");
    await queryInterface.addColumn("Options", "voteCount", {
      type: Sequelize.INTEGER
    });
    return queryInterface.dropTable("Votes");
  }
};
