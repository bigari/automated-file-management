'use strict';
module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define('Option', {
    title: DataTypes.STRING,
    voteCount: DataTypes.INTEGER
  }, {});
  Option.associate = function(models) {
    // associations can be defined here
    Option.belongsTo(models.Poll, { foreignKey: "pollId", as: "poll" });

  };
  return Option;
};