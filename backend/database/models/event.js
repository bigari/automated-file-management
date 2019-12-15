'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    startAt: DataTypes.DATE,
    endAt: DataTypes.DATE,
    name: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
  }, {timestamps: false});
  Event.associate = function(models) {
    // associations can be defined here
    Event.hasMany(models.Question, { foreignKey: "eid", as: "questions" });
    Event.belongsTo(models.User, { foreignKey: "ownerId", as: "owner" });

    // Event.hasMany(models.Poll, {
    //   foreignKey: "eventId",
    //   as: "polls"
    // });
  };
  return Event;
};
