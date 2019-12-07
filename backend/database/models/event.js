"use strict";
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      ownerId: DataTypes.INTEGER,
      startAt: DataTypes.DATE,
      endAt: DataTypes.DATE,
      name: DataTypes.STRING
    },
    {}
  );
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsTo(models.User, { foreignKey: "ownerId", as: "owner" });

    Event.hasMany(models.Poll, {
      foreignKey: "eventId",
      as: "polls"
    });
  };
  return Event;
};
