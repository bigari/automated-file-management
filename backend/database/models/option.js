"use strict";
module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define(
    "Option",
    {
      title: DataTypes.STRING,
      pollId: DataTypes.INTEGER
    },
    {}
  );
  Option.associate = function(models) {
    // associations can be defined here
    Option.belongsTo(models.Poll, { foreignKey: "pollId", as: "poll" });
    Option.hasMany(models.Vote, { foreignKey: "optionId", as: "votes" });
  };
  return Option;
};
