"use strict";
module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define(
    "Member",
    {
      userId: DataTypes.INTEGER,
      role: DataTypes.INTEGER,
      eventId: DataTypes.INTEGER,
      auid: DataTypes.INTEGER
    },
    {}
  );
  Member.associate = function(models) {
    // associations can be defined here
    Member.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Member.belongsTo(models.AnonymousUser, { foreignKey: "auid", as: "anonymousUser" });
    Member.belongsTo(models.Event, {
      foreignKey: "eventId",
      as: "event"
    });
  };
  
  return Member;
};
