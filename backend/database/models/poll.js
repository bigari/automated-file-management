"use strict";
module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define(
    "Poll",
    {
      title: DataTypes.STRING,
      eventId: DataTypes.INTEGER
    },
    {}
  );
  Poll.associate = function(models) {
    // associations can be defined here
    Poll.belongsTo(models.Event, { foreignKey: "eventId", as: "event" });
    Poll.hasMany(models.Option, {
      foreignKey: "pollId",
      as: "options"
    });
  };
  return Poll;
};
